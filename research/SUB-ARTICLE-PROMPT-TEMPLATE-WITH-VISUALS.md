# SUB-ARTICLE CREATION PROMPT

## 🚨 CRITICAL REQUIREMENTS

1. **NO TEXT WALLS**: Max 3 lines per paragraph, max 2 paragraphs before visual break
2. **WORD COUNT**: 1800-2200 words (count during writing - under 1800 = rejection)
3. **VISUAL BREAKS**: Every 150 words must have visual element
4. **AI IMAGES**: Generate 4+ images using Imagen 4 Fast workflow

## REFERENCE FILES TO USE

**Before starting, read these directive files:**
- `COMPREHENSIVE-SUB-ARTICLE-FORMATTING-GUIDE.md` - Anti-text-wall rules, syntax, styling
- `ENHANCED-VISUAL-CONTENT-TEMPLATE.md` - Code examples, image workflow, visual patterns
- `[topic]-research-data.md` - Market data and statistics for your topic

## TASK SPECIFICATIONS

**Topic**: [INSERT TOPIC]
**URL**: [INSERT URL]  
**File Path**: [INSERT FULL .astro FILE PATH]

## CONTENT STRUCTURE

- **H1**: [Main Title]
- **H2**: What is [topic]?
- **H2**: Key Benefits of [topic]
- **H2**: How [topic] Works / Implementation  
- **H2**: Use Cases and Examples
- **H2**: Best Practices and Tools
- **H2**: Frequently Asked Questions

## IMAGE WORKFLOW

1. Copy `generate-api-images.js` 
2. Create `[topic]-images.js` with relevant prompts
3. Ask user to run: `node [topic]-images.js`
4. Use `/assets/filename.jpg` paths in HTML

## DELIVERABLE

Complete `.astro` file following ALL formatting rules in the directive files.

**Remember**: Reference the directive files for detailed requirements!