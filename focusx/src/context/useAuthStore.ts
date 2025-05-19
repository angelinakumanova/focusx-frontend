import { create } from "zustand";
import { axiosInstance } from "@/services/apiClient";
import { FieldValues } from "react-hook-form";

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isRefreshed: boolean;
  loading: boolean;
  login: (data: FieldValues) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isRefreshed: false,
  loading: false,

  login: async (data) => {
    set({ loading: true });
    await axiosInstance.post("/auth/login", data, { withCredentials: true });
    getUser(set);
    
    set({ loading: false });
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    set({ user: null });
  },

  refresh: async () => {

    if (get().isRefreshed) return;

    try {
      const res = await axiosInstance.get("/auth/me", {
        withCredentials: true,
      });

      set({ user: { username: res.data.username}, isRefreshed: true });
    } catch (err) {
      set({ user: null, isRefreshed: true });
    }
  },
}));

async function getUser(set: any) {
  const res = await axiosInstance.get("/auth/me", { withCredentials: true });

  set({ user: { username: res.data.username } });
}
