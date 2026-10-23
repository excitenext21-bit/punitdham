const { execSync } = require('child_process');
const path = require('path');

const pyScript = path.join(__dirname, 'build_zip.py');
execSync(`python "${pyScript}"`, { stdio: 'inherit' });
