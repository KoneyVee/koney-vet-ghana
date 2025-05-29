const { execSync } = require('child_process');

console.log('Running vercel-build script...');

try {
  // Install dependencies with --no-optional to avoid platform-specific issues
  console.log('Installing dependencies...');
  execSync('npm install --no-optional', { stdio: 'inherit' });
  
  // Run the build
  console.log('Running build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
