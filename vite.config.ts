import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), 'VITE_');



// https://vite.dev/config/
export default defineConfig({
  build:{
     rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            // vendor chunk for node_modules deps
            return 'vendor';
          }
          if (id.includes('/src/components/')) {
            // Chunk for heavy components
            return 'components';
          }
          return null; // Automatic chunk
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Chunk limit
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss()
  ],
  resolve:{
    alias:{
      "@": path.resolve(__dirname,"./src")
    }
  },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_URL,
        changeOrigin: true,
      }
    }
  }
})
