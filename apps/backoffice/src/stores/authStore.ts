import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { User, useUserStore } from './userStore'; // Import the user store


interface AuthActions {
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthActions>()(
  devtools(
    persist(
      (set) => ({
        login: (user) => {
          useUserStore((state) => state.setUser(user))
        },
        logout: () => {
          useUserStore((state) => state.logout())
        },
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);
