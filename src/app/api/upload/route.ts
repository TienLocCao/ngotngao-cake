import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
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
