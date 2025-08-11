// /lib/api/user.ts
import request from "./request";

export const UserAPI = {
  login: (data: { email: string; password: string }) =>
    request.post("/auth/login", data),
  profile: () => request.get("/auth/profile"),
};
