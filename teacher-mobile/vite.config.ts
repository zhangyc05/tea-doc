import { defineConfig } from 'vite'
import uniModule from '@dcloudio/vite-plugin-uni'

const uni = 'default' in uniModule ? uniModule.default : uniModule

export default defineConfig({
  plugins: [uni()],
})
