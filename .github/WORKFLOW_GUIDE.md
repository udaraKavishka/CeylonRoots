# CeylonRoots GitHub Actions Integrity Check

This document explains the automated integrity check workflow for the CeylonRoots Next.js application.

## 📋 Overview

The workflow runs **6 parallel jobs** to validate code quality, type safety, and build integrity:

1. **🔍 ESLint** - Code quality and Next.js best practices
2. **🔷 TypeScript** - Type checking with strict mode
3. **🗄️ Prisma** - Database schema validation
4. **🏗️ Build** - Production build verification
5. **💅 Prettier** - Code formatting consistency
6. **🔒 Security** - Dependency vulnerability scanning

## 🚀 When It Runs

- ✅ **Every push** to any branch (if files in `ceylonroots/` changed)
- ✅ **Every pull request** that modifies `ceylonroots/` files
- ✅ **Automatic cancellation** of outdated runs when new commits are pushed

## ⚡ Performance

- **First run**: ~5-8 minutes (no cache)
- **Subsequent runs**: ~2-4 minutes (with cache)
- **Parallel execution**: All jobs run simultaneously for fastest feedback

## 🔧 Job Details

### 1. ESLint Check
```bash
npm run lint
```
Validates code quality and enforces Next.js best practices.

**Fails on:**
- Unused variables
- Missing dependencies in hooks
- Incorrect React patterns
- ESLint rule violations

---

### 2. TypeScript Type Check
```bash
npx tsc --noEmit
```
Runs TypeScript compiler in check mode (no output files).

**Fails on:**
- Type errors
- Missing type definitions
- Incompatible type assignments
- Strict mode violations

---

### 3. Prisma Schema Validation
```bash
npx prisma validate
npx prisma generate
npx prisma format --check
```
Validates database schema and ensures Prisma Client can be generated.

**Fails on:**
- Invalid Prisma schema syntax
- Model relation errors
- Missing required fields
- Schema formatting issues

---

### 4. Next.js Production Build
```bash
npm run build
```
Builds the application for production with optimizations enabled.

**Fails on:**
- Build errors
- Missing dependencies
- Invalid environment variables
- Runtime compilation errors

**Environment Variables (Mocked for CI):**
- `DATABASE_URL` - Mock PostgreSQL connection string
- `AUTH_SECRET` - Test authentication secret
- `NEXTAUTH_URL` - Local development URL
- Other required env vars with safe defaults

---

### 5. Prettier Code Formatting
```bash
npx prettier --check .
```
Checks code formatting consistency across the codebase.

**Fails on:**
- Inconsistent indentation
- Missing semicolons
- Incorrect quote style
- Line length violations

**To fix locally:**
```bash
npm run format
```

---

### 6. Security Audit
```bash
npm audit --audit-level=high
```
Scans dependencies for known security vulnerabilities.

**Note:** This job uses `continue-on-error: true`, so it won't fail the build but will show warnings.

**To fix locally:**
```bash
npm audit fix
```

---

## 🎯 Local Development

### Install Prettier (Already Added)
Prettier is already added to `devDependencies`. Run:
```bash
cd ceylonroots
npm install
```

### Format Code
```bash
npm run format          # Auto-fix formatting
npm run format:check    # Check without changes
```

### Run Individual Checks
```bash
npm run lint            # ESLint
npx tsc --noEmit        # TypeScript
npx prisma validate     # Prisma schema
npm run build           # Production build
npm audit               # Security check
```

### Run All Checks Locally
```bash
npm run lint && \
npx tsc --noEmit && \
npx prisma validate && \
npx prisma generate && \
npm run build
```

---

## 🔍 Viewing Results

### GitHub UI
1. Go to **Actions** tab in your repository
2. Click on the workflow run
3. See which jobs passed/failed
4. Click individual jobs to see detailed logs

### Status Badge (Optional)
Add to your README.md:
```markdown
[![CeylonRoots Integrity](https://github.com/YOUR_USERNAME/CeylonRoots/actions/workflows/ceylonroots-integrity.yml/badge.svg)](https://github.com/YOUR_USERNAME/CeylonRoots/actions/workflows/ceylonroots-integrity.yml)
```

---

## 🛠️ Troubleshooting

### Build Fails in CI but Works Locally

**Likely causes:**
1. **Missing environment variables** - Add required vars to workflow
2. **Different Node.js versions** - Check `node-version` in workflow matches your local
3. **Cached dependencies** - Clear GitHub Actions cache
4. **Platform differences** - Test on Linux locally with Docker

### TypeScript Errors in CI Only

**Fix:**
```bash
# Regenerate Prisma Client locally
npx prisma generate

# Check for any type errors
npx tsc --noEmit
```

### Prettier Check Fails

**Fix:**
```bash
# Auto-format all files
npm run format

# Commit the changes
git add .
git commit -m "chore: format code with prettier"
```

### Security Audit Warnings

**Fix:**
```bash
# Auto-fix vulnerabilities
npm audit fix

# If major breaking changes needed
npm audit fix --force
```

---

## 📦 Caching Strategy

The workflow uses GitHub Actions cache for:

1. **node_modules** - Cached via `actions/setup-node@v4`
2. **Next.js build cache** - `.next/cache` cached via `actions/cache@v4`

**Cache keys:**
- Based on `package-lock.json` hash (dependencies)
- Based on source file hashes (Next.js cache)

**Cache invalidation:**
- Automatic when `package-lock.json` changes
- Automatic when source files change

---

## 🚦 Concurrency Control

```yaml
concurrency:
  group: ceylonroots-integrity-${{ github.ref }}
  cancel-in-progress: true
```

**What this does:**
- Groups runs by branch/PR
- Cancels old runs when new commits pushed
- Saves CI minutes and gives faster feedback

---

## 📊 Workflow File Location

```
.github/workflows/ceylonroots-integrity.yml
```

---

## 🔐 Security Notes

### Environment Variables in CI

The workflow uses **mock/dummy environment variables** for builds:

⚠️ **These are NOT real credentials** - just valid formats to satisfy build requirements.

**Example:**
```yaml
DATABASE_URL: "postgresql://ci:ci@localhost:5432/testdb"
AUTH_SECRET: "test-secret-for-ci-only-minimum-32-characters-required"
```

### Secrets Management

For actual deployment workflows (not integrity checks), use GitHub Secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets like `DATABASE_URL`, `AUTH_SECRET`, etc.
3. Reference in workflow: `${{ secrets.SECRET_NAME }}`

---

## 🎓 Best Practices

### Before Pushing
```bash
# Run checks locally first
npm run lint
npm run format:check
npx tsc --noEmit
npm run build
```

### Commit Message Conventions
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance (deps, config)
- `docs:` - Documentation
- `style:` - Formatting, missing semicolons
- `refactor:` - Code restructuring
- `test:` - Adding tests

### Pull Request Checklist
- ✅ All integrity checks passing
- ✅ Code formatted with Prettier
- ✅ No TypeScript errors
- ✅ Build succeeds
- ✅ No high-severity security vulnerabilities

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js CI/CD Guide](https://nextjs.org/docs/pages/building-your-application/deploying/ci-build-caching)
- [Prisma GitHub Actions](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel#vercel-build-environment)
- [Prettier Documentation](https://prettier.io/docs/en/index.html)

---

## 🤝 Contributing

When contributing to CeylonRoots:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Run** integrity checks locally
5. **Push** to your fork
6. **Create** a pull request

The integrity check workflow will automatically run on your PR! 🎉

---

## 📞 Support

If you encounter issues with the CI workflow:

1. Check the **Actions** tab for detailed error logs
2. Review this documentation
3. Run checks locally to reproduce the issue
4. Open an issue with workflow run URL and error details

---

**Last Updated:** March 26, 2026  
**Workflow Version:** 1.0.0
