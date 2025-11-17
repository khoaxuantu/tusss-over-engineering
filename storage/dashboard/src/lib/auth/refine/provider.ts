"use client";

import { AuthProvider } from "@refinedev/core";
import { getSession } from "../actions/check";
import { login } from "../actions/login";
import { logout } from "../actions/logout";

export const RefineAuthProvider: AuthProvider = {
  login: async ({ email, password }) => {
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
  onError: async (error) => {
    console.error(error);
    return {};
  },
};
