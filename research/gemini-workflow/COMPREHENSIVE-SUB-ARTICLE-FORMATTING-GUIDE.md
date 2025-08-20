# COMPREHENSIVE SUB-ARTICLE FORMATTING GUIDE

## CRITICAL FILE STRUCTURE TEMPLATE

```astro
---
import Layout from '../../layouts/Layout.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import RelatedArticles from '../../components/RelatedArticles.astro';
---
```

## CRITICAL SYNTAX REQUIREMENTS

1. **Import Quotes**: Use regular single quotes (') NOT escaped quotes (\')
   - ✅ CORRECT: `'../../layouts/Layout.astro'`
   - ❌ WRONG: `\'../../layouts/Layout.astro\'`

2. **Component Props**: Match existing patterns exactly
   - ✅ Breadcrumb: `path={[...]}` with `url` property
   - ❌ Breadcrumb: `links={[...]}` with `href` property

## LAYOUT COMPONENT TEMPLATE

```astro
<Layout 
  title="[ARTICLE_TITLE]" 
  description="[ARTICLE_TITLE] — Learn best practices, benefits, and implementation tips for [TOPIC]."
  type="article"
  author="[AUTHOR_NAME]"
  ogImage="/assets/[IMAGE_FILENAME].jpg"
  publishedTime="2025-08-19T08:00:00.000Z"
  modifiedTime="2025-08-19T08:00:00.000Z"
>
```

## HERO SECTION STRUCTURE

```astro
<section class="relative min-h-[40vh] flex items-center justify-center wireframe-bg overflow-hidden">
  <div class="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center">
    <div class="animate-slide-up">
      <p class="text-primary font-orbitron text-sm tracking-wider mb-4 matrix-text-shadow">
        [CATEGORY_TEXT]
      </p>
      <h1 class="text-2xl md:text-2xl font-orbitron font-bold mb-6 text-white">
        [TITLE_WITH_HIGHLIGHT]
      </h1>
      <p class="text-lg text-white max-w-4xl mx-auto mb-8 leading-relaxed">
        [DESCRIPTION_WITH_STATS]
      </p>
    </div>
  </div>
</section>
```

## ARTICLE METADATA TEMPLATE

```astro
<article class="py-12">
  <div class="max-w-4xl mx-auto px-6">
    <div class="border-b border-gray-800 pb-6 mb-8">
      <div class="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            [DATE]
          </span>
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            [READ_TIME]
          </span>
          <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            [TAG]
          </span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span class="text-black font-bold text-sm">AA</span>
        </div>
        <div>
          <p class="text-white font-medium">[AUTHOR_NAME]</p>
          <p class="text-gray-400 text-sm">[AUTHOR_DESCRIPTION]</p>
        </div>
      </div>
    </div>
    
    <div class="mb-12">
      <img src="[HERO_IMAGE_URL]" alt="[ALT_TEXT]" class="w-full h-64 object-cover rounded-xl"/>
    </div>
```

## 🚨 CRITICAL ANTI-TEXT-WALL REQUIREMENTS

### TEXT LIMITS (STRICTLY ENFORCED)
- **MAXIMUM 3 lines per paragraph** (NO EXCEPTIONS)
- **MAXIMUM 2 consecutive paragraphs** before visual break
- **EVERY 150 words MUST have visual break**
- **ALL statistics in visual containers**, NOT in paragraph text

### VISUAL BREAK REQUIREMENTS
After MAXIMUM 2 paragraphs, you MUST include:
- Statistics callout boxes (`bg-primary/10 border border-primary/30`)
- Benefit cards with icons
- Process step diagrams
- Images with text wrapping
- Quote highlights

### SCANNABLE CONTENT MANDATE
- Reader should scan page in 10 seconds and understand value
- No walls of dense text
- Frequent visual breaks and white space

### VIOLATION EXAMPLES
❌ **BAD**: "This is a long paragraph that goes on for multiple lines explaining concepts in detail without any breaks or visual elements."
✅ **GOOD**: "This is a short paragraph." [VISUAL BREAK] "This is another short paragraph."

### PRE-SUBMISSION CHECKLIST
Before submitting, COUNT EVERY PARAGRAPH:
1. ✅ Is this paragraph 3 lines or less?
2. ✅ Is there a visual break after max 2 paragraphs?
3. ✅ Are statistics in visual containers, not text?
4. ✅ Can a user scan this in 10 seconds?

**IF ANY ANSWER IS NO → ADD VISUAL BREAKS IMMEDIATELY**

## CRITICAL STYLING REQUIREMENTS

### COLOR PALETTE (EXACT REQUIREMENTS)
- **Primary accent**: ONLY use `text-primary` class (#01FB87 neon green)
- **Glass effects**: `bg-primary/10` and `border-primary/30` 
- **NO custom colors**: Never use cyan, teal, blue, or other colors
- **Background**: Dark theme with `wireframe-bg` class (CSS background image only, no component)

### TYPOGRAPHY
- **Headings**: `font-orbitron font-bold text-primary`
- **Body text**: `text-white` (never gray unless meta info)
- **Containers**: `max-w-4xl mx-auto px-6` for articles

## ANTI-TEXT-WALL RULES (MANDATORY)

### RULE 1: MAXIMUM TEXT DENSITY
- **NO paragraph longer than 3 lines**
- **NO MORE than 2 consecutive paragraphs** (even if individually short)
- **NO MORE than 6-8 total lines of text** before visual break
- **EVERY 150 words MUST have a visual break**

### RULE 2: SECTION STRUCTURE PATTERN
Each H2 section MUST follow:
1. **Opening paragraph** (max 2 sentences)
2. **MANDATORY VISUAL ELEMENT**
3. **Supporting content** (max 2 sentences)  
4. **ANOTHER VISUAL ELEMENT**
5. **Closing insight** (1 sentence with highlighted statistic)

## IMAGE USAGE GUIDELINES

**CRITICAL**: ALL images must be generated using Imagen 4 Fast API before referencing them in articles.

**API KEY**: AIzaSyDOeBeIc_4vPr9SppM2vw7j6jHKkQpHrJU

**REQUIRED METHOD:**
1. **Generate with Imagen 4 Fast**: Use the API key above to generate all needed images
2. **Save to public/assets**: Save generated images to `/home/zforb/NEXITAS-to-date/public/assets/`
3. **Use local paths**: Reference the saved images with `/assets/filename.jpg`

**PROCESS:**
1. Identify all images needed for the article
2. Generate each image using Imagen 4 Fast model with professional, business-relevant prompts
3. Save images to public/assets folder with descriptive filenames
4. Reference the generated images in the article

**WORKING EXAMPLES:**
- `src="/assets/api-integration-hero.jpg"` (after generating and saving)
- `src="/assets/enterprise-dashboard.jpg"` (after generating and saving)

**AVOID:**
- Using Unsplash, Pexels, or stock photo URLs
- Referencing non-existent local asset paths
- Creating articles without generating images first

**MANDATORY IMAGE GENERATION PROCESS:**
1. Copy `/home/zforb/NEXITAS-to-date/generate-api-images.js`
2. Modify images array with specific prompts and filenames
3. Run: `node your-script-name.js`
4. Images automatically saved to `/public/assets/`
5. Reference as: `<img src="/assets/filename.jpg" alt="description"/>`
6. NEVER use external image services - always generate with Imagen 4 Fast API

## VISUAL ELEMENT TEMPLATES

### Statistics Callout
```astro
<div class="grid md:grid-cols-3 gap-6 my-8">
  <div class="bg-primary/10 border border-primary/30 p-6 rounded-xl text-center">
    <div class="text-4xl font-orbitron font-bold text-primary mb-2">[STAT]</div>
    <p class="text-white">[DESCRIPTION]</p>
  </div>
</div>
```

### Benefit Card
```astro
<div class="bg-primary/5 border border-primary/20 p-6 rounded-xl">
  <h4 class="text-xl font-orbitron font-bold text-primary mb-3">[TITLE]</h4>
  <p class="text-white">[DESCRIPTION]</p>
</div>
```

### Visual Info Box
```astro
<div class="bg-primary/10 border border-primary/30 p-6 rounded-xl mb-8">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0">
      <img src="[GENERATED_IMAGE_PATH]" alt="[ALT_TEXT]" class="w-48 h-32 object-cover rounded-lg"/>
    </div>
    <div class="flex-1">
      <h3 class="text-xl font-orbitron font-bold text-primary mb-4">[TITLE]</h3>
      <ol class="text-white space-y-2">
        <li><strong>1. Step:</strong> [DESCRIPTION]</li>
      </ol>
    </div>
  </div>
</div>
```

### Process Step
```astro
<div class="flex items-start gap-4 mb-6">
  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
    <span class="text-black font-bold text-sm">[NUMBER]</span>
  </div>
  <div>
    <h4 class="font-orbitron font-bold text-white mb-2">[STEP_TITLE]</h4>
    <p class="text-gray-300">[STEP_DESCRIPTION]</p>
  </div>
</div>
```

### Quote/Statistic Highlight
```astro
<blockquote class="border-l-4 border-primary pl-6 py-4 my-6 bg-primary/5 rounded-r-lg">
  <p class="text-lg text-white italic">"[QUOTE]"</p>
  <cite class="text-primary text-sm">— [SOURCE]</cite>
</blockquote>
```

### Expandable FAQ
```astro
<details class="group bg-primary/5 border border-primary/20 rounded-xl mb-4">
  <summary class="flex items-center justify-between p-6 cursor-pointer">
    <h3 class="text-lg font-orbitron font-bold text-primary">[QUESTION]</h3>
    <svg class="w-5 h-5 text-primary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </summary>
  <div class="px-6 pb-6">
    <p class="text-white">[ANSWER]</p>
  </div>
</details>
```

## BREADCRUMB TEMPLATE
```astro
<Breadcrumb 
  path={[
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: '[ARTICLE_TITLE]', url: '[ARTICLE_URL]' }
  ]}
/>
```

## JSON-LD SCHEMA TEMPLATE
```javascript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[ARTICLE_TITLE]",
  "author": { "@type": "Organization", "name": "[AUTHOR_NAME]" },
  "datePublished": "2025-08-19",
  "dateModified": "2025-08-19",
  "wordCount": "[ACTUAL_WORD_COUNT]",
  "timeRequired": "PT[READ_TIME]M",
  "isPartOf": { "@type": "Blog", "name": "[BLOG_NAME]" },
  "about": {
    "@type": "Thing", 
    "name": "[PILLAR_PAGE_TITLE]",
    "url": "[PILLAR_PAGE_URL]"
  }
}
</script>
```

## RELATED ARTICLES CLOSING
```astro
<RelatedArticles 
  articles={[
    { 
      title: '[TITLE]',
      url: '[URL]',
      excerpt: '[EXCERPT]',
      readTime: '[READ_TIME]',
      date: '[DATE]'
    }
  ]}
/>
</div>
</article>

<Footer />
</Layout>
```

## VISUAL-TO-TEXT RATIO ENFORCEMENT
- **60% visual content** (cards, diagrams, highlighted stats, images)
- **40% flowing text** (short paragraphs with embedded highlights)
- **Minimum 2 visual elements** per H2 section
- **No more than 100 words** between visual elements
- **Every statistic** must be in a visual container
- **Every benefit** must be a structured card

## CONTENT REQUIREMENTS
- **Word Count**: Minimum 1800+ words
- **Section Length**: Each H2 section 250-350+ words
- **Tone**: Professional, targeting CTOs and business decision-makers
- **Focus**: Business value, ROI, concrete examples
- **Statistics**: Integrate naturally with visual highlights