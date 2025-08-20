# CORRECTED GEMINI PROMPT: Automation-Ready Web Development PILLAR PAGE

## 🧠 SEQUENTIAL REASONING REQUIRED
**Use advanced sequential reasoning for this complex task. Apply this format:**
- 🔍 **ANALYSIS**: Break down the pillar page requirements and technical constraints
- 📋 **PLAN**: Structure the content layout, visual elements, and sub-article integration  
- 🧠 **REASONING**: Think through the optimal information architecture and user experience
- ⚡ **EXECUTION**: Create the complete .astro file with all requirements
- ✅ **VERIFICATION**: Check compliance with anti-text-wall rules and accessibility standards

## CRITICAL: This is a PILLAR PAGE HUB, NOT a regular blog article!

You are creating a **PILLAR PAGE HUB** that serves as the central hub for 5 sub-articles. This is NOT a regular blog article format.

### REQUIRED STRUCTURE (FOLLOW EXACTLY)

**MUST examine `/src/pages/blog/business-process-automation-services.astro` to understand the correct pillar page layout!**

#### Layout Requirements:
- **Grid layout**: `lg:grid-cols-3` (left column spans 2, right column spans 1)
- **Left Column**: Main comprehensive content (2,400+ words)
- **Right Column**: Sub-article hub with prominent cards for all 5 sub-articles
- **Hero Section**: Large title with comprehensive description
- **Table of Contents**: Expandable TOC section
- **Full Content**: Complete pillar page content, not abbreviated

#### File Structure:
```astro
---
import Layout from '../../layouts/Layout.astro';
import Footer from '../../components/Footer.astro';
import WireframeBackground from '../../components/WireframeBackground.astro';

// Sub-articles for this pillar (MUST include all 5)
const pillarArticles = [
```

**CRITICAL SYNTAX NOTE**: Use regular single quotes (') in import statements, NOT escaped quotes (\\'). The imports must be exactly:
- `'../../layouts/Layout.astro'` ✅ CORRECT
- `\\'../../layouts/Layout.astro\\'` ❌ WRONG - causes syntax errors
  {
    title: "Custom Automation Web Apps: Tailored Solutions for Your Business Processes",
    url: "/blog/custom-automation-web-apps",
    excerpt: "Build custom web applications designed specifically for your unique business automation requirements.",
    date: "2025-01-20",
    readTime: "8 min read",
    tags: ["Custom Apps", "Business Processes"]
  },
  {
    title: "SaaS App Development for Automation-First Businesses", 
    url: "/blog/saas-app-development-for-automation",
    excerpt: "Develop scalable SaaS platforms with automation built into the core architecture.",
    date: "2025-01-18",
    readTime: "10 min read", 
    tags: ["SaaS", "Automation-First"]
  },
  {
    title: "API Integration for Process Automation: Connecting Your Tools for Efficiency",
    url: "/blog/api-integration-for-process-automation", 
    excerpt: "Seamlessly connect all your business tools through strategic API integrations.",
    date: "2025-01-16",
    readTime: "9 min read",
    tags: ["API Integration", "Process Efficiency"]
  },
  {
    title: "Progressive Web App Development with Automation Features",
    url: "/blog/progressive-web-app-development-automation",
    excerpt: "Build PWAs that leverage automation to deliver superior user experiences.",
    date: "2025-01-14", 
    readTime: "11 min read",
    tags: ["PWA", "Mobile Automation"]
  },
  {
    title: "Headless CMS Implementation for Automated Content Management",
    url: "/blog/headless-cms-implementation-automation",
    excerpt: "Implement headless CMS solutions that automate content workflows and delivery.",
    date: "2025-01-12",
    readTime: "7 min read",
    tags: ["Headless CMS", "Content Automation"]
  }
];
---
```

### CONTENT REQUIREMENTS (2,400+ WORDS)

#### Structure (EXACT outline):
```
H1: Automation-Ready Web Development Services (Main pillar title)
H2: What is Automation-Ready Web Development Services?  
H2: Key Benefits of Automation-Ready Web Development Services
H2: How Automation-Ready Web Development Services Works / Implementation
H2: Use Cases and Examples
H2: Best Practices and Tools  
H2: Frequently Asked Questions
```

#### Research Data Integration:
- Market size: $15.3 billion AI in web development by 2028
- Low-code/no-code growth: 23% annually 
- ROI: 300-500% within first two years
- Performance impact: 20% conversion rate impact from 1-second delay
- AI integration: 60% of businesses leveraging AI
- Automation efficiency: 40-60% processing time improvement

#### Content Depth Requirements:
- **Professional tone** targeting CTOs, development managers
- **Comprehensive sections** - each H2 should be 300-400+ words
- **Real examples** and concrete use cases
- **Technical detail** without being overly complex
- **Business focus** emphasizing ROI and efficiency
- **Industry statistics** naturally integrated throughout

### DESIGN REQUIREMENTS

#### Layout Pattern (CRITICAL):
```astro
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
  <!-- Left Column - Main Content (66%) -->
  <div class="lg:col-span-2">
    <!-- Hero content, TOC, main content sections -->
  </div>
  
  <!-- Right Column - Sub-article Hub (33%) -->  
  <div class="lg:col-span-1">
    <!-- Sub-article cards -->
  </div>
</div>
```

#### Sub-article Hub (RIGHT COLUMN):
- **Prominent title**: "Related Articles in This Series"
- **5 featured cards** with title, excerpt, date, read time, tags
- **Glass-morphism styling** to match site design
- **Clear CTAs** to read each sub-article

#### Visual Elements:
- **Hero image**: Relevant automation/development image
- **Glass-morphism effects**: Consistent with NEXITAS design
- **Orbitron font**: For all headings
- **Primary color accents**: Green theme throughout
- **Responsive design**: Mobile-first approach

### LINKING STRATEGY

#### Internal Links (MUST include):
- Link to each sub-article naturally in content
- Cross-reference other pillar pages where relevant
- Use descriptive anchor text, not generic "click here"

### TECHNICAL SEO

#### JSON-LD Schema:
- **Article type** with comprehensive metadata
- **wordCount**: Actual word count (should be 2400+)
- **timeRequired**: Based on word count (PT15M for 2400 words)
- **isPartOf**: Blog reference
- **keywords**: Relevant automation and web development terms

#### Meta Requirements:
- **Canonical URL**: https://azoth-ai.vercel.app/blog/automation-ready-web-development-services
- **OG tags**: Proper social media sharing
- **Description**: Compelling meta description under 160 characters

### FINAL DELIVERABLE

Provide the complete `.astro` file that:
1. **Follows exact pillar page layout** (not article format)
2. **Contains 2,400+ words** of comprehensive content
3. **Prominently features all 5 sub-articles** in right sidebar
4. **Matches NEXITAS design patterns** exactly
5. **Includes all technical SEO** requirements

**CRITICAL SUCCESS FACTORS:**
- Examine existing pillar page structure FIRST
- Create comprehensive content, not abbreviated
- Use proper grid layout with content hub
- Feature sub-articles prominently  
- Write for CTOs/technical decision makers
- Integrate research statistics naturally
- Maintain professional, authoritative tone throughout

**This is a PILLAR PAGE HUB - the central authority on automation-ready web development that links to 5 specialized sub-articles. Make it comprehensive, authoritative, and properly structured.**