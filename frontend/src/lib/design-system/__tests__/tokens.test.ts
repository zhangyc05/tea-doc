import { describe, it, expect, beforeEach } from 'vitest'
import { extractAllTokens, extractTokensByPrefix, getToken } from '../tokens'

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
