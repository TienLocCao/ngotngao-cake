// /lib/api/category.ts
import request from "./request";

type getListQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export const CategoryAPI = {
  getList: (query: getListQuery) => request.get("/categories", { params: query }),
  create: (data: { name: string }) => request.post("/categories", data),
  update: ( id: string, data: { name: string }) => request.put(`/categories/${id}`, data),
  delete: ( id: string) => request.delete(`/categories/${id}`),
};
