import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.AI_READINESS_QUEST_URL': JSON.stringify(env.AI_READINESS_QUEST_URL || "https://quest.hephae.co"),
        'process.env.TRAFFIC_FORECASTER_URL': JSON.stringify(env.TRAFFIC_FORECASTER_URL || "https://traffic-prediction.hephae.co"),
        'process.env.AETHERIA_AI_RESTAURANT_URL': JSON.stringify(env.AETHERIA_AI_RESTAURANT_URL || "https://aetheria.hephae.co"),
        'process.env.AI_PRODUCT_MOCKUP_URL': JSON.stringify(env.AI_PRODUCT_MOCKUP_URL || "https://aistudio.google.com/apps/bundled/product_mockup?showPreview=true&showAssistant=true"),
        'process.env.MARKETING_BUSINESS_AI_URL': JSON.stringify(env.MARKETING_BUSINESS_AI_URL || "https://chatgpt.com/g/g-Wud3tXQj3-marketing-business-ai")
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
