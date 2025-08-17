import fs from 'fs';
import path from 'path';

const blogDir = '/home/zforb/NEXITAS to date/src/pages/blog';
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.astro'));

console.log('📊 FAQ Schema Status Check\n');

const needsSchema = [];
const hasSchemaArray = [];

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const hasFAQ = content.includes('FAQ') || content.includes('Frequently Asked Questions');
  const hasSchema = content.includes('FAQPage');
  
  if (hasFAQ && !hasSchema) {
    needsSchema.push(file);
  } else if (hasFAQ && hasSchema) {
    hasSchemaArray.push(file);
  }
});

console.log('✅ Articles WITH FAQ Schema (' + hasSchemaArray.length + '):');
hasSchemaArray.forEach(file => console.log('  ✓', file));

console.log('\n❌ Articles NEEDING FAQ Schema (' + needsSchema.length + '):');
needsSchema.forEach(file => console.log('  ✗', file));

console.log('\n📈 Summary:');
console.log('  Total articles with FAQs:', hasSchemaArray.length + needsSchema.length);
console.log('  Already have schema:', hasSchemaArray.length);
console.log('  Need schema added:', needsSchema.length);