# Contributing to Global News Map

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/global-maps-news/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue with the `enhancement` label
3. Describe the feature and its use case
4. Explain why it would be valuable

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Write or update tests if applicable
5. Ensure all tests pass:
   ```bash
   pnpm lint
   pnpm build
   ```
6. Commit with clear messages:
   ```bash
   git commit -m "feat: add new feature description"
   ```
7. Push and create a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/global-maps-news.git
cd global-maps-news

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Coding Standards

### TypeScript

- Use strict mode
- Avoid `any` type - use `unknown` when necessary
- Define interfaces for all data structures
- Use meaningful variable and function names

### React

- Prefer functional components with hooks
- Use `'use client'` directive only when necessary
- Keep components under 300 lines
- Extract reusable logic into custom hooks

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain dark mode compatibility

### File Organization

- Keep files under 500 lines
- Group related components in folders
- Use index files for clean exports

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing!
