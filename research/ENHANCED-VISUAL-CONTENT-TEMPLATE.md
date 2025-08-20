# ENHANCED VISUAL CONTENT TEMPLATE - WITH IMAGEN 4 FAST

## **CRITICAL: DYNAMIC VISUAL CONTENT REQUIREMENTS**

Your articles must include these visual elements to match the dynamic structure of existing NEXITAS articles:

### **1. HIGHLIGHTED STATISTICS CALLOUTS**
Use this pattern for key statistics:
```astro
<p>Companies implementing advanced sales prospecting automation tools achieve <span class="text-primary font-bold">70% reduction in prospecting time</span> while simultaneously improving <span class="text-primary font-bold">lead quality by 55%</span> and increasing overall pipeline generation by 85%.</p>
```

### **2. VISUAL INFORMATION BOXES**
Create structured callout boxes like this:
```astro
<div class="bg-primary/10 border border-primary/30 p-6 rounded-xl mb-8">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0">
      <img 
        src="[GENERATED-IMAGE-URL]" 
        alt="[RELEVANT DESCRIPTION]" 
        class="w-48 h-32 object-cover rounded-lg"
      />
    </div>
    <div class="flex-1">
      <h3 class="text-xl font-orbitron font-bold text-primary mb-4">
        [SECTION TITLE]
      </h3>
      <ol class="text-white space-y-2">
        <li><strong>1. [STEP]:</strong> [DESCRIPTION]</li>
        <li><strong>2. [STEP]:</strong> [DESCRIPTION]</li>
        <li><strong>3. [STEP]:</strong> [DESCRIPTION]</li>
        <li><strong>4. [STEP]:</strong> [DESCRIPTION]</li>
      </ol>
    </div>
  </div>
</div>
```

### **3. IMAGE GENERATION WITH IMAGEN 4 FAST**
**WORKFLOW**: Copy `generate-api-images.js` → Modify images array → Run script → Use `/assets/filename.jpg` in HTML.

**CRITICAL**: NEVER use external URLs (Unsplash, Pexels, etc). Always generate relevant images using Imagen 4 Fast.

**Image Generation Process**:
1. Copy existing generate-api-images.js script
2. Modify the images array with topic-relevant prompts
3. Run the script to generate images to /public/assets/
4. Reference images as `/assets/filename.jpg` in HTML

### **4. STATISTICS HIGHLIGHTING PATTERNS**
Always highlight key numbers with this format:
```astro
<div class="grid md:grid-cols-2 gap-6 my-8">
  <div class="bg-primary/10 border border-primary/30 p-6 rounded-xl text-center">
    <div class="text-4xl font-orbitron font-bold text-primary mb-2">[STATISTIC]</div>
    <p class="text-white">[DESCRIPTION]</p>
  </div>
  <div class="bg-primary/10 border border-primary/30 p-6 rounded-xl text-center">
    <div class="text-4xl font-orbitron font-bold text-primary mb-2">[STATISTIC]</div>
    <p class="text-white">[DESCRIPTION]</p>
  </div>
</div>
```

### **5. CONTENT STRUCTURE REQUIREMENTS**
Each article MUST include:

1. **Hero section** with compelling statistics in description
2. **Statistics callout grid** (2-3 key numbers highlighted)  
3. **Process workflow box** with accompanying image
4. **Benefits section** with visual icons/images
5. **Implementation timeline** with step-by-step visual
6. **FAQ section** with expandable details
7. **Call-to-action** with professional styling

### **6. IMAGE PLACEMENT GUIDELINES**
- **Hero images**: Full-width, 400px height
- **Section images**: 200x150px, floated right with text wrap
- **Process diagrams**: 400x250px, centered with padding
- **Statistics graphics**: Square format, 150x150px

### **7. TEXT WRAPPING PATTERN**
```astro
<div class="flex items-start gap-6 mb-8">
  <div class="flex-1">
    <h3 class="text-xl font-orbitron font-bold text-primary mb-4">[BENEFIT TITLE]</h3>
    <p class="text-white mb-4">
      [FIRST PARAGRAPH - keep to 2-3 lines maximum]
    </p>
    <p class="text-white">
      [SECOND PARAGRAPH - keep to 2-3 lines maximum]
    </p>
  </div>
  <div class="flex-shrink-0">
    <img 
      src="[GENERATED-IMAGE-URL]" 
      alt="Business efficiency through automation" 
      class="w-48 h-32 object-cover rounded-lg"
    />
  </div>
</div>
```

### **8. MANDATORY VISUAL ELEMENTS PER ARTICLE**
- **Minimum 4 generated images** per article
- **2-3 statistics highlight boxes**
- **1 major process workflow diagram**
- **Hero section with compelling visual**
- **Mixed text layouts** (not all plain paragraphs)

## **IMAGEN 4 FAST INTEGRATION INSTRUCTIONS**

When creating articles:
1. **Identify image opportunities** for each major section
2. **Generate relevant images** using Imagen 4 Fast with business/tech prompts
3. **Place images strategically** with proper text wrapping
4. **Use consistent sizing** and styling patterns
5. **Ensure images enhance content**, not distract

This approach will create visually engaging, dynamic articles that match the professional quality of existing NEXITAS content.