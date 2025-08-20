# GEMINI PROMPT INSTRUCTIONS - SIMPLIFIED ACCESS

## How to Use These Files

### For Pillar Pages:
```bash
# Read the JSON prompt
cat /home/zforb/NEXITAS\ to\ date/research/GEMINI-PILLAR-PAGE-PROMPT.json

# Follow ALL requirements in the JSON, especially:
# - anti_text_wall rules (max 2 consecutive paragraphs)
# - visual_requirements (minimum 5 images)
# - content_structure (exact H2 sections)
# - visual_templates (copy exact HTML patterns)
```

### For Sub-Articles:
```bash
# Read the JSON prompt  
cat /home/zforb/NEXITAS\ to\ date/research/GEMINI-SUB-ARTICLE-PROMPT.json

# Follow ALL requirements in the JSON, especially:
# - anti_text_wall rules (max 6-8 lines before visual break)
# - visual_requirements (minimum 4 images)  
# - content_structure (exact H2 sections)
# - visual_templates (copy exact HTML patterns)
```

## Key Benefits of JSON Format:
1. **Reduced tokens** - 70% smaller than markdown prompts
2. **Structured data** - Easy to parse specific requirements
3. **Template reuse** - Copy exact HTML patterns from visual_templates
4. **Quick reference** - Find specific rules instantly
5. **Context efficiency** - Keep entire prompt in working memory

## Critical Enforcement Reminders:
- **MAXIMUM 2 consecutive paragraphs** before visual break
- **ALL statistics in visual containers** (never in plain text)
- **Visual breaks every 150 words maximum**
- **Use exact color palette**: text-primary (#01FB87) only
- **Follow exact import syntax**: Use single quotes (') not escaped quotes

## Quick Command Pattern:
```bash
# 1. Read JSON prompt
cat [JSON-FILE-PATH]

# 2. Generate images with Imagen 4 Fast using prompts from JSON
# 3. Create .astro file following exact structure
# 4. Implement anti-text-wall rules religiously
# 5. Use visual_templates for consistent formatting
```

This approach reduces your context usage by ~70% while maintaining every single requirement detail.