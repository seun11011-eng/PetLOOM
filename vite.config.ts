import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';
// GitHub Pages project sites are served from /<repository-name>/. Set VITE_BASE_PATH to that path in the workflow.
export default defineConfig({plugins:[react()],base:process.env.VITE_BASE_PATH||'./'});
