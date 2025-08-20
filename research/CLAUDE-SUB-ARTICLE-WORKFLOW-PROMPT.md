# CLAUDE SUB-ARTICLE WORKFLOW PROMPT

## USAGE INSTRUCTIONS
Use this prompt to initiate the complete sub-article creation workflow. Replace [ARTICLE_TOPIC] and [CSV_ROW_DATA] with specific article details.

---

## PROMPT TEMPLATE

Create a sub-article for the NEXITAS website following this workflow:

**Article Topic**: [ARTICLE_TOPIC]
**CSV Data**: [CSV_ROW_DATA]

### WORKFLOW STEPS:

1. **RESEARCH PHASE**: 
   - Check if research file exists at `/home/zforb/NEXITAS-to-date/research/[topic]-research-data.md`
   - If research file doesn't exist or is incomplete, conduct comprehensive research using:
     - WebSearch for current market data, statistics, and industry reports
     - Firecrawl MCP only if WebSearch results need deeper content extraction
     - Focus on authoritative sources: Gartner, Forrester, industry association reports, academic papers
   - Create/update the research file with verified data and proper source citations
   - NO fabricated statistics - everything must be traceable to real sources

2. **PROMPT CUSTOMIZATION**:
   - Use template at `/home/zforb/NEXITAS-to-date/research/GOOD-CONDENSED-PROMPT-TEMPLATE.md`
   - Customize all article-specific content (title, keywords, statistics, internal links)
   - Set correct file path: `/home/zforb/NEXITAS-to-date/src/pages/blog/[article-filename].astro`
   - **CRITICAL**: Keep prompt length similar to working template (~70-100 lines) - do NOT create overly long prompts

3. **GEMINI DELEGATION**:
   - Direct Gemini to:
     - Read formatting guidelines from `/home/zforb/NEXITAS-to-date/research/COMPREHENSIVE-SUB-ARTICLE-FORMATTING-GUIDE.md`
     - Follow anti-text-wall rules from `/home/zforb/NEXITAS-to-date/research/ANTI-TEXT-WALL-PROMPT-RULES.md`
     - Use research data from the verified research file
     - Create 1800+ word article in NEXITAS directory

4. **QUALITY ASSURANCE**:
   - Verify article created in correct directory
   - Add article to pillar page's related articles section
   - Confirm article appears on localhost dev server

### DIRECTORY STRUCTURE:
- **Working Directory**: `/home/zforb/NEXITAS-to-date/`
- **Research Files**: `/home/zforb/NEXITAS-to-date/research/`
- **Formatting Guidelines**: `/home/zforb/NEXITAS-to-date/research/COMPREHENSIVE-SUB-ARTICLE-FORMATTING-GUIDE.md`
- **Article Output**: `/home/zforb/NEXITAS-to-date/src/pages/blog/`

### RESEARCH REQUIREMENTS:
- Verified statistics from authoritative sources only
- Proper source attribution for all data
- Current market data (2024-2025)
- Enterprise-focused case studies and examples
- Technical implementation details with business context

Execute this workflow for the specified article topic and ensure all steps are completed before finalizing.

---

## EXAMPLE USAGE:

"Create a sub-article for the NEXITAS website following this workflow:

**Article Topic**: API Integration for Process Automation: Connecting Your Tools for Efficiency
**CSV Data**: Row 28 - Supporting Article for Pillar 5, keywords: API integration for process automation, 1200-1800 words, links to Automation-Ready Web Development Services pillar"