#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BLOG_PAGES_DIR = './src/pages/blog';
const DRY_RUN = false; // Set to true to see what would be changed without making changes

console.log('🔧 Removing WireframeBackground components from blog pages...\n');

// Get all .astro files in the blog directory
function getAllAstroFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllAstroFiles(fullPath));
    } else if (item.endsWith('.astro')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Process a single file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let newContent = content;
  
  // 1. Remove WireframeBackground import
  const importRegex = /import\s+WireframeBackground\s+from\s+['"][^'"]*WireframeBackground\.astro['"];\s*\n?/g;
  if (importRegex.test(content)) {
    newContent = newContent.replace(importRegex, '');
    modified = true;
    console.log(`  ✓ Removed WireframeBackground import`);
  }
  
  // 2. Remove <WireframeBackground /> component usage
  const componentRegex = /<WireframeBackground\s*\/>\s*\n?/g;
  if (componentRegex.test(newContent)) {
    newContent = newContent.replace(componentRegex, '');
    modified = true;
    console.log(`  ✓ Removed <WireframeBackground /> component usage`);
  }
  
  // 3. Remove multiline WireframeBackground component usage
  const multilineRegex = /<WireframeBackground[^>]*>\s*<\/WireframeBackground>\s*\n?/g;
  if (multilineRegex.test(newContent)) {
    newContent = newContent.replace(multilineRegex, '');
    modified = true;
    console.log(`  ✓ Removed multiline <WireframeBackground> component`);
  }
  
  // 4. Clean up any double newlines left behind
  newContent = newContent.replace(/\n\n\n+/g, '\n\n');
  
  if (modified) {
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent);
      console.log(`  💾 File updated\n`);
    } else {
      console.log(`  🔍 Would update file (DRY RUN)\n`);
    }
    return true;
  }
  
  return false;
}

// Main execution
try {
  const astroFiles = getAllAstroFiles(BLOG_PAGES_DIR);
  let totalModified = 0;
  
  console.log(`Found ${astroFiles.length} .astro files in blog directory\n`);
  
  for (const filePath of astroFiles) {
    const relativePath = path.relative('.', filePath);
    console.log(`📄 Processing: ${relativePath}`);
    
    if (processFile(filePath)) {
      totalModified++;
    } else {
      console.log(`  ➡️  No WireframeBackground components found\n`);
    }
  }
  
  console.log('=' .repeat(50));
  console.log(`✅ Processing complete!`);
  console.log(`📊 Files processed: ${astroFiles.length}`);
  console.log(`🔧 Files modified: ${totalModified}`);
  
  if (DRY_RUN) {
    console.log(`\n⚠️  DRY RUN MODE - No files were actually changed`);
    console.log(`   Set DRY_RUN = false to apply changes`);
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}