import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function spa404Fallback() {
  let outDir = 'dist'

  return {
    name: 'spa-404-fallback',
    configResolved(resolvedConfig: any) {
      outDir = resolvedConfig.build.outDir || 'dist'
    },
    closeBundle() {
      const indexPath = path.resolve(__dirname, outDir, 'index.html')
      const fallbackPath = path.resolve(__dirname, outDir, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath)
      }
    },
  }
}

export default defineConfig({
  // IMPORTANT FOR GITHUB PAGES
  base: '/happyunicorn/',
  build: {
    outDir: 'docs',
  },

  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
    spa404Fallback(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
})