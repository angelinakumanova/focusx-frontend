import userApi from "@/services/userApi";
import { FieldValues } from "react-hook-form";
import { create } from "zustand";

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
      const response = await userApi.post("/auth/login", data, {
        withCredentials: true,
      });
      console.log(response.data.access_token);

      localStorage.setItem("access_token", response.data.access_token);

      get().getUser();
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await userApi.get("/auth/logout", { withCredentials: true });
    localStorage.removeItem("access_token");
    
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
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      const res = await userApi.get("/auth/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      set({ user: { id: res.data.id, username: res.data.username } });
    }
  },
}));
