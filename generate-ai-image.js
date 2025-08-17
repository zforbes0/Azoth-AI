import { GoogleAuth } from 'google-auth-library';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Set up Google Cloud credentials
const credentialsPath = '/home/zforb/NEXITAS-BACKUP-20250817-000737/CLOUDCONSOLE/long-flash-469303-s9-98fb70bc1753.json';
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

const PROJECT_ID = 'long-flash-469303-s9';
const LOCATION = 'us-central1';

async function generateBusinessProcessImage() {
  try {
    console.log('🎨 Initializing Imagen 4 Fast image generation...');
    
    // Initialize Google Auth
    const auth = new GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    console.log('✅ Authentication successful');
    
    // Business process automation prompt - relevant to your niche
    const prompt = `A modern, clean business process automation workflow diagram showing AI-powered document processing. The image shows:
    - Digital documents flowing through an automated pipeline
    - AI brain icons processing data
    - Robotic process automation elements
    - Clean, professional blue and white color scheme
    - Futuristic but business-appropriate aesthetic
    - Arrows showing workflow progression
    - Data transformation visualization
    - Modern office environment background
    - High-tech but approachable design
    - Vector illustration style with subtle gradients`;
    
    console.log('📝 Generating image with prompt:', prompt.substring(0, 100) + '...');
    
    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-001:predict`;
    
    const requestBody = {
      instances: [{
        prompt: prompt,
        parameters: {
          aspectRatio: "16:9",
          safetyFilterLevel: "block_some",
          personGeneration: "dont_allow"
        }
      }],
      parameters: {
        sampleCount: 1
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
    console.log('🎉 Image generation successful!');
    
    if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
      // Save the image
      const imageData = data.predictions[0].bytesBase64Encoded;
      const buffer = Buffer.from(imageData, 'base64');
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `business-process-automation-${timestamp}.png`;
      const filePath = path.join('/home/zforb/NEXITAS to date/public/assets', fileName);
      
      fs.writeFileSync(filePath, buffer);
      
      console.log('📁 Image saved to:', filePath);
      console.log('🔗 Web URL: /assets/' + fileName);
      
      return {
        success: true,
        filePath: filePath,
        fileName: fileName,
        webUrl: '/assets/' + fileName
      };
    } else {
      throw new Error('No image data received from API');
    }
    
  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the image generation
generateBusinessProcessImage().then(result => {
  if (result.success) {
    console.log('\n🎨 AI IMAGE GENERATION COMPLETE! 🎨');
    console.log('✅ File saved:', result.fileName);
    console.log('🌐 Use in HTML as:', result.webUrl);
    console.log('\n💡 You can now use this image in your blog articles!');
  } else {
    console.log('\n❌ Image generation failed:', result.error);
  }
});