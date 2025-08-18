# SEO MCP Server - Claude Usage Guide

## Overview
This SEO MCP Server provides 24 comprehensive SEO analysis tools with free features. The server includes professional SEO APIs and local analysis capabilities.

## Available Tools (24 Total)
1. **keyword_research** - Research keywords using Google Trends and APIs
2. **serp_analysis** - Analyze search engine results pages
3. **content_analysis** - Analyze content for SEO optimization
4. **trending_keywords** - Find trending keywords
5. **backlink_analysis** - Analyze backlink profiles
6. **page_seo_audit** - Comprehensive page SEO audit
7. **competitor_analysis** - Analyze competitor SEO strategies
8. **markup_validation** - Validate HTML markup
9. **ssl_security_test** - Test SSL security
10. **security_headers_check** - Check security headers
11. **css_validation** - Validate CSS
12. **robots_analysis** - Analyze robots.txt
13. **sitemap_analysis** - Analyze XML sitemaps
14. **schema_extraction** - Extract schema markup
15. **readability_analysis** - Analyze content readability
16. **opengraph_analysis** - Analyze Open Graph tags
17. **twitter_cards_analysis** - Analyze Twitter Card tags
18. **wayback_analysis** - Historical analysis via Wayback Machine
19. **link_extraction** - Extract and analyze links
20. **google_autocomplete** - Get Google autocomplete suggestions
21. **google_people_also_ask** - Get "People Also Ask" data
22. **google_related_searches** - Get related search terms
23. **wikipedia_search** - Search Wikipedia for content ideas
24. **bing_suggest** - Get Bing search suggestions

## Quick Usage Script (test-seo.js)

### How to Run SEO Audits
```bash
cd "/path/to/seo-mcp-server"
node test-seo.js
```

### Script Features
- **Page Analysis**: Title, meta description, headers, images, links, word count
- **Schema Detection**: Finds and analyzes JSON-LD structured data
- **Technical SEO**: Open Graph, Twitter Cards, page size analysis
- **Content Quality**: Word count, image alt text coverage
- **Internal/External Links**: Link analysis and counts

### Sample Output Format
```
=== SEO AUDIT: [URL] ===
• Title: [Page Title]
• Meta Description: [Meta Description]
• H1 Tags: [Count]
• H2 Tags: [Count]  
• H3 Tags: [Count]
• Images: [Total] ([With Alt Text] with alt text)
• Internal Links: [Count]
• External Links: [Count]
• Word Count: ~[Count]
• Page Size: [Size] KB
• Schema Markup: [Count] JSON-LD script(s) found
  - [Schema Types]
• Open Graph Tags: [Count]
• Twitter Card Tags: [Count]

--- Schema Markup Details ---
[Detailed schema analysis]
```

## MCP Server Structure

### Main Class: SEOMCPServer
- **Location**: `/home/zforb/NEXITAS to date/seo-mcp-server/index.js`
- **Key Methods**:
  - `analyzePage(url)` - Core page analysis function
  - `extractSchema(url)` - Schema markup extraction
  - `setupToolHandlers()` - Configures all 24 SEO tools

### Running the Server
```bash
# As MCP Server (stdio)
node index.js

# Direct tool testing
node test-seo.js
```

## API Integrations Available

### Free APIs (Working)
- **Google Trends API** - Keyword trends and related searches
- **Direct Page Analysis** - Axios + Cheerio for page scraping
- **Schema Detection** - JSON-LD parsing
- **Technical SEO** - Headers, markup validation

### Professional APIs (Ready for API Keys)
- **Authoritas API** - Advanced keyword research and SERP analysis
- **SEO Review Tools API** - Professional content analysis
- **CognitiveSEO API** - Backlink analysis
- **SSL Labs API** - Security testing

## Test Script Usage

### For Multiple Pages
The script is configured to audit these pages by default:
```javascript
const pages = [
  'http://localhost:3000/blog/ai-customer-support-automation',
  'http://localhost:3000/blog/automated-lead-generation-tools', 
  'http://localhost:3000/blog/workflow-automation-consulting',
  'http://localhost:3000/blog/business-process-automation-case-study'
];
```

### Customization
To audit different pages, modify the `pages` array in `test-seo.js`.

For production URLs, replace localhost with the actual domain:
```javascript
const pages = [
  'https://yourdomain.com/page1',
  'https://yourdomain.com/page2'
];
```

## Key Findings from Latest Audit

### Page Performance Summary
1. **AI Customer Support**: 8,397 words, 6 schema types, 61 internal links
2. **Lead Generation Tools**: 7,513 words, 3 schema types, 50 internal links  
3. **Workflow Consulting**: 8,296 words, 5 schema types, 48 internal links
4. **Process Automation**: 8,287 words, 5 schema types, 48 internal links

### Schema Implementation
All pages have comprehensive schema markup:
- Organization schema
- Article schema  
- FAQPage schema
- BreadcrumbList schema (on some pages)

### Technical SEO Status
- ✅ All images have alt text
- ✅ Proper header hierarchy (H1, H2, H3)
- ✅ Rich meta descriptions
- ✅ Open Graph implementation
- ⚠️ No Twitter Card tags detected

## Environment Setup

### Dependencies
```json
{
  "@modelcontextprotocol/sdk": "^1.0.0",
  "dotenv": "^16.4.7",
  "axios": "^1.7.8",
  "google-trends-api": "^4.9.2",
  "cheerio": "^1.0.0",
  "robots-parser": "^3.0.1",
  "@mozilla/readability": "^0.5.0",
  "jsdom": "^25.0.1"
}
```

### Installation
```bash
npm install
```

### Environment Variables (Optional)
Create `.env` file for API keys:
```
AUTHORITAS_API_KEY=your_key_here
SEO_REVIEW_TOOLS_API_KEY=your_key_here
COGNITIVE_SEO_API_KEY=your_key_here
```

## Future Enhancements

### When API Keys Are Added
1. **Authoritas Integration**: Advanced keyword research and SERP analysis
2. **SEO Review Tools**: Professional content optimization suggestions
3. **CognitiveSEO**: Comprehensive backlink analysis
4. **Additional APIs**: Site speed, mobile optimization, accessibility

### Script Improvements
1. **Performance Metrics**: Core Web Vitals simulation
2. **Competitive Analysis**: Compare multiple sites
3. **Historical Tracking**: Track SEO improvements over time
4. **Report Generation**: HTML/PDF output formats

## Troubleshooting

### Common Issues
1. **Timeout Errors**: Increase timeout in axios config
2. **Schema Parsing**: Handle malformed JSON-LD gracefully
3. **Large Pages**: Implement pagination for content analysis
4. **Rate Limiting**: Add delays between requests for multiple pages

### Debug Mode
Add console logging to track analysis progress:
```javascript
console.log(`Analyzing: ${url}`);
console.log(`Response size: ${response.data.length} bytes`);
```

## Last Updated
August 2025 - Created comprehensive audit script and documentation for future Claude sessions.