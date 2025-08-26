import request from "./request";

export const UploadAPI = {
  create: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return request.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
