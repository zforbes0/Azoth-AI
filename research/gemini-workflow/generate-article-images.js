import { GoogleAuth } from 'google-auth-library';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Set up Google Cloud credentials
const credentialsPath = '/home/zforb/NEXITAS-to-date/long-flash-469303-s9-98fb70bc1753.json';
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

const PROJECT_ID = 'long-flash-469303-s9';
const LOCATION = 'us-central1';

async function generateImage(prompt, filename) {
  try {
    console.log(`🎨 Generating ${filename}...`);
    
    // Initialize Google Auth
    const auth = new GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagen-3.0-fast-generate-001:predict`;
    
    const requestBody = {
      instances: [{
        prompt: prompt
      }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "16:9",
        safetyFilterLevel: "block_some",
        personGeneration: "dont_allow"
      }
    };
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }
    
    const data = await response.json();
    console.log(`✅ ${filename} generated successfully!`);
    
    if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
      const imageData = data.predictions[0].bytesBase64Encoded;
      const buffer = Buffer.from(imageData, 'base64');
      
      const filePath = path.join('/home/zforb/NEXITAS-to-date/public/assets', filename);
      fs.writeFileSync(filePath, buffer);
      
      console.log(`📁 ${filename} saved to: ${filePath}`);
      return { success: true, filename: filename };
    } else {
      throw new Error('No image data received from API');
    }
    
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    return { success: false, error: error.message, filename: filename };
  }
}

async function generateAllImages() {
  // 🎯 CUSTOMIZE THIS IMAGES ARRAY FOR YOUR ARTICLE
  // 
  // INSTRUCTIONS:
  // 1. Copy this file and rename it for your specific article (e.g., generate-seo-images.js)
  // 2. Replace the prompts and filenames below with content relevant to your article topic
  // 3. Run the script: node your-script-name.js
  // 4. Images will be automatically saved to /public/assets/
  // 5. Reference in HTML as: <img src="/assets/filename.jpg" alt="description"/>
  //
  // PROMPT GUIDELINES:
  // - Keep prompts business/professional focused
  // - Include "clean interface, professional lighting, tech aesthetic" for consistency
  // - Use "corporate style, data visualization, modern design" for dashboards
  // - Specify "high resolution" for hero images
  // - Avoid specific people or copyrighted content
  //
  // FILENAME GUIDELINES:
  // - Use descriptive, SEO-friendly names
  // - Use hyphens instead of spaces
  // - Include article topic in filename
  // - Use .jpg extension
  
  const images = [
    {
      prompt: "[ARTICLE TOPIC] dashboard showing [KEY METRICS], clean interface, professional lighting, tech aesthetic, high resolution",
      filename: "[article-topic]-hero-dashboard.jpg"
    },
    {
      prompt: "[ARTICLE TOPIC] workflow diagram with connecting nodes and [PROCESS ELEMENTS], corporate style, data visualization, clean modern design",
      filename: "[article-topic]-workflow-diagram.jpg"
    },
    {
      prompt: "Business team analyzing [ARTICLE TOPIC] analytics on multiple monitors, modern office environment, professional setting, data dashboards",
      filename: "[article-topic]-benefits-analytics.jpg"
    },
    {
      prompt: "[ARTICLE TOPIC] implementation architecture diagram, [TECHNICAL ELEMENTS], technical illustration, clean modern design, enterprise systems",
      filename: "[article-topic]-implementation-architecture.jpg"
    },
    {
      prompt: "[ARTICLE TOPIC] performance monitoring dashboard with [PERFORMANCE METRICS], modern tech interface, professional business setting",
      filename: "[article-topic]-performance-monitoring.jpg"
    },
    {
      prompt: "[ARTICLE TOPIC] results and case study visualization showing [RESULTS/IMPROVEMENTS], professional business dashboard, success metrics",
      filename: "[article-topic]-case-study-results.jpg"
    }
  ];

  console.log('🚀 Starting article image generation...');
  console.log('⚠️  REMINDER: Update the images array above with your specific article content before running!');
  
  const results = [];
  for (const image of images) {
    const result = await generateImage(image.prompt, image.filename);
    results.push(result);
    
    // Small delay between generations to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Generation Summary:');
  console.log(`✅ Successful: ${results.filter(r => r.success).length}`);
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}`);
  
  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed generations:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   • ${r.filename}: ${r.error}`);
    });
  }
  
  console.log('\n🎉 Image generation complete! Images saved to /public/assets/');
  console.log('📝 Reference in your HTML as: <img src="/assets/filename.jpg" alt="description"/>');
}

// Run the script
generateAllImages().catch(console.error);