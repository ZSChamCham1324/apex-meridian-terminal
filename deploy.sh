#!/bin/bash

# Apex Meridian Terminal - Deployment Script
# Automates setup for Vercel deployment

set -e

echo "🚀 Apex Meridian Terminal - Deployment Setup"
echo "=============================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if git is initialized
if [ ! -d .git ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Apex Meridian Terminal"
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "📝 Creating .gitignore..."
    cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.DS_Store
*.log
dist/
build/
.vercel/
EOF
fi

# Verify environment files exist
if [ ! -f .env.example ]; then
    echo "⚠️  Warning: .env.example not found"
fi

if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found. Create it with your Finnhub API key"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🔐 Security Checklist:"
echo "  ☐ .env.local file exists with FINNHUB_API_KEY"
echo "  ☐ .gitignore includes .env and .env.local"
echo ""
echo "📋 Next steps:"
echo "  1. Push to GitHub:"
echo "     git remote add origin <your-repo>"
echo "     git push -u origin master"
echo ""
echo "  2. Deploy to Vercel:"
echo "     vercel --prod"
echo ""
echo "  3. Set environment variable in Vercel Dashboard:"
echo "     FINNHUB_API_KEY=<your-key>"
echo ""
echo "  4. Verify deployment:"
echo "     Open https://your-project-name.vercel.app"
echo ""
