import { create } from "zustand";
import api from "@/services/api";
import { FieldValues } from "react-hook-form";
import { AxiosError } from "axios";
import ErrorResponse from "@/interfaces/ErrorResponse";


interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isRefreshed: boolean;
  loading: boolean;
  error: string;
  login: (data: FieldValues) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isRefreshed: false,
  loading: false,
  error: "",

  login: async (data) => {
    set({ loading: true });

    try {
      await api.post("/auth/login", data, { withCredentials: true });
      getUser(set);
      set({ error: '' })
    } catch (err) {
      const error = (err as AxiosError).response?.data as ErrorResponse;
      set({error: error.message})
    } finally {
      set({ loading: false });
    }
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
