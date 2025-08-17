# SEO MCP Server

A comprehensive Model Context Protocol (MCP) server that integrates multiple SEO APIs for advanced keyword research, SERP analysis, content optimization, and competitive intelligence.

## Features

### 🔍 Keyword Research
- **Google Trends Integration**: Real-time trending keywords and search interest
- **Authoritas API**: Professional keyword data and search volume
- **Keyword Suggestions**: AI-powered keyword variations and long-tail suggestions
- **Competitive Keywords**: Discover what competitors are ranking for

### 📊 SERP Analysis  
- **Search Result Analysis**: Analyze top-ranking pages for any keyword
- **Featured Snippets**: Identify snippet opportunities
- **SERP Features**: Track Knowledge Panels, People Also Ask, etc.
- **Ranking Difficulty**: Assess keyword competition levels

### 📝 Content Analysis
- **SEO Review Tools API**: Comprehensive content audits
- **Keyword Density**: Optimize keyword usage and avoid over-optimization
- **Readability Scores**: Improve content accessibility
- **Technical SEO**: Meta tags, schema markup, and technical checks

### 🔗 Backlink Analysis
- **CognitiveSEO API**: Backlink profile analysis and monitoring
- **Competitor Backlinks**: Discover competitor link-building strategies
- **Link Quality Assessment**: Identify high-value link opportunities
- **Social Metrics**: Track social signals and engagement

### 🏆 Competitive Intelligence
- **Domain Analysis**: Comprehensive competitor website audits
- **Keyword Gap Analysis**: Find keywords competitors rank for but you don't
- **Content Gaps**: Identify content opportunities in your niche
- **Market Share**: Understand your position in search results

## API Integrations

### Free APIs Included:
- **Google Trends API**: Trending keywords and search interest over time
- **SEO Review Tools API**: Free tier for content analysis and technical SEO
- **Authoritas API**: Free tier for SERP tracking and keyword research
- **CognitiveSEO API**: Free tier for backlinks and social metrics

### Premium Features (with API keys):
- Advanced keyword research with search volumes
- Real-time SERP tracking and monitoring
- Comprehensive backlink analysis
- Detailed competitor intelligence

## Installation

1. **Clone and Install Dependencies**:
   ```bash
   cd "/path/to/seo-mcp-server"
   npm install
   ```

2. **Set Up Environment Variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Get Free API Keys**:
   - **Authoritas**: Sign up at [authoritas.com](https://www.authoritas.com) for free API access
   - **SEO Review Tools**: Get free API key at [seoreviewtools.com](https://www.seoreviewtools.com)
   - **CognitiveSEO**: Free tier available at [cognitiveseo.com](https://cognitiveseo.com)

4. **Configure MCP Client**:
   Add to your MCP client configuration:
   ```json
   {
     "mcpServers": {
       "seo-mcp-server": {
         "command": "node",
         "args": ["/path/to/seo-mcp-server/index.js"],
         "env": {}
       }
     }
   }
   ```

## Available Tools

### 1. keyword_research
Research keywords using multiple SEO APIs including Authoritas and Google Trends.

**Parameters:**
- `keyword` (required): Primary keyword to research
- `country` (optional): Country code (default: US)
- `language` (optional): Language code (default: en)

### 2. serp_analysis
Analyze search engine results pages (SERP) for keywords.

**Parameters:**
- `keyword` (required): Keyword to analyze SERP for
- `search_engine` (optional): Search engine (default: google)
- `location` (optional): Location for SERP analysis

### 3. content_analysis
Analyze content for SEO optimization using multiple APIs.

**Parameters:**
- `url` (required): URL to analyze
- `target_keyword` (optional): Target keyword for optimization

### 4. trending_keywords
Get trending keywords and topics using Google Trends.

**Parameters:**
- `keyword` (required): Base keyword to find trends for
- `timeframe` (optional): Timeframe for trends (default: past-month)
- `geo` (optional): Geographic location (default: US)

### 5. backlink_analysis
Analyze backlinks and social metrics using CognitiveSEO API.

**Parameters:**
- `domain` (required): Domain to analyze backlinks for
- `competitor_domains` (optional): Competitor domains for comparison

### 6. page_seo_audit
Comprehensive SEO audit of a webpage.

**Parameters:**
- `url` (required): URL to audit
- `target_keywords` (optional): Target keywords for the page

### 7. competitor_analysis
Analyze competitor keywords, rankings, and content strategies.

**Parameters:**
- `domain` (required): Your domain
- `competitor_domains` (required): Competitor domains to analyze
- `keywords` (optional): Keywords to analyze competition for

### 8. link_extraction
Extract and analyze all links from a webpage including internal, external, and their attributes.

**Parameters:**
- `url` (required): URL to extract links from
- `include_internal` (optional): Whether to include internal links (default: true)
- `include_external` (optional): Whether to include external links (default: true)
- `check_status` (optional): Whether to check HTTP status of links (default: false)
- `max_links` (optional): Maximum number of links to analyze (default: unlimited)
- `filter_domains` (optional): Specific domains to filter for

### 9. google_autocomplete
Get Google Autocomplete suggestions for keyword research and content ideation.

**Parameters:**
- `query` (required): Search query to get autocomplete suggestions for
- `language` (optional): Language code (default: en)
- `country` (optional): Country code (default: us)

### 10. google_people_also_ask
Extract "People Also Ask" questions from Google search results.

**Parameters:**
- `query` (required): Search query to get People Also Ask questions for
- `max_questions` (optional): Maximum number of questions to retrieve (default: 10)

### 11. google_related_searches
Extract related search suggestions from Google search results.

**Parameters:**
- `query` (required): Search query to get related searches for
- `max_suggestions` (optional): Maximum number of related searches to retrieve (default: 8)

### 12. wikipedia_search
Search Wikipedia for topics and extract summary information.

**Parameters:**
- `query` (required): Search query for Wikipedia
- `language` (optional): Wikipedia language code (default: en)
- `limit` (optional): Maximum number of results to return (default: 5)
- `get_summaries` (optional): Whether to fetch article summaries (default: true)

### 13. bing_suggest
Get Bing search suggestions for keyword research and content ideas.

**Parameters:**
- `query` (required): Search query to get Bing suggestions for
- `market` (optional): Market code (default: en-US)

## Usage Examples

### Basic Keyword Research
```javascript
// Use the keyword_research tool
{
  "keyword": "business process automation",
  "country": "US",
  "language": "en"
}
```

### Content Optimization
```javascript
// Use the content_analysis tool
{
  "url": "https://example.com/blog/automation-guide",
  "target_keyword": "workflow automation"
}
```

### Competitor Analysis
```javascript
// Use the competitor_analysis tool
{
  "domain": "yourdomain.com",
  "competitor_domains": ["competitor1.com", "competitor2.com"],
  "keywords": ["automation software", "workflow tools"]
}
```

### Link Extraction and Analysis
```javascript
// Use the link_extraction tool
{
  "url": "https://example.com/blog/automation-guide",
  "include_internal": true,
  "include_external": true,
  "check_status": true,
  "max_links": 100
}
```

### Search Intelligence and Content Ideation
```javascript
// Use Google Autocomplete for keyword research
{
  "query": "artificial intelligence",
  "language": "en",
  "country": "us"
}

// Get People Also Ask questions for content ideas
{
  "query": "machine learning basics",
  "max_questions": 15
}

// Find related searches for topic expansion
{
  "query": "digital marketing strategy",
  "max_suggestions": 10
}

// Research authoritative content on Wikipedia
{
  "query": "search engine optimization",
  "language": "en",
  "limit": 3,
  "get_summaries": true
}

// Cross-reference with Bing suggestions
{
  "query": "content marketing tips",
  "market": "en-US"
}
```

## Benefits for Your Website

### 1. **Improved Keyword Strategy**
- Discover high-value, low-competition keywords
- Identify trending topics in your industry
- Find long-tail keyword opportunities

### 2. **Enhanced Content Optimization**
- Optimize existing content for better rankings
- Identify content gaps and opportunities
- Improve technical SEO elements

### 3. **Competitive Advantage**
- Monitor competitor strategies and performance
- Discover competitor keywords and content gaps
- Track backlink opportunities

### 4. **Data-Driven Decisions**
- Real-time SEO data and insights
- Performance tracking and monitoring
- ROI measurement for SEO efforts

### 5. **Link Analysis & Audit**
- Comprehensive link inventory for backlink audits
- Internal linking optimization opportunities
- Competitor link discovery and analysis
- Broken link identification and fixing
- Anchor text optimization insights

### 6. **Search Intelligence & Content Ideation**
- Comprehensive keyword research across multiple search engines
- People Also Ask questions for content strategy
- Related search terms for topic expansion  
- Wikipedia research for authoritative content ideas
- Cross-platform search suggestion analysis
- Voice search and natural language query optimization

## Technical Requirements

- Node.js 18+ 
- Internet connection for API calls
- MCP-compatible client (Claude Desktop, etc.)

## Security & Privacy

- All API calls are made securely over HTTPS
- API keys are stored locally in environment variables
- No data is stored or transmitted to third parties
- Full control over which APIs and data sources to use

## Troubleshooting

### Common Issues:

1. **API Rate Limits**: Free API tiers have usage limits - upgrade for higher limits
2. **Network Timeouts**: Some APIs may be slow - adjust timeout settings if needed
3. **Missing API Keys**: Some features require API keys - check .env configuration

### Getting Help:

- Check API documentation for specific endpoints
- Review rate limits and usage quotas
- Ensure API keys have necessary permissions

## Roadmap

### Phase 1 (Current):
- ✅ Basic keyword research and analysis
- ✅ Content optimization tools
- ✅ Technical SEO audits
- ✅ Google Trends integration

### Phase 2 (Next):
- Advanced SERP tracking and monitoring
- Automated content optimization suggestions
- Enhanced competitor intelligence
- Custom reporting and analytics

### Phase 3 (Future):
- AI-powered content generation based on SEO data
- Automated SEO task management
- Integration with content management systems
- Advanced predictive SEO analytics

## Contributing

This SEO MCP server is designed to be extensible. You can:

1. Add new API integrations
2. Enhance existing analysis tools
3. Create custom SEO workflows
4. Integrate with additional data sources

## License

MIT License - See LICENSE file for details.

---

**Ready to supercharge your SEO workflow?** Install the SEO MCP Server and start leveraging professional SEO tools directly in your AI assistant conversations!