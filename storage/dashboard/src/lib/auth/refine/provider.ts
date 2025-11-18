"use client";

import { getSession } from "../actions/check";
import { login } from "../actions/login";
import { logout } from "../actions/logout";

export const RefineAuthProvider = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const res = await login(email, password);
    if (res.error) {
      return {
        success: false,
        error: { message: res.error.message, statusCode: parseInt(res.error.code) },
      };
    }

    return { success: true, redirectTo: "/" };
  },
  check: async () => {
    const session = await getSession();
    return { authenticated: !!session.data, logout: !session.data };
  },
  logout: async () => {
    await logout();
    return { success: true, redirectTo: "/login" };
  },
  onError: async (error: any) => {
    console.error(error);
    return {};
  },
};
