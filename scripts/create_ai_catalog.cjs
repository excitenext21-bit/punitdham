const fs = require('fs');
const path = require('path');

const catalog = {
  specVersion: "1.0",
  host: {
    displayName: "Punitdhan Pulses Limited",
    identifier: "did:web:punitdhan.com",
    documentationUrl: "https://punitdhan.com/products-specs",
    logoUrl: "https://punitdhan.com/favicon-512x512.png"
  },
  entries: [
    {
      identifier: "urn:air:punitdhan.com:procurement:inquiry-api",
      displayName: "Punitdhan Pulse Procurement & Inquiry API",
      type: "application/json",
      url: "https://punitdhan.com/api/send-inquiry",
      description: "Official wholesale procurement and inquiry endpoint for unpolished Chana Dal, Toor Dal, and institutional pulse supply.",
      tags: ["pulses", "chana-dal", "toor-dal", "wholesale", "agriculture", "export"],
      capabilities: ["ProcurementInquiry", "BulkPricingRequest", "InstitutionalSupply"],
      representativeQueries: [
        "Procure bulk Chana Dal from Punitdhan Pulses Limited",
        "Request wholesale quote for Toor Dal and split pulses",
        "Submit pulse supply inquiry to Punitdhan"
      ],
      version: "1.0.0",
      updatedAt: "2026-10-05T12:00:00Z"
    },
    {
      identifier: "urn:air:punitdhan.com:catalog:products-specs",
      displayName: "Punitdhan Products Technical Specifications",
      type: "application/json",
      url: "https://punitdhan.com/products-specs",
      description: "Technical product specifications including purity, moisture parameters, sorting grades, and packaging sizes for agricultural pulses.",
      tags: ["specifications", "food-safety", "fssai", "iso-9001", "haccp"],
      capabilities: ["ProductSpecifications", "ComplianceVerification", "MillingCapacityInfo"],
      representativeQueries: [
        "Specifications of unpolished Chana Dal and Toor Dal",
        "Punitdhan daily milling capacity and food safety certifications",
        "FSSAI and HACCP standards for Punitdhan pulses"
      ],
      version: "1.0.0",
      updatedAt: "2026-10-05T12:00:00Z"
    }
  ]
};

const jsonStr = JSON.stringify(catalog, null, 2);

// 1. Write to public/ai-catalog.json
const rootPath = path.resolve(__dirname, '../public/ai-catalog.json');
fs.writeFileSync(rootPath, jsonStr, 'utf8');
console.log('Created public/ai-catalog.json');

// 2. Write to public/.well-known/ai-catalog.json
const wellKnownDir = path.resolve(__dirname, '../public/.well-known');
if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir, { recursive: true });
}
fs.writeFileSync(path.join(wellKnownDir, 'ai-catalog.json'), jsonStr, 'utf8');
console.log('Created public/.well-known/ai-catalog.json');
