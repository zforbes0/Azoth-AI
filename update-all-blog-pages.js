#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Blog pages directory
const blogDir = path.join(__dirname, 'src/pages/blog');

// Mapping of blog pages to their metadata
const blogMetadata = {
  'ai-chatbots-help-desk.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2025-01-14T08:00:00.000Z'
  },
  'ai-document-management-system.astro': {
    author: 'Nexitas Team', 
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2025-01-13T08:00:00.000Z'
  },
  'ai-driven-customer-service-case-study.astro': {
    author: 'Sarah Chen',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2025-01-11T08:00:00.000Z'
  },
  'ai-lead-enrichment-platforms.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/Lead Enrichment.PNG',
    publishedTime: '2025-01-09T08:00:00.000Z'
  },
  'ai-powered-data-entry-automation.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2025-01-07T08:00:00.000Z'
  },
  'ai-powered-document-classification.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2025-01-06T08:00:00.000Z'
  },
  'ai-powered-knowledge-base-software.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2025-01-04T08:00:00.000Z'
  },
  'automated-customer-onboarding.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2025-01-03T08:00:00.000Z'
  },
  'b2b-lead-automation-software.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/Lead Enrichment.PNG',
    publishedTime: '2025-01-02T08:00:00.000Z'
  },
  'business-process-automation-services.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/business-process-automation-2025-08-17T08-38-17-999Z.png',
    publishedTime: '2025-01-01T08:00:00.000Z'
  },
  'crm-automation-sales-teams.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/Lead Enrichment.PNG',
    publishedTime: '2024-12-30T08:00:00.000Z'
  },
  'customer-service-automation-software.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2024-12-29T08:00:00.000Z'
  },
  'enterprise-knowledge-management-solutions.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2024-12-28T08:00:00.000Z'
  },
  'enterprise-process-automation-solutions.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/business-process-automation-2025-08-17T08-38-17-999Z.png',
    publishedTime: '2024-12-27T08:00:00.000Z'
  },
  'intelligent-document-retrieval-software.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2024-12-26T08:00:00.000Z'
  },
  'intelligent-workflow-automation.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/Voila Workflow addition done.png',
    publishedTime: '2024-12-25T08:00:00.000Z'
  },
  'internal-workflow-automation-software.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/Voila Workflow addition done.png',
    publishedTime: '2024-12-24T08:00:00.000Z'
  },
  'rag-ai-document-retrieval.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/NEXITAS circle.png',
    publishedTime: '2024-12-23T08:00:00.000Z'
  },
  'sales-outreach-automation-case-study.astro': {
    author: 'James Mitchell',
    ogImage: '/assets/Lead Enrichment.PNG',
    publishedTime: '2024-12-22T08:00:00.000Z'
  },
  'sales-prospecting-automation-tools.astro': {
    author: 'Nexitas Team',
    ogImage: '/assets/Lead Enrichment.PNG',
    publishedTime: '2024-12-21T08:00:00.000Z'
  }
};

function updateLayoutCall(content, metadata) {
  // Find the Layout component call
  const layoutRegex = /<Layout\s+title="([^"]+)"\s+description="([^"]+)"([^>]*)>/;
  const match = content.match(layoutRegex);
  
  if (!match) {
    console.log('Could not find Layout component call');
    return content;
  }

  const [fullMatch, title, description, existingAttrs] = match;
  
  // Check if it already has social media attributes
  if (existingAttrs.includes('type=') || existingAttrs.includes('author=')) {
    console.log('Already has social media attributes, skipping');
    return content;
  }

  // Create enhanced Layout call
  const enhancedLayout = `<Layout 
  title="${title}" 
  description="${description}"
  type="article"
  author="${metadata.author}"
  ogImage="${metadata.ogImage}"
  publishedTime="${metadata.publishedTime}"
  modifiedTime="2025-08-18T08:00:00.000Z"
>`;

  return content.replace(layoutRegex, enhancedLayout);
}

async function updateAllBlogPages() {
  console.log('🚀 UPDATING ALL BLOG PAGES WITH SOCIAL MEDIA TAGS...');
  console.log('=' * 60);

  try {
    const files = fs.readdirSync(blogDir);
    const astroFiles = files.filter(file => 
      file.endsWith('.astro') && 
      !file.includes('OLD') && 
      !file.includes('BACKUP') &&
      blogMetadata[file] // Only process files we have metadata for
    );

    console.log(`Found ${astroFiles.length} blog pages to update:`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const file of astroFiles) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      console.log(`\n📝 Processing: ${file}`);
      
      const metadata = blogMetadata[file];
      const updatedContent = updateLayoutCall(content, metadata);
      
      if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ Updated: ${file}`);
        updatedCount++;
      } else {
        console.log(`⏭️  Skipped: ${file} (already enhanced or no Layout found)`);
        skippedCount++;
      }
    }

    console.log(`\n🎉 BULK UPDATE COMPLETE!`);
    console.log(`✅ Updated: ${updatedCount} files`);
    console.log(`⏭️  Skipped: ${skippedCount} files`);
    console.log(`📊 Total: ${astroFiles.length} files processed`);

  } catch (error) {
    console.error('❌ Error updating blog pages:', error.message);
  }
}

updateAllBlogPages();