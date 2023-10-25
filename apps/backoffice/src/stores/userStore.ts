import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"
import { UserEntity } from "../../types"

export interface User extends UserEntity {
}

export interface UserActions {
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<User & UserActions>()(
  devtools(
    persist(
      (set) => ({
        id: "",
        user_name: "",
        email: "",
        last_name: "",
        name: "",

        setUser: (user) => set(user),
        logout: () => {
          set({ id: "", user_name: "", email: "", name: "", last_name: "",})
        },
      }),
      {
        name: "user-storage",
      }
    )
  )
)
