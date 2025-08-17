# SEO MCP Server Usage Guide

## How to Integrate with Your Current SEO Workflow

### 1. Content Creation & Optimization

#### Before Writing New Content:
```
Use keyword_research tool:
- Input: "business process automation"
- Get: trending keywords, search volumes, related terms
- Result: Data-driven content planning
```

#### While Writing Content:
```
Use content_analysis tool:
- Input: Your draft URL or content
- Get: SEO optimization suggestions
- Result: Real-time content improvements
```

#### After Publishing:
```
Use page_seo_audit tool:
- Input: Published page URL
- Get: Technical SEO checklist
- Result: Post-publish optimization tasks
```

### 2. Competitive Intelligence

#### Monthly Competitor Analysis:
```
Use competitor_analysis tool:
- Input: Your domain + 3-5 competitors
- Get: Keyword gaps, content opportunities
- Result: Strategic content calendar
```

#### Quarterly Backlink Review:
```
Use backlink_analysis tool:
- Input: Your domain + competitor domains
- Get: Link building opportunities
- Result: Outreach target list
```

### 3. Trend Monitoring & Keyword Discovery

#### Weekly Trend Check:
```
Use trending_keywords tool:
- Input: Your core industry keywords
- Get: Emerging trends and topics
- Result: Timely content opportunities
```

#### SERP Position Monitoring:
```
Use serp_analysis tool:
- Input: Target keywords
- Get: Current ranking landscape
- Result: Competitive positioning insights
```

## Integration with Your Current Blog Content

### For Azoth Automations Website:

#### 1. Optimize Existing Pillar Pages:
```bash
# Example: Analyze your AI Document Management pillar
content_analysis:
  url: "https://yourdomain.com/blog/ai-document-management-system"
  target_keyword: "AI document management"
```

#### 2. Find New Keyword Opportunities:
```bash
# Discover related keywords for your automation content
keyword_research:
  keyword: "workflow automation"
  country: "US"
```

#### 3. Competitive Analysis:
```bash
# Analyze automation industry competitors
competitor_analysis:
  domain: "yourdomain.com"
  competitor_domains: ["zapier.com", "make.com", "nintex.com"]
  keywords: ["workflow automation", "business process automation"]
```

## API Key Setup Instructions

### 1. Authoritas API (Free Tier)
1. Go to [authoritas.com](https://www.authoritas.com)
2. Sign up for free account
3. Navigate to API section
4. Generate API key
5. Add to `.env` file: `AUTHORITAS_API_KEY=your_key_here`

**Free Tier Includes:**
- 1,000 keyword lookups/month
- SERP position tracking
- Basic competitor analysis

### 2. SEO Review Tools API (Free)
1. Visit [seoreviewtools.com](https://www.seoreviewtools.com)
2. Register for free API access
3. Get API key from dashboard
4. Add to `.env` file: `SEO_REVIEW_TOOLS_API_KEY=your_key_here`

**Free Features:**
- Page SEO audits
- Meta tag analysis
- Technical SEO checks
- Keyword density analysis

### 3. CognitiveSEO API (Free Tier)
1. Sign up at [cognitiveseo.com](https://cognitiveseo.com)
2. Access free tier (limited credits)
3. Generate API key
4. Add to `.env` file: `COGNITIVESEO_API_KEY=your_key_here`

**Free Tier Includes:**
- 1,000 backlink checks/month
- Basic competitor backlink analysis
- Social metrics tracking

## Workflow Examples

### Daily SEO Tasks:
1. **Morning Trend Check**: Use `trending_keywords` to spot opportunities
2. **Content Review**: Use `content_analysis` on yesterday's published content
3. **Quick Audits**: Use `page_seo_audit` on important pages

### Weekly SEO Review:
1. **Keyword Research**: Expand keyword lists for next week's content
2. **Competitor Monitoring**: Check what competitors are ranking for
3. **Technical SEO**: Audit key pages for technical issues

### Monthly SEO Strategy:
1. **Comprehensive Analysis**: Full competitor analysis and keyword gap study
2. **Backlink Review**: Analyze link building opportunities
3. **Content Planning**: Use insights to plan next month's content calendar

## Advanced Use Cases

### 1. Content Gap Analysis:
```bash
# Find content opportunities your competitors cover but you don't
competitor_analysis:
  domain: "yourdomain.com"
  competitor_domains: ["competitor1.com", "competitor2.com"]
  keywords: ["your", "target", "keywords"]
```

### 2. SERP Feature Optimization:
```bash
# Analyze SERP features for featured snippet opportunities
serp_analysis:
  keyword: "how to automate business processes"
  search_engine: "google"
```

### 3. Seasonal Trend Planning:
```bash
# Plan content around seasonal trends
trending_keywords:
  keyword: "business automation"
  timeframe: "past-year"
  geo: "US"
```

## Troubleshooting Common Issues

### Rate Limits:
- **Problem**: API calls failing due to rate limits
- **Solution**: Upgrade to paid API tiers or spread requests over time
- **Prevention**: Monitor API usage in .env file

### Missing Data:
- **Problem**: Some tools return limited data
- **Solution**: Ensure API keys are configured correctly
- **Alternative**: Use tools without API keys for basic analysis

### Network Timeouts:
- **Problem**: Slow API responses or timeouts
- **Solution**: Check internet connection and API status
- **Workaround**: Retry failed requests or use cached data

## ROI Measurement

### Track These Metrics:
1. **Keyword Rankings**: Monitor improvements in target keyword positions
2. **Organic Traffic**: Measure traffic increases from optimized content
3. **Content Performance**: Track engagement on SEO-optimized articles
4. **Competitive Position**: Monitor market share in search results

### Expected Results:
- **Week 1-2**: Improved keyword targeting and content optimization
- **Month 1**: Better technical SEO scores and content structure
- **Month 2-3**: Improved search rankings for target keywords
- **Month 3+**: Increased organic traffic and competitive positioning

## Integration with Existing Tools

### Google Analytics:
- Use SEO insights to validate GA data
- Cross-reference keyword performance with traffic data

### Google Search Console:
- Compare SERP analysis with actual ranking data
- Validate keyword opportunities with search query data

### Content Management:
- Use keyword research to inform content calendar
- Apply technical SEO recommendations to CMS templates

---

**Ready to revolutionize your SEO workflow?** Start with basic keyword research and gradually incorporate more advanced features as you become familiar with the tools.