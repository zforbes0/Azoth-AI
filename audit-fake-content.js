#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BLOG_PAGES_DIR = './src/pages/blog';

// Patterns that indicate fake/fabricated content
const FAKE_CONTENT_PATTERNS = [
  // Fake citations and sources
  /\(Industry [^)]+\)/gi,
  /\(Market [^)]+\)/gi,
  /\(Implementation [^)]+\)/gi,
  /\(Software [^)]+\)/gi,
  /Source:\s*Industry [^\.]+/gi,
  /Source:\s*Market [^\.]+/gi,
  /Source:\s*Research [^\.]+/gi,
  /Source:\s*Study [^\.]+/gi,
  /\*Source: [^*]+\*/gi,
  
  // Fake quotes and attributions
  /—\s*(Industry [^"]+|Research [^"]+|Study [^"]+|Analysis [^"]+|Best Practices [^"]+)/gi,
  /According to industry [^,]+/gi,
  /Studies show that/gi,
  /Research indicates/gi,
  /Industry experts report/gi,
  /A recent study found/gi,
  
  // Vague statistical claims
  /significant (reduction|improvement|increase) in [^,]+/gi,
  /studies have shown/gi,
  /research demonstrates/gi,
  /industry research shows/gi,
  /according to recent data/gi,
  
  // Generic company names or fake case studies
  /GlobalTech Solutions/gi,
  /TechCorp Inc/gi,
  /Advanced Systems Ltd/gi,
  /Enterprise Solutions Group/gi,
  /Leading Fortune 500/gi,
  /Major Technology Company/gi,
  
  // Vague timeline or percentage claims without real sources
  /\d+% (improvement|reduction|increase) according to/gi,
  /within \d+ (weeks|months) of implementation/gi,
  /studies indicate that \d+%/gi,
];

// Keywords that suggest fabricated content
const SUSPICIOUS_PHRASES = [
  'industry best practices',
  'leading experts',
  'comprehensive study',
  'recent research',
  'market analysis shows',
  'according to studies',
  'industry trends analysis',
  'implementation comparative studies',
  'efficiency studies',
  'deployment patterns',
  'trend analysis',
  'market research',
];

console.log('🔍 Auditing blog content for fabricated information...\n');

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

// Analyze a file for fake content
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];
  
  // Check each line for patterns
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Check for fake content patterns
    FAKE_CONTENT_PATTERNS.forEach(pattern => {
      const matches = line.match(pattern);
      if (matches) {
        matches.forEach(match => {
          issues.push({
            type: 'FAKE_CITATION',
            line: lineNumber,
            content: match.trim(),
            context: line.trim()
          });
        });
      }
    });
    
    // Check for suspicious phrases
    SUSPICIOUS_PHRASES.forEach(phrase => {
      if (line.toLowerCase().includes(phrase.toLowerCase())) {
        issues.push({
          type: 'SUSPICIOUS_PHRASE',
          line: lineNumber,
          content: phrase,
          context: line.trim()
        });
      }
    });
  });
  
  return issues;
}

// Main execution
try {
  const astroFiles = getAllAstroFiles(BLOG_PAGES_DIR);
  let totalIssues = 0;
  let filesWithIssues = 0;
  
  console.log(`Found ${astroFiles.length} .astro files in blog directory\n`);
  console.log('=' .repeat(80));
  
  for (const filePath of astroFiles) {
    const relativePath = path.relative('.', filePath);
    const issues = analyzeFile(filePath);
    
    if (issues.length > 0) {
      filesWithIssues++;
      totalIssues += issues.length;
      
      console.log(`\n❌ ${relativePath}`);
      console.log(`   Found ${issues.length} potential fabricated content issues:`);
      
      issues.forEach((issue, index) => {
        console.log(`\n   ${index + 1}. [Line ${issue.line}] ${issue.type}`);
        console.log(`      Content: "${issue.content}"`);
        console.log(`      Context: ${issue.context.substring(0, 100)}${issue.context.length > 100 ? '...' : ''}`);
      });
      
      console.log('\n' + '-'.repeat(80));
    } else {
      console.log(`✅ ${relativePath} - No fabricated content detected`);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(80));
  console.log(`Files scanned: ${astroFiles.length}`);
  console.log(`Files with issues: ${filesWithIssues}`);
  console.log(`Total issues found: ${totalIssues}`);
  
  if (totalIssues > 0) {
    console.log('\n⚠️  IMMEDIATE ACTION REQUIRED');
    console.log('   The following types of content must be removed or replaced with real data:');
    console.log('   • Fake citations and sources');
    console.log('   • Fabricated quotes and attributions');
    console.log('   • Vague statistical claims without real sources');
    console.log('   • Generic/fake company names in case studies');
    console.log('   • Unsupported percentage claims');
    
    console.log('\n✅ RECOMMENDED ACTIONS:');
    console.log('   1. Remove all fake citations and sources');
    console.log('   2. Replace fabricated quotes with real client testimonials or remove them');
    console.log('   3. Use only verified statistics from real sources');
    console.log('   4. Replace fake case studies with real examples or generic scenarios');
    console.log('   5. Focus on factual, verifiable information');
  } else {
    console.log('\n✅ All files are clean - no fabricated content detected!');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}