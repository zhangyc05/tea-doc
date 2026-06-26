/**
 * 代码格式化工具
 */

export type CodeLanguage = 'vue' | 'typescript' | 'html' | 'json'

/**
 * 简单的代码语法高亮（纯文本实现，避免依赖外部库）
 */
export const highlightCode = (code: string, language: CodeLanguage = 'vue'): string => {
  // Null/undefined check
  if (code == null) {
    return ''
  }

  // 先对原始代码应用语法高亮，然后转义 HTML
  let highlighted = code

  // 基本的语法高亮标记（按正确顺序）
  highlighted = highlighted
    // 高亮注释（必须在字符串之前处理）
    .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
    // 高亮关键字
    .replace(/\b(import|export|from|const|let|var|function|return|if|else|for|while)\b/g, '<span class="code-keyword">$1</span>')
    // 高亮字符串
    .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="code-string">$1$2$3</span>')
    // 高亮标签
    .replace(/(<\/?[\w-]+)/g, '<span class="code-tag">$1</span>')

  // 最后转义 HTML
  return highlighted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 检测代码语言
 */
export const detectLanguage = (code: string): CodeLanguage => {
  // 检测 Vue：包含模板标签或 Vue 组件定义模式
  if (code.includes('<template>') || code.includes('<script') || code.includes('defineComponent') || code.includes('Vue.component')) {
    return 'vue'
  }
  // 检测 TypeScript：更具体的条件（interface/type 声明或类型注解）
  if (/interface\s+\w+|type\s+\w+\s*=|:\s*(string|number|boolean|any|void|null|undefined|never|object)\b/.test(code)) {
    return 'typescript'
  }
  // 检测 JSON：以 { 或 [ 开头
  if (code.trim().startsWith('{') || code.trim().startsWith('[')) {
    return 'json'
  }
  return 'html'
}

/**
 * 格式化代码用于显示
 */
export const formatCodeForDisplay = (code: string, language?: CodeLanguage): {
  formatted: string
  detectedLanguage: CodeLanguage
} => {
  const detected = language || detectLanguage(code)
  return {
    formatted: highlightCode(code, detected),
    detectedLanguage: detected
  }
}
