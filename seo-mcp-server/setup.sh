#!/bin/bash

# SEO MCP Server Setup Script

echo "🚀 Setting up SEO MCP Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "✏️  Please edit .env file with your API keys:"
    echo "   - Authoritas API key"
    echo "   - SEO Review Tools API key" 
    echo "   - CognitiveSEO API key"
    echo ""
fi

# Test the server
echo "🧪 Testing server startup..."
timeout 5s node index.js &> /dev/null
if [ $? -eq 124 ]; then
    echo "✅ Server starts successfully!"
else
    echo "❌ Server startup failed. Check your configuration."
    exit 1
fi

echo ""
echo "🎉 SEO MCP Server setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Add the following to your Claude Desktop config:"
echo ""
cat claude-config.json
echo ""
echo "3. Restart Claude Desktop"
echo "4. Use SEO tools in your conversations!"
echo ""
echo "🔗 Get free API keys:"
echo "   • Authoritas: https://www.authoritas.com"
echo "   • SEO Review Tools: https://www.seoreviewtools.com"
echo "   • CognitiveSEO: https://cognitiveseo.com"
echo ""

# Make this script executable
chmod +x setup.sh