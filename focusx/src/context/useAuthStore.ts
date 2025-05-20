import { create } from "zustand";
import api from "@/services/api";
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
    await api.post("/auth/login", data, { withCredentials: true });
    getUser(set);

    set({ loading: false });
  },

  logout: async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    set({ user: null });
  },

  refresh: async () => {
    if (get().isRefreshed) return;

    api
      .get("/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        set({ user: { username: res.data.username }, isRefreshed: true });
      })
      .catch(() => {
        set({ user: null, isRefreshed: true });
      });
  },
}));

async function getUser(set: any) {
  const res = await api.get("/auth/me", { withCredentials: true });

  set({ user: { username: res.data.username } });
}
