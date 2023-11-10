import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { RoleType, User } from "@prisma/client";

interface AuthState {
  isAuthenticated: boolean;
  user: Partial<User>;
  roles: RoleType[];
}

interface AuthActions {
  login(user:Partial<User>, roles: RoleType[]) : void;
  logout(): void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        roles: [],
        isAuthenticated: false,
        user: {},

        login: (user, roles) => {
          set((state) => ({ user, isAuthenticated: true, roles }));

        },
        logout: () => {
          set({ user: {}, isAuthenticated: false, roles: [] });
        },
      }),
      {
        name: "auth-storage"
      }
    )
  )
)

