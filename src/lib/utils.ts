import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSimplifiedExpression(sideNumber: number) {
    const a =
        750 * Math.cos(Math.PI / sideNumber);

    const b =
        sideNumber *
        Math.sin(Math.PI / sideNumber) *
        Math.pow(Math.cos(Math.PI / sideNumber), 2);

    if (sideNumber >= 64) {
      return "V(r) = 750r - πr³"
    }

    return `V(r) = ${a.toFixed(2)}r - ${b.toFixed(3)}r³`;
}