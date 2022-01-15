import { execSync } from 'child_process';

execSync('mv ./client/index.html ./', { stdio: 'inherit' });
execSync('vite build --outDir dist/client', { stdio: 'inherit' });
