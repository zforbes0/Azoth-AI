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

class SEOMCPTester {
  constructor() {
    // We'll use the analyzePage method directly
  }

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

      // Check for schema markup
      const schemaScripts = $('script[type="application/ld+json"]');
      if (schemaScripts.length > 0) {
        results.push(`• Schema Markup: ${schemaScripts.length} JSON-LD script(s) found`);
        schemaScripts.each((i, elem) => {
          try {
            const schema = JSON.parse($(elem).html());
            results.push(`  - ${schema['@type'] || 'Unknown type'}`);
          } catch (e) {
            results.push(`  - Invalid JSON-LD`);
          }
        });
      } else {
        results.push(`• Schema Markup: None found`);
      }

      // Check Open Graph
      const ogTags = $('meta[property^="og:"]').length;
      results.push(`• Open Graph Tags: ${ogTags}`);

      // Check Twitter Cards
      const twitterTags = $('meta[name^="twitter:"]').length;
      results.push(`• Twitter Card Tags: ${twitterTags}`);

      return results.join('\n');
    } catch (error) {
      return `Page analysis failed: ${error.message}`;
    }
  }

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
}

// Test the pages
const tester = new SEOMCPTester();
const pages = [
  'https://azoth-ai.vercel.app/blog/ai-customer-support-automation',
  'https://azoth-ai.vercel.app/blog/automated-lead-generation-tools',
  'https://azoth-ai.vercel.app/blog/workflow-automation-consulting', 
  'https://azoth-ai.vercel.app/blog/business-process-automation-case-study'
];

async function auditPages() {
  for (const page of pages) {
    console.log(`\n=== SEO AUDIT: ${page} ===`);
    const analysis = await tester.analyzePage(page);
    console.log(analysis);
    
    console.log(`\n--- Schema Markup Details ---`);
    const schemas = await tester.extractSchema(page);
    schemas.forEach((schema, i) => {
      console.log(`Schema ${i + 1}: ${schema.type}`);
      if (schema.content !== 'Invalid JSON-LD syntax') {
        console.log(schema.content.substring(0, 500) + '...');
      }
    });
    console.log('\n' + '='.repeat(80));
  }
}

auditPages().catch(console.error);