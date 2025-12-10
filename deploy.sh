#!/bin/bash

# WhaleWaveIC Deployment Script
# This script helps you deploy your website to GitHub Pages

echo "🚀 WhaleWaveIC - GitHub Pages Deployment Script"
echo "================================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    echo "Please install Git first: https://git-scm.com/downloads"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if there are uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo ""
    echo "📝 Uncommitted changes detected. Creating commit..."

    # Add all files
    git add .

    # Get commit message from user
    echo ""
    read -p "Enter commit message (or press Enter for default): " commit_msg

    if [ -z "$commit_msg" ]; then
        commit_msg="Update WhaleWaveIC website"
    fi

    # Commit changes
    git commit -m "$commit_msg"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

# Check if remote exists
if ! git remote | grep -q origin; then
    echo ""
    echo "🔗 No remote repository configured"
    echo ""
    read -p "Enter your GitHub username: " github_user

    if [ -z "$github_user" ]; then
        echo "❌ Error: GitHub username is required"
        exit 1
    fi

    # Add remote
    git remote add origin "https://github.com/${github_user}/whalewaveic.git"
    echo "✅ Remote repository added"
    echo ""
    echo "📌 Next steps:"
    echo "1. Create a repository on GitHub: https://github.com/new"
    echo "2. Repository name: whalewaveic"
    echo "3. Make it public"
    echo "4. Don't initialize with README, .gitignore, or license"
    echo ""
    read -p "Press Enter when you've created the repository on GitHub..."
fi

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
if git push -u origin main 2>&1 | tee /dev/stderr | grep -q "rejected"; then
    echo ""
    echo "⚠️  Push rejected. Trying force push..."
    read -p "Force push? This will overwrite remote. (y/N): " confirm

    if [[ $confirm == [yY] ]]; then
        git push -f origin main
    else
        echo "❌ Deployment cancelled"
        exit 1
    fi
else
    echo "✅ Pushed to GitHub successfully"
fi

# Get GitHub username from remote
GITHUB_USER=$(git remote get-url origin | sed -n 's#.*github.com[:/]\([^/]*\)/.*#\1#p')
REPO_NAME=$(git remote get-url origin | sed -n 's#.*github.com[:/][^/]*/\(.*\)\.git#\1#p')

echo ""
echo "================================================"
echo "✅ Deployment Complete!"
echo "================================================"
echo ""
echo "📍 Your website will be available at:"
echo "   https://${GITHUB_USER}.github.io/${REPO_NAME}"
echo ""
echo "⏱️  GitHub Pages usually takes 2-3 minutes to deploy"
echo ""
echo "🔧 Next Steps:"
echo "1. Go to: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "2. Verify Source is set to: Branch 'main', Folder '/ (root)'"
echo "3. Click 'Save' if not already configured"
echo "4. Wait 2-3 minutes for deployment"
echo "5. Visit your live site!"
echo ""
echo "📧 Don't forget to configure your contact form backend!"
echo "   See IMPLEMENTATION.md for instructions"
echo ""
