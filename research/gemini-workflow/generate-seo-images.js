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
  // Replace the prompts and filenames below with content relevant to your specific article topic
  const images = [
    {
      prompt: "Modern SEO dashboard showing keyword rankings and analytics, clean interface, professional lighting, tech aesthetic, high resolution",
      filename: "seo-optimization-dashboard.jpg"
    },
    {
      prompt: "SEO optimization process workflow with connecting nodes and performance metrics, corporate style, data visualization, clean modern design",
      filename: "seo-analysis-interface.jpg"
    },
    {
      prompt: "Technical SEO audit results dashboard showing site performance improvements, analytics graphs, professional business setting",
      filename: "seo-technical-audit.jpg"
    },
    {
      prompt: "SEO performance monitoring and analytics dashboard with keyword tracking, ranking improvements, modern tech interface",
      filename: "seo-performance-monitoring.jpg"
    },
    {
      prompt: "E-commerce SEO optimization results and analytics showing traffic growth, conversion metrics, professional business dashboard",
      filename: "ecommerce-seo-results.jpg"
    },
    {
      prompt: "SaaS SEO optimization strategy and implementation, B2B software analytics, keyword performance dashboard, corporate tech style",
      filename: "saas-seo-optimization.jpg"
    }
  ];

  console.log('🚀 Starting API integration image generation...');
  
  const results = [];
  for (const image of images) {
    const result = await generateImage(image.prompt, image.filename);
    results.push(result);
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log('\n🎨 IMAGE GENERATION COMPLETE! 🎨');
  console.log(`✅ Successfully generated: ${successful.length}/${images.length} images`);
  
  if (successful.length > 0) {
    console.log('\n📁 Generated files:');
    successful.forEach(result => {
      console.log(`  - ${result.filename}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed to generate:');
    failed.forEach(result => {
      console.log(`  - ${result.filename}: ${result.error}`);
    });
  }
}

// Run the image generation
generateAllImages();