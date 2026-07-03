import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const tokensCss = readFileSync(fileURLToPath(new URL('./tokens.css', import.meta.url)), 'utf8')
const srcRoot = fileURLToPath(new URL('..', import.meta.url))

function collectStyleFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const filePath = `${dir}/${name}`
    if (statSync(filePath).isDirectory()) return collectStyleFiles(filePath)
    if (!/\.(vue|css)$/.test(name)) return []
    if (filePath.endsWith('/styles/tokens.css')) return []
    return [filePath]
  })
}

describe('admin design tokens', () => {
  it('defines the first batch of admin color tokens from the F1 scan', () => {
    expect(tokensCss).toContain('--color-admin-primary: #1268F6;')
    expect(tokensCss).toContain('--color-admin-primary-hover: #0F5EEF;')
    expect(tokensCss).toContain('--color-admin-text-strong: #17233D;')
    expect(tokensCss).toContain('--color-admin-text-title: #172B55;')
    expect(tokensCss).toContain('--color-admin-border: #DCE6F5;')
    expect(tokensCss).toContain('--color-admin-bg-soft: #F8FBFF;')
  })

  it('defines the first batch of admin elevation and spacing tokens from the F2 scan', () => {
    expect(tokensCss).toContain('--shadow-admin-card-soft: 0 8px 22px rgba(40, 88, 150, 0.035);')
    expect(tokensCss).toContain('--shadow-admin-card-subtle: 0 8px 24px rgba(35, 64, 110, 0.05);')
    expect(tokensCss).toContain('--shadow-admin-primary-action: 0 8px 18px rgba(18, 104, 246, 0.18);')
    expect(tokensCss).toContain('--radius-full: 999px;')
    expect(tokensCss).toContain('--space-admin-xs: 8px;')
    expect(tokensCss).toContain('--space-admin-sm: 10px;')
    expect(tokensCss).toContain('--space-admin-md: 12px;')
    expect(tokensCss).toContain('--space-admin-lg: 16px;')
  })

  it('keeps high-frequency primary color usage behind the admin primary token', () => {
    const hardcodedPrimaryFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#1268f6/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedPrimaryFiles).toEqual([])
  })

  it('keeps high-frequency strong text color usage behind the admin text token', () => {
    const hardcodedStrongTextFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#17233d/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedStrongTextFiles).toEqual([])
  })

  it('keeps high-frequency title text color usage behind the admin title text token', () => {
    const hardcodedTitleTextFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#172b55/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedTitleTextFiles).toEqual([])
  })

  it('keeps high-frequency muted text color usage behind the admin muted text token', () => {
    const hardcodedMutedTextFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#66758f/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedMutedTextFiles).toEqual([])
  })

  it('keeps high-frequency border color usage behind the admin border token', () => {
    const hardcodedBorderFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#dce6f5/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedBorderFiles).toEqual([])
  })

  it('keeps high-frequency muted border color usage behind the admin muted border token', () => {
    const hardcodedMutedBorderFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#d9e5f7/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedMutedBorderFiles).toEqual([])
  })

  it('keeps high-frequency divider color usage behind the admin divider token', () => {
    const hardcodedDividerFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#e5edf8/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedDividerFiles).toEqual([])
  })

  it('keeps high-frequency page background color usage behind the admin background token', () => {
    const hardcodedBackgroundFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#f6f9ff/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedBackgroundFiles).toEqual([])
  })

  it('keeps high-frequency soft background color usage behind the admin soft background token', () => {
    const hardcodedSoftBackgroundFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#f8fbff/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedSoftBackgroundFiles).toEqual([])
  })

  it('keeps high-frequency soft card shadow usage behind the admin card soft shadow token', () => {
    const hardcodedSoftShadowFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return readFileSync(filePath, 'utf8').includes('0 8px 22px rgba(40, 88, 150, 0.035)')
    })

    expect(hardcodedSoftShadowFiles).toEqual([])
  })

  it('keeps high-frequency subtle card shadow usage behind the admin card subtle shadow token', () => {
    const hardcodedSubtleShadowFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return readFileSync(filePath, 'utf8').includes('0 8px 24px rgba(35, 64, 110, 0.05)')
    })

    expect(hardcodedSubtleShadowFiles).toEqual([])
  })

  it('keeps high-frequency faint card shadow usage behind the admin card faint shadow token', () => {
    const hardcodedFaintShadowFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return readFileSync(filePath, 'utf8').includes('0 8px 24px rgba(35, 64, 110, 0.04)')
    })

    expect(hardcodedFaintShadowFiles).toEqual([])
  })

  it('keeps high-frequency primary action shadow usage behind the admin primary action shadow token', () => {
    const hardcodedPrimaryActionShadowFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return readFileSync(filePath, 'utf8').includes('0 8px 18px rgba(18, 104, 246, 0.18)')
    })

    expect(hardcodedPrimaryActionShadowFiles).toEqual([])
  })

  it('keeps capsule radius usage behind the full radius token', () => {
    const hardcodedFullRadiusFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /border-radius:\s*999px/.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedFullRadiusFiles).toEqual([])
  })
})
