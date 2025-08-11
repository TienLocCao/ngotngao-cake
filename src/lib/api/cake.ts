// /lib/api/cake.ts
import request from "./request";

export const CakeAPI = {
  getList: (params?: { page?: number; limit?: number }) =>
    request.get("/cakes", { params }),
  getById: (id: number) => request.get(`/cakes/${id}`),
  create: (data: { name: string; price: number }) =>
    request.post("/cakes", data),
  update: (id: number, data: any) =>
    request.put(`/cakes/${id}`, data),
  delete: (id: number) => request.delete(`/cakes/${id}`),
};
