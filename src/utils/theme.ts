import { ref, watch } from 'vue'

type ThemeMode = 'system' | 'light' | 'dark'

// 当前选择的主题模式，从 localStorage 读取或默认为 'system'
export const currentThemeMode = ref<ThemeMode>(
  (localStorage.getItem('theme-mode') as ThemeMode) || 'system'
)

// 实际应用的主题状态 (true 为暗色模式，false 为亮色模式)
export const isDarkApplied = ref(false)

let mediaQuery: MediaQueryList | undefined

const applyTheme = (mode: ThemeMode) => {
  if (mode === 'system') {
    if (!mediaQuery) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      // 确保只添加一次事件监听器
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    }
    isDarkApplied.value = mediaQuery.matches
  } else {
    if (mediaQuery) {
      // 如果之前是 'system' 模式，移除监听器
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
      mediaQuery = undefined // 重置 mediaQuery
    }
    isDarkApplied.value = mode === 'dark'
  }
  document.documentElement.classList.toggle('dark', isDarkApplied.value)
  localStorage.setItem('theme-mode', mode)
}

const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  // 只有在当前模式是 'system' 时才响应系统主题变化
  if (currentThemeMode.value === 'system') {
    isDarkApplied.value = e.matches
    document.documentElement.classList.toggle('dark', e.matches)
  }
}

// 初始化主题：在应用加载时根据 currentThemeMode 应用主题
export const initTheme = () => {
  applyTheme(currentThemeMode.value)

  // 监听 currentThemeMode 的变化，以便在用户切换时更新主题
  watch(currentThemeMode, (newMode) => {
    applyTheme(newMode)
  }, { immediate: false }) // immediate: false, 避免重复初始化
}

// 切换主题模式：system -> light -> dark -> system
export const toggleTheme = () => {
  const modes: ThemeMode[] = ['system', 'light', 'dark']
  const currentIndex = modes.indexOf(currentThemeMode.value)
  const nextIndex = (currentIndex + 1) % modes.length
  currentThemeMode.value = modes[nextIndex]
} 