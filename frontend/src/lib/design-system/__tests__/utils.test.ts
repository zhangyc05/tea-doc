import { describe, it, expect, vi } from 'vitest'
import { isDevEnvironment, canAccessDesignSystem, copyToClipboard, debounce } from '../utils'

describe('Environment Detection', () => {
  it('should detect dev environment correctly', () => {
    const isDev = isDevEnvironment()
    expect(typeof isDev).toBe('boolean')
  })

  it('should allow design system access in dev', () => {
    const canAccess = canAccessDesignSystem()
    expect(typeof canAccess).toBe('boolean')
  })
})

describe('Clipboard Utilities', () => {
  it('should copy text to clipboard', async () => {
    // Mock navigator.clipboard
    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText
      }
    })

    const result = await copyToClipboard('test text')
    expect(result).toBe(true)
    expect(mockWriteText).toHaveBeenCalledWith('test text')
  })

  it('should handle clipboard errors gracefully', async () => {
    // Mock error
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
      }
    })

    const result = await copyToClipboard('test text')
    expect(result).toBe(false)
  })
})

describe('Debounce Utility', () => {
  it('should debounce function calls', () => {
    let callCount = 0
    const mockFn = () => { callCount++ }
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    // Should not be called immediately
    expect(callCount).toBe(0)
  })
})
