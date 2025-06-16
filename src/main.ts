import { createApp } from 'vue'
import './style.css'
import './styles/theme.css'
import App from './App.vue'
import { initTheme } from './utils/theme'

// 初始化主题
initTheme()

createApp(App).mount('#app')
