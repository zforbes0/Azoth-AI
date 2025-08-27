#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BLOG_PAGES_DIR = './src/pages/blog';
const OUTPUT_FILE = './FAKE_CONTENT_VIOLATIONS_CATALOG.md';

console.log('📋 Creating comprehensive fake content violations catalog...\n');

// Violation patterns with categorization and replacement guidance
const VIOLATION_PATTERNS = [
  {
    pattern: /\(Industry [^)]+\)/gi,
    category: 'FAKE_CITATION',
    severity: 'HIGH',
    description: 'Generic industry study reference without specific source',
    replacementGuidance: 'Find specific research from named organizations (McKinsey, Deloitte, Forrester, etc.)'
  },
  {
    pattern: /\(Market [^)]+\)/gi,
    category: 'FAKE_CITATION', 
    severity: 'HIGH',
    description: 'Vague market analysis citation',
    replacementGuidance: 'Use specific market research from Gartner, IDC, Statista, or IBISWorld'
  },
  {
    pattern: /Source:\s*Industry [^\.]+/gi,
    category: 'FAKE_SOURCE',
    severity: 'CRITICAL',
    description: 'Fabricated industry source attribution',
    replacementGuidance: 'Replace with verifiable sources or remove entirely'
  },
  {
    pattern: /—\s*(Industry [^"]+|Research [^"]+|Study [^"]+|Analysis [^"]+|Best Practices [^"]+)/gi,
    category: 'FAKE_QUOTE',
    severity: 'CRITICAL', 
    description: 'Fabricated quote attribution',
    replacementGuidance: 'Use real client testimonials or industry expert quotes with permission'
  },
  {
    pattern: /According to industry [^,]+/gi,
    category: 'VAGUE_CLAIM',
    severity: 'MEDIUM',
    description: 'Unsupported industry claim',
    replacementGuidance: 'Cite specific industry reports or surveys'
  },
  {
    pattern: /Studies show that/gi,
    category: 'VAGUE_CLAIM',
    severity: 'MEDIUM', 
    description: 'Generic study reference',
    replacementGuidance: 'Name the specific study, organization, and date'
  },
  {
    pattern: /\d+% (improvement|reduction|increase) according to/gi,
    category: 'FAKE_STATISTIC',
    severity: 'HIGH',
    description: 'Unsupported percentage claim',
    replacementGuidance: 'Find real statistics from industry benchmarking reports'
  }
];

// Research topics for each article type
const RESEARCH_TOPICS_BY_CATEGORY = {
  'automation': [
    'Business Process Automation market size and growth (Forrester, McKinsey)',
    'ROI statistics for automation implementations (Deloitte, PwC surveys)', 
    'Time savings from automation (case studies from major consulting firms)',
    'Adoption rates of intelligent automation (Gartner, IDC reports)',
    'Cost reduction metrics from automation projects (academic studies)'
  ],
  'ai-chatbots': [
    'Chatbot market size and projections (Grand View Research, Allied Market Research)',
    'Customer satisfaction improvements with AI chatbots (Zendesk, Intercom studies)',
    'Cost savings from chatbot implementations (IBM, Microsoft case studies)',
    'First contact resolution rates with AI (customer service benchmarking reports)',
    'Employee productivity gains from chatbot assistance (workplace automation studies)'
  ],
  'api-integration': [
    'API economy market size (Postman State of APIs report)',
    'Integration project success rates (MuleSoft connectivity benchmarks)',
    'Time-to-market improvements with APIs (developer productivity studies)',
    'Cost of manual vs automated integrations (systems integration benchmarks)',
    'API adoption trends by industry (developer surveys, tech adoption reports)'
  ],
  'document-management': [
    'Document management market growth (Technavio, Research and Markets)',
    'Productivity gains from AI document processing (AIIM studies)',
    'Error reduction rates with automated document classification (academic research)',
    'Compliance cost savings with digital document management (regulatory studies)',
    'Search time reduction with intelligent document systems (enterprise case studies)'
  ]
};

// Get article category based on filename
function getArticleCategory(filename) {
  if (filename.includes('chatbot') || filename.includes('ai-customer')) return 'ai-chatbots';
  if (filename.includes('api-integration') || filename.includes('process-automation')) return 'api-integration';
  if (filename.includes('document') || filename.includes('knowledge-base')) return 'document-management';
  return 'automation';
}

// Get all .astro files
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

// Analyze file for violations
function analyzeFileViolations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    VIOLATION_PATTERNS.forEach(violationPattern => {
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
            replacementGuidance: violationPattern.replacementGuidance,
            fullLine: line
          });
        });
      }
    });
  });
  
  return violations;
}

// Generate research suggestions
function generateResearchSuggestions(filename) {
  const category = getArticleCategory(filename);
  return RESEARCH_TOPICS_BY_CATEGORY[category] || RESEARCH_TOPICS_BY_CATEGORY['automation'];
}

// Main execution
try {
  const astroFiles = getAllAstroFiles(BLOG_PAGES_DIR);
  let catalogContent = '';
  
  // Header
  catalogContent += `# FAKE CONTENT VIOLATIONS CATALOG\n`;
  catalogContent += `**Generated:** ${new Date().toISOString()}\n`;
  catalogContent += `**Files Scanned:** ${astroFiles.length}\n\n`;
  catalogContent += `---\n\n`;
  
  catalogContent += `## EXECUTIVE SUMMARY\n\n`;
  catalogContent += `This catalog identifies fabricated content violations across the blog that require immediate remediation. Each violation includes:\n\n`;
  catalogContent += `- **Context:** Where the violation appears\n`;
  catalogContent += `- **Severity:** Impact level (CRITICAL/HIGH/MEDIUM)\n`;
  catalogContent += `- **Replacement Strategy:** How to fix it properly\n`;
  catalogContent += `- **Research Topics:** 4-5 legitimate data sources to investigate\n\n`;
  catalogContent += `---\n\n`;
  
  let totalViolations = 0;
  let criticalViolations = 0;
  let filesWithViolations = 0;
  
  for (const filePath of astroFiles) {
    const filename = path.basename(filePath);
    const relativePath = path.relative('.', filePath);
    const violations = analyzeFileViolations(filePath);
    
    if (violations.length > 0) {
      filesWithViolations++;
      totalViolations += violations.length;
      criticalViolations += violations.filter(v => v.severity === 'CRITICAL').length;
      
      catalogContent += `## 🚨 ${filename}\n`;
      catalogContent += `**File:** \`${relativePath}\`\n`;
      catalogContent += `**Violations:** ${violations.length}\n`;
      catalogContent += `**Critical:** ${violations.filter(v => v.severity === 'CRITICAL').length}\n\n`;
      
      // Group violations by severity
      const critical = violations.filter(v => v.severity === 'CRITICAL');
      const high = violations.filter(v => v.severity === 'HIGH');
      const medium = violations.filter(v => v.severity === 'MEDIUM');
      
      [
        { level: 'CRITICAL', items: critical, emoji: '🔥' },
        { level: 'HIGH', items: high, emoji: '⚠️' },
        { level: 'MEDIUM', items: medium, emoji: '📋' }
      ].forEach(group => {
        if (group.items.length > 0) {
          catalogContent += `### ${group.emoji} ${group.level} SEVERITY (${group.items.length} violations)\n\n`;
          
          group.items.forEach((violation, index) => {
            catalogContent += `#### Violation ${index + 1}\n`;
            catalogContent += `- **Line:** ${violation.lineNumber}\n`;
            catalogContent += `- **Type:** ${violation.category}\n`;
            catalogContent += `- **Content:** \`${violation.content}\`\n`;
            catalogContent += `- **Context:** ${violation.context.substring(0, 120)}${violation.context.length > 120 ? '...' : ''}\n`;
            catalogContent += `- **Issue:** ${violation.description}\n`;
            catalogContent += `- **Fix Strategy:** ${violation.replacementGuidance}\n\n`;
          });
        }
      });
      
      // Research suggestions
      catalogContent += `### 📚 REQUIRED RESEARCH FOR REPLACEMENT DATA\n\n`;
      catalogContent += `To properly remediate this article, research the following legitimate sources:\n\n`;
      
      const researchTopics = generateResearchSuggestions(filename);
      researchTopics.forEach((topic, index) => {
        catalogContent += `${index + 1}. **${topic}**\n`;
      });
      
      catalogContent += `\n### 🔧 REMEDIATION CHECKLIST\n\n`;
      catalogContent += `- [ ] Research and verify 4-5 legitimate statistics from the sources above\n`;
      catalogContent += `- [ ] Remove all fabricated citations and quotes\n`;
      catalogContent += `- [ ] Replace removed content with factual information to maintain flow\n`;
      catalogContent += `- [ ] Ensure content transitions remain smooth after changes\n`;
      catalogContent += `- [ ] Add proper attribution for all new data sources\n`;
      catalogContent += `- [ ] Verify all claims are supportable and accurate\n\n`;
      
      catalogContent += `---\n\n`;
    }
  }
  
  // Summary
  catalogContent += `## 📊 VIOLATIONS SUMMARY\n\n`;
  catalogContent += `| Metric | Count |\n`;
  catalogContent += `|--------|-------|\n`;
  catalogContent += `| Files Scanned | ${astroFiles.length} |\n`;
  catalogContent += `| Files with Violations | ${filesWithViolations} |\n`;
  catalogContent += `| Total Violations | ${totalViolations} |\n`;
  catalogContent += `| Critical Violations | ${criticalViolations} |\n\n`;
  
  catalogContent += `## 🎯 IMMEDIATE ACTION PLAN\n\n`;
  catalogContent += `### Phase 1: Critical Violations (Complete within 48 hours)\n`;
  catalogContent += `- Remove all fabricated quotes and fake source attributions\n`;
  catalogContent += `- Research replacement statistics for the worst offending articles\n`;
  catalogContent += `- Ensure no content claims are unsupportable\n\n`;
  
  catalogContent += `### Phase 2: High Priority (Complete within 1 week)\n`;
  catalogContent += `- Replace vague statistical claims with verified data\n`;
  catalogContent += `- Add proper source attribution for all claims\n`;
  catalogContent += `- Rewrite content flow to accommodate changes\n\n`;
  
  catalogContent += `### Phase 3: Content Quality (Complete within 2 weeks)\n`;
  catalogContent += `- Add 4-5 legitimate statistics to each remediated article\n`;
  catalogContent += `- Implement content review process to prevent future violations\n`;
  catalogContent += `- Create source verification checklist for future content\n\n`;
  
  catalogContent += `## 📋 CONTENT REVIEW PROCESS\n\n`;
  catalogContent += `To prevent future violations:\n\n`;
  catalogContent += `1. **Source Requirement:** All statistics must have named, verifiable sources\n`;
  catalogContent += `2. **Quote Verification:** All quotes must be from real people with permission\n`;
  catalogContent += `3. **Fact Checking:** Claims must be supportable with evidence\n`;
  catalogContent += `4. **Attribution Standards:** Use proper citation format for all sources\n`;
  catalogContent += `5. **Regular Audits:** Run violation detection quarterly\n\n`;
  
  // Write catalog file
  fs.writeFileSync(OUTPUT_FILE, catalogContent);
  
  console.log('✅ Comprehensive catalog created successfully!');
  console.log(`📄 Output file: ${OUTPUT_FILE}`);
  console.log(`📊 Summary:`);
  console.log(`   - Files with violations: ${filesWithViolations}/${astroFiles.length}`);
  console.log(`   - Total violations: ${totalViolations}`);
  console.log(`   - Critical violations: ${criticalViolations}`);
  console.log(`\n🎯 Next steps:`);
  console.log(`   1. Review the catalog file for detailed violation analysis`);
  console.log(`   2. Begin research on the suggested legitimate data sources`);
  console.log(`   3. Start with CRITICAL violations first`);
  console.log(`   4. Use the remediation checklists for each article`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}