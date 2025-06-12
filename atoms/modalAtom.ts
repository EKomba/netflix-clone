import { DocumentData } from 'firebase/firestore'
import { atom } from 'jotai'
import { Movie } from '../typings'

export const modalAtom = atom(false)

export const movieAtom = atom<Movie | DocumentData | null>(null)
