// express-plugin.js
import { spawn } from 'child_process';

export default function expressPlugin() {
  return {
    name: 'express-plugin',
    configureServer(server) {
      server.httpServer.on('listening', () => {
        const child = spawn('node', ['server.js'], {
          stdio: 'inherit',
          shell: true
        });
        child.on('close', () => {
          server.close();
        });
      });
    }
  };
}
