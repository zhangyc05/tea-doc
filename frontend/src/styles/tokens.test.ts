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

function collectGapValues(content: string): string[] {
  return Array.from(content.matchAll(/(?:^|\n)\s*gap:\s*([^;]+);/g), ([, value]) => value)
}

function collectPaddingValues(content: string): string[] {
  return Array.from(content.matchAll(/(?:^|\n)\s*padding:\s*([^;]+);/g), ([, value]) => value)
}

function collectMarginValues(content: string): string[] {
  return Array.from(content.matchAll(/(?:^|\n)\s*margin:\s*([^;]+);/g), ([, value]) => value)
}

function collectDirectionalMarginValues(content: string): string[] {
  return Array.from(content.matchAll(/(?:^|\n)\s*margin-(?:top|right|bottom|left):\s*([^;]+);/g), ([, value]) => value)
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
    expect(tokensCss).toContain('--radius-admin-panel: 8px;')
    expect(tokensCss).toContain('--radius-full: 999px;')
    expect(tokensCss).toContain('--space-admin-xs: 8px;')
    expect(tokensCss).toContain('--space-admin-sm: 10px;')
    expect(tokensCss).toContain('--space-admin-md: 12px;')
    expect(tokensCss).toContain('--space-admin-lg: 16px;')
    expect(tokensCss).toContain('--space-admin-card-gap: 18px;')
    expect(tokensCss).toContain('--space-admin-xl: 20px;')
    expect(tokensCss).toContain('--space-admin-2xl: 24px;')
  })

  it('keeps high-frequency primary color usage behind the admin primary token', () => {
    const hardcodedPrimaryFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#1268f6/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedPrimaryFiles).toEqual([])
  })

  it('keeps high-frequency primary hover color usage behind the admin primary hover token', () => {
    const hardcodedPrimaryHoverFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#0f5eef/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedPrimaryHoverFiles).toEqual([])
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

  it('keeps high-frequency subtle text color usage behind the admin subtle text token', () => {
    const hardcodedSubtleTextFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /#405985/i.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedSubtleTextFiles).toEqual([])
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

  it('keeps compact control radius usage behind the small radius token', () => {
    const hardcodedSmallRadiusFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return /border-radius:\s*6px/.test(readFileSync(filePath, 'utf8'))
    })

    expect(hardcodedSmallRadiusFiles).toEqual([])
  })

  it('keeps large card radius usage behind the large radius token', () => {
    const hardcodedLargeRadiusFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return content.match(/border-radius:\s*([^;]+);/g)?.some((declaration) => {
        const value = declaration.replace(/border-radius:\s*/, '').replace(';', '')
        return !value.includes('clamp(') && /(^|\s)12px(\s|$)/.test(value)
      })
    })

    expect(hardcodedLargeRadiusFiles).toEqual([])
  })

  it('keeps medium panel radius usage behind the medium radius token', () => {
    const hardcodedMediumRadiusFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return content.match(/border-radius:\s*([^;]+);/g)?.some((declaration) => {
        const value = declaration.replace(/border-radius:\s*/, '').replace(';', '')
        return !value.includes('clamp(') && /(^|\s)10px(\s|$)/.test(value)
      })
    })

    expect(hardcodedMediumRadiusFiles).toEqual([])
  })

  it('keeps admin panel radius usage behind the admin panel radius token', () => {
    const hardcodedPanelRadiusFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return content.match(/border-radius:\s*([^;]+);/g)?.some((declaration) => {
        const value = declaration.replace(/border-radius:\s*/, '').replace(';', '')
        return !value.includes('clamp(') && /(^|\s)8px(\s|$)/.test(value)
      })
    })

    expect(hardcodedPanelRadiusFiles).toEqual([])
  })

  it('keeps compact inline gaps behind the extra small spacing token', () => {
    const hardcodedCompactGapFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      return collectGapValues(readFileSync(filePath, 'utf8')).some((value) => {
        return !value.includes('clamp(') && /(^|\s)8px(\s|$|!important)/.test(value)
      })
    })

    expect(hardcodedCompactGapFiles).toEqual([])
  })

  it('keeps small inline gaps behind the small spacing token', () => {
    const hardcodedSmallGapFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectGapValues(content).some((value) => {
        return !value.includes('clamp(') && /(^|\s)10px(\s|$)/.test(value)
      })
    })

    expect(hardcodedSmallGapFiles).toEqual([])
  })

  it('keeps medium inline gaps behind the medium spacing token', () => {
    const hardcodedMediumGapFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectGapValues(content).some((value) => {
        return !value.includes('clamp(') && /(^|\s)12px(\s|$)/.test(value)
      })
    })

    expect(hardcodedMediumGapFiles).toEqual([])
  })

  it('keeps large inline gaps behind the large spacing token', () => {
    const hardcodedLargeGapFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectGapValues(content).some((value) => {
        return !value.includes('clamp(') && /(^|\s)16px(\s|$)/.test(value)
      })
    })

    expect(hardcodedLargeGapFiles).toEqual([])
  })

  it('keeps common card and section gaps behind the card gap spacing token', () => {
    const hardcodedCardGapFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectGapValues(content).some((value) => {
        return !value.includes('clamp(') && /(^|\s)18px(\s|$)/.test(value)
      })
    })

    expect(hardcodedCardGapFiles).toEqual([])
  })

  it('keeps extra large section gaps behind the extra large spacing token', () => {
    const hardcodedExtraLargeGapFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectGapValues(content).some((value) => {
        return !value.includes('clamp(') && /(^|\s)20px(\s|$)/.test(value)
      })
    })

    expect(hardcodedExtraLargeGapFiles).toEqual([])
  })

  it('keeps double extra large section gaps behind the double extra large spacing token', () => {
    const hardcodedDoubleExtraLargeGapFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectGapValues(content).some((value) => {
        return !value.includes('clamp(') && /(^|\s)24px(\s|$)/.test(value)
      })
    })

    expect(hardcodedDoubleExtraLargeGapFiles).toEqual([])
  })

  it('keeps extra large single-value padding behind the extra large spacing token', () => {
    const hardcodedExtraLargePaddingFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectPaddingValues(content).some((value) => {
        return value.trim() === '20px'
      })
    })

    expect(hardcodedExtraLargePaddingFiles).toEqual([])
  })

  it('keeps large single-value padding behind the large spacing token', () => {
    const hardcodedLargePaddingFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectPaddingValues(content).some((value) => {
        return value.trim() === '16px'
      })
    })

    expect(hardcodedLargePaddingFiles).toEqual([])
  })

  it('keeps medium single-value padding behind the medium spacing token', () => {
    const hardcodedMediumPaddingFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectPaddingValues(content).some((value) => {
        return value.trim() === '12px'
      })
    })

    expect(hardcodedMediumPaddingFiles).toEqual([])
  })

  it('keeps card single-value padding behind the card gap spacing token', () => {
    const hardcodedCardPaddingFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectPaddingValues(content).some((value) => {
        return value.trim() === '18px'
      })
    })

    expect(hardcodedCardPaddingFiles).toEqual([])
  })

  it('keeps double extra large single-value padding behind the double extra large spacing token', () => {
    const hardcodedDoubleExtraLargePaddingFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectPaddingValues(content).some((value) => {
        return value.trim() === '24px'
      })
    })

    expect(hardcodedDoubleExtraLargePaddingFiles).toEqual([])
  })

  it('keeps extra large single-value margin behind the extra large spacing token', () => {
    const hardcodedExtraLargeMarginFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectMarginValues(content).some((value) => {
        return value.trim() === '20px'
      })
    })

    expect(hardcodedExtraLargeMarginFiles).toEqual([])
  })

  it('keeps compact directional margins behind the extra small spacing token', () => {
    const hardcodedCompactDirectionalMarginFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectDirectionalMarginValues(content).some((value) => {
        return value.trim() === '8px'
      })
    })

    expect(hardcodedCompactDirectionalMarginFiles).toEqual([])
  })

  it('keeps small directional margins behind the small spacing token', () => {
    const hardcodedSmallDirectionalMarginFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectDirectionalMarginValues(content).some((value) => {
        return value.trim() === '10px'
      })
    })

    expect(hardcodedSmallDirectionalMarginFiles).toEqual([])
  })

  it('keeps medium directional margins behind the medium spacing token', () => {
    const hardcodedMediumDirectionalMarginFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectDirectionalMarginValues(content).some((value) => {
        return value.trim() === '12px'
      })
    })

    expect(hardcodedMediumDirectionalMarginFiles).toEqual([])
  })

  it('keeps large directional margins behind the large spacing token', () => {
    const hardcodedLargeDirectionalMarginFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectDirectionalMarginValues(content).some((value) => {
        return value.trim() === '16px'
      })
    })

    expect(hardcodedLargeDirectionalMarginFiles).toEqual([])
  })

  it('keeps card directional margins behind the card gap spacing token', () => {
    const hardcodedCardDirectionalMarginFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectDirectionalMarginValues(content).some((value) => {
        return value.trim() === '18px'
      })
    })

    expect(hardcodedCardDirectionalMarginFiles).toEqual([])
  })

  it('keeps extra large directional margins behind the extra large spacing token', () => {
    const hardcodedExtraLargeDirectionalMarginFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectDirectionalMarginValues(content).some((value) => {
        return value.trim() === '20px'
      })
    })

    expect(hardcodedExtraLargeDirectionalMarginFiles).toEqual([])
  })

  it('keeps double extra large directional margins behind the double extra large spacing token', () => {
    const hardcodedDoubleExtraLargeDirectionalMarginFiles = collectStyleFiles(srcRoot).filter((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      return collectDirectionalMarginValues(content).some((value) => {
        return value.trim() === '24px'
      })
    })

    expect(hardcodedDoubleExtraLargeDirectionalMarginFiles).toEqual([])
  })
})
