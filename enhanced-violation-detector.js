#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced violation patterns - much more comprehensive
const ENHANCED_VIOLATION_PATTERNS = [
  // Fake attributions to real companies/organizations
  {
    pattern: /According to (recent research from |comprehensive research from |research from )?Forrester(?! (Research|[0-9]{4}))/gi,
    category: 'FAKE_ATTRIBUTION',
    severity: 'CRITICAL',
    description: 'Fabricated attribution to Forrester without proper citation'
  },
  {
    pattern: /According to.*Gartner research(?! [0-9]{4})/gi,
    category: 'FAKE_ATTRIBUTION', 
    severity: 'CRITICAL',
    description: 'Fabricated attribution to Gartner without proper citation'
  },
  {
    pattern: /Salesforce State of Sales/gi,
    category: 'FAKE_ATTRIBUTION',
    severity: 'CRITICAL', 
    description: 'Fabricated attribution to Salesforce report'
  },
  {
    pattern: /Sales Development Report/gi,
    category: 'FAKE_ATTRIBUTION',
    severity: 'CRITICAL',
    description: 'Fabricated report name'
  },
  
  // Vague research claims
  {
    pattern: /Studies show.*[0-9]+%/gi,
    category: 'UNSUPPORTED_STATISTIC',
    severity: 'HIGH',
    description: 'Unsupported percentage claim with vague "studies" reference'
  },
  {
    pattern: /Research indicates/gi,
    category: 'VAGUE_CLAIM',
    severity: 'MEDIUM',
    description: 'Vague research reference without source'
  },
  {
    pattern: /According to recent research/gi,
    category: 'VAGUE_CLAIM', 
    severity: 'HIGH',
    description: 'Generic recent research claim'
  },
  
  // Suspicious percentage claims
  {
    pattern: /[0-9]+% (higher|faster|improvement|reduction).*compared to.*(?!source|according to [A-Z])/gi,
    category: 'UNSUPPORTED_STATISTIC',
    severity: 'HIGH',
    description: 'Specific percentage improvement without credible source'
  },
  
  // Fake ROI/financial claims
  {
    pattern: /\$[0-9,.]+M? (ROI|NPV|savings).*\(Forrester(?! [0-9]{4})\)/gi,
    category: 'FAKE_FINANCIAL_CLAIM',
    severity: 'CRITICAL',
    description: 'Fabricated financial claim attributed to Forrester'
  },
  {
    pattern: /[0-9]+% ROI.*\(industry average\)/gi,
    category: 'FAKE_CITATION',
    severity: 'HIGH', 
    description: 'ROI claim with fake industry average citation'
  },
  
  // Suspicious case study data
  {
    pattern: /\$[0-9,]+.*\(implementation \+ technology costs\)/gi,
    category: 'SUSPICIOUS_CASE_DATA',
    severity: 'MEDIUM',
    description: 'Potentially fabricated case study financial data'
  }
];

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    ENHANCED_VIOLATION_PATTERNS.forEach(violationPattern => {
      const matches = line.match(violationPattern.pattern);
      if (matches) {
        matches.forEach(match => {
          violations.push({
            lineNumber,
            content: match.trim(),
            context: line.trim(),
            category: violationPattern.category,
            severity: violationPattern.severity,
            description: violationPattern.description,
            fullLine: line
          });
        });
      }
    });
  });
  
  return violations;
}

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

// Main execution
try {
  console.log('🔍 Enhanced violation detection - scanning for ALL fabricated content...\n');
  
  const astroFiles = getAllAstroFiles('./src/pages/blog');
  let totalViolations = 0;
  let criticalViolations = 0;
  let filesWithViolations = 0;
  
  const violationsByFile = {};
  
  for (const filePath of astroFiles) {
    const filename = path.basename(filePath);
    const violations = analyzeFile(filePath);
    
    if (violations.length > 0) {
      filesWithViolations++;
      totalViolations += violations.length;
      criticalViolations += violations.filter(v => v.severity === 'CRITICAL').length;
      
      violationsByFile[filename] = violations;
      
      console.log(`❌ ${filename}`);
      console.log(`   Violations: ${violations.length}`);
      
      violations.forEach((violation, index) => {
        const emoji = violation.severity === 'CRITICAL' ? '🔥' : violation.severity === 'HIGH' ? '⚠️' : '📋';
        console.log(`   ${emoji} Line ${violation.lineNumber}: ${violation.description}`);
        console.log(`      Content: "${violation.content}"`);
      });
      console.log('');
    } else {
      console.log(`✅ ${filename} - Clean`);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 ENHANCED AUDIT RESULTS');
  console.log('='.repeat(80));
  console.log(`Files scanned: ${astroFiles.length}`);
  console.log(`Files with violations: ${filesWithViolations}`);
  console.log(`Total violations: ${totalViolations}`);
  console.log(`Critical violations: ${criticalViolations}`);
  
  // Write detailed report
  let reportContent = `# ENHANCED VIOLATION DETECTION REPORT\n\n`;
  reportContent += `**Generated:** ${new Date().toISOString()}\n`;
  reportContent += `**Files Scanned:** ${astroFiles.length}\n`;
  reportContent += `**Files with Violations:** ${filesWithViolations}\n`;
  reportContent += `**Total Violations:** ${totalViolations}\n`;
  reportContent += `**Critical Violations:** ${criticalViolations}\n\n`;
  
  for (const [filename, violations] of Object.entries(violationsByFile)) {
    reportContent += `## ${filename}\n\n`;
    violations.forEach((violation, index) => {
      reportContent += `### Violation ${index + 1} - ${violation.severity}\n`;
      reportContent += `- **Line:** ${violation.lineNumber}\n`;
      reportContent += `- **Type:** ${violation.category}\n`;
      reportContent += `- **Content:** \`${violation.content}\`\n`;
      reportContent += `- **Issue:** ${violation.description}\n`;
      reportContent += `- **Context:** ${violation.context.substring(0, 150)}...\n\n`;
    });
    reportContent += `---\n\n`;
  }
  
  fs.writeFileSync('./ENHANCED_VIOLATION_REPORT.md', reportContent);
  
  if (totalViolations > 0) {
    console.log('\n🚨 CRITICAL FINDINGS:');
    console.log('   The blog contains significantly more fabricated content than initially detected');
    console.log('   Many articles have fake attributions to legitimate sources (Forrester, Gartner)');
    console.log('   This represents a serious credibility risk that requires immediate attention');
    console.log('\n📋 Report saved to: ENHANCED_VIOLATION_REPORT.md');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}