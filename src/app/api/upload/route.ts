import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File is too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }
    // Check file type (MIME)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    // đọc nội dung file từ stream
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // tạo thư mục public/uploads nếu chưa có
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // đặt tên file duy nhất (UUID + timestamp + original extension)
    const ext = path.extname(file.name); // lấy đuôi .jpg/.png...
    const uniqueName = `${crypto.randomUUID()}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueName);

    // lưu file vào disk
    await fs.writeFile(filePath, buffer);

    // trả về url để client lưu vào DB
    return NextResponse.json({ url: `/uploads/${uniqueName}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
