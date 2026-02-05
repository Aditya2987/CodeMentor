# 🔧 GitHub Setup Instructions

## Problem
You're getting this error:
```
remote: Permission to Doit-Ay/CodeMentor.git denied to Aditya2987.
fatal: unable to access 'https://github.com/Doit-Ay/CodeMentor.git/': The requested URL returned error: 403
```

This happens because you're logged in as `Aditya2987` but trying to push to `Doit-Ay/CodeMentor`.

## Solution Options

### Option 1: Create Your Own Repository (Recommended)

1. **Go to GitHub** and create a new repository:
   - Visit: https://github.com/new
   - Repository name: `CodeMentor` or `codementor-ai-platform`
   - Description: "AI-powered learning platform for developers"
   - Choose Public or Private
   - **Don't** initialize with README (we already have one)
   - Click "Create repository"

2. **Update your remote URL:**
```bash
git remote remove origin
git remote add origin https://github.com/Aditya2987/CodeMentor.git
git branch -M main
git push -u origin main
```

3. **Done!** Your code is now on GitHub at:
   `https://github.com/Aditya2987/CodeMentor`

### Option 2: Use Personal Access Token

If you have permission to push to `Doit-Ay/CodeMentor`:

1. **Generate a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name: "CodeMentor Push"
   - Select scope: `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Update remote with token:**
```bash
git remote set-url origin https://YOUR_TOKEN_HERE@github.com/Doit-Ay/CodeMentor.git
git push -u origin main
```

Replace `YOUR_TOKEN_HERE` with your actual token.

### Option 3: Get Added as Collaborator

Ask the owner of `Doit-Ay/CodeMentor` to:
1. Go to repository Settings → Collaborators
2. Add `Aditya2987` as a collaborator
3. You'll receive an email invitation
4. Accept it, then try pushing again

### Option 4: Fork the Repository

1. Go to `https://github.com/Doit-Ay/CodeMentor`
2. Click "Fork" button
3. Update your remote:
```bash
git remote set-url origin https://github.com/Aditya2987/CodeMentor.git
git push -u origin main
```

## Verify Your Setup

After pushing, verify with:
```bash
git remote -v
```

Should show:
```
origin  https://github.com/YOUR_USERNAME/CodeMentor.git (fetch)
origin  https://github.com/YOUR_USERNAME/CodeMentor.git (push)
```

## Next Steps After Publishing

1. **Add a nice README badge:**
   - Add build status, license, etc.

2. **Enable GitHub Pages** (optional):
   - Settings → Pages
   - Source: GitHub Actions
   - Deploy your frontend automatically

3. **Set up GitHub Actions** for CI/CD:
   - Auto-deploy on push
   - Run tests automatically

4. **Add topics to your repo:**
   - react, nodejs, ai, education, learning-platform

5. **Share your project:**
   - Add to your portfolio
   - Share on LinkedIn, Twitter
   - Submit to awesome lists

## Troubleshooting

### Still getting 403 error?
```bash
# Clear Git credentials
git credential-cache exit

# Or use SSH instead
git remote set-url origin git@github.com:YOUR_USERNAME/CodeMentor.git
```

### Need to set up SSH?
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub
# Copy the public key
cat ~/.ssh/id_ed25519.pub

# Add at: https://github.com/settings/keys
```

## Quick Commands Reference

```bash
# Check current remote
git remote -v

# Change remote URL
git remote set-url origin NEW_URL

# Remove remote
git remote remove origin

# Add new remote
git remote add origin URL

# Push to GitHub
git push -u origin main

# Check git status
git status

# View commit history
git log --oneline
```

---

Need more help? Open an issue or check GitHub's documentation:
https://docs.github.com/en/authentication
