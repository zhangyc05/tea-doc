/// <reference types="vite/client" />

declare module 'node:fs' {
  export function readFileSync(path: string, encoding: string): string
  export function readdirSync(path: string): string[]
  export function statSync(path: string): { isDirectory(): boolean }
}

declare module 'node:url' {
  export function fileURLToPath(url: URL): string
}
