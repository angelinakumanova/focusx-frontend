import { create } from "zustand";
import userApi from "@/services/userApi";
import { FieldValues } from "react-hook-form";

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isRefreshed: boolean;
  loading: boolean;
  login: (data: FieldValues) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isRefreshed: false,
  loading: false,

  login: async (data) => {
    set({ loading: true });

    try {
      await userApi.post("/auth/login", data, { withCredentials: true });
      get().getUser();
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await userApi.post("/auth/logout", {}, { withCredentials: true });
    set({ user: null });
  },

  refresh: async () => {
    if (get().isRefreshed) return;

    userApi
      .get("/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        set({
          user: { id: res.data.id, username: res.data.username },
          isRefreshed: true,
        });
      })
      .catch(() => {
        set({ user: null, isRefreshed: true });
      });
  },

  getUser: async () => {
    const res = await userApi.get("/auth/me", { withCredentials: true });

    set({ user: { id: res.data.id, username: res.data.username } });
  },
}));
