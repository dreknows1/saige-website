#!/bin/bash
# Deploy Saige Website to Vercel

cd /Users/eddievolt/.openclaw/workspace/saige-anti

# Check if already a git repo
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit"
fi

# Login to Vercel (user will need to do this)
echo "To deploy, you need to:"
echo "1. Run: vercel login"
echo "2. Then run: vercel --prod"
echo ""
echo "Or use GitHub:"
echo "1. Create repo on GitHub"
echo "2. git remote add origin <repo-url>"
echo "3. git push -u origin main"
echo "4. Import to Vercel from GitHub"

# Alternative: Create a simple deploy script
cat > deploy.sh << 'EOF'
#!/bin/bash
echo "Deploying Saige website..."
vercel --prod
EOF
chmod +x deploy.sh

echo ""
echo "Deploy script created. Run ./deploy.sh after logging in to Vercel."
