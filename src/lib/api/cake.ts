// /lib/api/cake.ts
import request from "./request";

export const CakeAPI = {
  getList: (params?: { page?: number; limit?: number }) =>
    request.get("/cakes", { params }),
  getById: (id: number) => request.get(`/cakes/${id}`),
   create: (data: {
    title: string;
    description: string;
    fullDescription: string;
    imageUrl: string;
    price: number;
    categoryId: number;
    badgeId?: number | null;
    sizes?: { sizeLabel: string; servings: number; price: number }[];
  }) => request.post("/cakes", data),
  update: (id: string, data: any) =>
    request.put(`/cakes/${id}`, data),
  delete: (id: string) => request.delete(`/cakes/${id}`),
};
