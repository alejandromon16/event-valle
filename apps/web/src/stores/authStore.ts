import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { User, useUserStore } from './userStore'; // Import the user store

interface AuthState {
  isAuthenticate: boolean;
}
interface AuthActions {
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticate: false,

        login: (user) => {
          useUserStore((state) => state.setUser(user));
          set({isAuthenticate: true});
        },
        logout: () => {
          useUserStore((state) => state.logout());
          set({isAuthenticate: false});
        },
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);
