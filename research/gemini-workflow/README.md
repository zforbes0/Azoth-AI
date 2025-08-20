# Gemini Workflow Directory

This directory contains all files needed for Gemini to create high-quality sub-articles.

## Files in This Directory

### Core Prompt
- **`CLEAN-SUB-ARTICLE-PROMPT.md`** - Main prompt template (50 lines, focused)

### Reference Files (Gemini accesses these)
- **`COMPREHENSIVE-SUB-ARTICLE-FORMATTING-GUIDE.md`** - Anti-text-wall rules, syntax, styling requirements
- **`ENHANCED-VISUAL-CONTENT-TEMPLATE.md`** - Code examples for visual elements, image workflow
- **`PROMPT-CREATION-GUIDELINES.md`** - File naming rules to prevent template corruption

### Research Files (Created per topic)
- **`[topic]-research-data.md`** - Market data, statistics (created as needed)
- **`[topic]-content-brief.md`** - Topic-specific content requirements (created as needed)

## How to Use This Workflow

1. **Create research file** for the topic (e.g., `seo-optimization-research-data.md`)
2. **Customize the prompt** with specific topic, URL, file path
3. **Reference all files** in the prompt so Gemini knows what to use
4. **Keep the main prompt short** - all details are in reference files

## Key Benefits

- **Short prompts** (50-70 lines max)
- **Separated concerns** (formatting, content, examples)
- **Reusable templates** (no corruption of general files)
- **Clear workflow** (research → prompt → reference files → article)

This structure prevents prompt bloat and ensures Gemini follows all formatting rules while having access to topic-specific research.