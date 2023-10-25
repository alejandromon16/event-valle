import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"
import { UserEntity } from "../../types"

export interface User extends Omit<UserEntity, "password" | "createdAt"> {
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
        phone_number: "",

        setUser: (user) => set(user),
        logout: () => {
          set({ id: "", user_name: "", email: "", name: "", last_name: "", phone_number:"",})
        },
      }),
      {
        name: "user-storage",
      }
    )
  )
)
