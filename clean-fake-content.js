#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TARGET_FILE = './src/pages/blog/custom-automation-web-apps.astro';
const DRY_RUN = false; // Set to true to preview changes without applying them

console.log('🧹 Cleaning fabricated content from custom-automation-web-apps.astro...\n');

function cleanFakeContent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changesMade = 0;
  
  console.log('📋 Changes being made:');
  
  // 1. Remove fake citation sources
  const fakeCitations = [
    '<span class="text-gray-400 text-xs">(Industry efficiency studies)</span>',
    '<span class="text-gray-400 text-xs">(Market trend analysis)</span>',
    '<span class="text-gray-400 text-xs">(Implementation comparative studies)</span>',
    '<span class="text-gray-400 text-xs">(Software development market research)</span>',
    '<p class="text-gray-400 text-xs mt-1">Source: Industry trend analysis</p>',
    '<p class="text-gray-400 text-xs mt-1">Source: Industry trends analysis</p>',
    '<p class="text-gray-400 text-xs mt-1">Source: Industry deployment patterns</p>',
  ];
  
  fakeCitations.forEach(citation => {
    if (content.includes(citation)) {
      content = content.replace(citation, '');
      changesMade++;
      console.log(`  ✓ Removed fake citation: ${citation.substring(0, 50)}...`);
    }
  });
  
  // 2. Remove fake quote and attribution
  const fakeQuote = `      <!-- Benefit Highlight -->
      <blockquote class="border-l-4 border-primary pl-6 py-4 my-6 bg-primary/5 rounded-r-lg">
        <p class="text-lg text-white italic">"Custom solutions eliminate awkward workarounds and compromises, ensuring technology serves the business"</p>
        <cite class="text-primary text-sm">— Industry Best Practices in Custom Development</cite>
      </blockquote>`;
  
  if (content.includes(fakeQuote)) {
    content = content.replace(fakeQuote, '');
    changesMade++;
    console.log(`  ✓ Removed fabricated quote and attribution`);
  }
  
  // 3. Remove vague statistics boxes
  const vagueStat1 = `      <!-- Automation Adoption Trend -->
      <div class="bg-primary/10 border border-primary/30 p-4 rounded-lg my-6 inline-block">
        <span class="text-2xl font-orbitron font-bold text-primary">Rising</span>
        <span class="text-white ml-2">adoption of intelligent automation across industries</span>
        <p class="text-gray-400 text-xs mt-1">Source: Industry trend analysis</p>
      </div>`;
  
  const vagueStat2 = `      <!-- Market Growth Callout -->
      <div class="bg-primary/10 border border-primary/30 p-4 rounded-lg my-6 inline-block">
        <span class="text-2xl font-orbitron font-bold text-primary">Growing</span>
        <span class="text-white ml-2">demand for custom software solutions</span>
        <p class="text-gray-400 text-xs mt-1">Source: Industry trends analysis</p>
      </div>`;
  
  const vagueStat3 = `      <!-- Cloud Adoption Stat -->
      <div class="bg-primary/10 border border-primary/30 p-4 rounded-lg my-6 inline-block">
        <span class="text-2xl font-orbitron font-bold text-primary">Majority</span>
        <span class="text-white ml-2">of deployments now use cloud platforms</span>
        <p class="text-gray-400 text-xs mt-1">Source: Industry deployment patterns</p>
      </div>`;
  
  [vagueStat1, vagueStat2, vagueStat3].forEach((stat, index) => {
    if (content.includes(stat)) {
      content = content.replace(stat, '');
      changesMade++;
      console.log(`  ✓ Removed vague statistic box ${index + 1}`);
    }
  });
  
  // 4. Clean up the Key Market Insights section
  const fakeInsights = `        <div class="p-6 rounded-lg my-8 glass-morphism">
        <h2 class="text-xl font-orbitron text-primary">Key Market Insights</h2>
        <ul class="list-disc list-inside text-white">
          <li>Automation significantly reduces time spent on manual tasks, saving substantial hours annually <span class="text-gray-400 text-xs">(Industry efficiency studies)</span></li>
          <li>Organizations are increasingly adopting intelligent automation solutions across industries, driven by competitive pressures and efficiency demands <span class="text-gray-400 text-xs">(Market trend analysis)</span></li>
          <li>Custom solutions typically deliver superior integration compared to off-the-shelf alternatives <span class="text-gray-400 text-xs">(Implementation comparative studies)</span></li>
          <li>Enterprise organizations represent the largest segment in custom software development <span class="text-gray-400 text-xs">(Software development market research)</span></li>
        </ul>
      </div>`;
  
  if (content.includes(fakeInsights)) {
    // Replace with factual, unsourced statements
    const realInsights = `        <div class="p-6 rounded-lg my-8 glass-morphism">
        <h2 class="text-xl font-orbitron text-primary">Key Benefits</h2>
        <ul class="list-disc list-inside text-white">
          <li>Automation reduces time spent on repetitive manual tasks</li>
          <li>Custom solutions integrate more seamlessly with existing business processes</li>
          <li>Tailored applications can scale and adapt to changing business requirements</li>
          <li>Organizations gain better control over their technology stack and workflows</li>
        </ul>
      </div>`;
    
    content = content.replace(fakeInsights, realInsights);
    changesMade++;
    console.log(`  ✓ Replaced fake market insights with factual statements`);
  }
  
  // 5. Clean up remaining empty lines and formatting
  content = content.replace(/\n\n\n+/g, '\n\n');
  content = content.replace(/[ \t]+\n/g, '\n');
  
  return { content, changesMade };
}

// Main execution
try {
  if (!fs.existsSync(TARGET_FILE)) {
    console.error(`❌ File not found: ${TARGET_FILE}`);
    process.exit(1);
  }
  
  const result = cleanFakeContent(TARGET_FILE);
  
  console.log(`\n📊 Summary:`);
  console.log(`   Changes made: ${result.changesMade}`);
  
  if (result.changesMade > 0) {
    if (!DRY_RUN) {
      fs.writeFileSync(TARGET_FILE, result.content);
      console.log(`   ✅ File updated successfully`);
    } else {
      console.log(`   🔍 DRY RUN - No changes applied`);
    }
  } else {
    console.log(`   ℹ️  No fabricated content found to remove`);
  }
  
  console.log(`\n🎯 Next steps:`);
  console.log(`   1. Review the cleaned file to ensure content still flows well`);
  console.log(`   2. Add real statistics from verified sources if needed`);
  console.log(`   3. Consider adding genuine client testimonials or case studies`);
  console.log(`   4. Run the audit script again to verify all fake content is removed`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}