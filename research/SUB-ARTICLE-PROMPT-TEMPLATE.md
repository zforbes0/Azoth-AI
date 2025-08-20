# GEMINI SUB-ARTICLE CREATION PROMPT - CUSTOM AUTOMATION WEB APPS

## CRITICAL: This is a SUB-ARTICLE, not a pillar page!

You are creating a **SUB-ARTICLE** that follows the exact NEXITAS design patterns and structure.

### REQUIRED STRUCTURE (FOLLOW EXACTLY)

**MUST examine `/src/pages/blog/sales-prospecting-automation-tools.astro` to understand the correct sub-article layout!**

#### File Structure Template:
```astro
---
import Layout from '../../layouts/Layout.astro';
import Footer from '../../components/Footer.astro';
import WireframeBackground from '../../components/WireframeBackground.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import RelatedArticles from '../../components/RelatedArticles.astro';
---
```

**CRITICAL SYNTAX NOTES**: 
1. Use regular single quotes (') in import statements, NOT escaped quotes (\\'):
   - `'../../layouts/Layout.astro'` ✅ CORRECT
   - `\\'../../layouts/Layout.astro\\'` ❌ WRONG - causes syntax errors

2. Component props must match existing patterns:
   - Breadcrumb: `path={[...]}` with `url` property ✅ CORRECT
   - Breadcrumb: `links={[...]}` with `href` property ❌ WRONG - causes errors

<Layout 
  title="Custom Automation Web Apps: Tailored Solutions for Your Business Processes" 
  description="Custom Automation Web Apps: Tailored Solutions for Your Business Processes — Learn best practices, benefits, and implementation tips for custom automation web apps."
  type="article"
  author="Nexitas Team"
  ogImage="/assets/custom-automation-web-apps.jpg"
  publishedTime="2025-01-20T08:00:00.000Z"
  modifiedTime="2025-08-18T08:00:00.000Z"
>
```

### DESIGN REQUIREMENTS (EXACT NEXITAS PATTERNS)

#### Layout Structure:
1. **Hero Section**: WireframeBackground + centered content
2. **Article Content**: max-width-4xl container
3. **Article Meta**: Author, date, read time with proper spacing
4. **Main Content**: Comprehensive sections with proper typography
5. **Related Articles**: Component at bottom
6. **Breadcrumb Navigation**: Proper path structure

#### CRITICAL STYLING REQUIREMENTS:

**COLOR PALETTE** (MUST FOLLOW EXACTLY):
- **Primary accent**: ONLY use `text-primary` class (neon green #00ff00)
- **Glass effects**: `bg-primary/10` and `border-primary/30` 
- **NO custom colors**: Never use cyan, teal, blue, or other colors
- **Background**: Dark theme with `wireframe-bg` class

**LAYOUT STRUCTURE** (EXACT PATTERN):
```astro
<section class="relative min-h-[40vh] flex items-center justify-center wireframe-bg overflow-hidden">
  <WireframeBackground />
  <div class="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center">
    <div class="animate-slide-up">
      <p class="text-primary font-orbitron text-sm tracking-wider mb-4 matrix-text-shadow">
        CUSTOM AUTOMATION SOLUTIONS
      </p>
      <h1 class="text-2xl md:text-2xl font-orbitron font-bold mb-6 text-white">
        Custom Automation Web Apps: <span class="text-primary">Tailored Solutions</span>
      </h1>
      <p class="text-lg text-white max-w-4xl mx-auto mb-8 leading-relaxed">
        Description with market stats
      </p>
    </div>
  </div>
</section>

<article class="py-12">
  <div class="max-w-4xl mx-auto px-6">
    <!-- Article Meta -->
    <div class="border-b border-gray-800 pb-6 mb-8">
      <div class="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            January 20, 2025
          </span>
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            10 min read
          </span>
          <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            Custom Apps
          </span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span class="text-black font-bold text-sm">AA</span>
        </div>
        <div>
          <p class="text-white font-medium">Azoth Automations</p>
          <p class="text-gray-400 text-sm">Custom Development Specialists</p>
        </div>
      </div>
    </div>
    
    <!-- Hero Image -->
    <div class="mb-12">
      <img src="[hero-image-url]" alt="Custom automation web apps" class="w-full h-64 object-cover rounded-xl">
    </div>
    
    <!-- Article Content -->
    [Main content sections]
  </div>
</article>
```

**TYPOGRAPHY**:
- Headings: `font-orbitron font-bold text-primary`
- Body text: `text-white` (never gray unless meta info)
- Containers: `max-w-4xl mx-auto px-6` for articles

### CONTENT REQUIREMENTS (1,800+ WORDS)

#### Structure (EXACT outline):
```
H1: Custom Automation Web Apps: Tailored Solutions for Your Business Processes
H2: What are Custom Automation Web Apps?  
H2: Key Benefits of Custom Automation Web Apps
H2: How Custom Automation Web Apps Work / Implementation
H2: Use Cases and Examples
H2: Best Practices and Tools  
H2: Frequently Asked Questions
```

#### Research Data Integration (USE ALL OF THIS):
- **Market Growth**: $43.16B (2024) to $146.18B (2030), 22.6% CAGR
- **ROI Statistics**: $5.44 return per $1 invested
- **Time Savings**: 500+ hours annually, 10-50% manual task reduction
- **Adoption Rates**: 80% of organizations adopting intelligent automation by 2025
- **Enterprise Focus**: 60% market share in enterprise segment
- **Regional Growth**: 34% North America share, Asia Pacific fastest growth

#### Content Depth Requirements:
- **Professional tone** targeting CTOs, development managers, business owners
- **Each H2 section**: 250-350+ words with concrete examples
- **Real statistics** integrated naturally throughout
- **Business focus** emphasizing ROI, efficiency, scalability
- **Technical detail** without being overly complex
- **Actionable insights** with specific implementation guidance

### TECHNICAL SEO REQUIREMENTS

#### JSON-LD Schema (in Layout head):
```javascript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Custom Automation Web Apps: Tailored Solutions for Your Business Processes",
  "author": { "@type": "Organization", "name": "Nexitas" },
  "datePublished": "2025-01-20",
  "dateModified": "2025-08-18",
  "wordCount": "[actual word count 1800+]",
  "timeRequired": "PT10M",
  "isPartOf": { "@type": "Blog", "name": "Nexitas AI Integration Blog" },
  "about": {
    "@type": "Thing", 
    "name": "Automation-Ready Web Development Services",
    "url": "https://azoth-ai.vercel.app/blog/automation-ready-web-development-services"
  }
}
</script>
```

### LINKING STRATEGY

#### Internal Links (MUST include):
- **Pillar Link**: Link back to "Automation-Ready Web Development Services" pillar
- **Cross-references**: Link to related business process automation articles
- **Contextual Links**: Natural integration in content, not forced

### VISUAL ELEMENTS

#### Hero Section Design:
```astro
<section class="relative min-h-[40vh] flex items-center justify-center wireframe-bg overflow-hidden">
  <WireframeBackground />
  <div class="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center">
    <div class="animate-slide-up">
      <p class="text-primary font-orbitron text-sm tracking-wider mb-4 matrix-text-shadow">
        CUSTOM AUTOMATION SOLUTIONS
      </p>
      <h1 class="text-2xl md:text-2xl font-orbitron font-bold mb-6 text-white">
        Custom Automation Web Apps: <span class="text-primary">Tailored Solutions for Your Business Processes</span>
      </h1>
      <p class="text-lg text-white max-w-4xl mx-auto mb-8 leading-relaxed">
        [Compelling description with market statistics and value proposition]
      </p>
    </div>
  </div>
</section>
```

#### Content Styling:
- **Glass-morphism boxes** for key points and statistics
- **Proper spacing**: py-12 for sections, mb-8 for elements
- **Typography hierarchy**: Consistent heading sizes and spacing
- **Call-to-action**: Professional CTA at end linking to contact

### FINAL DELIVERABLE

Provide the complete `.astro` file that:
1. **Follows exact NEXITAS sub-article structure** (not pillar format)
2. **Contains 1,800+ words** of comprehensive, research-backed content
3. **Uses proper Layout component** with correct props
4. **Matches design patterns exactly** - colors, spacing, typography
5. **Includes all technical SEO** and proper schema markup
6. **Professional quality** suitable for enterprise audience

**CRITICAL SUCCESS FACTORS:**
- Examine existing sub-article structure FIRST (sales-prospecting-automation-tools.astro)
- Use Layout component properly (not manual head tags)
- Follow NEXITAS color scheme and design patterns
- Integrate comprehensive research data naturally
- Write for business decision-makers and technical leaders
- Maintain professional, authoritative tone throughout
- Ensure proper internal linking to pillar page

**This is a SUB-ARTICLE under the Automation-Ready Web Development pillar - make it comprehensive, authoritative, and perfectly styled to match existing NEXITAS articles.**