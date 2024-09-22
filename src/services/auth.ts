import { TAuthIdLoginRequest } from "@/types/auth";
import axiosInstance from "./api";

export const authIdLogin = async (body: TAuthIdLoginRequest) => {
    const response = await axiosInstance.post('/auth/signin', body);
    return response;
  };