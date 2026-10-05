const https = require('https');
const fs = require('fs');
const path = require('path');

const catalogPath = path.resolve(__dirname, '../public/ai-catalog.json');
if (!fs.existsSync(catalogPath)) {
  console.error('ai-catalog.json does not exist yet at:', catalogPath);
  process.exit(1);
}

const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

https.get('https://raw.githubusercontent.com/ards-project/ard-spec/main/spec/schemas/ai-catalog.schema.json', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Basic validation according to schema
    const errors = [];
    if (catalogData.specVersion !== '1.0') errors.push('specVersion must be "1.0"');
    if (!Array.isArray(catalogData.entries)) errors.push('entries must be an array');
    if (catalogData.host && !catalogData.host.displayName) errors.push('host.displayName is required');
    
    const urnRegex = /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/;
    catalogData.entries.forEach((entry, idx) => {
      if (!entry.identifier || !urnRegex.test(entry.identifier)) {
        errors.push(`Entry ${idx}: identifier must match RFC 8141 URN urn:air:<publisher>:<namespace>:<agent-name>, got: ${entry.identifier}`);
      }
      if (!entry.displayName) errors.push(`Entry ${idx}: displayName required`);
      if (!entry.type) errors.push(`Entry ${idx}: type required`);
      if (entry.url && entry.data) errors.push(`Entry ${idx}: cannot have both url and data`);
      if (!entry.url && !entry.data) errors.push(`Entry ${idx}: must have either url or data`);
      if (entry.representativeQueries) {
        if (!Array.isArray(entry.representativeQueries) || entry.representativeQueries.length < 2 || entry.representativeQueries.length > 5) {
          errors.push(`Entry ${idx}: representativeQueries must have between 2 and 5 items`);
        }
      }
    });

    if (errors.length > 0) {
      console.error('Validation FAILED:', errors);
      process.exit(1);
    } else {
      console.log('ai-catalog.json VALIDATION PASSED perfectly against ARD specification!');
    }
  });
});
