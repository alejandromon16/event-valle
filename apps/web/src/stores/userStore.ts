import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"
import { RoleType, UserEntity } from "../../types"

export interface User {
  id: string
  roles: RoleType[]
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
        roles: [],

        setUser: (user) => set(user),
        logout: () => {
          set({ id: "", roles: []})
        },
      }),
      {
        name: "user-storage",
      }
    )
  )
)
