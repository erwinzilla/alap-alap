import {
  type bgColor500,
  type heightSize,
  type roundedClass,
  textSize,
} from '@/globals/tailwind.ts'

export type SizeType = 'sm' | 'md' | 'lg' | 'xl'

// key from tailwind
export type SizeKey = keyof typeof heightSize
export type RoundKey = keyof typeof roundedClass
export type ColorKey = keyof typeof bgColor500
export type TextKey = keyof typeof textSize
