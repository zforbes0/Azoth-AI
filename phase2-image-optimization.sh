#!/bin/bash

# Phase 2 Image Optimization Script
# Converts <img> tags to optimized <Image> components in blog articles

BLOG_DIR="/home/zforb/NEXITAS WEBSITE/NEXITAS-to-date/src/pages/blog"
PROCESSED=0
TOTAL_IMAGES=0

# Articles already completed (skip these)
COMPLETED=(
  "automated-seo-audits.astro"
  "seo-friendly-website-design.astro"
  "local-seo-services.astro"
  "ai-automation-for-event-management.astro"
  "ai-automation-for-real-estate-marketing.astro"
  "custom-automation-web-apps.astro"
  "ai-automation-for-legal-industry.astro"
  "api-integration-for-process-automation.astro"
)

# Articles without images (skip these)
NO_IMAGES=(
  "ai-powered-knowledge-base-software.astro"
  "automation-ready-websites-customer-experience.astro"
)

echo "🚀 Starting Phase 2 Image Optimization..."
echo "📍 Working directory: $BLOG_DIR"

cd "$BLOG_DIR" || exit 1

for file in *.astro; do
  # Skip completed articles
  if [[ " ${COMPLETED[@]} " =~ " ${file} " ]]; then
    echo "⏭️  Skipping already completed: $file"
    continue
  fi
  
  # Skip articles without images
  if [[ " ${NO_IMAGES[@]} " =~ " ${file} " ]]; then
    echo "⏭️  Skipping (no images): $file"
    continue
  fi
  
  # Check if file has images (various patterns)
  if ! grep -q "<img src" "$file"; then
    echo "⏭️  No images found in: $file"
    continue
  fi
  
  echo "🔄 Processing: $file"
  
  # Count images in this file
  IMG_COUNT=$(grep -c "<img src" "$file")
  echo "   📸 Found $IMG_COUNT images"
  TOTAL_IMAGES=$((TOTAL_IMAGES + IMG_COUNT))
  
  # Backup original
  cp "$file" "$file.backup"
  
  # Add Image import if not already present
  if ! grep -q "import { Image } from 'astro:assets';" "$file"; then
    sed -i "/import.*Layout.*from/a import { Image } from 'astro:assets';" "$file"
    echo "   ✅ Added Image import"
  fi
  
  # Convert img tags to Image components
  # Handle w-full h-64 images (hero images)
  sed -i 's|<img src="\([^"]*\)" alt="\([^"]*\)" class="\([^"]*w-full h-64[^"]*\)"[^>]*/>|<Image \
    src="\1" \
    alt="\2" \
    class="\3" \
    width={800} \
    height={256} \
    loading="eager" \
    format="webp" \
  />|g' "$file"
  
  # Handle w-48 h-32 images (smaller images)
  sed -i 's|<img src="\([^"]*\)" alt="\([^"]*\)" class="\([^"]*w-48 h-32[^"]*\)"[^>]*/>|<Image \
    src="\1" \
    alt="\2" \
    class="\3" \
    width={192} \
    height={128} \
    loading="lazy" \
    format="webp" \
  />|g' "$file"
  
  # Handle other sized images with generic dimensions
  sed -i 's|<img src="\([^"]*\)" alt="\([^"]*\)" class="\([^"]*\)"[^>]*/>|<Image \
    src="\1" \
    alt="\2" \
    class="\3" \
    width={600} \
    height={400} \
    loading="lazy" \
    format="webp" \
  />|g' "$file"
  
  # Handle img tags without closing />
  sed -i 's|<img src="\([^"]*\)" alt="\([^"]*\)" class="\([^"]*\)"[^>]*>|<Image \
    src="\1" \
    alt="\2" \
    class="\3" \
    width={600} \
    height={400} \
    loading="lazy" \
    format="webp" \
  />|g' "$file"
  
  echo "   ✅ Converted images to optimized Image components"
  PROCESSED=$((PROCESSED + 1))
done

echo ""
echo "🎉 Phase 2 Image Optimization Complete!"
echo "📊 Results:"
echo "   📁 Articles processed: $PROCESSED"
echo "   📸 Total images optimized: $TOTAL_IMAGES"
echo "   💾 Backups created: $PROCESSED (*.backup files)"
echo ""
echo "🔍 To verify results, check any .backup files for comparison"