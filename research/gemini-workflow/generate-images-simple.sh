#!/bin/bash
# Simple image generation script for Gemini - no node required
# Usage: Just modify the prompts array and run

API_KEY="AIzaSyDOeBeIc_4vPr9SppM2vw7j6jHKkQpHrJU"
PROJECT_ID="nexitas-automation"
OUTPUT_DIR="/home/zforb/NEXITAS-to-date/public/assets"

# Technical SEO Article Images
declare -a images=(
    "technical-seo-audit-hero.jpg|Professional business team analyzing technical SEO dashboard with graphs and charts showing website performance metrics"
    "technical-seo-workflow.jpg|Modern technical SEO audit workflow diagram with interconnected steps and checkpoints"
    "technical-seo-issues-detection.jpg|Digital interface showing technical SEO issues detection with red warning indicators"
    "technical-seo-tools.jpg|Collection of professional SEO audit tools and software interfaces on computer screens"
    "technical-seo-performance.jpg|Website performance metrics dashboard showing improved loading speeds and Core Web Vitals"
    "technical-seo-ranking-improvement.jpg|Search engine ranking charts showing upward growth trends after technical optimization"
)

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "🚀 Starting Technical SEO image generation..."

for image in "${images[@]}"; do
    IFS='|' read -r filename prompt <<< "$image"
    echo "🎨 Generating $filename..."
    
    curl -X POST \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json" \
        "https://aiplatform.googleapis.com/v1/projects/$PROJECT_ID/locations/us-central1/publishers/google/models/imagen-4-fast:generateImages" \
        -d "{
            \"instances\": [{
                \"prompt\": \"$prompt\",
                \"parameters\": {
                    \"sampleCount\": 1,
                    \"aspectRatio\": \"16:9\",
                    \"safetyFilterLevel\": \"block_some\",
                    \"personGeneration\": \"allow_adult\"
                }
            }]
        }" | jq -r '.predictions[0].bytesBase64Encoded' | base64 -d > "$OUTPUT_DIR/$filename"
    
    if [ -f "$OUTPUT_DIR/$filename" ]; then
        echo "✅ $filename generated successfully!"
    else
        echo "❌ Failed to generate $filename"
    fi
    
    # Small delay between requests
    sleep 2
done

echo "📁 All images saved to: $OUTPUT_DIR"
echo "🔗 Reference in articles as: /assets/filename.jpg"