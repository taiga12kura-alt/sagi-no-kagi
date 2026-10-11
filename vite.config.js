import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages ではリポジトリ名のサブパスで配信されるため、
// base を "/<リポジトリ名>/" に設定する。
// ローカル開発時 (vite / vite preview) はルートパスのままにする。
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/sagi-no-kagi/' : '/',
}))
