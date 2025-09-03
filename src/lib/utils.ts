import { type ClassValue, clsx } from 'clsx'
import { randomInt } from 'es-toolkit'
import Sqids from 'sqids'
import { twMerge } from 'tailwind-merge'

const sqids = new Sqids({
  minLength: 5,
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomId() {
  return sqids.encode([Date.now()])
}

export function randomAvatarURL() {
  const id = randomInt(1, 38)
  const paddedId = String(id).padStart(2, '0')
  return `https://static.toss.im/illusts/img-profile-emoji-${paddedId}.png`
}
