# Sub-Article Formatting Templates

## Header Structure (MANDATORY FORMAT)

### Hero Section Template
```html
<section class="relative min-h-[40vh] flex items-center justify-center wireframe-bg overflow-hidden pt-20">
    <WireframeBackground />
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

### Article Metadata Template
```html
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
                    <p class="text-white font-medium">Azoth Automations</p>
                    <p class="text-gray-400 text-sm">[AUTHOR_DESCRIPTION]</p>
                </div>
            </div>
        </div>
        
        <div class="mb-12">
            <img src="[IMAGE_URL]" alt="[ALT_TEXT]" class="w-full h-64 object-cover rounded-xl"/>
        </div>
```

## Visual Element Templates

### Statistics Callout
```html
<div class="grid md:grid-cols-2 gap-6 my-8">
    <div class="bg-primary/10 border border-primary/30 p-6 rounded-xl text-center">
        <div class="text-4xl font-orbitron font-bold text-primary mb-2">[STAT_1]</div>
        <p class="text-white">[STAT_1_DESCRIPTION]</p>
    </div>
    <div class="bg-primary/10 border border-primary/30 p-6 rounded-xl text-center">
        <div class="text-4xl font-orbitron font-bold text-primary mb-2">[STAT_2]</div>
        <p class="text-white">[STAT_2_DESCRIPTION]</p>
    </div>
</div>
```

### Benefit Card
```html
<div class="bg-primary/5 border border-primary/20 p-6 rounded-xl">
    <h4 class="text-xl font-orbitron font-bold text-primary mb-3">[TITLE]</h4>
    <p class="text-white">[DESCRIPTION]</p>
</div>
```

### Visual Info Box
```html
<div class="bg-primary/10 border border-primary/30 p-6 rounded-xl mb-8">
    <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
            <img src="[UNSPLASH_IMAGE_URL]" alt="[ALT_TEXT]" class="w-48 h-32 object-cover rounded-lg"/>
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

### Expandable FAQ
```html
<details class="group bg-primary/5 border border-primary/20 rounded-xl">
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

## Closing Structure
```html
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