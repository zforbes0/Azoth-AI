# COMPREHENSIVE SUB-ARTICLE CREATION TEMPLATE

## 🚨 CRITICAL REQUIREMENTS (READ FIRST)

1. **NO TEXT WALLS**: Maximum 3 lines per paragraph. Maximum 2 paragraphs before visual break.
2. **WORD COUNT**: 1800-2200 words (count during writing - articles under 1800 words = rejection)
3. **VISUAL BREAKS**: Every 150 words must have callout box, image, or visual element
4. **AI IMAGES**: Generate 4+ images using Imagen 4 Fast workflow

## REFERENCE FILES TO USE

**Before starting, read these directive files:**
- `COMPREHENSIVE-SUB-ARTICLE-FORMATTING-GUIDE.md` - Anti-text-wall rules, syntax, styling
- `ENHANCED-VISUAL-CONTENT-TEMPLATE.md` - Code examples, image workflow, visual patterns  
- `ULTRA-STRICT-TEXT-WALL-ENFORCEMENT.md` - Anti-text-wall enforcement rules
- `[topic]-research-data.md` - Market data and statistics for your specific topic

## ARTICLE SPECIFICATIONS

**Topic**: [INSERT TOPIC]
**URL**: [INSERT URL]
**File Path**: [INSERT FULL .astro FILE PATH]
**Word Count Target**: 1800-2200 words
**Images Required**: Minimum 4 AI-generated images

## CONTENT STRUCTURE (MANDATORY H2 SECTIONS)

- **H1**: [Main Title with Topic Focus]
- **H2**: What is [topic]?
- **H2**: Key Benefits of [topic] 
- **H2**: How [topic] Works / Implementation
- **H2**: Use Cases and Examples
- **H2**: Best Practices and Tools
- **H2**: Frequently Asked Questions

## STYLING REQUIREMENTS

### Color Palette & Fonts:
- **Primary Color**: `text-primary` (#01FB87) - NEXITAS neon green
- **Glass Effects**: `bg-primary/10`, `border border-primary/30`
- **Headings**: `font-orbitron font-bold`
- **Background**: Wireframe background with matrix overlay

### Visual Elements Pattern:
```astro
<!-- Callout Box Template -->
<div class="bg-primary/10 border border-primary/30 p-6 rounded-xl mb-8">
  <h3 class="text-xl font-orbitron font-bold text-primary mb-3">Key Insight</h3>
  <p class="text-white">Important information with visual prominence.</p>
</div>

<!-- Statistics Display -->
<div class="grid md:grid-cols-2 gap-6 my-8">
  <div class="bg-primary/5 border border-primary/20 p-6 rounded-xl text-center">
    <div class="text-4xl font-orbitron font-bold text-primary mb-2">85%</div>
    <p class="text-white">Efficiency Improvement</p>
  </div>
</div>
```

## IMAGE WORKFLOW (STEP-BY-STEP)

### 1. Image Generation Process:
1. Copy `generate-api-images.js` to create `[topic]-images.js`
2. Customize image prompts for your specific topic
3. Ask user to run: `node [topic]-images.js`
4. Use `/assets/filename.jpg` paths in HTML img tags

### 2. Standard Image Types (Generate 4+):
- **Hero Image**: Topic-specific professional environment
- **Process Diagram**: Workflow or architecture visualization
- **Implementation**: Team/dashboard showing topic in action
- **Results**: Analytics/dashboard showing benefits/ROI

## ARTICLE IMPORT STRUCTURE

### Required Imports:
```astro
---
import Layout from '../../layouts/Layout.astro';
import Footer from '../../components/Footer.astro';
import WireframeBackground from '../../components/WireframeBackground.astro';
---
```

## VISUAL BREAK ENFORCEMENT

### Every 150 Words Must Include One Of:
- **Callout box** with key information
- **Statistics** in visual container
- **Image** with descriptive caption
- **Process step** with numbered visual
- **Comparison** table or panel
- **Bullet point** lists with visual styling

### Paragraph Rules:
- **Maximum 3 lines** per paragraph
- **Maximum 2 consecutive** paragraphs before visual break
- **No walls of text** - break up content with visual elements

## TEMPLATES TO FOLLOW

### Reference Existing Articles:
- Examine `/src/pages/blog/sales-prospecting-automation-tools.astro` for sub-article structure
- Copy visual element patterns from existing NEXITAS articles
- Use consistent NEXITAS styling throughout
- Follow established component patterns

## DELIVERABLE REQUIREMENTS

Complete `.astro` file that includes:

1. **Proper file structure** with required imports
2. **1800-2200 word count** with comprehensive content
3. **4+ AI-generated images** relevant to topic
4. **Frequent visual breaks** (every 150 words maximum)
5. **NEXITAS styling consistency** throughout
6. **All H2 sections** covered comprehensively
7. **Anti-text-wall compliance** with short paragraphs
8. **Glass morphism effects** and neon green accents

## SUCCESS CHECKLIST

Before submitting, verify:
- [ ] Word count is between 1800-2200 words
- [ ] No paragraph exceeds 3 lines
- [ ] Visual break every 150 words
- [ ] All required H2 sections included
- [ ] 4+ images generated and embedded
- [ ] NEXITAS color scheme used consistently
- [ ] Glass morphism styling applied
- [ ] Anti-text-wall rules followed throughout

**Remember**: Read all directive files before starting. Follow existing NEXITAS article patterns. Short paragraphs and frequent visual breaks are mandatory!