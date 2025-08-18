#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import axios from 'axios';
import googleTrends from 'google-trends-api';
import * as cheerio from 'cheerio';
import { URL } from 'url';
import robotsParser from 'robots-parser';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

// Load environment variables
dotenv.config();

class ComprehensiveSEOAuditor {
  constructor() {
    // Initialize comprehensive SEO audit tools
  }

  // 1. Page SEO Audit
  async analyzePage(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      
      const results = [
        `• Title: ${$('title').text() || 'No title found'}`,
        `• Meta Description: ${$('meta[name="description"]').attr('content') || 'No meta description'}`,
        `• H1 Tags: ${$('h1').length}`,
        `• H2 Tags: ${$('h2').length}`,
        `• H3 Tags: ${$('h3').length}`,
        `• Images: ${$('img').length} (${$('img[alt]').length} with alt text)`,
        `• Internal Links: ${$('a[href^="/"], a[href^="' + new URL(url).origin + '"]').length}`,
        `• External Links: ${$('a[href^="http"]:not([href^="' + new URL(url).origin + '"])').length}`,
        `• Word Count: ~${response.data.replace(/<[^>]*>/g, '').split(/\s+/).length}`,
        `• Page Size: ${(response.data.length / 1024).toFixed(2)} KB`,
      ];

      return results.join('\n');
    } catch (error) {
      return `Page analysis failed: ${error.message}`;
    }
  }

  // 2. Schema Markup Extraction
  async extractSchema(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const schemaResults = [];

      $('script[type="application/ld+json"]').each((i, elem) => {
        try {
          const schema = JSON.parse($(elem).html());
          schemaResults.push({
            type: schema['@type'] || 'Unknown',
            content: JSON.stringify(schema, null, 2)
          });
        } catch (e) {
          schemaResults.push({
            type: 'Invalid',
            content: 'Invalid JSON-LD syntax'
          });
        }
      });

      return schemaResults;
    } catch (error) {
      return [`Schema extraction failed: ${error.message}`];
    }
  }

  // 3. OpenGraph Analysis
  async analyzeOpenGraph(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const ogTags = {};
      
      $('meta[property^="og:"]').each((i, elem) => {
        const property = $(elem).attr('property');
        const content = $(elem).attr('content');
        ogTags[property] = content;
      });

      return {
        found: Object.keys(ogTags).length,
        tags: ogTags
      };
    } catch (error) {
      return { error: `OpenGraph analysis failed: ${error.message}` };
    }
  }

  // 4. Twitter Cards Analysis
  async analyzeTwitterCards(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const twitterTags = {};
      
      $('meta[name^="twitter:"]').each((i, elem) => {
        const name = $(elem).attr('name');
        const content = $(elem).attr('content');
        twitterTags[name] = content;
      });

      return {
        found: Object.keys(twitterTags).length,
        tags: twitterTags
      };
    } catch (error) {
      return { error: `Twitter Cards analysis failed: ${error.message}` };
    }
  }

  // 5. Readability Analysis
  async analyzeReadability(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const dom = new JSDOM(response.data, { url });
      const reader = new Readability(dom.window.document);
      const article = reader.parse();

      if (article) {
        const textLength = article.textContent.length;
        const wordCount = article.textContent.split(/\s+/).length;
        
        return {
          title: article.title,
          excerpt: article.excerpt,
          wordCount: wordCount,
          textLength: textLength,
          readingTime: Math.ceil(wordCount / 200) // Average reading speed
        };
      }

      return { error: 'Could not parse article content' };
    } catch (error) {
      return { error: `Readability analysis failed: ${error.message}` };
    }
  }

  // 6. Link Extraction and Analysis
  async extractLinks(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const baseUrl = new URL(url);
      
      const links = {
        internal: [],
        external: [],
        nofollow: [],
        broken: []
      };

      $('a[href]').each((i, elem) => {
        const href = $(elem).attr('href');
        const text = $(elem).text().trim();
        const rel = $(elem).attr('rel');
        
        if (href) {
          const link = {
            href,
            text,
            rel
          };

          if (href.startsWith('http')) {
            if (href.includes(baseUrl.hostname)) {
              links.internal.push(link);
            } else {
              links.external.push(link);
            }
          } else if (href.startsWith('/')) {
            links.internal.push(link);
          }

          if (rel && rel.includes('nofollow')) {
            links.nofollow.push(link);
          }
        }
      });

      return {
        internal: links.internal.length,
        external: links.external.length,
        nofollow: links.nofollow.length,
        totalLinks: links.internal.length + links.external.length,
        details: {
          internalLinks: links.internal.slice(0, 10), // Show first 10
          externalLinks: links.external.slice(0, 5)   // Show first 5
        }
      };
    } catch (error) {
      return { error: `Link extraction failed: ${error.message}` };
    }
  }

  // 7. Robots.txt Analysis
  async analyzeRobots(domain) {
    try {
      const robotsUrl = `https://${domain}/robots.txt`;
      const response = await axios.get(robotsUrl, {
        timeout: 5000,
        validateStatus: () => true // Accept any status code
      });

      if (response.status === 200) {
        const robots = robotsParser(robotsUrl, response.data);
        return {
          exists: true,
          content: response.data,
          allowsAll: robots.isAllowed('*', '/'),
          sitemapUrls: response.data.match(/Sitemap:\s*(.*)/gi) || []
        };
      }

      return { exists: false, status: response.status };
    } catch (error) {
      return { exists: false, error: `Robots.txt analysis failed: ${error.message}` };
    }
  }

  // 8. Security Headers Check
  async checkSecurityHeaders(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const headers = response.headers;
      const securityHeaders = [
        'strict-transport-security',
        'content-security-policy',
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
        'permissions-policy'
      ];

      const results = {};
      securityHeaders.forEach(header => {
        results[header] = headers[header] ? 'Present' : 'Missing';
      });

      return results;
    } catch (error) {
      return { error: `Security headers check failed: ${error.message}` };
    }
  }
}

// Run comprehensive audit
const auditor = new ComprehensiveSEOAuditor();
const pages = [
  'https://azoth-ai.vercel.app/blog/ai-customer-support-automation',
  'https://azoth-ai.vercel.app/blog/automated-lead-generation-tools',
  'https://azoth-ai.vercel.app/blog/workflow-automation-consulting', 
  'https://azoth-ai.vercel.app/blog/business-process-automation-case-study'
];

async function comprehensiveAudit() {
  console.log('🔍 COMPREHENSIVE SEO AUDIT USING MULTIPLE MCP TOOLS');
  console.log('=' * 80);

  for (const page of pages) {
    console.log(`\n📊 AUDITING: ${page}`);
    console.log('─'.repeat(80));

    // 1. Basic Page Analysis
    console.log('\n🏷️  PAGE ANALYSIS:');
    const pageAnalysis = await auditor.analyzePage(page);
    console.log(pageAnalysis);

    // 2. Schema Markup
    console.log('\n📋 SCHEMA MARKUP:');
    const schemas = await auditor.extractSchema(page);
    schemas.forEach((schema, i) => {
      console.log(`Schema ${i + 1}: ${schema.type}`);
    });

    // 3. OpenGraph Analysis
    console.log('\n📱 OPENGRAPH ANALYSIS:');
    const og = await auditor.analyzeOpenGraph(page);
    if (og.error) {
      console.log(og.error);
    } else {
      console.log(`OpenGraph tags found: ${og.found}`);
      Object.entries(og.tags).forEach(([prop, content]) => {
        console.log(`  ${prop}: ${content.substring(0, 100)}...`);
      });
    }

    // 4. Twitter Cards
    console.log('\n🐦 TWITTER CARDS:');
    const twitter = await auditor.analyzeTwitterCards(page);
    if (twitter.error) {
      console.log(twitter.error);
    } else {
      console.log(`Twitter Card tags found: ${twitter.found}`);
      Object.entries(twitter.tags).forEach(([name, content]) => {
        console.log(`  ${name}: ${content.substring(0, 100)}...`);
      });
    }

    // 5. Readability Analysis
    console.log('\n📖 READABILITY ANALYSIS:');
    const readability = await auditor.analyzeReadability(page);
    if (readability.error) {
      console.log(readability.error);
    } else {
      console.log(`Word Count: ${readability.wordCount}`);
      console.log(`Reading Time: ${readability.readingTime} minutes`);
      console.log(`Title: ${readability.title}`);
    }

    // 6. Link Analysis
    console.log('\n🔗 LINK ANALYSIS:');
    const links = await auditor.extractLinks(page);
    if (links.error) {
      console.log(links.error);
    } else {
      console.log(`Total Links: ${links.totalLinks}`);
      console.log(`Internal Links: ${links.internal}`);
      console.log(`External Links: ${links.external}`);
      console.log(`NoFollow Links: ${links.nofollow}`);
    }

    // 7. Security Headers
    console.log('\n🔒 SECURITY HEADERS:');
    const security = await auditor.checkSecurityHeaders(page);
    if (security.error) {
      console.log(security.error);
    } else {
      Object.entries(security).forEach(([header, status]) => {
        console.log(`  ${header}: ${status}`);
      });
    }

    console.log('\n' + '='.repeat(80));
  }

  // 8. Domain-level analysis
  console.log('\n🌐 DOMAIN-LEVEL ANALYSIS');
  console.log('─'.repeat(80));
  
  const robotsAnalysis = await auditor.analyzeRobots('azoth-ai.vercel.app');
  console.log('\n🤖 ROBOTS.TXT ANALYSIS:');
  if (robotsAnalysis.exists) {
    console.log('✅ robots.txt exists');
    console.log(`Allows crawling: ${robotsAnalysis.allowsAll ? 'Yes' : 'Restricted'}`);
    console.log(`Sitemaps found: ${robotsAnalysis.sitemapUrls.length}`);
    robotsAnalysis.sitemapUrls.forEach(sitemap => {
      console.log(`  ${sitemap}`);
    });
  } else {
    console.log('❌ robots.txt not found or inaccessible');
  }

  console.log('\n✅ COMPREHENSIVE AUDIT COMPLETE');
}

comprehensiveAudit().catch(console.error);