import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        // Typechecking in development mode
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
        // Linting in production mode
        ...(mode === 'production' && {
          eslint: {
            lintCommand:
                'eslint "./src/**/*.{ts,tsx}"' +
                ' --report-unused-disable-directives' +
                ' --max-warnings 0',
          },
        }),
      }),
    ],

  };
});
