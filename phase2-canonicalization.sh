#!/bin/bash

# Phase 2 Canonicalization Script
# Adds canonicalURL to blog articles that don't have it

BLOG_DIR="/home/zforb/NEXITAS WEBSITE/NEXITAS-to-date/src/pages/blog"
PROCESSED=0
ALREADY_HAVE=0

echo "🚀 Starting Phase 2 Canonicalization..."
echo "📍 Working directory: $BLOG_DIR"

cd "$BLOG_DIR" || exit 1

for file in *.astro; do
  echo "🔍 Checking: $file"
  
  # Skip backup files
  if [[ "$file" == *.backup ]]; then
    echo "⏭️  Skipping backup: $file"
    continue
  fi
  
  # Check if canonicalURL already exists in meta object
  if grep -q "canonicalURL:" "$file"; then
    echo "✅ Already has canonicalURL: $file"
    ALREADY_HAVE=$((ALREADY_HAVE + 1))
    continue
  fi
  
  # Extract the filename without extension for URL
  SLUG=$(basename "$file" .astro)
  
  echo "🔄 Adding canonicalURL to: $file"
  
  # Backup original
  cp "$file" "$file.canonical-backup"
  
  # Add canonicalURL to the meta object before the closing brace
  # Find the pattern and add canonicalURL line before the closing brace
  sed -i '/};/i\  canonicalURL: "https://nexitas.net/blog/'$SLUG'",' "$file"
  
  echo "   ✅ Added canonicalURL: https://nexitas.net/blog/$SLUG"
  PROCESSED=$((PROCESSED + 1))
done

echo ""
echo "🎉 Phase 2 Canonicalization Complete!"
echo "📊 Results:"
echo "   ✅ Already had canonicalURL: $ALREADY_HAVE articles"
echo "   🔧 Added canonicalURL: $PROCESSED articles"
echo "   📁 Total articles processed: $((ALREADY_HAVE + PROCESSED))"
echo "   💾 Backups created: $PROCESSED (*.canonical-backup files)"
echo ""
echo "🔍 All blog articles now have canonicalURL!"