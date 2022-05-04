import { createUser } from '@/domain/entity/user'
import { FirebaseUserClient } from '@/repositories/FirebaseUserClient'
import type { User } from '@/types/user'

export const createUserUsecase = async (user: User): Promise<void> => {
  const createdUser = createUser(user)
  await FirebaseUserClient.create(createdUser)
}
