// /lib/api/badge.ts
import request from "./request";

type getListQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export const BadgeAPI = {
  getList: (query: getListQuery) => request.get("/badges", { params: query }),
  create: (data: { name: string }) => request.post("/badges", data),
  update: ( id: string, data: { name: string }) => request.put(`/badges/${id}`, data),
  delete: ( id: string) => request.delete(`/badges/${id}`),
};
