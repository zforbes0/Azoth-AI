# TECHNICAL SEO AUDIT SERVICES - SUB-ARTICLE CREATION PROMPT FOR GEMINI

## 🚨 CRITICAL: READ ALL DIRECTIVE FILES FIRST

**MANDATORY**: Before starting, read these directive files located in `/home/zforb/NEXITAS-to-date/research/gemini-workflow/`:

1. **`COMPREHENSIVE-SUB-ARTICLE-FORMATTING-GUIDE.md`** - Anti-text-wall rules, syntax requirements, styling patterns
2. **`ENHANCED-VISUAL-CONTENT-TEMPLATE.md`** - Visual element templates, image requirements, layout patterns  
3. **`technical-seo-audit-research-data.md`** - Market statistics, ROI data, industry insights
4. **`PROMPT-CREATION-GUIDELINES.md`** - File naming and prompt creation rules

## 📋 ARTICLE SPECIFICATIONS

**Topic**: Technical SEO Audit Services: Identifying and Fixing Hidden Ranking Issues  
**URL**: `/blog/technical-seo-audit-services`  
**File Path**: `/home/zforb/NEXITAS-to-date/src/pages/blog/technical-seo-audit-services.astro`  
**Word Count**: 1800-2200 words (count during writing - under 1800 = rejection)  
**Target Keywords**: technical SEO audit services, hidden ranking issues, SEO audit tools

## 🎯 CONTENT STRUCTURE (FOLLOW EXACTLY)

1. **H1**: Technical SEO Audit Services: Identifying and Fixing Hidden Ranking Issues
2. **H2**: What is technical SEO audit services?
3. **H2**: Key Benefits of technical SEO audit services  
4. **H2**: How technical SEO audit services Works / Implementation
5. **H2**: Use Cases and Examples
6. **H2**: Best Practices and Tools
7. **H2**: Frequently Asked Questions

## 📊 KEY STATISTICS TO INTEGRATE (FROM RESEARCH DATA)

**CRITICAL**: Use these statistics in visual callout boxes (NOT in paragraph text):

### Market & ROI Statistics
- **Technical SEO Market**: $18.5B (2024) → $32.4B (2030) 
- **SEO Budget Allocation**: 25% allocated to technical SEO
- **Maximum ROI**: Up to 748% return on investment
- **Break-even Time**: 6 months average for technical SEO
- **Audit Cost Range**: $700 - $15,000 per comprehensive audit

### Technical Issues & Impact  
- **Core Web Vitals Failure**: 67% of websites fail requirements
- **Traffic Loss**: 40-60% organic traffic lost from technical issues
- **Ranking Improvement**: 50-80% improvement after technical optimization
- **AI Efficiency**: 80% audit time reduction with AI tools
- **Revenue Impact**: $200K average annual loss from unoptimized technical SEO

## 🖼️ IMAGE GENERATION WORKFLOW

**STEP 1**: Copy and customize the flexible image generation template:
```bash
cp /home/zforb/NEXITAS-to-date/research/gemini-workflow/generate-images-template.sh ./generate-technical-seo-images.sh
```

**STEP 2**: Edit the images array in `generate-technical-seo-images.sh` with these specific prompts:

**STEP 2**: Modify the images array with these technical SEO prompts:
```javascript
const images = [
  {
    prompt: "Technical SEO audit dashboard showing site analysis and ranking issues, clean interface, professional lighting, tech aesthetic, high resolution",
    filename: "technical-seo-audit-hero.jpg"
  },
  {
    prompt: "SEO audit workflow diagram with connecting nodes showing technical analysis process, corporate style, data visualization, clean modern design",
    filename: "technical-seo-workflow.jpg"
  },
  {
    prompt: "Technical SEO issues detection interface showing Core Web Vitals, crawl errors, site speed metrics, professional business dashboard",
    filename: "technical-seo-issues-detection.jpg"
  },
  {
    prompt: "Before and after SEO audit results showing ranking improvements, performance metrics, analytics graphs, success visualization",
    filename: "technical-seo-before-after.jpg"
  }
];
```

**STEP 3**: Ask user to run: `node generate-technical-seo-images.js`  
**STEP 4**: Use `/assets/filename.jpg` paths in your HTML

## 🔗 INTERNAL LINKING REQUIREMENTS

**MANDATORY LINKS** (use exact anchor text):
- Link to pillar page: [SEO optimization services]((/blog/seo-optimization-services)) 
- Link to supporting article: [AI SEO Optimization Services]((/blog/ai-seo-optimization-services))
- Link to supporting article: [Local SEO Services]((/blog/local-seo-services))
- Link to supporting article: [Automated SEO Audits]((/blog/automated-seo-audits))

## 🚨 CRITICAL ANTI-TEXT-WALL REQUIREMENTS

**ZERO TOLERANCE FOR TEXT WALLS**:
- **MAXIMUM 3 lines per paragraph** (NO EXCEPTIONS)
- **MAXIMUM 2 consecutive paragraphs** before visual break
- **Visual break every 150 words** (statistics boxes, benefit cards, diagrams)
- **ALL statistics in visual containers**, NOT buried in text
- **Scannable in 10 seconds** - reader should understand value without reading full paragraphs

**VISUAL BREAK REQUIREMENTS**:
After max 2 paragraphs, you MUST include ONE of these:
- Statistics callout boxes (`bg-primary/10 border border-primary/30`)
- Benefit cards with icons
- Process step diagrams  
- Images with text wrapping
- Quote highlights

## 📝 CONTENT FOCUS AREAS

### What is Technical SEO Audit Services?
- Define comprehensive technical analysis
- Explain hidden ranking factors
- Highlight AI-powered detection capabilities
- Use market size statistics in visual callouts

### Key Benefits
- 80% audit time reduction with AI
- 50-80% ranking improvement potential  
- $200K average revenue recovery
- 748% maximum ROI potential

### Implementation Process
- 4-phase audit methodology
- AI-powered issue detection
- Automated reporting and prioritization
- Continuous monitoring systems

### Use Cases & Examples
- E-commerce site with Core Web Vitals issues
- Enterprise site with crawl budget problems
- Include before/after metrics from research data

### Best Practices & Tools
- Google Search Console, Screaming Frog, PageSpeed Insights
- AI audit platforms and automation tools
- Technical SEO monitoring systems

## 🎯 DELIVERABLE REQUIREMENTS

Create complete `.astro` file that:
1. **Follows exact sub-article structure** from formatting guide
2. **Includes 4+ generated images** using workflow above
3. **Contains 1800-2200 words** with visual breaks every 150 words
4. **Uses all research statistics** in visual callout boxes
5. **Implements proper internal linking** to related articles
6. **Maintains NEXITAS styling** (glass morphism, neon green accents)
7. **Passes anti-text-wall compliance** (max 3 lines per paragraph)

## 📍 FILE LOCATIONS REFERENCE

- **Formatting Guide**: `/home/zforb/NEXITAS-to-date/research/gemini-workflow/COMPREHENSIVE-SUB-ARTICLE-FORMATTING-GUIDE.md`
- **Visual Templates**: `/home/zforb/NEXITAS-to-date/research/gemini-workflow/ENHANCED-VISUAL-CONTENT-TEMPLATE.md`
- **Research Data**: `/home/zforb/NEXITAS-to-date/research/gemini-workflow/technical-seo-audit-research-data.md`
- **Image Script Template**: `/home/zforb/NEXITAS-to-date/research/gemini-workflow/generate-article-images.js`
- **Example Sub-Article**: `/home/zforb/NEXITAS-to-date/src/pages/blog/custom-automation-web-apps.astro`

## ✅ SUCCESS CRITERIA

- **Word count**: 1800+ words (verified)
- **Visual compliance**: No text walls, frequent visual breaks
- **Image integration**: 4+ relevant generated images
- **Statistics usage**: All key metrics in visual containers
- **Internal linking**: All required links included
- **Technical accuracy**: Proper schema markup and metadata

**Ready for Gemini delegation - all research complete and materials prepared!**