#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🔍 COMPREHENSIVE SEO AUDIT - FINAL RESULTS\n');
console.log('=' .repeat(60));

const blogDir = path.join(__dirname, 'src/pages/blog');
const articles = fs.readdirSync(blogDir).filter(file => file.endsWith('.astro'));

let totalArticles = articles.length;
let faqSchemaCount = 0;
let relatedArticlesCount = 0;
let interPillarLinksCount = 0;
let totalInterPillarLinks = 0;

console.log(`📊 Total Blog Articles: ${totalArticles}\n`);

// Check each article for optimizations
articles.forEach(article => {
  const filePath = path.join(blogDir, article);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check FAQ Schema
  const hasFAQSchema = content.includes('"@type": "FAQPage"');
  if (hasFAQSchema) faqSchemaCount++;
  
  // Check Related Articles
  const hasRelatedArticles = content.includes('Related Articles');
  if (hasRelatedArticles) relatedArticlesCount++;
  
  // Count inter-pillar contextual links (excluding Related Articles sections)
  const beforeRelatedSection = content.split('<!-- Related Articles -->')[0] || content.split('Related Articles')[0] || content;
  const contextualLinks = (beforeRelatedSection.match(/href="\/blog\/[^"]+"/g) || []).filter(link => 
    !link.includes('#')
  );
  
  if (contextualLinks.length > 0) {
    interPillarLinksCount++;
    totalInterPillarLinks += contextualLinks.length;
  }
});

// Check Footer component
const footerPath = path.join(__dirname, 'src/components/Footer.astro');
const footerContent = fs.readFileSync(footerPath, 'utf8');
const hasFooterPillars = footerContent.includes('Sales Automation') && 
                        footerContent.includes('Customer Service') && 
                        footerContent.includes('Document & Knowledge') && 
                        footerContent.includes('Process Automation');

console.log('🎯 SEO OPTIMIZATION RESULTS:\n');

// FAQ Schema Results
console.log(`📋 FAQ Schema Implementation:`);
console.log(`   ✅ Articles with FAQ Schema: ${faqSchemaCount}/${totalArticles} (${Math.round(faqSchemaCount/totalArticles*100)}%)`);
if (faqSchemaCount === totalArticles) {
  console.log(`   🏆 PERFECT SCORE: 100% FAQ Schema Coverage!\n`);
} else {
  console.log(`   ⚠️  Missing FAQ Schema: ${totalArticles - faqSchemaCount} articles\n`);
}

// Related Articles Results  
console.log(`🔗 Related Articles Implementation:`);
console.log(`   ✅ Articles with Related Articles: ${relatedArticlesCount}/${totalArticles} (${Math.round(relatedArticlesCount/totalArticles*100)}%)`);
if (relatedArticlesCount === totalArticles) {
  console.log(`   🏆 PERFECT SCORE: 100% Related Articles Coverage!\n`);
} else {
  console.log(`   ⚠️  Missing Related Articles: ${totalArticles - relatedArticlesCount} articles\n`);
}

// Inter-Pillar Links Results
console.log(`🌐 Inter-Pillar Contextual Links:`);
console.log(`   ✅ Articles with Contextual Links: ${interPillarLinksCount}/${totalArticles} (${Math.round(interPillarLinksCount/totalArticles*100)}%)`);
console.log(`   📊 Total Inter-Pillar Links Added: ${totalInterPillarLinks}`);
console.log(`   📈 Average Links per Article: ${Math.round(totalInterPillarLinks/totalArticles * 10)/10}\n`);

// Footer Architecture Results
console.log(`🦶 Footer Link Architecture:`);
if (hasFooterPillars) {
  console.log(`   ✅ Site-wide Footer with Content Pillars: IMPLEMENTED`);
  console.log(`   🏆 PERFECT SCORE: Comprehensive Navigation Structure!\n`);
} else {
  console.log(`   ❌ Footer Link Architecture: NOT IMPLEMENTED\n`);
}

// Calculate Overall SEO Score
let overallScore = 0;
if (faqSchemaCount === totalArticles) overallScore += 25;
if (relatedArticlesCount === totalArticles) overallScore += 25;
if (interPillarLinksCount === totalArticles) overallScore += 25;
if (hasFooterPillars) overallScore += 25;

console.log('=' .repeat(60));
console.log(`🏆 OVERALL SEO OPTIMIZATION SCORE: ${overallScore}/100`);

if (overallScore === 100) {
  console.log(`\n🎉 PERFECT SEO IMPLEMENTATION! 🎉`);
  console.log(`All systematic optimizations completed successfully:`);
  console.log(`✅ FAQ Schema: 100% Coverage`);
  console.log(`✅ Related Articles: 100% Coverage`);
  console.log(`✅ Inter-Pillar Links: 100% Coverage`);
  console.log(`✅ Footer Architecture: Fully Implemented`);
  console.log(`\n📈 Expected SEO Benefits:`);
  console.log(`• Enhanced search engine visibility`);
  console.log(`• Improved topical authority`);
  console.log(`• Better user engagement and session duration`);
  console.log(`• Increased internal link equity distribution`);
  console.log(`• Rich snippet potential for all FAQ content`);
} else {
  console.log(`\n📋 Remaining Optimizations Needed:`);
  if (faqSchemaCount < totalArticles) console.log(`• Add FAQ Schema to ${totalArticles - faqSchemaCount} remaining articles`);
  if (relatedArticlesCount < totalArticles) console.log(`• Add Related Articles to ${totalArticles - relatedArticlesCount} remaining articles`);
  if (interPillarLinksCount < totalArticles) console.log(`• Add Inter-Pillar Links to ${totalArticles - interPillarLinksCount} remaining articles`);
  if (!hasFooterPillars) console.log(`• Implement Footer Link Architecture`);
}

console.log('\n' + '=' .repeat(60));
console.log(`📊 TECHNICAL IMPLEMENTATION SUMMARY:`);
console.log(`• Total Blog Articles: ${totalArticles}`);
console.log(`• FAQ Schema Implementations: ${faqSchemaCount}`);
console.log(`• Related Article Sections: ${relatedArticlesCount}`);
console.log(`• Total Contextual Links: ${totalInterPillarLinks}`);
console.log(`• Site-wide Footer: ${hasFooterPillars ? 'Enhanced' : 'Basic'}`);
console.log('=' .repeat(60));