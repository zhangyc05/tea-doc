// frontend/src/lib/design-system/tokens.ts
import type { ColorToken, FontToken, SizeToken } from './types'

// 批量提取所有 CSS 自定义属性
export const extractAllTokens = (): Record<string, string> => {
  if (typeof window === 'undefined') {
    return {}
  }

  const styles = getComputedStyle(document.documentElement)
  const tokens: Record<string, string> = {}

  // 提取所有 CSS 自定义属性
  for (let i = 0; i < styles.length; i++) {
    const name = styles[i]
    if (name.startsWith('--')) {
      const value = styles.getPropertyValue(name).trim()
      if (value) {
        tokens[name] = value
      }
    }
  }

  return tokens
}

// 按前缀提取 Token
export const extractTokensByPrefix = (prefix: string): Record<string, string> => {
  if (typeof window === 'undefined') {
    return {}
  }

  const styles = getComputedStyle(document.documentElement)
  const result: Record<string, string> = {}

  for (let i = 0; i < styles.length; i++) {
    const name = styles[i]
    if (name.startsWith(prefix)) {
      const value = styles.getPropertyValue(name).trim()
      if (value) {
        result[name] = value
      }
    }
  }

  return result
}

// 获取单个 Token
export const getToken = (name: string): string => {
  if (typeof window === 'undefined') {
    return ''
  }

  const styles = getComputedStyle(document.documentElement)
  return styles.getPropertyValue(name).trim()
}

// 提取颜色 Token 并转换为 ColorToken[] 格式
export const extractColorTokens = (): ColorToken[] => {
  const rawTokens = extractTokensByPrefix('--color-')
  return Object.entries(rawTokens).map(([name, value]) => ({
    name: name.replace('--color-', ''),
    value,
    description: getColorDescription(name)
  }))
}

// 提取字体 Token 并转换为 FontToken[] 格式
export const extractFontTokens = (): FontToken[] => {
  const rawTokens = extractTokensByPrefix('--font-')
  return Object.entries(rawTokens).map(([name, value]) => ({
    name: name.replace('--font-', ''),
    value,
    description: getFontDescription(name)
  }))
}

// 提取尺寸 Token 并转换为 SizeToken[] 格式
export const extractSizeTokens = (): SizeToken[] => {
  const radiusTokens = extractTokensByPrefix('--radius-')
  const shadowTokens = extractTokensByPrefix('--shadow-')

  const result: SizeToken[] = []

  Object.entries(radiusTokens).forEach(([name, value]) => {
    result.push({
      name: name.replace('--radius-', ''),
      value,
      type: 'radius'
    })
  })

  Object.entries(shadowTokens).forEach(([name, value]) => {
    result.push({
      name: name.replace('--shadow-', ''),
      value,
      type: 'shadow'
    })
  })

  return result
}

// 获取颜色描述（用于展示）
const getColorDescription = (name: string): string => {
  const descriptions: Record<string, string> = {
    '--color-primary': '品牌主色',
    '--color-primary-hover': '品牌主色悬停状态',
    '--color-primary-light': '品牌主色浅色变体',
    '--color-text-primary': '主要文本色',
    '--color-text-secondary': '次要文本色',
    '--color-success': '成功状态色',
    '--color-warning': '警告状态色',
    '--color-danger': '危险状态色',
    '--color-info': '信息状态色'
  }
  return descriptions[name] || ''
}

// 获取字体描述（用于展示）
const getFontDescription = (name: string): string => {
  const descriptions: Record<string, string> = {
    '--font-size-xs': '超小字号 (12px)',
    '--font-size-sm': '小字号 (13px)',
    '--font-size-md': '默认字号 (14px)',
    '--font-size-lg': '大字号 (16px)',
    '--font-size-xl': '超大字号 (20px)',
    '--font-size-2xl': '特大字号 (24px)'
  }
  return descriptions[name] || ''
}
