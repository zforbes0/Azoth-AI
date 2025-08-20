#!/bin/bash
# FLEXIBLE IMAGE GENERATION TEMPLATE FOR GEMINI
# Instructions: Just modify the images array below with your specific prompts

API_KEY="AIzaSyDOeBeIc_4vPr9SppM2vw7j6jHKkQpHrJU"
PROJECT_ID="nexitas-automation"
OUTPUT_DIR="/home/zforb/NEXITAS-to-date/public/assets"

# CUSTOMIZE THIS ARRAY FOR YOUR ARTICLE
# Format: "filename.jpg|Your image prompt here"
declare -a images=(
    "hero-image.jpg|Professional business scene with modern technology and automation elements"
    "workflow-diagram.jpg|Clean workflow diagram showing process steps with arrows and icons"
    "benefits-visualization.jpg|Business benefits visualization with charts and positive growth indicators"
    "implementation-guide.jpg|Step-by-step implementation guide with numbered visual elements"
)

# === NO NEED TO MODIFY BELOW THIS LINE ===

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "🚀 Starting image generation..."
echo "📁 Output directory: $OUTPUT_DIR"
echo ""

for image in "${images[@]}"; do
    IFS='|' read -r filename prompt <<< "$image"
    echo "🎨 Generating $filename..."
    echo "   Prompt: $prompt"
    
    curl -s -X POST \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json" \
        "https://aiplatform.googleapis.com/v1/projects/$PROJECT_ID/locations/us-central1/publishers/google/models/imagen-4-fast:generateImages" \
        -d "{
            \"instances\": [{
                \"prompt\": \"$prompt, professional business style, high quality, clean modern design\",
                \"parameters\": {
                    \"sampleCount\": 1,
                    \"aspectRatio\": \"16:9\",
                    \"safetyFilterLevel\": \"block_some\",
                    \"personGeneration\": \"allow_adult\"
                }
            }]
        }" | jq -r '.predictions[0].bytesBase64Encoded' | base64 -d > "$OUTPUT_DIR/$filename"
    
    if [ -f "$OUTPUT_DIR/$filename" ] && [ -s "$OUTPUT_DIR/$filename" ]; then
        echo "   ✅ $filename generated successfully!"
        echo "   🔗 Use in article: /assets/$filename"
    else
        echo "   ❌ Failed to generate $filename"
    fi
    
    echo ""
    sleep 2
done

echo "🎉 Image generation complete!"
echo "📁 All images saved to: $OUTPUT_DIR"
echo "🔗 Reference in articles as: /assets/filename.jpg"