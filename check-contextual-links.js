#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, 'src/pages/blog');
const articles = fs.readdirSync(blogDir).filter(file => file.endsWith('.astro'));

console.log('🔍 Checking Inter-Pillar Contextual Links...\n');

const missingLinks = [];

articles.forEach(article => {
  const filePath = path.join(blogDir, article);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Split content before Related Articles section to check only contextual links
  const beforeRelatedSection = content.split('<!-- Related Articles -->')[0] || content.split('Related Articles')[0] || content;
  const contextualLinks = (beforeRelatedSection.match(/href="\/blog\/[^"]+"/g) || []).filter(link => 
    !link.includes('#')
  );
  
  if (contextualLinks.length === 0) {
    missingLinks.push(article);
  } else {
    console.log(`✅ ${article}: ${contextualLinks.length} contextual links`);
  }
});

if (missingLinks.length > 0) {
  console.log('\n❌ Articles missing inter-pillar contextual links:');
  missingLinks.forEach(article => console.log(`   • ${article}`));
} else {
  console.log('\n🎉 All articles have inter-pillar contextual links!');
}