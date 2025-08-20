# ANTI-TEXT-WALL PROMPT RULES - MANDATORY FOR ALL PILLAR PAGES

## **🚫 CRITICAL: AVOID TEXT WALLS AT ALL COSTS**

Based on analysis of failed "Avoid.PNG" examples, these rules are MANDATORY:

### **RULE 1: MAXIMUM TEXT DENSITY**
- **NO paragraph longer than 3 lines**
- **NO MORE than 2 consecutive paragraphs** (even if individually short)
- **NO MORE than 6-8 total lines of text** before visual break
- **EVERY 150 words MUST have a visual break**

### **RULE 2: MANDATORY VISUAL BREAKS**
After MAXIMUM 2 paragraphs OR 6-8 lines of text (whichever comes first), you MUST include ONE of these:

#### **Option A: Statistics Callout**
```astro
<div class="bg-primary/10 border border-primary/30 p-4 rounded-lg my-6 inline-block">
  <span class="text-2xl font-orbitron font-bold text-primary">75%</span>
  <span class="text-white ml-2">improvement in efficiency</span>
</div>
```

#### **Option B: Benefit Card**
```astro
<div class="bg-primary/5 border border-primary/20 p-6 rounded-xl mb-8 max-w-md">
  <div class="flex items-center gap-4 mb-4">
    <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
      <span class="text-black font-bold">✓</span>
    </div>
    <h4 class="font-orbitron font-bold text-primary">Key Benefit</h4>
  </div>
  <p class="text-white">Brief description of benefit with concrete value.</p>
</div>
```

#### **Option C: Process Step**
```astro
<div class="flex items-start gap-4 mb-6">
  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
    <span class="text-black font-bold text-sm">1</span>
  </div>
  <div>
    <h4 class="font-orbitron font-bold text-white mb-2">Step Title</h4>
    <p class="text-gray-300">Brief step description.</p>
  </div>
</div>
```

#### **Option D: Quote/Statistic Highlight**
```astro
<blockquote class="border-l-4 border-primary pl-6 py-4 my-6 bg-primary/5 rounded-r-lg">
  <p class="text-lg text-white italic">"Organizations implementing this approach achieve 90-95% automation rates"</p>
  <cite class="text-primary text-sm">— McKinsey Global Institute</cite>
</blockquote>
```

### **RULE 3: CONTENT STRUCTURE MANDATES**

#### **For Each H2 Section:**
1. **Opening paragraph** (max 2 sentences)
2. **Visual element** (card, statistic, diagram, or image)
3. **Supporting paragraph** (max 2 sentences)
4. **Another visual element** or **list format**
5. **Closing insight** (1 sentence with highlighted statistic)

#### **Example Proper Structure:**
```astro
<h2>What is Automation-Ready Web Development?</h2>

<!-- Opening (2 sentences max) -->
<p class="text-lg text-white mb-6">
  Automation-ready web development combines modern practices with intelligent tools to create self-optimizing applications. This approach builds automation into every stage of the development lifecycle.
</p>

<!-- MANDATORY VISUAL BREAK -->
<div class="grid md:grid-cols-3 gap-6 mb-8">
  <div class="text-center bg-primary/10 border border-primary/30 p-6 rounded-xl">
    <div class="text-3xl font-orbitron font-bold text-primary mb-2">$15.3B</div>
    <p class="text-white text-sm">AI in web development by 2028</p>
  </div>
  <!-- ... more stats -->
</div>

<!-- Supporting content (2 sentences max) -->
<p class="text-lg text-white mb-6">
  Unlike traditional development with manual hand-offs, automation-ready approaches integrate <span class="text-primary font-bold">CI/CD pipelines</span>, <span class="text-primary font-bold">automated testing</span>, and <span class="text-primary font-bold">performance monitoring</span>. The methodology embraces low-code/no-code platforms growing at <span class="text-primary font-bold">23% annually</span>.
</p>

<!-- ANOTHER MANDATORY VISUAL BREAK -->
<div class="bg-primary/10 border border-primary/30 p-6 rounded-xl mb-8">
  <!-- Comparison table or workflow diagram -->
</div>
```

### **RULE 4: FORBIDDEN PATTERNS**

#### **❌ NEVER DO THIS:**
- Paragraphs longer than 3 lines
- More than 2 consecutive paragraphs without visual breaks
- Pure text sections longer than 150 words
- Lists with more than 5 items without visual formatting
- Technical explanations without diagrams or examples

#### **✅ ALWAYS DO THIS:**
- Break long explanations into visual steps
- Use callout boxes for key statistics
- Include benefit cards for value propositions
- Add process diagrams for workflows
- Highlight important numbers in visual containers

### **RULE 5: VISUAL-TO-TEXT RATIO ENFORCEMENT**

#### **Required Ratios:**
- **60% visual content** (cards, diagrams, highlighted stats, images)
- **40% flowing text** (short paragraphs with embedded highlights)

#### **Visual Element Requirements Per Section:**
- **Minimum 2 visual elements** per H2 section
- **No more than 100 words** between visual elements
- **Every statistic** must be in a visual container
- **Every benefit** must be a structured card
- **Every process** must be a visual diagram

### **RULE 6: SCANNABLE CONTENT MANDATES**

#### **Reader Should Be Able To:**
- **Scan the page in 10 seconds** and understand the value
- **Find key statistics** without reading paragraphs
- **Identify main benefits** through visual cards
- **Understand the process** through step diagrams

#### **Implementation Checklist:**
□ No text block longer than 3 lines
□ Visual element every 150 words maximum
□ All statistics in visual containers
□ All benefits in structured cards
□ All processes in visual diagrams
□ Consistent visual hierarchy
□ Scannable information architecture

### **ENFORCEMENT PROMPT ADDITION:**

Add this to every pillar page prompt:

**"CRITICAL: This pillar page MUST NOT contain walls of text. MAXIMUM 2 consecutive paragraphs OR 6-8 lines of text before a visual element (statistic callout, benefit card, process step, or diagram). NO paragraph can exceed 3 lines. Even short paragraphs create text walls when stacked. ALL statistics must be in visual containers, NOT buried in text. The reader should be able to scan the page and understand the value proposition without reading full paragraphs."**

This approach ensures every pillar page follows the visual structure of successful NEXITAS pages while avoiding the text-heavy failures shown in the "Avoid" examples.