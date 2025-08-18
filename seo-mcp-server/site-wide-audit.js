#!/usr/bin/env node

import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

class SiteWideAuditor {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.discoveredPages = new Set();
    this.auditResults = {};
  }

  async discoverAllPages() {
    console.log('🔍 DISCOVERING ALL PAGES ON WEBSITE...');
    console.log('=' * 60);

    const startUrls = [
      `${this.baseUrl}`,
      `${this.baseUrl}/blog`,
      `${this.baseUrl}/services`,
      `${this.baseUrl}/about`,
      `${this.baseUrl}/contact`
    ];

    // Try to get sitemap first
    try {
      const sitemapUrls = await this.getSitemapPages();
      if (sitemapUrls.length > 0) {
        console.log(`📋 Found ${sitemapUrls.length} pages in sitemap`);
        sitemapUrls.forEach(url => this.discoveredPages.add(url));
      }
    } catch (error) {
      console.log('⚠️  Sitemap not accessible, using crawling method');
    }

    // Crawl from known starting points
    for (const startUrl of startUrls) {
      await this.crawlPage(startUrl, 0, 2); // Max depth of 2
    }

    const allPages = Array.from(this.discoveredPages);
    console.log(`\n✅ DISCOVERED ${allPages.length} TOTAL PAGES:`);
    allPages.forEach((page, i) => {
      console.log(`${i + 1}. ${page}`);
    });

    return allPages;
  }

  async getSitemapPages() {
    const sitemapUrls = [
      `${this.baseUrl}/sitemap.xml`,
      `${this.baseUrl}/sitemap-index.xml`,
      `${this.baseUrl}/sitemap-0.xml`
    ];

    for (const sitemapUrl of sitemapUrls) {
      try {
        const response = await axios.get(sitemapUrl, { timeout: 5000 });
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        const urls = [];
        $('url loc, sitemap loc').each((i, elem) => {
          const url = $(elem).text().trim();
          if (url && url.startsWith(this.baseUrl)) {
            urls.push(url);
          }
        });

        if (urls.length > 0) {
          return urls;
        }
      } catch (error) {
        // Try next sitemap URL
        continue;
      }
    }

    return [];
  }

  async crawlPage(url, depth, maxDepth) {
    if (depth > maxDepth || this.discoveredPages.has(url)) {
      return;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Auditor/1.0)',
        },
        timeout: 10000,
      });

      this.discoveredPages.add(url);
      
      const $ = cheerio.load(response.data);
      const baseUrlObj = new URL(this.baseUrl);

      // Find internal links
      $('a[href]').each((i, elem) => {
        let href = $(elem).attr('href');
        if (href) {
          // Convert relative URLs to absolute
          if (href.startsWith('/')) {
            href = `${this.baseUrl}${href}`;
          } else if (href.startsWith('./')) {
            href = new URL(href, url).toString();
          }

          // Only follow internal links
          if (href.startsWith(this.baseUrl) && 
              !href.includes('#') && 
              !href.includes('?') &&
              !this.discoveredPages.has(href)) {
            this.crawlPage(href, depth + 1, maxDepth);
          }
        }
      });

    } catch (error) {
      console.log(`❌ Error crawling ${url}: ${error.message}`);
    }
  }

  async auditSocialMediaTags(pages) {
    console.log('\n🐦 AUDITING SOCIAL MEDIA TAGS...');
    console.log('─'.repeat(60));

    const results = {
      withTwitterCards: [],
      withoutTwitterCards: [],
      withOpenGraph: [],
      withoutOpenGraph: []
    };

    for (const page of pages) {
      try {
        const response = await axios.get(page, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEO-Auditor/1.0)',
          },
          timeout: 10000,
        });

        const $ = cheerio.load(response.data);
        
        // Check for Twitter/X cards
        const twitterCards = $('meta[name^="twitter:"]').length;
        if (twitterCards > 0) {
          results.withTwitterCards.push({ page, count: twitterCards });
        } else {
          results.withoutTwitterCards.push(page);
        }

        // Check for Open Graph tags
        const openGraphTags = $('meta[property^="og:"]').length;
        if (openGraphTags > 0) {
          results.withOpenGraph.push({ page, count: openGraphTags });
        } else {
          results.withoutOpenGraph.push(page);
        }

      } catch (error) {
        console.log(`❌ Error auditing ${page}: ${error.message}`);
      }
    }

    console.log(`\n📊 SOCIAL MEDIA TAGS AUDIT RESULTS:`);
    console.log(`✅ Pages with X/Twitter Cards: ${results.withTwitterCards.length}`);
    console.log(`❌ Pages missing X/Twitter Cards: ${results.withoutTwitterCards.length}`);
    console.log(`✅ Pages with Open Graph: ${results.withOpenGraph.length}`);
    console.log(`❌ Pages missing Open Graph: ${results.withoutOpenGraph.length}`);

    if (results.withoutTwitterCards.length > 0) {
      console.log(`\n🔧 PAGES NEEDING X/TWITTER CARDS:`);
      results.withoutTwitterCards.forEach((page, i) => {
        console.log(`${i + 1}. ${page}`);
      });
    }

    return results;
  }

  async auditSecurityHeaders(pages) {
    console.log('\n🔒 AUDITING SECURITY HEADERS...');
    console.log('─'.repeat(60));

    const securityHeaders = [
      'strict-transport-security',
      'content-security-policy',
      'x-frame-options',
      'x-content-type-options',
      'referrer-policy',
      'permissions-policy'
    ];

    const results = {
      headerStatus: {},
      pageResults: []
    };

    // Initialize header status tracking
    securityHeaders.forEach(header => {
      results.headerStatus[header] = { present: 0, missing: 0 };
    });

    for (const page of pages.slice(0, 5)) { // Sample first 5 pages
      try {
        const response = await axios.get(page, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEO-Auditor/1.0)',
          },
          timeout: 10000,
        });

        const pageResult = { page, headers: {} };
        
        securityHeaders.forEach(header => {
          const present = !!response.headers[header];
          pageResult.headers[header] = present ? 'Present' : 'Missing';
          
          if (present) {
            results.headerStatus[header].present++;
          } else {
            results.headerStatus[header].missing++;
          }
        });

        results.pageResults.push(pageResult);

      } catch (error) {
        console.log(`❌ Error checking headers for ${page}: ${error.message}`);
      }
    }

    console.log(`\n📊 SECURITY HEADERS AUDIT RESULTS:`);
    securityHeaders.forEach(header => {
      const status = results.headerStatus[header];
      const total = status.present + status.missing;
      const percentage = total > 0 ? Math.round((status.present / total) * 100) : 0;
      console.log(`${header}: ${percentage}% implemented (${status.present}/${total})`);
    });

    return results;
  }

  async checkRobotsTxt() {
    console.log('\n🤖 CHECKING ROBOTS.TXT...');
    console.log('─'.repeat(60));

    try {
      const response = await axios.get(`${this.baseUrl}/robots.txt`, {
        timeout: 5000,
        validateStatus: () => true
      });

      if (response.status === 200) {
        console.log('✅ robots.txt exists');
        console.log('Content:');
        console.log(response.data);
        return { exists: true, content: response.data };
      } else {
        console.log(`❌ robots.txt not found (Status: ${response.status})`);
        return { exists: false, status: response.status };
      }
    } catch (error) {
      console.log(`❌ robots.txt check failed: ${error.message}`);
      return { exists: false, error: error.message };
    }
  }

  async generateImplementationPlan(auditResults) {
    console.log('\n📋 GENERATING IMPLEMENTATION PLAN...');
    console.log('═'.repeat(60));

    const plan = {
      highPriority: [],
      mediumPriority: [],
      lowPriority: []
    };

    // Robots.txt
    if (!auditResults.robots.exists) {
      plan.highPriority.push({
        task: 'Create robots.txt file',
        action: 'Add /public/robots.txt with proper directives',
        impact: 'High - Improves search engine crawling'
      });
    }

    // Social media tags
    if (auditResults.social.withoutTwitterCards.length > 0) {
      plan.highPriority.push({
        task: 'Implement X/Twitter Cards',
        action: `Add social media meta tags to ${auditResults.social.withoutTwitterCards.length} pages`,
        impact: 'High - Improves social media sharing'
      });
    }

    // Security headers
    const missingHeaders = Object.entries(auditResults.security.headerStatus)
      .filter(([header, status]) => status.missing > status.present)
      .map(([header]) => header);

    if (missingHeaders.length > 0) {
      plan.mediumPriority.push({
        task: 'Implement Security Headers',
        action: `Add ${missingHeaders.length} missing security headers: ${missingHeaders.join(', ')}`,
        impact: 'Medium - Improves security score and trust'
      });
    }

    console.log('\n🎯 IMPLEMENTATION PLAN:');
    
    if (plan.highPriority.length > 0) {
      console.log('\n🔴 HIGH PRIORITY:');
      plan.highPriority.forEach((item, i) => {
        console.log(`${i + 1}. ${item.task}`);
        console.log(`   Action: ${item.action}`);
        console.log(`   Impact: ${item.impact}\n`);
      });
    }

    if (plan.mediumPriority.length > 0) {
      console.log('🟡 MEDIUM PRIORITY:');
      plan.mediumPriority.forEach((item, i) => {
        console.log(`${i + 1}. ${item.task}`);
        console.log(`   Action: ${item.action}`);
        console.log(`   Impact: ${item.impact}\n`);
      });
    }

    return plan;
  }
}

// Execute comprehensive audit
async function runSiteWideAudit() {
  const auditor = new SiteWideAuditor('https://azoth-ai.vercel.app');
  
  try {
    // Discover all pages
    const allPages = await auditor.discoverAllPages();
    
    // Run audits
    const socialResults = await auditor.auditSocialMediaTags(allPages);
    const securityResults = await auditor.auditSecurityHeaders(allPages);
    const robotsResults = await auditor.checkRobotsTxt();
    
    // Compile results
    const auditResults = {
      pages: allPages,
      social: socialResults,
      security: securityResults,
      robots: robotsResults
    };
    
    // Generate implementation plan
    await auditor.generateImplementationPlan(auditResults);
    
    console.log('\n✅ SITE-WIDE AUDIT COMPLETE!');
    console.log(`📊 Total pages audited: ${allPages.length}`);
    console.log(`🐦 Pages needing social media tags: ${socialResults.withoutTwitterCards.length}`);
    console.log(`🔒 Security headers status: Mixed implementation`);
    console.log(`🤖 Robots.txt: ${robotsResults.exists ? 'Present' : 'Missing'}`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
  }
}

runSiteWideAudit();