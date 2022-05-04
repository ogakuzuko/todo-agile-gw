import type { User } from './User'

export type UserRepository = {
  get: (id: string) => Promise<User | undefined>
  create: (user: User) => Promise<void>
}
