import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:8000,
    proxy: {
      "/api":  {
        target:"http://localhost:8000",
        changeOrigin:true,
        rewrite:(path)=> path.replace(/^\api/, "/api")
      
      }
    },
  },
  plugins: [react()],
});

// export default defineConfig({
//   server:{
//     proxy:{
//       '/api':{
//         target:'http://localhost:8000',
//         secure:false
//       }
//     }
//   },
//   plugins: [react()],
// })
