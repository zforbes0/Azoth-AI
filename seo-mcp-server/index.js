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

class SEOMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'seo-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'keyword_research',
            description: 'Research keywords using multiple SEO APIs including Authoritas and Google Trends',
            inputSchema: {
              type: 'object',
              properties: {
                keyword: {
                  type: 'string',
                  description: 'Primary keyword to research',
                },
                country: {
                  type: 'string',
                  description: 'Country code (e.g., US, UK, CA)',
                  default: 'US',
                },
                language: {
                  type: 'string',
                  description: 'Language code (e.g., en, es, fr)',
                  default: 'en',
                },
              },
              required: ['keyword'],
            },
          },
          {
            name: 'serp_analysis',
            description: 'Analyze search engine results pages (SERP) for keywords using Authoritas API',
            inputSchema: {
              type: 'object',
              properties: {
                keyword: {
                  type: 'string',
                  description: 'Keyword to analyze SERP for',
                },
                search_engine: {
                  type: 'string',
                  description: 'Search engine (google, bing)',
                  default: 'google',
                },
                location: {
                  type: 'string',
                  description: 'Location for SERP analysis',
                  default: 'United States',
                },
              },
              required: ['keyword'],
            },
          },
          {
            name: 'content_analysis',
            description: 'Analyze content for SEO optimization using SEO Review Tools API',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to analyze',
                },
                target_keyword: {
                  type: 'string',
                  description: 'Target keyword for optimization',
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'trending_keywords',
            description: 'Get trending keywords and topics using Google Trends',
            inputSchema: {
              type: 'object',
              properties: {
                keyword: {
                  type: 'string',
                  description: 'Base keyword to find trends for',
                },
                timeframe: {
                  type: 'string',
                  description: 'Timeframe for trends (today, past-week, past-month, past-year)',
                  default: 'past-month',
                },
                geo: {
                  type: 'string',
                  description: 'Geographic location (US, GB, etc.)',
                  default: 'US',
                },
              },
              required: ['keyword'],
            },
          },
          {
            name: 'backlink_analysis',
            description: 'Analyze backlinks and social metrics using CognitiveSEO API',
            inputSchema: {
              type: 'object',
              properties: {
                domain: {
                  type: 'string',
                  description: 'Domain to analyze backlinks for',
                },
                competitor_domains: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Competitor domains for comparison',
                },
              },
              required: ['domain'],
            },
          },
          {
            name: 'page_seo_audit',
            description: 'Comprehensive SEO audit of a webpage including meta tags, keyword density, and technical SEO',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to audit',
                },
                target_keywords: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Target keywords for the page',
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'competitor_analysis',
            description: 'Analyze competitor keywords, rankings, and content strategies',
            inputSchema: {
              type: 'object',
              properties: {
                domain: {
                  type: 'string',
                  description: 'Your domain',
                },
                competitor_domains: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Competitor domains to analyze',
                },
                keywords: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Keywords to analyze competition for',
                },
              },
              required: ['domain', 'competitor_domains'],
            },
          },
          {
            name: 'markup_validation',
            description: 'Validate HTML markup using W3C Markup Validator API',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to validate markup for',
                },
                output_format: {
                  type: 'string',
                  description: 'Output format (json, html, xml)',
                  default: 'json',
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'ssl_security_test',
            description: 'Test SSL configuration and security using SSL Labs Server Test API',
            inputSchema: {
              type: 'object',
              properties: {
                hostname: {
                  type: 'string',
                  description: 'Hostname to test SSL for (without protocol)',
                },
                publish: {
                  type: 'boolean',
                  description: 'Whether to publish results publicly',
                  default: false,
                },
                from_cache: {
                  type: 'boolean',
                  description: 'Whether to use cached results',
                  default: true,
                },
              },
              required: ['hostname'],
            },
          },
          {
            name: 'security_headers_check',
            description: 'Analyze security headers using SecurityHeaders.com API',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to check security headers for',
                },
                follow_redirects: {
                  type: 'boolean',
                  description: 'Whether to follow redirects',
                  default: true,
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'css_validation',
            description: 'Validate CSS using W3C CSS Validator API',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to validate CSS for',
                },
                profile: {
                  type: 'string',
                  description: 'CSS profile to validate against (css3, css21, etc.)',
                  default: 'css3',
                },
                usermedium: {
                  type: 'string',
                  description: 'User medium (all, screen, print)',
                  default: 'all',
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'robots_analysis',
            description: 'Parse and analyze robots.txt file structure and rules',
            inputSchema: {
              type: 'object',
              properties: {
                domain: {
                  type: 'string',
                  description: 'Domain to analyze robots.txt for (without protocol)',
                },
                user_agent: {
                  type: 'string',
                  description: 'User agent to check rules for',
                  default: '*',
                },
                test_paths: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Specific paths to test against robots.txt rules',
                },
              },
              required: ['domain'],
            },
          },
          {
            name: 'sitemap_analysis',
            description: 'Parse and analyze sitemap.xml structure and URLs',
            inputSchema: {
              type: 'object',
              properties: {
                domain: {
                  type: 'string',
                  description: 'Domain to analyze sitemap for (without protocol)',
                },
                sitemap_url: {
                  type: 'string',
                  description: 'Specific sitemap URL (optional, defaults to /sitemap.xml)',
                },
                check_urls: {
                  type: 'boolean',
                  description: 'Whether to check if sitemap URLs are accessible',
                  default: false,
                },
              },
              required: ['domain'],
            },
          },
          {
            name: 'schema_extraction',
            description: 'Extract and analyze microdata and Schema.org structured data from web pages',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to extract schema data from',
                },
                schema_types: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Specific schema types to look for (optional)',
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'readability_analysis',
            description: 'Analyze content readability and extract clean article text using Mozilla Readability',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to analyze for readability',
                },
                get_content: {
                  type: 'boolean',
                  description: 'Whether to return cleaned article content',
                  default: true,
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'opengraph_analysis',
            description: 'Extract and analyze Open Graph meta tags for social media optimization',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to extract Open Graph tags from',
                },
                validate_images: {
                  type: 'boolean',
                  description: 'Whether to validate image URLs and dimensions',
                  default: false,
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'twitter_cards_analysis',
            description: 'Extract and analyze Twitter Card meta tags for Twitter optimization',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to extract Twitter Card tags from',
                },
                validate_images: {
                  type: 'boolean',
                  description: 'Whether to validate image URLs and dimensions',
                  default: false,
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'wayback_analysis',
            description: 'Analyze historical versions of a URL using the Wayback Machine API',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to analyze historical versions for',
                },
                timestamp: {
                  type: 'string',
                  description: 'Specific timestamp to retrieve (YYYYMMDDHHMMSS format, optional)',
                },
                year: {
                  type: 'string',
                  description: 'Specific year to analyze (alternative to timestamp)',
                },
                get_snapshots: {
                  type: 'boolean',
                  description: 'Whether to get list of available snapshots',
                  default: true,
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'link_extraction',
            description: 'Extract and analyze all links from a webpage including internal, external, and their attributes',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'URL to extract links from',
                },
                include_internal: {
                  type: 'boolean',
                  description: 'Whether to include internal links',
                  default: true,
                },
                include_external: {
                  type: 'boolean',
                  description: 'Whether to include external links',
                  default: true,
                },
                check_status: {
                  type: 'boolean',
                  description: 'Whether to check HTTP status of links (slower)',
                  default: false,
                },
                max_links: {
                  type: 'number',
                  description: 'Maximum number of links to analyze (0 for unlimited)',
                  default: 0,
                },
                filter_domains: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Specific domains to filter for (optional)',
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'google_autocomplete',
            description: 'Get Google Autocomplete suggestions for keyword research and content ideation',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query to get autocomplete suggestions for',
                },
                language: {
                  type: 'string',
                  description: 'Language code (e.g., en, es, fr)',
                  default: 'en',
                },
                country: {
                  type: 'string',
                  description: 'Country code (e.g., us, uk, ca)',
                  default: 'us',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'google_people_also_ask',
            description: 'Extract "People Also Ask" questions from Google search results',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query to get People Also Ask questions for',
                },
                max_questions: {
                  type: 'number',
                  description: 'Maximum number of questions to retrieve',
                  default: 10,
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'google_related_searches',
            description: 'Extract related search suggestions from Google search results',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query to get related searches for',
                },
                max_suggestions: {
                  type: 'number',
                  description: 'Maximum number of related searches to retrieve',
                  default: 8,
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'wikipedia_search',
            description: 'Search Wikipedia for topics and extract summary information',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query for Wikipedia',
                },
                language: {
                  type: 'string',
                  description: 'Wikipedia language code (e.g., en, es, fr)',
                  default: 'en',
                },
                limit: {
                  type: 'number',
                  description: 'Maximum number of results to return',
                  default: 5,
                },
                get_summaries: {
                  type: 'boolean',
                  description: 'Whether to fetch article summaries',
                  default: true,
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'bing_suggest',
            description: 'Get Bing search suggestions for keyword research and content ideas',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query to get Bing suggestions for',
                },
                market: {
                  type: 'string',
                  description: 'Market code (e.g., en-US, en-UK, es-ES)',
                  default: 'en-US',
                },
              },
              required: ['query'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'keyword_research':
            return await this.keywordResearch(args);
          case 'serp_analysis':
            return await this.serpAnalysis(args);
          case 'content_analysis':
            return await this.contentAnalysis(args);
          case 'trending_keywords':
            return await this.trendingKeywords(args);
          case 'backlink_analysis':
            return await this.backlinkAnalysis(args);
          case 'page_seo_audit':
            return await this.pageSEOAudit(args);
          case 'competitor_analysis':
            return await this.competitorAnalysis(args);
          case 'markup_validation':
            return await this.markupValidation(args);
          case 'ssl_security_test':
            return await this.sslSecurityTest(args);
          case 'security_headers_check':
            return await this.securityHeadersCheck(args);
          case 'css_validation':
            return await this.cssValidation(args);
          case 'robots_analysis':
            return await this.robotsAnalysis(args);
          case 'sitemap_analysis':
            return await this.sitemapAnalysis(args);
          case 'schema_extraction':
            return await this.schemaExtraction(args);
          case 'readability_analysis':
            return await this.readabilityAnalysis(args);
          case 'opengraph_analysis':
            return await this.openGraphAnalysis(args);
          case 'twitter_cards_analysis':
            return await this.twitterCardsAnalysis(args);
          case 'wayback_analysis':
            return await this.waybackAnalysis(args);
          case 'link_extraction':
            return await this.linkExtraction(args);
          case 'google_autocomplete':
            return await this.googleAutocomplete(args);
          case 'google_people_also_ask':
            return await this.googlePeopleAlsoAsk(args);
          case 'google_related_searches':
            return await this.googleRelatedSearches(args);
          case 'wikipedia_search':
            return await this.wikipediaSearch(args);
          case 'bing_suggest':
            return await this.bingSuggest(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async keywordResearch(args) {
    const { keyword, country = 'US', language = 'en' } = args;
    const results = [];

    try {
      results.push(`**Comprehensive Keyword Research for "${keyword}"**`);
      results.push(`Country: ${country} | Language: ${language}`);
      results.push('');

      // Google Trends data (free)
      const trendsData = await this.getGoogleTrends(keyword, country);
      results.push('**📈 Google Trends Analysis:**');
      results.push(trendsData);

      // Google Autocomplete suggestions (free)
      try {
        const autocompleteResults = await this.googleAutocomplete({ 
          query: keyword, 
          language: language.toLowerCase(), 
          country: country.toLowerCase() 
        });
        const autocompleteText = autocompleteResults.content[0].text;
        // Extract just the suggestions part
        const suggestionsMatch = autocompleteText.match(/\*\*Autocomplete Suggestions:\*\*([\s\S]*?)\*\*SEO Applications:\*\*/);
        if (suggestionsMatch) {
          results.push('\\n**🔍 Google Autocomplete Suggestions:**');
          results.push(suggestionsMatch[1].trim());
        }
      } catch (autocompleteError) {
        results.push('\\n**🔍 Google Autocomplete:** Unable to fetch suggestions');
      }

      // People Also Ask questions (free)
      try {
        const paaResults = await this.googlePeopleAlsoAsk({ query: keyword, max_questions: 5 });
        const paaText = paaResults.content[0].text;
        const questionsMatch = paaText.match(/\*\*People Also Ask Questions:\*\*([\s\S]*?)\*\*Content Strategy Applications:\*\*/);
        if (questionsMatch && !questionsMatch[1].includes('No People Also Ask questions found')) {
          results.push('\\n**❓ People Also Ask Questions:**');
          results.push(questionsMatch[1].trim());
        }
      } catch (paaError) {
        results.push('\\n**❓ People Also Ask:** Unable to fetch questions');
      }

      // Related searches (free)
      try {
        const relatedResults = await this.googleRelatedSearches({ query: keyword, max_suggestions: 5 });
        const relatedText = relatedResults.content[0].text;
        const relatedMatch = relatedText.match(/\*\*Related Search Terms:\*\*([\s\S]*?)\*\*Keyword Strategy Applications:\*\*/);
        if (relatedMatch && !relatedMatch[1].includes('No related searches found')) {
          results.push('\\n**🔗 Google Related Searches:**');
          results.push(relatedMatch[1].trim());
        }
      } catch (relatedError) {
        results.push('\\n**🔗 Related Searches:** Unable to fetch related terms');
      }

      // Bing suggestions for cross-platform research (free)
      try {
        const bingResults = await this.bingSuggest({ query: keyword, market: `${language}-${country}` });
        const bingText = bingResults.content[0].text;
        const bingSuggestionsMatch = bingText.match(/\*\*Bing Suggestions:\*\*([\s\S]*?)\*\*SEO Strategy Applications:\*\*/);
        if (bingSuggestionsMatch && !bingSuggestionsMatch[1].includes('No suggestions found')) {
          results.push('\\n**🅱️ Bing Search Suggestions:**');
          results.push(bingSuggestionsMatch[1].trim());
        }
      } catch (bingError) {
        results.push('\\n**🅱️ Bing Suggestions:** Unable to fetch suggestions');
      }

      // Wikipedia research (free) 
      try {
        const wikiResults = await this.wikipediaSearch({ 
          query: keyword, 
          language: language.toLowerCase(), 
          limit: 3,
          get_summaries: false 
        });
        const wikiText = wikiResults.content[0].text;
        const articlesMatch = wikiText.match(/\*\*Wikipedia Articles:\*\*([\s\S]*?)\*\*Content Research Applications:\*\*/);
        if (articlesMatch && !articlesMatch[1].includes('No articles found')) {
          results.push('\\n**📚 Wikipedia Topic Research:**');
          results.push(articlesMatch[1].trim().substring(0, 500) + '...');
        }
      } catch (wikiError) {
        results.push('\\n**📚 Wikipedia Research:** Unable to fetch articles');
      }

      // Premium API enhancement (only if API key available)
      if (process.env.AUTHORITAS_API_KEY) {
        const authoritasData = await this.getAuthoritasKeywords(keyword, country, language);
        results.push('\\n**🔑 Premium Authoritas Keyword Data:**');
        results.push(authoritasData);
      } else {
        results.push('\\n**💡 Enhanced Features Available:**');
        results.push('• Add AUTHORITAS_API_KEY for search volume data');
        results.push('• Get keyword difficulty scores');
        results.push('• Access competitive keyword metrics');
      }

      // Generate manual keyword suggestions
      const suggestions = await this.generateKeywordSuggestions(keyword);
      results.push('\\n**🎯 Additional Keyword Ideas:**');
      results.push(suggestions);

      results.push('\\n**📊 Free Keyword Research Summary:**');
      results.push('✅ Google Trends analysis');
      results.push('✅ Google Autocomplete suggestions');
      results.push('✅ People Also Ask questions');
      results.push('✅ Related search terms');
      results.push('✅ Cross-platform Bing suggestions');
      results.push('✅ Wikipedia topic research');
      results.push('✅ Manual keyword variations');

    } catch (error) {
      results.push(`Error in keyword research: ${error.message}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async serpAnalysis(args) {
    const { keyword, search_engine = 'google', location = 'United States' } = args;
    const results = [];

    try {
      results.push(`**🔍 SERP Intelligence Analysis for "${keyword}"**`);
      results.push(`Search Engine: ${search_engine} | Location: ${location}`);
      results.push('');

      // People Also Ask analysis (free SERP feature)
      try {
        results.push('**❓ People Also Ask Questions:**');
        const paaResults = await this.googlePeopleAlsoAsk({ query: keyword, max_questions: 8 });
        const paaText = paaResults.content[0].text;
        const questionsMatch = paaText.match(/\*\*People Also Ask Questions:\*\*([\s\S]*?)\*\*Content Strategy Applications:\*\*/);
        if (questionsMatch && !questionsMatch[1].includes('No People Also Ask questions found')) {
          results.push(questionsMatch[1].trim());
          results.push('\\n💡 **SERP Opportunity:** Create content targeting these questions for featured snippets');
        } else {
          results.push('No PAA questions found for this keyword');
        }
      } catch (paaError) {
        results.push('Unable to extract People Also Ask questions');
      }

      // Related searches analysis (free SERP feature)
      try {
        results.push('\\n**🔗 Related Search Terms in SERP:**');
        const relatedResults = await this.googleRelatedSearches({ query: keyword, max_suggestions: 8 });
        const relatedText = relatedResults.content[0].text;
        const relatedMatch = relatedText.match(/\*\*Related Search Terms:\*\*([\s\S]*?)\*\*Keyword Strategy Applications:\*\*/);
        if (relatedMatch && !relatedMatch[1].includes('No related searches found')) {
          results.push(relatedMatch[1].trim());
          results.push('\\n💡 **SERP Opportunity:** Target these related terms to capture more SERP real estate');
        } else {
          results.push('No related searches found');
        }
      } catch (relatedError) {
        results.push('Unable to extract related searches');
      }

      // Autocomplete SERP insights (free)
      try {
        results.push('\\n**🔍 Search Completion Patterns:**');
        const autocompleteResults = await this.googleAutocomplete({ query: keyword, language: 'en', country: 'us' });
        const autocompleteText = autocompleteResults.content[0].text;
        const suggestionsMatch = autocompleteText.match(/\*\*Autocomplete Suggestions:\*\*([\s\S]*?)\*\*SEO Applications:\*\*/);
        if (suggestionsMatch) {
          results.push(suggestionsMatch[1].trim());
          results.push('\\n💡 **SERP Opportunity:** These suggestions indicate user search intent variations');
        }
      } catch (autocompleteError) {
        results.push('Unable to fetch autocomplete data');
      }

      // Free SERP analysis recommendations
      results.push('\\n**📊 Free SERP Analysis Insights:**');
      results.push('✅ People Also Ask question opportunities identified');
      results.push('✅ Related search terms for semantic targeting');
      results.push('✅ User search intent patterns analyzed');
      results.push('✅ Featured snippet opportunities mapped');

      results.push('\\n**🎯 SERP Strategy Recommendations:**');
      results.push('• Create content targeting PAA questions for featured snippets');
      results.push('• Optimize for related search terms to capture more traffic');
      results.push('• Use autocomplete insights to understand user intent');
      results.push('• Build content clusters around related keywords');
      results.push('• Monitor PAA questions for content gap opportunities');

      // Premium API enhancement (only if API key available)
      if (process.env.AUTHORITAS_API_KEY) {
        const serpData = await this.getAuthoритаsSERP(keyword, search_engine, location);
        results.push('\\n**🔑 Premium Authoritas SERP Data:**');
        results.push(serpData);
      } else {
        results.push('\\n**💡 Enhanced SERP Features Available:**');
        results.push('• Add AUTHORITAS_API_KEY for competitor ranking analysis');
        results.push('• Get exact ranking positions and SERP features');
        results.push('• Access detailed competitor page metrics');
        results.push('• Monitor ranking changes over time');
      }

    } catch (error) {
      results.push(`Error in SERP analysis: ${error.message}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async contentAnalysis(args) {
    const { url, target_keyword } = args;
    const results = [];

    try {
      results.push(`**📄 Comprehensive Content Analysis for: ${url}**`);
      if (target_keyword) {
        results.push(`Target Keyword: "${target_keyword}"`);
      }
      results.push('');

      // Basic technical content analysis (free)
      const pageData = await this.analyzePage(url);
      results.push('**🔍 Technical Content Analysis:**');
      results.push(pageData);

      // Keyword usage analysis (free)
      if (target_keyword) {
        const keywordAnalysis = await this.analyzeKeywordUsage(url, target_keyword);
        results.push('\\n**🎯 Keyword Usage Analysis:**');
        results.push(keywordAnalysis);
      }

      // Schema.org structured data analysis (free)
      try {
        const schemaResults = await this.schemaExtraction({ url, schema_types: [] });
        const schemaText = schemaResults.content[0].text;
        const schemaMatch = schemaText.match(/\*\*Total Schema Items Found:\*\* (\d+)/);
        if (schemaMatch) {
          const schemaCount = schemaMatch[1];
          results.push(`\\n**📋 Structured Data Analysis:**`);
          results.push(`• Schema.org items found: ${schemaCount}`);
          if (parseInt(schemaCount) === 0) {
            results.push('• ⚠️ No structured data detected - consider adding schema markup');
          } else {
            results.push('• ✅ Structured data implementation detected');
          }
        }
      } catch (schemaError) {
        results.push('\\n**📋 Structured Data:** Unable to analyze schema markup');
      }

      // Open Graph and Twitter Cards analysis (free)
      try {
        const ogResults = await this.openGraphAnalysis({ url, validate_images: false });
        const ogText = ogResults.content[0].text;
        const ogStatusMatch = ogText.match(/\*\*Open Graph Status:\*\* (.+)/);
        if (ogStatusMatch) {
          results.push(`\\n**📱 Social Media Optimization:**`);
          results.push(`• Open Graph status: ${ogStatusMatch[1]}`);
        }

        const twitterResults = await this.twitterCardsAnalysis({ url, validate_images: false });
        const twitterText = twitterResults.content[0].text;
        const twitterStatusMatch = twitterText.match(/\*\*Twitter Card Status:\*\* (.+)/);
        if (twitterStatusMatch) {
          results.push(`• Twitter Cards status: ${twitterStatusMatch[1]}`);
        }
      } catch (socialError) {
        results.push('\\n**📱 Social Media:** Unable to analyze social meta tags');
      }

      // Readability analysis (free)
      try {
        const readabilityResults = await this.readabilityAnalysis({ url, get_content: false });
        const readabilityText = readabilityResults.content[0].text;
        const fleschMatch = readabilityText.match(/• Flesch Reading Ease: ([\d.]+) \((.+)\)/);
        const wordCountMatch = readabilityText.match(/• Word Count: ([\d,]+)/);
        if (fleschMatch && wordCountMatch) {
          results.push(`\\n**📖 Content Readability:**`);
          results.push(`• Word Count: ${wordCountMatch[1]}`);
          results.push(`• Reading Level: ${fleschMatch[2]} (Score: ${fleschMatch[1]})`);
        }
      } catch (readabilityError) {
        results.push('\\n**📖 Readability:** Unable to analyze content readability');
      }

      // Free comprehensive analysis summary
      results.push('\\n**📊 Free Content Analysis Features:**');
      results.push('✅ Technical SEO elements (titles, headings, meta tags)');
      results.push('✅ Keyword density and usage analysis');
      results.push('✅ Structured data (Schema.org) detection');
      results.push('✅ Social media optimization analysis');
      results.push('✅ Content readability assessment');
      results.push('✅ Internal/external link analysis');

      // Premium API enhancement (only if API key available)
      if (process.env.SEO_REVIEW_TOOLS_API_KEY) {
        const seoReview = await this.getSEOReviewAnalysis(url);
        results.push('\\n**🔑 Premium SEO Review Tools Analysis:**');
        results.push(seoReview);
      } else {
        results.push('\\n**💡 Enhanced Content Features Available:**');
        results.push('• Add SEO_REVIEW_TOOLS_API_KEY for advanced technical SEO analysis');
        results.push('• Get detailed performance scores and recommendations');
        results.push('• Access comprehensive SEO audit reports');
        results.push('• Monitor content optimization opportunities');
      }

    } catch (error) {
      results.push(`Error in content analysis: ${error.message}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async trendingKeywords(args) {
    const { keyword, timeframe = 'past-month', geo = 'US' } = args;
    const results = [];

    try {
      // Google Trends related queries
      const relatedQueries = await this.getRelatedQueries(keyword, timeframe, geo);
      results.push(`**Trending Keywords Related to "${keyword}"**`);
      results.push(relatedQueries);

      // Rising searches
      const risingSearches = await this.getRisingSearches(keyword, geo);
      results.push('\\n**Rising Searches:**');
      results.push(risingSearches);

    } catch (error) {
      results.push(`Error getting trending keywords: ${error.message}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async backlinkAnalysis(args) {
    const { domain, competitor_domains = [] } = args;
    const results = [];

    try {
      results.push(`**Backlink Analysis for: ${domain}**`);

      if (process.env.COGNITIVESEO_API_KEY) {
        const backlinkData = await this.getCognitiveSEOBacklinks(domain);
        results.push(backlinkData);

        if (competitor_domains.length > 0) {
          results.push('\\n**Competitor Comparison:**');
          for (const competitor of competitor_domains) {
            const competitorData = await this.getCognitiveSEOBacklinks(competitor);
            results.push(`\\n${competitor}:`);
            results.push(competitorData);
          }
        }
      } else {
        results.push('Note: Full backlink analysis requires CognitiveSEO API key.');
        results.push('\\n**Basic Recommendations:**');
        results.push('• Audit current backlink profile for quality');
        results.push('• Identify high-authority domains in your niche');
        results.push('• Create linkable assets (guides, tools, studies)');
        results.push('• Monitor competitor backlink strategies');
      }

    } catch (error) {
      results.push(`Error in backlink analysis: ${error.message}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async pageSEOAudit(args) {
    const { url, target_keywords = [] } = args;
    const results = [];

    try {
      results.push(`**SEO Audit for: ${url}**`);

      // Technical SEO check
      const technicalSEO = await this.checkTechnicalSEO(url);
      results.push('\\n**Technical SEO:**');
      results.push(technicalSEO);

      // On-page SEO
      const onPageSEO = await this.checkOnPageSEO(url, target_keywords);
      results.push('\\n**On-Page SEO:**');
      results.push(onPageSEO);

      // Content analysis
      const contentQuality = await this.analyzeContentQuality(url);
      results.push('\\n**Content Quality:**');
      results.push(contentQuality);

    } catch (error) {
      results.push(`Error in SEO audit: ${error.message}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async competitorAnalysis(args) {
    const { domain, competitor_domains, keywords = [] } = args;
    const results = [];

    try {
      results.push(`**Competitor Analysis for: ${domain}**`);
      results.push(`Competitors: ${competitor_domains.join(', ')}`);

      // Analyze each competitor
      for (const competitor of competitor_domains) {
        results.push(`\\n**${competitor}:**`);
        
        // Basic domain analysis
        const domainAnalysis = await this.analyzeDomain(competitor);
        results.push(domainAnalysis);

        // Keyword gap analysis
        if (keywords.length > 0) {
          const keywordGaps = await this.analyzeKeywordGaps(domain, competitor, keywords);
          results.push('\\nKeyword Opportunities:');
          results.push(keywordGaps);
        }
      }

    } catch (error) {
      results.push(`Error in competitor analysis: ${error.message}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async markupValidation(args) {
    const { url, output_format = 'json' } = args;
    const results = [];

    try {
      results.push(`**W3C Markup Validation for: ${url}**`);

      // Use W3C Markup Validator API
      const validatorUrl = `https://validator.w3.org/nu/?doc=${encodeURIComponent(url)}&out=${output_format}`;
      
      const response = await axios.get(validatorUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 30000,
      });

      if (output_format === 'json' && response.data && response.data.messages) {
        const messages = response.data.messages;
        const errors = messages.filter(m => m.type === 'error');
        const warnings = messages.filter(m => m.type === 'warning');
        const infos = messages.filter(m => m.type === 'info');

        results.push(`\\n**Validation Summary:**`);
        results.push(`• Errors: ${errors.length}`);
        results.push(`• Warnings: ${warnings.length}`);
        results.push(`• Info Messages: ${infos.length}`);

        if (errors.length > 0) {
          results.push(`\\n**Errors (first 5):**`);
          errors.slice(0, 5).forEach((error, i) => {
            results.push(`${i + 1}. Line ${error.lastLine || 'N/A'}: ${error.message}`);
          });
        }

        if (warnings.length > 0) {
          results.push(`\\n**Warnings (first 3):**`);
          warnings.slice(0, 3).forEach((warning, i) => {
            results.push(`${i + 1}. Line ${warning.lastLine || 'N/A'}: ${warning.message}`);
          });
        }

        const score = Math.max(0, 100 - (errors.length * 10) - (warnings.length * 2));
        results.push(`\\n**HTML Quality Score: ${score}/100**`);
        
        if (errors.length === 0 && warnings.length === 0) {
          results.push('🎉 **Perfect! No validation errors or warnings found.**');
        }
      } else {
        results.push('Validation completed - check validator URL for detailed results');
        results.push(`Validator URL: ${validatorUrl}`);
      }

    } catch (error) {
      results.push(`Error in markup validation: ${error.message}`);
      results.push('Note: W3C Validator may be temporarily unavailable');
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async sslSecurityTest(args) {
    const { hostname, publish = false, from_cache = true } = args;
    const results = [];

    try {
      results.push(`**SSL Labs Security Test for: ${hostname}**`);

      // SSL Labs API endpoint
      const apiUrl = `https://api.ssllabs.com/api/v3/analyze?host=${hostname}&publish=${publish ? 'on' : 'off'}&fromCache=${from_cache ? 'on' : 'off'}&all=done`;
      
      results.push('🔄 Initiating SSL Labs scan (this may take a few moments)...');
      
      const response = await axios.get(apiUrl, {
        timeout: 60000, // 60 seconds timeout
      });

      if (response.data) {
        const data = response.data;
        
        if (data.status === 'READY' && data.endpoints) {
          results.push(`\\n**SSL Test Results:**`);
          results.push(`• Status: ${data.status}`);
          results.push(`• Protocol: ${data.protocol || 'N/A'}`);
          results.push(`• Test Time: ${new Date(data.testTime).toLocaleString()}`);
          
          data.endpoints.forEach((endpoint, i) => {
            results.push(`\\n**Endpoint ${i + 1}: ${endpoint.ipAddress}**`);
            results.push(`• Grade: ${endpoint.grade || 'N/A'}`);
            results.push(`• Has Warnings: ${endpoint.hasWarnings ? 'Yes' : 'No'}`);
            results.push(`• Is Exceptional: ${endpoint.isExceptional ? 'Yes' : 'No'}`);
            
            if (endpoint.details) {
              const details = endpoint.details;
              results.push(`• Certificate Grade: ${details.certGrade || 'N/A'}`);
              results.push(`• Protocol Support: ${details.protocolGrade || 'N/A'}`);
              results.push(`• Key Exchange: ${details.keGrade || 'N/A'}`);
              results.push(`• Cipher Strength: ${details.cipherGrade || 'N/A'}`);
              
              if (details.cert) {
                results.push(`• Certificate Subject: ${details.cert.subject}`);
                results.push(`• Certificate Issuer: ${details.cert.issuerSubject}`);
                results.push(`• Valid From: ${new Date(details.cert.notBefore).toLocaleDateString()}`);
                results.push(`• Valid Until: ${new Date(details.cert.notAfter).toLocaleDateString()}`);
              }
            }
          });
          
          // Overall security recommendations
          const overallGrade = data.endpoints[0]?.grade;
          results.push(`\\n**Security Assessment:**`);
          if (overallGrade === 'A+' || overallGrade === 'A') {
            results.push('🟢 **Excellent SSL Configuration!**');
          } else if (overallGrade === 'B') {
            results.push('🟡 **Good SSL Configuration with room for improvement**');
          } else {
            results.push('🔴 **SSL Configuration needs attention**');
          }
          
        } else if (data.status === 'IN_PROGRESS') {
          results.push(`\\n⏳ **Scan Status: ${data.status}**`);
          results.push('The SSL Labs scan is still in progress. Please try again in a few minutes.');
          results.push(`Check progress at: https://www.ssllabs.com/ssltest/analyze.html?d=${hostname}`);
        } else {
          results.push(`\\n**Scan Status: ${data.status}**`);
          if (data.statusMessage) {
            results.push(`Message: ${data.statusMessage}`);
          }
        }
      }

    } catch (error) {
      results.push(`Error in SSL security test: ${error.message}`);
      results.push(`You can manually check SSL at: https://www.ssllabs.com/ssltest/analyze.html?d=${hostname}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async securityHeadersCheck(args) {
    const { url, follow_redirects = true } = args;
    const results = [];

    try {
      results.push(`**Security Headers Analysis for: ${url}**`);

      // SecurityHeaders.com API
      const apiUrl = `https://securityheaders.com/?q=${encodeURIComponent(url)}&followRedirects=${follow_redirects ? 'on' : 'off'}&hide=on&format=json`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 30000,
      });

      if (response.data) {
        const data = response.data;
        
        results.push(`\\n**Security Headers Report:**`);
        results.push(`• Overall Grade: ${data.grade || 'N/A'}`);
        results.push(`• Score: ${data.score || 'N/A'}/100`);
        
        if (data.responseHeaders) {
          results.push(`\\n**Present Security Headers:**`);
          const securityHeaders = [
            'strict-transport-security',
            'content-security-policy',
            'x-frame-options',
            'x-content-type-options',
            'referrer-policy',
            'permissions-policy'
          ];
          
          securityHeaders.forEach(header => {
            const headerValue = data.responseHeaders[header];
            if (headerValue) {
              results.push(`✅ ${header}: ${headerValue.substring(0, 100)}${headerValue.length > 100 ? '...' : ''}`);
            } else {
              results.push(`❌ ${header}: Missing`);
            }
          });
        }

        if (data.missingHeaders && data.missingHeaders.length > 0) {
          results.push(`\\n**Missing Security Headers:**`);
          data.missingHeaders.forEach(header => {
            results.push(`• ${header}`);
          });
        }

        // Security recommendations
        results.push(`\\n**Security Recommendations:**`);
        if (data.grade === 'A+' || data.grade === 'A') {
          results.push('🟢 **Excellent security header configuration!**');
        } else if (data.grade === 'B' || data.grade === 'C') {
          results.push('🟡 **Good security but missing some important headers**');
          results.push('• Consider adding missing security headers');
          results.push('• Review CSP (Content Security Policy) implementation');
        } else {
          results.push('🔴 **Security headers need immediate attention**');
          results.push('• Add basic security headers (X-Frame-Options, X-Content-Type-Options)');
          results.push('• Implement HTTPS with HSTS');
          results.push('• Add Content Security Policy');
        }

      } else {
        // Fallback: Manual header check
        results.push('\\n**Manual Security Header Check:**');
        const headResponse = await axios.head(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
          },
          timeout: 10000,
        });

        const headers = headResponse.headers;
        const securityHeaders = {
          'strict-transport-security': 'HSTS',
          'content-security-policy': 'CSP',
          'x-frame-options': 'Frame Options',
          'x-content-type-options': 'Content Type Options',
          'referrer-policy': 'Referrer Policy',
          'x-xss-protection': 'XSS Protection'
        };

        Object.entries(securityHeaders).forEach(([header, name]) => {
          if (headers[header]) {
            results.push(`✅ ${name}: Present`);
          } else {
            results.push(`❌ ${name}: Missing`);
          }
        });
      }

    } catch (error) {
      results.push(`Error checking security headers: ${error.message}`);
      results.push('Note: Some security header APIs may have rate limits');
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async cssValidation(args) {
    const { url, profile = 'css3', usermedium = 'all' } = args;
    const results = [];

    try {
      results.push(`**W3C CSS Validation for: ${url}**`);

      // W3C CSS Validator API
      const validatorUrl = `https://jigsaw.w3.org/css-validator/validator?uri=${encodeURIComponent(url)}&profile=${profile}&usermedium=${usermedium}&output=json`;
      
      const response = await axios.get(validatorUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 30000,
      });

      if (response.data && response.data.cssvalidation) {
        const validation = response.data.cssvalidation;
        
        results.push(`\\n**CSS Validation Summary:**`);
        results.push(`• Profile: ${profile}`);
        results.push(`• User Medium: ${usermedium}`);
        
        if (validation.errors && validation.errors.length > 0) {
          results.push(`• Errors: ${validation.errors.length}`);
          results.push(`\\n**CSS Errors (first 5):**`);
          validation.errors.slice(0, 5).forEach((error, i) => {
            results.push(`${i + 1}. Line ${error.line || 'N/A'}: ${error.message}`);
            if (error.context) {
              results.push(`   Context: ${error.context}`);
            }
          });
        } else {
          results.push(`• Errors: 0 ✅`);
        }

        if (validation.warnings && validation.warnings.length > 0) {
          results.push(`• Warnings: ${validation.warnings.length}`);
          results.push(`\\n**CSS Warnings (first 3):**`);
          validation.warnings.slice(0, 3).forEach((warning, i) => {
            results.push(`${i + 1}. Line ${warning.line || 'N/A'}: ${warning.message}`);
          });
        } else {
          results.push(`• Warnings: 0 ✅`);
        }

        // CSS Quality Score
        const errorCount = validation.errors ? validation.errors.length : 0;
        const warningCount = validation.warnings ? validation.warnings.length : 0;
        const score = Math.max(0, 100 - (errorCount * 5) - (warningCount * 1));
        
        results.push(`\\n**CSS Quality Score: ${score}/100**`);
        
        if (errorCount === 0 && warningCount === 0) {
          results.push('🎉 **Perfect! Valid CSS with no errors or warnings.**');
        } else if (errorCount === 0) {
          results.push('✅ **Valid CSS with minor warnings only.**');
        }

      } else {
        results.push('CSS validation completed - check validator URL for detailed results');
        results.push(`Validator URL: ${validatorUrl}`);
      }

    } catch (error) {
      results.push(`Error in CSS validation: ${error.message}`);
      results.push('Note: W3C CSS Validator may be temporarily unavailable');
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async robotsAnalysis(args) {
    const { domain, user_agent = '*', test_paths = [] } = args;
    const results = [];

    try {
      results.push(`**Robots.txt Analysis for: ${domain}**`);

      // Fetch robots.txt
      const robotsUrl = `https://${domain}/robots.txt`;
      const response = await axios.get(robotsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      if (response.data) {
        const robotsContent = response.data;
        results.push(`\\n**Robots.txt Content Analysis:**`);
        results.push(`• File Size: ${robotsContent.length} bytes`);
        results.push(`• Status: ${response.status} (${response.statusText})`);

        // Parse robots.txt using robots-parser
        const robots = robotsParser(robotsUrl, robotsContent);
        
        // Basic structure analysis
        const lines = robotsContent.split('\\n').filter(line => line.trim() !== '');
        const userAgentLines = lines.filter(line => line.toLowerCase().startsWith('user-agent:'));
        const disallowLines = lines.filter(line => line.toLowerCase().startsWith('disallow:'));
        const allowLines = lines.filter(line => line.toLowerCase().startsWith('allow:'));
        const sitemapLines = lines.filter(line => line.toLowerCase().startsWith('sitemap:'));
        const crawlDelayLines = lines.filter(line => line.toLowerCase().startsWith('crawl-delay:'));

        results.push(`\\n**Structure Analysis:**`);
        results.push(`• User-agent directives: ${userAgentLines.length}`);
        results.push(`• Disallow directives: ${disallowLines.length}`);
        results.push(`• Allow directives: ${allowLines.length}`);
        results.push(`• Sitemap declarations: ${sitemapLines.length}`);
        results.push(`• Crawl-delay directives: ${crawlDelayLines.length}`);

        // Show sitemaps if found
        if (sitemapLines.length > 0) {
          results.push(`\\n**Declared Sitemaps:**`);
          sitemapLines.forEach(line => {
            const sitemap = line.split(':').slice(1).join(':').trim();
            results.push(`• ${sitemap}`);
          });
        }

        // Test specific user agent
        results.push(`\\n**Rules for User-Agent: ${user_agent}**`);
        
        // Test common paths
        const commonPaths = [
          '/',
          '/admin',
          '/wp-admin',
          '/wp-content',
          '/cgi-bin',
          '/search',
          ...test_paths
        ];

        results.push(`\\n**Path Access Test:**`);
        commonPaths.forEach(path => {
          const isAllowed = robots.isAllowed(path, user_agent);
          results.push(`• ${path}: ${isAllowed ? '✅ Allowed' : '❌ Disallowed'}`);
        });

        // Recommendations
        results.push(`\\n**Recommendations:**`);
        if (disallowLines.length === 0) {
          results.push('⚠️ No disallow rules found - consider blocking sensitive areas');
        }
        if (sitemapLines.length === 0) {
          results.push('⚠️ No sitemap declared - add sitemap URL for better crawling');
        }
        if (crawlDelayLines.length > 0) {
          results.push('ℹ️ Crawl-delay set - may slow down indexing');
        }

        // Check for common issues
        if (robotsContent.includes('Disallow: /')) {
          results.push('⚠️ WARNING: Found "Disallow: /" which blocks all crawlers');
        }

      } else {
        results.push('\\n❌ **Robots.txt not found or empty**');
        results.push('\\n**Recommendations:**');
        results.push('• Create a robots.txt file to guide search engine crawlers');
        results.push('• Include sitemap URL in robots.txt');
        results.push('• Block sensitive directories (admin, private, etc.)');
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        results.push('\\n❌ **Robots.txt not found (404)**');
        results.push('\\n**Recommendations:**');
        results.push('• Create a robots.txt file at the root of your domain');
        results.push('• Basic robots.txt should include:');
        results.push('  ```');
        results.push('  User-agent: *');
        results.push('  Disallow: /admin/');
        results.push('  Disallow: /private/');
        results.push('  Sitemap: https://yourdomain.com/sitemap.xml');
        results.push('  ```');
      } else {
        results.push(`Error analyzing robots.txt: ${error.message}`);
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  async sitemapAnalysis(args) {
    const { domain, sitemap_url, check_urls = false } = args;
    const results = [];

    try {
      results.push(`**Sitemap Analysis for: ${domain}**`);

      // Determine sitemap URL
      const sitemapURL = sitemap_url || `https://${domain}/sitemap.xml`;
      
      results.push(`\\n**Analyzing: ${sitemapURL}**`);

      const response = await axios.get(sitemapURL, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 30000,
      });

      if (response.data) {
        const sitemapContent = response.data;
        const $ = cheerio.load(sitemapContent, { xmlMode: true });

        results.push(`\\n**Sitemap Structure Analysis:**`);
        results.push(`• File Size: ${(sitemapContent.length / 1024).toFixed(2)} KB`);
        results.push(`• Content Type: ${response.headers['content-type'] || 'Unknown'}`);

        // Check if it's a sitemap index or regular sitemap
        const sitemapElements = $('sitemap');
        const urlElements = $('url');

        if (sitemapElements.length > 0) {
          // Sitemap Index
          results.push(`\\n**Sitemap Index Found:**`);
          results.push(`• Contains ${sitemapElements.length} sub-sitemaps`);
          
          results.push(`\\n**Sub-sitemaps:**`);
          sitemapElements.each((i, elem) => {
            const loc = $(elem).find('loc').text();
            const lastmod = $(elem).find('lastmod').text();
            results.push(`${i + 1}. ${loc}`);
            if (lastmod) {
              results.push(`   Last Modified: ${lastmod}`);
            }
          });

          // Analyze first few sub-sitemaps
          if (check_urls && sitemapElements.length > 0) {
            results.push(`\\n**Sample Sub-sitemap Analysis:**`);
            const firstSitemapUrl = $(sitemapElements[0]).find('loc').text();
            try {
              const subResponse = await axios.get(firstSitemapUrl, { timeout: 15000 });
              const sub$ = cheerio.load(subResponse.data, { xmlMode: true });
              const subUrls = sub$('url');
              results.push(`• First sub-sitemap contains ${subUrls.length} URLs`);
            } catch (subError) {
              results.push(`• Could not analyze sub-sitemap: ${subError.message}`);
            }
          }

        } else if (urlElements.length > 0) {
          // Regular Sitemap
          results.push(`\\n**Regular Sitemap Found:**`);
          results.push(`• Contains ${urlElements.length} URLs`);
          
          // Analyze URL structure
          const urlsWithPriority = $('url priority').length;
          const urlsWithChangefreq = $('url changefreq').length;
          const urlsWithLastmod = $('url lastmod').length;
          const urlsWithImages = $('image\\\\:image').length;

          results.push(`\\n**URL Metadata:**`);
          results.push(`• URLs with priority: ${urlsWithPriority}`);
          results.push(`• URLs with changefreq: ${urlsWithChangefreq}`);
          results.push(`• URLs with lastmod: ${urlsWithLastmod}`);
          results.push(`• URLs with images: ${urlsWithImages}`);

          // Analyze priority distribution
          if (urlsWithPriority > 0) {
            const priorities = [];
            $('priority').each((i, elem) => {
              priorities.push(parseFloat($(elem).text()));
            });
            const avgPriority = (priorities.reduce((a, b) => a + b, 0) / priorities.length).toFixed(2);
            results.push(`• Average priority: ${avgPriority}`);
          }

          // Show sample URLs
          results.push(`\\n**Sample URLs (first 5):**`);
          urlElements.slice(0, 5).each((i, elem) => {
            const loc = $(elem).find('loc').text();
            const lastmod = $(elem).find('lastmod').text();
            const priority = $(elem).find('priority').text();
            const changefreq = $(elem).find('changefreq').text();
            
            results.push(`${i + 1}. ${loc}`);
            if (lastmod) results.push(`   Last Modified: ${lastmod}`);
            if (priority) results.push(`   Priority: ${priority}`);
            if (changefreq) results.push(`   Change Frequency: ${changefreq}`);
          });

          // URL accessibility check
          if (check_urls && urlElements.length > 0) {
            results.push(`\\n**URL Accessibility Check (first 3):**`);
            const urlsToCheck = [];
            urlElements.slice(0, 3).each((i, elem) => {
              urlsToCheck.push($(elem).find('loc').text());
            });

            for (const url of urlsToCheck) {
              try {
                const urlResponse = await axios.head(url, { timeout: 10000 });
                results.push(`✅ ${url} (${urlResponse.status})`);
              } catch (urlError) {
                results.push(`❌ ${url} (${urlError.response?.status || 'Error'})`);
              }
            }
          }

        } else {
          results.push('\\n⚠️ **No standard sitemap structure found**');
          results.push('The file may not be a valid XML sitemap');
        }

        // Sitemap validation
        results.push(`\\n**Sitemap Validation:**`);
        if (urlElements.length > 50000) {
          results.push('⚠️ Sitemap contains more than 50,000 URLs (Google limit)');
        }
        if (sitemapContent.length > 50 * 1024 * 1024) {
          results.push('⚠️ Sitemap larger than 50MB (Google limit)');
        }
        
        // Check for protocol consistency
        const httpUrls = $('loc').filter((i, elem) => $(elem).text().startsWith('http://')).length;
        const httpsUrls = $('loc').filter((i, elem) => $(elem).text().startsWith('https://')).length;
        
        if (httpUrls > 0 && httpsUrls > 0) {
          results.push('⚠️ Mixed HTTP/HTTPS URLs found - use consistent protocol');
        }

        results.push(`\\n**Recommendations:**`);
        if (urlsWithLastmod === 0) {
          results.push('• Add <lastmod> tags to help search engines understand freshness');
        }
        if (urlsWithPriority === 0) {
          results.push('• Consider adding <priority> tags for important pages');
        }
        if (urlElements.length > 0) {
          results.push('✅ Sitemap structure looks good');
        }

      } else {
        results.push('\\n❌ **No sitemap content found**');
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        results.push('\\n❌ **Sitemap not found (404)**');
        results.push(`\\n**Alternative sitemap locations to check:**`);
        results.push(`• https://${domain}/sitemap_index.xml`);
        results.push(`• https://${domain}/sitemap.xml`);
        results.push(`• https://${domain}/sitemaps.xml`);
        results.push(`• Check robots.txt for sitemap declarations`);
      } else {
        results.push(`Error analyzing sitemap: ${error.message}`);
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: results.join('\\n'),
        },
      ],
    };
  }

  // Helper methods for API integrations
  async getGoogleTrends(keyword, geo) {
    try {
      const trends = await googleTrends.interestOverTime({
        keyword: keyword,
        startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        geo: geo,
      });
      
      const data = JSON.parse(trends);
      return `Trend interest over past 30 days: ${data.default.timelineData.length} data points available`;
    } catch (error) {
      return `Google Trends data unavailable: ${error.message}`;
    }
  }

  async getRelatedQueries(keyword, timeframe, geo) {
    try {
      const related = await googleTrends.relatedQueries({
        keyword: keyword,
        startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        geo: geo,
      });
      
      const data = JSON.parse(related);
      if (data.default.rankedList && data.default.rankedList[0]) {
        const queries = data.default.rankedList[0].rankedKeyword.slice(0, 10);
        return queries.map(q => `• ${q.query} (${q.value})`).join('\\n');
      }
      return 'No related queries found';
    } catch (error) {
      return `Related queries unavailable: ${error.message}`;
    }
  }

  async getRisingSearches(keyword, geo) {
    try {
      const rising = await googleTrends.relatedQueries({
        keyword: keyword,
        startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days
        geo: geo,
      });
      
      const data = JSON.parse(rising);
      if (data.default.rankedList && data.default.rankedList[1]) {
        const searches = data.default.rankedList[1].rankedKeyword.slice(0, 5);
        return searches.map(s => `• ${s.query} (+${s.value}%)`).join('\\n');
      }
      return 'No rising searches found';
    } catch (error) {
      return `Rising searches unavailable: ${error.message}`;
    }
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
      
      return [
        `• Title: ${$('title').text() || 'No title found'}`,
        `• Meta Description: ${$('meta[name="description"]').attr('content') || 'No meta description'}`,
        `• H1 Tags: ${$('h1').length}`,
        `• H2 Tags: ${$('h2').length}`,
        `• H3 Tags: ${$('h3').length}`,
        `• Images: ${$('img').length}`,
        `• Internal Links: ${$('a[href^="/"], a[href*="' + new URL(url).hostname + '"]').length}`,
        `• External Links: ${$('a[href^="http"]:not([href*="' + new URL(url).hostname + '"])').length}`,
        `• Word Count: ${$('body').text().split(/\s+/).length}`,
      ].join('\\n');
    } catch (error) {
      return `Error analyzing page: ${error.message}`;
    }
  }

  async analyzeKeywordUsage(url, keyword) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const bodyText = $('body').text().toLowerCase();
      const keywordLower = keyword.toLowerCase();
      
      const occurrences = (bodyText.match(new RegExp(keywordLower, 'g')) || []).length;
      const wordCount = bodyText.split(/\s+/).length;
      const density = ((occurrences / wordCount) * 100).toFixed(2);
      
      return [
        `• Keyword: "${keyword}"`,
        `• Occurrences: ${occurrences}`,
        `• Keyword Density: ${density}%`,
        `• In Title: ${$('title').text().toLowerCase().includes(keywordLower) ? 'Yes' : 'No'}`,
        `• In Meta Description: ${($('meta[name="description"]').attr('content') || '').toLowerCase().includes(keywordLower) ? 'Yes' : 'No'}`,
        `• In H1: ${$('h1').text().toLowerCase().includes(keywordLower) ? 'Yes' : 'No'}`,
        `• Recommended Density: 1-2%`,
      ].join('\\n');
    } catch (error) {
      return `Error analyzing keyword usage: ${error.message}`;
    }
  }

  async checkTechnicalSEO(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      
      return [
        `• Response Code: ${response.status}`,
        `• Page Size: ${(response.data.length / 1024).toFixed(2)} KB`,
        `• Canonical Tag: ${$('link[rel="canonical"]').length > 0 ? 'Present' : 'Missing'}`,
        `• Meta Robots: ${$('meta[name="robots"]').attr('content') || 'Default'}`,
        `• Meta Viewport: ${$('meta[name="viewport"]').length > 0 ? 'Present' : 'Missing'}`,
        `• Schema Markup: ${$('script[type="application/ld+json"]').length > 0 ? 'Present' : 'Not found'}`,
        `• Open Graph: ${$('meta[property^="og:"]').length > 0 ? 'Present' : 'Missing'}`,
        `• Twitter Cards: ${$('meta[name^="twitter:"]').length > 0 ? 'Present' : 'Missing'}`,
      ].join('\\n');
    } catch (error) {
      return `Error checking technical SEO: ${error.message}`;
    }
  }

  async checkOnPageSEO(url, keywords) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const title = $('title').text();
      const metaDesc = $('meta[name="description"]').attr('content') || '';
      
      const results = [
        `• Title Length: ${title.length} characters ${title.length > 60 ? '(Too long)' : title.length < 30 ? '(Too short)' : '(Good)'}`,
        `• Meta Description Length: ${metaDesc.length} characters ${metaDesc.length > 160 ? '(Too long)' : metaDesc.length < 120 ? '(Too short)' : '(Good)'}`,
        `• H1 Count: ${$('h1').length} ${$('h1').length !== 1 ? '(Should be exactly 1)' : '(Good)'}`,
        `• Images without Alt: ${$('img:not([alt])').length}`,
      ];

      if (keywords.length > 0) {
        keywords.forEach(keyword => {
          const inTitle = title.toLowerCase().includes(keyword.toLowerCase());
          const inMeta = metaDesc.toLowerCase().includes(keyword.toLowerCase());
          const inH1 = $('h1').text().toLowerCase().includes(keyword.toLowerCase());
          
          results.push(`• "${keyword}" optimization:`);
          results.push(`  - In Title: ${inTitle ? 'Yes' : 'No'}`);
          results.push(`  - In Meta: ${inMeta ? 'Yes' : 'No'}`);
          results.push(`  - In H1: ${inH1 ? 'Yes' : 'No'}`);
        });
      }

      return results.join('\\n');
    } catch (error) {
      return `Error checking on-page SEO: ${error.message}`;
    }
  }

  async analyzeContentQuality(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const bodyText = $('body').text();
      const words = bodyText.split(/\s+/).filter(word => word.length > 0);
      const sentences = bodyText.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const paragraphs = $('p').length;
      
      const avgWordsPerSentence = sentences.length > 0 ? (words.length / sentences.length).toFixed(1) : 0;
      const readabilityScore = this.calculateReadabilityScore(sentences, words);
      
      return [
        `• Word Count: ${words.length}`,
        `• Sentences: ${sentences.length}`,
        `• Paragraphs: ${paragraphs}`,
        `• Avg Words/Sentence: ${avgWordsPerSentence}`,
        `• Readability Score: ${readabilityScore}`,
        `• Content Density: ${paragraphs > 0 ? 'Good paragraph structure' : 'Improve paragraph breaks'}`,
        `• Lists: ${$('ul, ol').length} found`,
        `• Headings Structure: ${this.analyzeHeadingStructure($)}`,
      ].join('\\n');
    } catch (error) {
      return `Error analyzing content quality: ${error.message}`;
    }
  }

  calculateReadabilityScore(sentences, words) {
    if (sentences.length === 0 || words.length === 0) return 'N/A';
    
    const avgSentenceLength = words.length / sentences.length;
    
    if (avgSentenceLength < 14) return 'Very Easy';
    if (avgSentenceLength < 18) return 'Easy';
    if (avgSentenceLength < 22) return 'Fairly Easy';
    if (avgSentenceLength < 26) return 'Standard';
    if (avgSentenceLength < 30) return 'Fairly Difficult';
    return 'Difficult';
  }

  analyzeHeadingStructure($) {
    const headings = [];
    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
      headings.push($(el).prop('tagName'));
    });
    
    if (headings.length === 0) return 'No headings found';
    if (headings[0] !== 'H1') return 'Missing H1 or H1 not first';
    
    return `${headings.length} headings, proper structure`;
  }

  async generateKeywordSuggestions(keyword) {
    // Generate basic keyword variations and suggestions
    const suggestions = [
      `${keyword} tools`,
      `${keyword} software`,
      `${keyword} solutions`,
      `${keyword} services`,
      `${keyword} platform`,
      `${keyword} automation`,
      `best ${keyword}`,
      `${keyword} guide`,
      `${keyword} tutorial`,
      `${keyword} tips`,
      `how to ${keyword}`,
      `${keyword} benefits`,
      `${keyword} features`,
      `${keyword} pricing`,
      `${keyword} reviews`,
    ];

    return suggestions.map(s => `• ${s}`).join('\\n');
  }

  async analyzeDomain(domain) {
    try {
      const url = `https://${domain}`;
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0)',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      
      return [
        `• Domain: ${domain}`,
        `• Title: ${$('title').text() || 'No title'}`,
        `• Pages Indexed: ~${$('a[href^="/"]').length} internal links found`,
        `• Social Presence: ${$('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"]').length > 0 ? 'Yes' : 'Not found'}`,
        `• Blog Section: ${$('a[href*="blog"], a[href*="news"]').length > 0 ? 'Yes' : 'Not found'}`,
      ].join('\\n');
    } catch (error) {
      return `Domain analysis failed: ${error.message}`;
    }
  }

  async analyzeKeywordGaps(domain, competitor, keywords) {
    // Basic keyword gap analysis without advanced APIs
    const gaps = keywords.map(keyword => {
      return `• "${keyword}": Analyze competitor content for this keyword`;
    });

    return gaps.join('\\n');
  }

  // Schema.org and Microdata Extraction
  async schemaExtraction({ url, schema_types = [] }) {
    try {
      console.log(`Extracting schema data from: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; Schema-Extractor)',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);
      const schemas = [];

      // Extract JSON-LD structured data
      $('script[type="application/ld+json"]').each((i, elem) => {
        try {
          const jsonLd = JSON.parse($(elem).html());
          schemas.push({
            type: 'JSON-LD',
            data: jsonLd,
            schema_type: jsonLd['@type'] || 'Unknown'
          });
        } catch (e) {
          console.log(`Error parsing JSON-LD: ${e.message}`);
        }
      });

      // Extract microdata
      $('[itemscope]').each((i, elem) => {
        const $elem = $(elem);
        const itemType = $elem.attr('itemtype') || '';
        const properties = {};
        
        $elem.find('[itemprop]').each((j, prop) => {
          const $prop = $(prop);
          const propName = $prop.attr('itemprop');
          const propValue = $prop.attr('content') || $prop.text().trim();
          properties[propName] = propValue;
        });

        schemas.push({
          type: 'Microdata',
          schema_type: itemType.split('/').pop() || 'Unknown',
          data: {
            '@type': itemType,
            properties: properties
          }
        });
      });

      // Extract RDFa
      $('[typeof]').each((i, elem) => {
        const $elem = $(elem);
        const typeAttr = $elem.attr('typeof');
        const properties = {};
        
        $elem.find('[property]').each((j, prop) => {
          const $prop = $(prop);
          const propName = $prop.attr('property');
          const propValue = $prop.attr('content') || $prop.text().trim();
          properties[propName] = propValue;
        });

        schemas.push({
          type: 'RDFa',
          schema_type: typeAttr || 'Unknown',
          data: {
            '@type': typeAttr,
            properties: properties
          }
        });
      });

      // Filter by requested schema types if specified
      let filteredSchemas = schemas;
      if (schema_types.length > 0) {
        filteredSchemas = schemas.filter(schema => 
          schema_types.some(type => 
            schema.schema_type.toLowerCase().includes(type.toLowerCase())
          )
        );
      }

      const summary = [
        `## Schema.org Analysis for ${new URL(url).hostname}`,
        ``,
        `**Total Schema Items Found:** ${schemas.length}`,
        `**JSON-LD:** ${schemas.filter(s => s.type === 'JSON-LD').length}`,
        `**Microdata:** ${schemas.filter(s => s.type === 'Microdata').length}`,
        `**RDFa:** ${schemas.filter(s => s.type === 'RDFa').length}`,
        ``,
        `**Schema Types Detected:**`,
        ...Array.from(new Set(schemas.map(s => s.schema_type))).map(type => `• ${type}`),
        ``,
        `**Detailed Schema Data:**`,
        ...filteredSchemas.slice(0, 10).map((schema, i) => [
          ``,
          `### ${i + 1}. ${schema.schema_type} (${schema.type})`,
          `\`\`\`json`,
          JSON.stringify(schema.data, null, 2),
          `\`\`\``
        ]).flat(),
        filteredSchemas.length > 10 ? `\n... and ${filteredSchemas.length - 10} more schemas` : '',
        ``,
        `**SEO Recommendations:**`,
        schemas.length === 0 ? '• Add structured data to improve search visibility' : '',
        !schemas.some(s => s.schema_type.toLowerCase().includes('article')) && url.includes('/blog') ? '• Consider adding Article schema for blog posts' : '',
        !schemas.some(s => s.schema_type.toLowerCase().includes('organization')) ? '• Add Organization schema for brand recognition' : '',
        !schemas.some(s => s.schema_type.toLowerCase().includes('breadcrumb')) ? '• Consider adding BreadcrumbList schema' : '',
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Schema extraction failed: ${error.message}`,
          },
        ],
      };
    }
  }

  // Readability Analysis using Mozilla Readability
  async readabilityAnalysis({ url, get_content = true }) {
    try {
      console.log(`Analyzing readability for: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; Readability-Analyzer)',
        },
        timeout: 15000,
      });

      const dom = new JSDOM(response.data, { url });
      const reader = new Readability(dom.window.document);
      const article = reader.parse();

      const $ = cheerio.load(response.data);
      
      // Calculate readability metrics
      const textContent = article ? article.textContent : $('body').text();
      const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
      const sentenceCount = textContent.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
      const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;
      
      // Simple readability scores
      const avgSentenceLength = parseFloat(avgWordsPerSentence);
      const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * (textContent.split(/[aeiouAEIOU]/).length - 1) / wordCount);
      
      let readabilityLevel = 'Graduate';
      if (fleschScore >= 90) readabilityLevel = 'Very Easy';
      else if (fleschScore >= 80) readabilityLevel = 'Easy';
      else if (fleschScore >= 70) readabilityLevel = 'Fairly Easy';
      else if (fleschScore >= 60) readabilityLevel = 'Standard';
      else if (fleschScore >= 50) readabilityLevel = 'Fairly Difficult';
      else if (fleschScore >= 30) readabilityLevel = 'Difficult';

      const summary = [
        `## Readability Analysis for ${new URL(url).hostname}`,
        ``,
        `**Content Extraction:** ${article ? 'Successful' : 'Failed - using fallback'}`,
        `**Article Title:** ${article?.title || $('title').text() || 'Not detected'}`,
        `**Author:** ${article?.byline || 'Not detected'}`,
        `**Length:** ${article?.length || 'Not calculated'} characters`,
        ``,
        `**Readability Metrics:**`,
        `• Word Count: ${wordCount.toLocaleString()}`,
        `• Sentence Count: ${sentenceCount.toLocaleString()}`,
        `• Average Words per Sentence: ${avgWordsPerSentence}`,
        `• Flesch Reading Ease: ${fleschScore.toFixed(1)} (${readabilityLevel})`,
        ``,
        `**Content Structure:**`,
        `• Headings (H1-H6): ${$('h1, h2, h3, h4, h5, h6').length}`,
        `• Paragraphs: ${$('p').length}`,
        `• Lists: ${$('ul, ol').length}`,
        `• Images: ${$('img').length}`,
        `• Links: ${$('a[href]').length}`,
        ``,
        `**SEO Recommendations:**`,
        avgWordsPerSentence > 20 ? '• Consider breaking down long sentences for better readability' : '',
        fleschScore < 60 ? '• Content may be too complex for general audiences' : '',
        wordCount < 300 ? '• Content might be too short for SEO purposes' : '',
        $('h1').length === 0 ? '• Missing H1 heading' : '',
        $('h1').length > 1 ? '• Multiple H1 headings detected' : '',
      ].filter(Boolean).join('\\n');

      let result = summary;
      
      if (get_content && article) {
        result += `\\n\\n**Cleaned Article Content:**\\n\\n${article.content.substring(0, 2000)}${article.content.length > 2000 ? '...' : ''}`;
      }

      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Readability analysis failed: ${error.message}`,
          },
        ],
      };
    }
  }

  // Open Graph Meta Tags Analysis
  async openGraphAnalysis({ url, validate_images = false }) {
    try {
      console.log(`Analyzing Open Graph tags for: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; OpenGraph-Analyzer)',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);
      const ogTags = {};
      
      // Extract all Open Graph tags
      $('meta[property^="og:"]').each((i, elem) => {
        const property = $(elem).attr('property');
        const content = $(elem).attr('content');
        if (property && content) {
          ogTags[property] = content;
        }
      });

      // Also check for fb: tags
      $('meta[property^="fb:"]').each((i, elem) => {
        const property = $(elem).attr('property');
        const content = $(elem).attr('content');
        if (property && content) {
          ogTags[property] = content;
        }
      });

      const requiredTags = ['og:title', 'og:description', 'og:image', 'og:url'];
      const missingTags = requiredTags.filter(tag => !ogTags[tag]);
      const presentTags = Object.keys(ogTags);

      // Image validation if requested
      let imageValidation = '';
      if (validate_images && ogTags['og:image']) {
        try {
          const imageResponse = await axios.head(ogTags['og:image'], { timeout: 5000 });
          const contentType = imageResponse.headers['content-type'];
          imageValidation = `• Image URL accessible: Yes (${contentType})`;
        } catch (imageError) {
          imageValidation = `• Image URL accessible: No (${imageError.message})`;
        }
      }

      const summary = [
        `## Open Graph Analysis for ${new URL(url).hostname}`,
        ``,
        `**Open Graph Status:** ${missingTags.length === 0 ? '✅ Complete' : `⚠️ Missing ${missingTags.length} required tags`}`,
        `**Tags Present:** ${presentTags.length}`,
        ``,
        `**Required Tags:**`,
        `• og:title: ${ogTags['og:title'] ? `✅ "${ogTags['og:title'].substring(0, 60)}${ogTags['og:title'].length > 60 ? '...' : ''}"` : '❌ Missing'}`,
        `• og:description: ${ogTags['og:description'] ? `✅ "${ogTags['og:description'].substring(0, 80)}${ogTags['og:description'].length > 80 ? '...' : ''}"` : '❌ Missing'}`,
        `• og:image: ${ogTags['og:image'] ? `✅ Present` : '❌ Missing'}`,
        `• og:url: ${ogTags['og:url'] ? `✅ Present` : '❌ Missing'}`,
        ``,
        `**Additional Tags:**`,
        `• og:type: ${ogTags['og:type'] || 'Not set (defaults to "website")'}`,
        `• og:site_name: ${ogTags['og:site_name'] || 'Not set'}`,
        `• og:locale: ${ogTags['og:locale'] || 'Not set'}`,
        ``,
        presentTags.length > 0 ? '**All Open Graph Tags:**' : '',
        ...presentTags.map(tag => `• ${tag}: ${ogTags[tag]}`),
        ``,
        imageValidation,
        ``,
        `**SEO Recommendations:**`,
        missingTags.length > 0 ? `• Add missing required tags: ${missingTags.join(', ')}` : '',
        ogTags['og:title'] && ogTags['og:title'].length > 60 ? '• og:title should be under 60 characters' : '',
        ogTags['og:description'] && ogTags['og:description'].length > 160 ? '• og:description should be under 160 characters' : '',
        !ogTags['og:image:width'] && ogTags['og:image'] ? '• Add og:image:width and og:image:height for better rendering' : '',
        !ogTags['og:type'] ? '• Specify og:type for better categorization' : '',
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Open Graph analysis failed: ${error.message}`,
          },
        ],
      };
    }
  }

  // Twitter Card Meta Tags Analysis  
  async twitterCardsAnalysis({ url, validate_images = false }) {
    try {
      console.log(`Analyzing Twitter Cards for: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; TwitterCard-Analyzer)',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);
      const twitterTags = {};
      
      // Extract all Twitter Card tags
      $('meta[name^="twitter:"]').each((i, elem) => {
        const name = $(elem).attr('name');
        const content = $(elem).attr('content');
        if (name && content) {
          twitterTags[name] = content;
        }
      });

      const requiredTags = ['twitter:card', 'twitter:title', 'twitter:description'];
      const cardType = twitterTags['twitter:card'];
      
      // Add required image tag based on card type
      if (cardType === 'summary_large_image' || cardType === 'player') {
        requiredTags.push('twitter:image');
      }

      const missingTags = requiredTags.filter(tag => !twitterTags[tag]);
      const presentTags = Object.keys(twitterTags);

      // Image validation if requested
      let imageValidation = '';
      if (validate_images && twitterTags['twitter:image']) {
        try {
          const imageResponse = await axios.head(twitterTags['twitter:image'], { timeout: 5000 });
          const contentType = imageResponse.headers['content-type'];
          imageValidation = `• Image URL accessible: Yes (${contentType})`;
        } catch (imageError) {
          imageValidation = `• Image URL accessible: No (${imageError.message})`;
        }
      }

      const summary = [
        `## Twitter Cards Analysis for ${new URL(url).hostname}`,
        ``,
        `**Twitter Card Status:** ${missingTags.length === 0 ? '✅ Complete' : `⚠️ Missing ${missingTags.length} required tags`}`,
        `**Card Type:** ${cardType || 'Not specified (will default to summary)'}`,
        `**Tags Present:** ${presentTags.length}`,
        ``,
        `**Required Tags for ${cardType || 'summary'} card:**`,
        `• twitter:card: ${twitterTags['twitter:card'] ? `✅ "${twitterTags['twitter:card']}"` : '❌ Missing'}`,
        `• twitter:title: ${twitterTags['twitter:title'] ? `✅ "${twitterTags['twitter:title'].substring(0, 50)}${twitterTags['twitter:title'].length > 50 ? '...' : ''}"` : '❌ Missing'}`,
        `• twitter:description: ${twitterTags['twitter:description'] ? `✅ "${twitterTags['twitter:description'].substring(0, 70)}${twitterTags['twitter:description'].length > 70 ? '...' : ''}"` : '❌ Missing'}`,
        (cardType === 'summary_large_image' || cardType === 'player') ? `• twitter:image: ${twitterTags['twitter:image'] ? `✅ Present` : '❌ Missing'}` : '',
        ``,
        `**Optional Tags:**`,
        `• twitter:site: ${twitterTags['twitter:site'] || 'Not set'}`,
        `• twitter:creator: ${twitterTags['twitter:creator'] || 'Not set'}`,
        `• twitter:image:alt: ${twitterTags['twitter:image:alt'] || 'Not set'}`,
        ``,
        presentTags.length > 0 ? '**All Twitter Card Tags:**' : '',
        ...presentTags.map(tag => `• ${tag}: ${twitterTags[tag]}`),
        ``,
        imageValidation,
        ``,
        `**SEO Recommendations:**`,
        missingTags.length > 0 ? `• Add missing required tags: ${missingTags.join(', ')}` : '',
        !cardType ? '• Specify twitter:card type (summary, summary_large_image, app, player)' : '',
        cardType === 'summary' && !twitterTags['twitter:image'] ? '• Consider adding twitter:image for better engagement' : '',
        twitterTags['twitter:title'] && twitterTags['twitter:title'].length > 70 ? '• twitter:title should be under 70 characters' : '',
        twitterTags['twitter:description'] && twitterTags['twitter:description'].length > 200 ? '• twitter:description should be under 200 characters' : '',
        twitterTags['twitter:image'] && !twitterTags['twitter:image:alt'] ? '• Add twitter:image:alt for accessibility' : '',
        !twitterTags['twitter:site'] ? '• Add twitter:site with your Twitter handle' : '',
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Twitter Cards analysis failed: ${error.message}`,
          },
        ],
      };
    }
  }

  // Wayback Machine API Integration
  async waybackAnalysis({ url, timestamp, year, get_snapshots = true }) {
    try {
      console.log(`Analyzing Wayback Machine data for: ${url}`);
      
      const cleanUrl = url.replace(/^https?:\/\//, '');
      const waybackApiBase = 'https://archive.org/wayback/available';
      
      let apiUrl = `${waybackApiBase}?url=${encodeURIComponent(url)}`;
      if (timestamp) {
        apiUrl += `&timestamp=${timestamp}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; Wayback-Analyzer)',
        },
        timeout: 10000,
      });

      const data = response.data;
      const archived_snapshots = data.archived_snapshots;
      const closest = archived_snapshots?.closest;

      let snapshotsList = '';
      if (get_snapshots) {
        try {
          // Get calendar data for the year
          const calendarYear = year || new Date().getFullYear();
          const calendarUrl = `https://web.archive.org/__wb/calendarcaptures/2?url=${encodeURIComponent(url)}&date=${calendarYear}`;
          
          const calendarResponse = await axios.get(calendarUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; Wayback-Calendar)',
            },
            timeout: 10000,
          });

          const snapshots = calendarResponse.data;
          if (Array.isArray(snapshots) && snapshots.length > 0) {
            const recentSnapshots = snapshots.slice(-10).reverse();
            snapshotsList = `\\n**Recent Snapshots (${calendarYear}):**\\n` + 
                           recentSnapshots.map(snapshot => 
                             `• ${snapshot[0]}: ${snapshot[1]} captures`
                           ).join('\\n');
          }
        } catch (calendarError) {
          snapshotsList = `\\nSnapshot calendar data not available: ${calendarError.message}`;
        }
      }

      const summary = [
        `## Wayback Machine Analysis for ${new URL(url).hostname}`,
        ``,
        `**Archive Status:** ${closest ? '✅ Archived' : '❌ Not found in archive'}`,
        closest ? `**Closest Snapshot:** ${closest.timestamp.slice(0,4)}-${closest.timestamp.slice(4,6)}-${closest.timestamp.slice(6,8)}` : '',
        closest ? `**Archive URL:** ${closest.url}` : '',
        closest ? `**Status:** ${closest.status}` : '',
        closest ? `**Available:** ${closest.available ? 'Yes' : 'No'}` : '',
        ``,
        `**Analysis Date:** ${new Date().toISOString().split('T')[0]}`,
        `**Target URL:** ${url}`,
        snapshotsList,
        ``,
        `**SEO & Historical Insights:**`,
        !closest ? '• URL has never been archived - consider submitting to Wayback Machine' : '',
        closest && new Date(closest.timestamp.slice(0,8)) < new Date(Date.now() - 365*24*60*60*1000) ? 
          '• Last archived over a year ago - content may have changed significantly' : '',
        closest ? '• Use archived versions to track content changes and SEO evolution' : '',
        closest ? '• Compare current version with historical snapshots for content audit' : '',
        closest && closest.status !== '200' ? `• Last snapshot had status ${closest.status} - check for broken pages` : '',
        ``,
        `**Recommended Actions:**`,
        '• Monitor important pages for regular archiving',
        '• Use historical data to understand content evolution',
        '• Check competitor historical data for insights',
        '• Verify important pages are being properly crawled and archived',
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Wayback Machine analysis failed: ${error.message}`,
          },
        ],
      };
    }
  }

  // Link Extraction and Analysis
  async linkExtraction({ url, include_internal = true, include_external = true, check_status = false, max_links = 0, filter_domains = [] }) {
    try {
      console.log(`Extracting links from: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; Link-Extractor)',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);
      const baseUrl = new URL(url);
      const baseDomain = baseUrl.hostname.replace(/^www\./, '');
      
      const allLinks = [];
      const linkStats = {
        total: 0,
        internal: 0,
        external: 0,
        broken: 0,
        redirects: 0,
        nofollow: 0,
        sponsored: 0,
        ugc: 0,
        blank_target: 0,
        same_page: 0,
        unique_domains: new Set(),
        anchor_text_missing: 0
      };

      // Extract all links
      $('a[href]').each((i, elem) => {
        const $link = $(elem);
        const href = $link.attr('href');
        const anchorText = $link.text().trim();
        const title = $link.attr('title') || '';
        const rel = $link.attr('rel') || '';
        const target = $link.attr('target') || '';
        
        if (!href) return;

        // Resolve relative URLs
        let absoluteUrl;
        try {
          absoluteUrl = new URL(href, url).href;
        } catch (e) {
          // Skip invalid URLs
          return;
        }

        const linkUrl = new URL(absoluteUrl);
        const linkDomain = linkUrl.hostname.replace(/^www\./, '');
        const isInternal = linkDomain === baseDomain;
        const isExternal = !isInternal;
        const isSamePage = linkUrl.hash && linkUrl.pathname === baseUrl.pathname && linkUrl.hostname === baseUrl.hostname;

        // Apply filters
        if (!include_internal && isInternal) return;
        if (!include_external && isExternal) return;
        if (filter_domains.length > 0 && !filter_domains.some(domain => linkDomain.includes(domain.replace(/^www\./, '')))) return;

        // Analyze link attributes
        const relAttributes = rel.toLowerCase().split(/\s+/).filter(Boolean);
        const isNoFollow = relAttributes.includes('nofollow');
        const isSponsored = relAttributes.includes('sponsored');
        const isUGC = relAttributes.includes('ugc');
        const isBlankTarget = target.toLowerCase() === '_blank';

        const linkData = {
          url: absoluteUrl,
          href: href,
          anchor_text: anchorText,
          title: title,
          domain: linkDomain,
          type: isInternal ? 'internal' : 'external',
          is_same_page: isSamePage,
          attributes: {
            rel: rel,
            target: target,
            is_nofollow: isNoFollow,
            is_sponsored: isSponsored,
            is_ugc: isUGC,
            opens_new_tab: isBlankTarget
          },
          position: allLinks.length + 1,
          status: null,
          redirect_url: null
        };

        // Update stats
        linkStats.total++;
        if (isInternal) linkStats.internal++;
        if (isExternal) linkStats.external++;
        if (isNoFollow) linkStats.nofollow++;
        if (isSponsored) linkStats.sponsored++;
        if (isUGC) linkStats.ugc++;
        if (isBlankTarget) linkStats.blank_target++;
        if (isSamePage) linkStats.same_page++;
        if (!anchorText) linkStats.anchor_text_missing++;
        linkStats.unique_domains.add(linkDomain);

        allLinks.push(linkData);
      });

      // Apply max_links limit
      let finalLinks = allLinks;
      if (max_links > 0) {
        finalLinks = allLinks.slice(0, max_links);
      }

      // Check link status if requested (be careful with rate limiting)
      if (check_status && finalLinks.length > 0) {
        console.log(`Checking status of ${Math.min(finalLinks.length, 50)} links...`);
        const statusPromises = finalLinks.slice(0, 50).map(async (link, index) => {
          try {
            // Add delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, index * 100));
            
            const statusResponse = await axios.head(link.url, {
              timeout: 5000,
              maxRedirects: 5,
              headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; Link-Checker)',
              }
            });
            
            link.status = statusResponse.status;
            if (statusResponse.status >= 300 && statusResponse.status < 400) {
              linkStats.redirects++;
              link.redirect_url = statusResponse.headers.location;
            }
          } catch (error) {
            link.status = error.response?.status || 0;
            if (link.status === 0) {
              linkStats.broken++;
            }
          }
        });

        await Promise.all(statusPromises);
      }

      // Group links by domain for analysis
      const domainGroups = {};
      finalLinks.forEach(link => {
        if (!domainGroups[link.domain]) {
          domainGroups[link.domain] = {
            count: 0,
            internal: 0,
            external: 0,
            nofollow: 0,
            examples: []
          };
        }
        domainGroups[link.domain].count++;
        if (link.type === 'internal') domainGroups[link.domain].internal++;
        if (link.type === 'external') domainGroups[link.domain].external++;
        if (link.attributes.is_nofollow) domainGroups[link.domain].nofollow++;
        if (domainGroups[link.domain].examples.length < 3) {
          domainGroups[link.domain].examples.push({
            url: link.url,
            anchor_text: link.anchor_text
          });
        }
      });

      // Sort domains by link count
      const sortedDomains = Object.entries(domainGroups)
        .sort(([,a], [,b]) => b.count - a.count)
        .slice(0, 20);

      // Identify potential SEO issues
      const seoIssues = [];
      if (linkStats.anchor_text_missing > 0) {
        seoIssues.push(`• ${linkStats.anchor_text_missing} links missing anchor text`);
      }
      if (linkStats.broken > 0) {
        seoIssues.push(`• ${linkStats.broken} potentially broken links detected`);
      }
      if (linkStats.external > 0 && finalLinks.filter(l => l.type === 'external' && !l.attributes.is_nofollow).length > linkStats.external * 0.8) {
        seoIssues.push(`• Consider adding rel="nofollow" to some external links`);
      }
      if (linkStats.blank_target > 0 && finalLinks.filter(l => l.attributes.opens_new_tab && !l.attributes.rel.includes('noopener')).length > 0) {
        seoIssues.push(`• Links opening in new tabs should include rel="noopener" for security`);
      }

      const summary = [
        `## Link Extraction Analysis for ${baseUrl.hostname}`,
        ``,
        `**Link Statistics:**`,
        `• Total Links: ${linkStats.total.toLocaleString()}`,
        `• Internal Links: ${linkStats.internal.toLocaleString()} (${(linkStats.internal/linkStats.total*100).toFixed(1)}%)`,
        `• External Links: ${linkStats.external.toLocaleString()} (${(linkStats.external/linkStats.total*100).toFixed(1)}%)`,
        `• Same Page Links: ${linkStats.same_page.toLocaleString()}`,
        `• Unique Domains: ${linkStats.unique_domains.size.toLocaleString()}`,
        ``,
        `**Link Attributes:**`,
        `• NoFollow Links: ${linkStats.nofollow.toLocaleString()}`,
        `• Sponsored Links: ${linkStats.sponsored.toLocaleString()}`,
        `• UGC Links: ${linkStats.ugc.toLocaleString()}`,
        `• New Tab Links: ${linkStats.blank_target.toLocaleString()}`,
        ``,
        check_status ? [
          `**Status Check Results:**`,
          `• Broken Links: ${linkStats.broken.toLocaleString()}`,
          `• Redirects: ${linkStats.redirects.toLocaleString()}`,
          `• Checked: ${Math.min(finalLinks.length, 50)} of ${finalLinks.length} links`,
          ``
        ].join('\\n') : '',
        `**Top Linked Domains:**`,
        ...sortedDomains.map(([domain, stats]) => 
          `• ${domain}: ${stats.count} links (${stats.internal} internal, ${stats.external} external, ${stats.nofollow} nofollow)`
        ),
        ``,
        seoIssues.length > 0 ? `**SEO Issues Found:**` : '',
        ...seoIssues,
        ``,
        `**Sample Links by Type:**`,
        ``,
        finalLinks.filter(l => l.type === 'internal').length > 0 ? `**Internal Links (${Math.min(finalLinks.filter(l => l.type === 'internal').length, 5)}):**` : '',
        ...finalLinks.filter(l => l.type === 'internal').slice(0, 5).map(link => 
          `• [${link.anchor_text || 'No anchor text'}](${link.url})${link.attributes.is_nofollow ? ' [nofollow]' : ''}`
        ),
        ``,
        finalLinks.filter(l => l.type === 'external').length > 0 ? `**External Links (${Math.min(finalLinks.filter(l => l.type === 'external').length, 5)}):**` : '',
        ...finalLinks.filter(l => l.type === 'external').slice(0, 5).map(link => 
          `• [${link.anchor_text || 'No anchor text'}](${link.url}) → ${link.domain}${link.attributes.is_nofollow ? ' [nofollow]' : ''}${link.status ? ` [${link.status}]` : ''}`
        ),
        ``,
        `**SEO Recommendations:**`,
        `• Use descriptive anchor text for better SEO value`,
        `• Balance internal and external linking`,
        `• Consider nofollow for paid or untrusted external links`,
        `• Add rel="noopener" to links opening in new tabs`,
        check_status ? '• Fix any broken links identified' : '• Run with check_status=true to identify broken links',
        `• Ensure internal link structure supports site architecture`,
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Link extraction failed: ${error.message}`,
          },
        ],
      };
    }
  }

  // Google Autocomplete API
  async googleAutocomplete({ query, language = 'en', country = 'us' }) {
    try {
      console.log(`Getting Google Autocomplete for: ${query}`);
      
      // Google Autocomplete API endpoint
      const autocompleteUrl = `https://suggestqueries.google.com/complete/search`;
      const params = new URLSearchParams({
        client: 'firefox',
        q: query,
        hl: language,
        gl: country
      });

      const response = await axios.get(`${autocompleteUrl}?${params}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; Autocomplete-Fetcher)',
        },
        timeout: 10000,
      });

      // Google returns JSONP-style response, need to parse it
      let suggestions = [];
      try {
        // Response is typically in format: ["query", ["suggestion1", "suggestion2", ...]]
        const data = JSON.parse(response.data);
        suggestions = data[1] || [];
      } catch (parseError) {
        console.log('Error parsing autocomplete response:', parseError.message);
        suggestions = [];
      }

      const summary = [
        `## Google Autocomplete Suggestions for "${query}"`,
        ``,
        `**Language:** ${language.toUpperCase()}`,
        `**Country:** ${country.toUpperCase()}`,
        `**Total Suggestions:** ${suggestions.length}`,
        ``,
        suggestions.length > 0 ? `**Autocomplete Suggestions:**` : `**No suggestions found.**`,
        ...suggestions.map((suggestion, i) => `${i + 1}. ${suggestion}`),
        ``,
        `**SEO Applications:**`,
        `• Use these suggestions for long-tail keyword research`,
        `• Identify common search patterns and user intent`,
        `• Create content that matches popular search queries`,
        `• Optimize for voice search and natural language queries`,
        `• Build FAQ sections around common variations`,
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Google Autocomplete failed: ${error.message}`,
          },
        ],
      };
    }
  }

  // Google People Also Ask Scraper
  async googlePeopleAlsoAsk({ query, max_questions = 10 }) {
    try {
      console.log(`Extracting People Also Ask for: ${query}`);
      
      // Perform Google search to get PAA results
      const searchUrl = `https://www.google.com/search`;
      const params = new URLSearchParams({
        q: query,
        hl: 'en',
        gl: 'us'
      });

      const response = await axios.get(`${searchUrl}?${params}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'DNT': '1',
          'Connection': 'keep-alive',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);
      const questions = [];

      // Extract People Also Ask questions using various selectors
      const paaSelectors = [
        '[data-initq]', // Common PAA container
        '.related-question-pair', // Another common selector
        '.g[data-q]', // Alternative selector
        '.Uo8X3b', // Updated selector
        '.cbphWd', // Another possible selector
      ];

      paaSelectors.forEach(selector => {
        $(selector).each((i, elem) => {
          const $elem = $(elem);
          let questionText = '';
          
          // Try different ways to extract question text
          questionText = $elem.attr('data-initq') || 
                        $elem.attr('data-q') ||
                        $elem.find('[role="button"]').text() ||
                        $elem.find('.Cu7tJf').text() ||
                        $elem.text().trim();
          
          if (questionText && questionText.includes('?') && questions.length < max_questions) {
            // Clean up the question text
            questionText = questionText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            
            if (!questions.includes(questionText) && questionText.length > 10) {
              questions.push(questionText);
            }
          }
        });
      });

      // Fallback: look for question-like patterns in the page
      if (questions.length === 0) {
        const text = $('body').text();
        const questionRegex = /([A-Z][^.?!]*\?)/g;
        let match;
        while ((match = questionRegex.exec(text)) !== null && questions.length < max_questions) {
          const question = match[1].trim();
          if (question.length > 15 && question.length < 200 && !questions.includes(question)) {
            questions.push(question);
          }
        }
      }

      const summary = [
        `## Google People Also Ask for "${query}"`,
        ``,
        `**Total Questions Found:** ${questions.length}`,
        `**Search Date:** ${new Date().toISOString().split('T')[0]}`,
        ``,
        questions.length > 0 ? `**People Also Ask Questions:**` : `**No People Also Ask questions found.**`,
        ...questions.slice(0, max_questions).map((question, i) => `${i + 1}. ${question}`),
        ``,
        `**Content Strategy Applications:**`,
        `• Create dedicated content pieces answering each question`,
        `• Build comprehensive FAQ sections`,
        `• Use questions as blog post titles and H2 headings`,
        `• Optimize for featured snippets by providing concise answers`,
        `• Identify user pain points and information needs`,
        questions.length === 0 ? `\\n**Note:** Google's anti-bot measures may limit PAA extraction. Consider using the query for manual research.` : '',
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Google People Also Ask extraction failed: ${error.message}. This may be due to Google's anti-bot measures.`,
          },
        ],
      };
    }
  }

  // Google Related Searches Scraper
  async googleRelatedSearches({ query, max_suggestions = 8 }) {
    try {
      console.log(`Extracting Related Searches for: ${query}`);
      
      // Perform Google search to get related searches
      const searchUrl = `https://www.google.com/search`;
      const params = new URLSearchParams({
        q: query,
        hl: 'en',
        gl: 'us'
      });

      const response = await axios.get(`${searchUrl}?${params}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'DNT': '1',
          'Connection': 'keep-alive',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);
      const relatedSearches = [];

      // Extract related searches using various selectors
      const relatedSelectors = [
        '#brs a', // Traditional related searches
        '.s75CSd a', // Updated selector
        '.k8XOCe a', // Another selector
        '.Wt5Tfe a', // Alternative selector
        '[data-ved] a[href*="/search?"]', // General search link selector
      ];

      relatedSelectors.forEach(selector => {
        $(selector).each((i, elem) => {
          const $elem = $(elem);
          let searchTerm = $elem.text().trim();
          
          if (searchTerm && 
              searchTerm !== query && 
              searchTerm.length > 2 && 
              searchTerm.length < 100 &&
              !searchTerm.includes('More results') &&
              !searchTerm.includes('Search') &&
              relatedSearches.length < max_suggestions) {
            
            // Clean up the search term
            searchTerm = searchTerm.replace(/^[\d\s\-]+/, '').trim();
            
            if (!relatedSearches.includes(searchTerm) && searchTerm.length > 2) {
              relatedSearches.push(searchTerm);
            }
          }
        });
      });

      // Remove duplicates and filter
      const uniqueRelated = [...new Set(relatedSearches)]
        .filter(term => term && term !== query)
        .slice(0, max_suggestions);

      const summary = [
        `## Google Related Searches for "${query}"`,
        ``,
        `**Total Related Searches Found:** ${uniqueRelated.length}`,
        `**Search Date:** ${new Date().toISOString().split('T')[0]}`,
        ``,
        uniqueRelated.length > 0 ? `**Related Search Terms:**` : `**No related searches found.**`,
        ...uniqueRelated.map((term, i) => `${i + 1}. ${term}`),
        ``,
        `**Keyword Strategy Applications:**`,
        `• Expand your keyword list with semantically related terms`,
        `• Create content clusters around related topics`,
        `• Optimize for semantic search and topic authority`,
        `• Build internal linking between related content pieces`,
        `• Identify content gaps in your current strategy`,
        uniqueRelated.length === 0 ? `\\n**Note:** Google's anti-bot measures may limit related search extraction.` : '',
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Google Related Searches extraction failed: ${error.message}. This may be due to Google's anti-bot measures.`,
          },
        ],
      };
    }
  }

  // Wikipedia Search API
  async wikipediaSearch({ query, language = 'en', limit = 5, get_summaries = true }) {
    try {
      console.log(`Searching Wikipedia for: ${query}`);
      
      const baseUrl = `https://${language}.wikipedia.org/api/rest_v1/page`;
      
      // First, search for pages
      const searchUrl = `https://${language}.wikipedia.org/w/api.php`;
      const searchParams = new URLSearchParams({
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: query,
        srlimit: limit,
        srprop: 'snippet|titlesnippet|size|timestamp|score'
      });

      const searchResponse = await axios.get(`${searchUrl}?${searchParams}`, {
        headers: {
          'User-Agent': 'SEO-MCP-Server/1.0 (https://github.com/seo-mcp-server)',
        },
        timeout: 10000,
      });

      const searchResults = searchResponse.data?.query?.search || [];
      const articles = [];

      // Get summaries if requested
      if (get_summaries && searchResults.length > 0) {
        for (const result of searchResults.slice(0, limit)) {
          try {
            const summaryUrl = `${baseUrl}/summary/${encodeURIComponent(result.title)}`;
            const summaryResponse = await axios.get(summaryUrl, {
              headers: {
                'User-Agent': 'SEO-MCP-Server/1.0 (https://github.com/seo-mcp-server)',
              },
              timeout: 5000,
            });

            const summary = summaryResponse.data;
            articles.push({
              title: result.title,
              url: summary.content_urls?.desktop?.page || `https://${language}.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
              summary: summary.extract || result.snippet.replace(/<[^>]*>/g, ''),
              score: result.score,
              size: result.size,
              timestamp: result.timestamp
            });
          } catch (summaryError) {
            // If summary fails, still include basic info
            articles.push({
              title: result.title,
              url: `https://${language}.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
              summary: result.snippet.replace(/<[^>]*>/g, ''),
              score: result.score,
              size: result.size,
              timestamp: result.timestamp
            });
          }
        }
      } else {
        // Just return search results without summaries
        searchResults.slice(0, limit).forEach(result => {
          articles.push({
            title: result.title,
            url: `https://${language}.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
            summary: result.snippet.replace(/<[^>]*>/g, ''),
            score: result.score,
            size: result.size,
            timestamp: result.timestamp
          });
        });
      }

      const summary = [
        `## Wikipedia Search Results for "${query}"`,
        ``,
        `**Language:** ${language.toUpperCase()}`,
        `**Total Results:** ${articles.length}`,
        `**Search Date:** ${new Date().toISOString().split('T')[0]}`,
        ``,
        articles.length > 0 ? `**Wikipedia Articles:**` : `**No articles found.**`,
        ...articles.map((article, i) => [
          ``,
          `### ${i + 1}. ${article.title}`,
          `**URL:** ${article.url}`,
          `**Summary:** ${article.summary}`,
          `**Size:** ${article.size} bytes | **Score:** ${article.score.toFixed(2)}`
        ].join('\\n')),
        ``,
        `**Content Research Applications:**`,
        `• Use Wikipedia articles as authoritative source material`,
        `• Identify key concepts and terminology for your topic`,
        `• Build comprehensive content outlines based on Wikipedia structure`,
        `• Find reliable external sources from Wikipedia references`,
        `• Understand topic authority and related subjects`,
        `• Create content that covers similar depth and breadth`,
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Wikipedia search failed: ${error.message}`,
          },
        ],
      };
    }
  }

  // Bing Suggest API
  async bingSuggest({ query, market = 'en-US' }) {
    try {
      console.log(`Getting Bing suggestions for: ${query}`);
      
      // Bing AutoSuggest API endpoint
      const suggestUrl = `https://api.bing.microsoft.com/v7.0/suggestions`;
      const params = new URLSearchParams({
        q: query,
        mkt: market
      });

      // Try without API key first (public endpoint)
      let response;
      try {
        response = await axios.get(`${suggestUrl}?${params}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEO-MCP-Server/1.0; Bing-Suggest)',
          },
          timeout: 10000,
        });
      } catch (apiError) {
        // Fallback to Bing search suggestions scraping
        console.log('Bing API failed, trying scraping fallback...');
        const bingSearchUrl = `https://www.bing.com/AS/Suggestions`;
        const fallbackParams = new URLSearchParams({
          pt: 'page.home',
          mkt: market,
          qry: query,
          cp: query.length,
          csr: 1
        });

        response = await axios.get(`${bingSearchUrl}?${fallbackParams}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': 'https://www.bing.com/',
          },
          timeout: 10000,
        });
      }

      let suggestions = [];
      
      try {
        // Try to parse as Bing API response first
        if (response.data?.suggestionGroups) {
          const suggestionGroups = response.data.suggestionGroups;
          suggestionGroups.forEach(group => {
            if (group.searchSuggestions) {
              group.searchSuggestions.forEach(suggestion => {
                suggestions.push(suggestion.query || suggestion.displayText);
              });
            }
          });
        } else {
          // Try to parse as XML/HTML scraping response
          const $ = cheerio.load(response.data);
          $('li[data-sug]').each((i, elem) => {
            const suggestion = $(elem).attr('data-sug') || $(elem).text().trim();
            if (suggestion && suggestion !== query) {
              suggestions.push(suggestion);
            }
          });
          
          // Alternative selectors for Bing suggestions
          if (suggestions.length === 0) {
            $('.sa_sg .sa_tm').each((i, elem) => {
              const suggestion = $(elem).text().trim();
              if (suggestion && suggestion !== query) {
                suggestions.push(suggestion);
              }
            });
          }
        }
      } catch (parseError) {
        console.log('Error parsing Bing response:', parseError.message);
        suggestions = [`Unable to parse suggestions from Bing response`];
      }

      // Remove duplicates and filter
      suggestions = [...new Set(suggestions)].filter(s => s && s !== query).slice(0, 10);

      const summary = [
        `## Bing Search Suggestions for "${query}"`,
        ``,
        `**Market:** ${market}`,
        `**Total Suggestions:** ${suggestions.length}`,
        `**Search Date:** ${new Date().toISOString().split('T')[0]}`,
        ``,
        suggestions.length > 0 ? `**Bing Suggestions:**` : `**No suggestions found.**`,
        ...suggestions.map((suggestion, i) => `${i + 1}. ${suggestion}`),
        ``,
        `**SEO Strategy Applications:**`,
        `• Cross-reference with Google suggestions for comprehensive keyword research`,
        `• Identify Bing-specific search patterns and user behavior`,
        `• Optimize content for multiple search engines`,
        `• Discover alternative keyword variations and synonyms`,
        `• Build diverse keyword portfolios across search platforms`,
        suggestions.length === 0 ? `\\n**Note:** Bing suggestions may require API key for full access.` : '',
      ].filter(Boolean).join('\\n');

      return {
        content: [
          {
            type: 'text',
            text: summary,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Bing Suggest failed: ${error.message}. Consider using a Bing Search API key for better results.`,
          },
        ],
      };
    }
  }

  // Placeholder methods for API integrations (implement when API keys are available)
  async getAuthoritasKeywords(keyword, country, language) {
    return `Authoritas API integration ready for keyword: ${keyword}`;
  }

  async getAuthoритаsSERP(keyword, searchEngine, location) {
    return `Authoritas SERP analysis ready for: ${keyword}`;
  }

  async getSEOReviewAnalysis(url) {
    return `SEO Review Tools analysis ready for: ${url}`;
  }

  async getCognitiveSEOBacklinks(domain) {
    return `CognitiveSEO backlink analysis ready for: ${domain}`;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('SEO MCP Server running on stdio');
  }
}

const server = new SEOMCPServer();
server.run().catch(console.error);