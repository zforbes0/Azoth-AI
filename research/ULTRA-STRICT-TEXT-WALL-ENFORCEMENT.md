# 🚨 ULTRA-STRICT ANTI-TEXT-WALL ENFORCEMENT

## Problem Identified: Gemini Creating Text Walls Again

Despite previous directives, Gemini continues to create massive text walls like:
- Paragraphs 10+ lines long
- Multiple consecutive paragraphs without visual breaks
- Dense blocks of text that are not scannable

## ✅ NEW ULTRA-STRICT RULES (ZERO TOLERANCE)

### PARAGRAPH LIMITS
- **MAXIMUM 2 LINES per paragraph** (was 3, now 2)
- **MAXIMUM 1 paragraph before visual break** (was 2, now 1)
- **ZERO consecutive paragraphs allowed**

### VISUAL BREAK FREQUENCY  
- **EVERY 100 words MUST have visual break** (was 150, now 100)
- **After EVERY paragraph = visual element**
- **NO EXCEPTIONS ALLOWED**

### ENFORCEMENT LANGUAGE
- Changed from "MAXIMUM 2 consecutive paragraphs" to "MAXIMUM 1 paragraph before visual break"
- Added "🚨 IMMEDIATE REJECTION" warnings
- Added "ZERO TOLERANCE" and "NO EXCEPTIONS" language
- Added specific violation examples with ❌ and ✅

### PRE-SUBMISSION CHECKLIST ADDED
Before any submission, Gemini MUST:
1. COUNT lines in each paragraph  
2. VERIFY visual break after each paragraph
3. CONFIRM statistics in visual containers
4. CHECK 10-second scannability

## 📋 UPDATED FILES

1. **`/research/GEMINI-SUB-ARTICLE-PROMPT.json`**
   - Reduced max_paragraph_lines: 3 → 2
   - Reduced max_consecutive_paragraphs: 2 → 1
   - Reduced visual_break_frequency: 150 → 100 words
   - Added violation examples and compliance check

2. **`/research/SUB-ARTICLE-PROMPT-TEMPLATE-WITH-VISUALS.md`**
   - Changed title to "ULTRA-STRICT ANTI-TEXT-WALL REQUIREMENTS"
   - Added "IMMEDIATE REJECTION" warning
   - Added specific violation/correct examples
   - Added mandatory pre-submission checklist

## 🎯 EXPECTED RESULTS

With these ultra-strict rules:
- **NO paragraphs longer than 2 lines**
- **NO consecutive paragraphs**
- **Visual break every 100 words**
- **Immediate rejection for violations**

This should FORCE Gemini to:
1. Write shorter paragraphs
2. Add visual breaks constantly  
3. Create truly scannable content
4. Self-check before submission

## 🔄 IMPLEMENTATION

Next time we use Gemini for article creation:
1. Reference the ULTRA-STRICT enforcement
2. Include violation examples
3. Demand pre-submission compliance check
4. Reject and request fixes if violations found

**Status**: COMPLETE - Zero tolerance anti-text-wall rules now implemented