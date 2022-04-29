import { getApp } from 'firebase/app'
import type { Firestore } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

export const firestore: Firestore = getFirestore(getApp())
