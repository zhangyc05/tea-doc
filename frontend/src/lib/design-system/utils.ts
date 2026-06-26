// frontend/src/lib/design-system/utils.ts

// 环境检测工具函数
export const isDevEnvironment = (): boolean => {
  return import.meta.env.DEV
}

export const canAccessDesignSystem = (): boolean => {
  return isDevEnvironment()
}

// 复制文本到剪贴板
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      textArea.remove()
      return true
    } catch (err) {
      textArea.remove()
      return false
    }
  } catch (err) {
    return false
  }
}

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// 生成唯一 ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 格式化代码用于展示
export const formatCode = (code: string, language: string): string => {
  // 简单的代码格式化，实际可以使用更复杂的库
  return code.trim()
}
