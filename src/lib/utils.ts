import { clsx, type ClassValue } from 'clsx'
import { evaluate } from 'mathjs';
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

export const volumeCalc = ({ radius, sideNumber }: {radius: number[], sideNumber: number[]}) => {
  const expr =
    "750*r*cos(pi/n) - n*r^3*sin(pi/n)*cos(pi/n)^2";

  const volume = evaluate(expr, {
    r: radius[0],
    n: sideNumber[0]
  })

  return volume;
}