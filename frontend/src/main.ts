import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './styles/main.css'
import './styles/ability-list-base-overrides.css'
import './styles/admin-asset-usage.css'

createApp(App).use(router).mount('#app')