import { getApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

export const auth: Auth = getAuth(getApp())
