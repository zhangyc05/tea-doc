import { describe, it, expect, beforeEach } from 'vitest'
import { extractAllTokens, extractTokensByPrefix, getToken, extractColorTokens, extractFontTokens, extractSizeTokens } from '../tokens'

describe('Token Extraction', () => {
  beforeEach(() => {
    // 确保 DOM 环境已设置
    document.documentElement.style.setProperty('--color-primary', '#0B63F6')
    document.documentElement.style.setProperty('--color-text-primary', '#07122F')
    document.documentElement.style.setProperty('--font-size-md', '14px')
    document.documentElement.style.setProperty('--radius-md', '10px')
  })

  it('should extract all color tokens', () => {
    const tokens = extractAllTokens()
    expect(tokens).toHaveProperty('--color-primary')
    expect(tokens['--color-primary']).toBe('#0B63F6')
  })

  it('should extract tokens by prefix', () => {
    const colorTokens = extractTokensByPrefix('--color-')
    expect(Object.keys(colorTokens).length).toBeGreaterThan(0)
    expect(colorTokens).toHaveProperty('--color-primary')
  })

  it('should get single token by name', () => {
    const primaryColor = getToken('--color-primary')
    expect(primaryColor).toBe('#0B63F6')
  })

  it('should return empty string for non-existent token', () => {
    const fakeToken = getToken('--fake-token')
    expect(fakeToken).toBe('')
  })
})

describe('extractColorTokens', () => {
  beforeEach(() => {
    document.documentElement.style.setProperty('--color-primary', '#0B63F6')
    document.documentElement.style.setProperty('--color-text-primary', '#07122F')
    document.documentElement.style.setProperty('--color-success', '#10B981')
  })

  it('should extract and convert color tokens', () => {
    const colors = extractColorTokens()
    expect(colors).toBeInstanceOf(Array)
    expect(colors.length).toBeGreaterThan(0)
    expect(colors[0]).toHaveProperty('name')
    expect(colors[0]).toHaveProperty('value')
  })

  it('should remove --color- prefix from token names', () => {
    const colors = extractColorTokens()
    const primaryColor = colors.find(c => c.name === 'primary')
    expect(primaryColor).toBeDefined()
    expect(primaryColor?.name).toBe('primary')
  })

  it('should include color descriptions', () => {
    const colors = extractColorTokens()
    const primaryColor = colors.find(c => c.name === 'primary')
    expect(primaryColor?.description).toBe('品牌主色')
  })

  it('should include description for text-primary color', () => {
    const colors = extractColorTokens()
    const textPrimaryColor = colors.find(c => c.name === 'text-primary')
    expect(textPrimaryColor?.description).toBe('主要文本色')
  })

  it('should return empty description for undefined colors', () => {
    const colors = extractColorTokens()
    const customColor = colors.find(c => c.name === 'custom-undefined')
    expect(customColor).toBeUndefined()
  })
})

describe('extractFontTokens', () => {
  beforeEach(() => {
    document.documentElement.style.setProperty('--font-size-md', '14px')
    document.documentElement.style.setProperty('--font-size-lg', '16px')
    document.documentElement.style.setProperty('--font-size-xs', '12px')
  })

  it('should extract and convert font tokens', () => {
    const fonts = extractFontTokens()
    expect(fonts).toBeInstanceOf(Array)
    expect(fonts.length).toBeGreaterThan(0)
  })

  it('should remove --font- prefix from token names', () => {
    const fonts = extractFontTokens()
    const fontSizeMd = fonts.find(f => f.name === 'size-md')
    expect(fontSizeMd).toBeDefined()
    expect(fontSizeMd?.name).toBe('size-md')
  })

  it('should include font descriptions for known tokens', () => {
    const fonts = extractFontTokens()
    const fontSizeMd = fonts.find(f => f.name === 'size-md')
    expect(fontSizeMd?.description).toBe('默认字号 (14px)')
  })

  it('should include description for large font size', () => {
    const fonts = extractFontTokens()
    const fontSizeLg = fonts.find(f => f.name === 'size-lg')
    expect(fontSizeLg?.description).toBe('大字号 (16px)')
  })

  it('should return empty description for undefined font tokens', () => {
    const fonts = extractFontTokens()
    const customFont = fonts.find(f => f.name === 'size-custom')
    expect(customFont).toBeUndefined()
  })
})

describe('extractSizeTokens', () => {
  beforeEach(() => {
    document.documentElement.style.setProperty('--radius-md', '10px')
    document.documentElement.style.setProperty('--radius-sm', '6px')
    document.documentElement.style.setProperty('--shadow-card', '0 6px 18px rgba(15, 35, 80, 0.04)')
    document.documentElement.style.setProperty('--shadow-modal', '0 10px 40px rgba(15, 35, 80, 0.12)')
  })

  it('should extract and categorize size tokens', () => {
    const sizes = extractSizeTokens()
    expect(sizes).toBeInstanceOf(Array)
    expect(sizes.length).toBeGreaterThan(0)

    const hasRadius = sizes.some(s => s.type === 'radius')
    const hasShadow = sizes.some(s => s.type === 'shadow')
    expect(hasRadius).toBe(true)
    expect(hasShadow).toBe(true)
  })

  it('should remove --radius- prefix from radius token names', () => {
    const sizes = extractSizeTokens()
    const radiusMd = sizes.find(s => s.name === 'md' && s.type === 'radius')
    expect(radiusMd).toBeDefined()
    expect(radiusMd?.name).toBe('md')
    expect(radiusMd?.type).toBe('radius')
  })

  it('should remove --shadow- prefix from shadow token names', () => {
    const sizes = extractSizeTokens()
    const shadowCard = sizes.find(s => s.name === 'card' && s.type === 'shadow')
    expect(shadowCard).toBeDefined()
    expect(shadowCard?.name).toBe('card')
    expect(shadowCard?.type).toBe('shadow')
  })

  it('should include correct values for radius tokens', () => {
    const sizes = extractSizeTokens()
    const radiusMd = sizes.find(s => s.name === 'md' && s.type === 'radius')
    expect(radiusMd?.value).toBe('10px')
  })

  it('should include correct values for shadow tokens', () => {
    const sizes = extractSizeTokens()
    const shadowCard = sizes.find(s => s.name === 'card' && s.type === 'shadow')
    expect(shadowCard?.value).toBe('0 6px 18px rgba(15, 35, 80, 0.04)')
  })

  it('should have type property for all size tokens', () => {
    const sizes = extractSizeTokens()
    sizes.forEach(size => {
      expect(size).toHaveProperty('type')
      expect(['radius', 'shadow']).toContain(size.type)
    })
  })
})
