# Inxcode Pvt Ltd - Official Website

> **Knowledge creates ideas, Inxcode brings them to life.**

A modern, production-ready company website built with React 19, Vite 6, and Tailwind CSS v4, featuring a glassmorphism design, particle effects, and dual-mission content representing Inxcode's software innovation and IT education ecosystem.

![Inxcode Website](https://via.placeholder.com/1200x600/1a2847/00d4ff?text=Inxcode+Website)

## 🌟 Features

### Design & UI/UX
- ✨ **Glassmorphism Design**: Modern pill-shaped navbar inspired by pickme.lk
- 🎨 **Dual Theme System**: Navy blue dark mode (#1a2847) and light blue light mode (#e8f4f8)
- 🌌 **Particle Effects**: Interactive particle background with performance optimization
- 📱 **Fully Responsive**: Mobile-first design (320px - 1280px+)
- 🎭 **Professional Animations**: Smooth transitions, hover effects, and micro-interactions
- ♿ **Accessibility**: WCAG AA compliant with proper contrast ratios and ARIA labels

### Components
- **Navbar**: Sticky navigation with mobile menu overlay
- **Hero**: Dual-mission messaging with floating cards and statistics
- **Services**: Tabbed interface for Software Development and Inxcode Academy
- **Projects**: Filterable portfolio with interactive project cards
- **Team**: Team member profiles with social integration
- **Contact**: Functional form with contact information cards
- **Footer**: Comprehensive footer with ecosystem messaging

### Technical Stack
- ⚛️ **React 19.2.0**: Latest features with concurrent rendering
- ⚡ **Vite 6.0.5**: Lightning-fast development and build tool
- 🎨 **Tailwind CSS 4.0.0**: Latest version with native Vite plugin
- ✨ **tsParticles**: Optimized particle effects library
- 📦 **ESLint**: Code quality and linting

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

```bash
# Navigate to project directory
cd inxcode-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
inxcode-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx & Navbar.css
│   │   ├── Hero.jsx & Hero.css
│   │   ├── Services.jsx & Services.css
│   │   ├── Projects.jsx & Projects.css
│   │   ├── Team.jsx & Team.css
│   │   ├── Contact.jsx & Contact.css
│   │   ├── Footer.jsx & Footer.css
│   │   ├── ThemeToggle.jsx
│   │   └── ParticleBackground.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## 💼 About Inxcode

### Vision
To be a global leader in software innovation and education by bridging the gap between knowledge and execution, empowering individuals and organizations to shape the future through technology.

### Mission
Transform creativity into scalable, impactful, real-world software solutions while equipping students and professionals with cutting-edge knowledge and practical skills.

### Core Values
- 🚀 **Innovation**: Pushing boundaries with cutting-edge technology
- 💎 **Excellence**: Delivering high-quality solutions
- 🤝 **Integrity**: Building trust through transparency
- 👥 **Collaboration**: Working together for success
- 💪 **Empowerment**: Enabling growth through education

### Dual Ecosystem

**Inxcode (Pvt) Ltd**
- Software Development & IT Solutions
- Tagline: "Unlimited ideas to execution"

**Inxcode Academy**
- Training & Educational Programs
- Tagline: "Knowledge for unlimited ideas"

## 🛠️ Customization

### Changing Theme Colors

Edit `src/index.css`:

```css
@theme {
  --color-navy: #1a2847;           /* Dark mode primary */
  --color-light-blue: #e8f4f8;     /* Light mode primary */
  --color-accent: #00d4ff;          /* Accent color */
}
```

### Modifying Content

- **Services**: Edit arrays in `src/components/Services.jsx`
- **Projects**: Modify project data in `src/components/Projects.jsx`
- **Team**: Update team members in `src/components/Team.jsx`

### Adjusting Particle Effects

Edit `src/components/ParticleBackground.jsx` to customize:
- Particle count (`number.value`)
- Colors (`particles.color.value`)
- Speed (`move.speed`)
- Interactivity modes

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms

The `dist` folder can be deployed to:
- GitHub Pages
- AWS S3 + CloudFront
- DigitalOcean
- Cloudflare Pages
- Any static hosting service

## 📊 Performance

- ⚡ **FPS Limiting**: Particle effects capped at 60fps
- 🎯 **Optimized Bundle**: Tree-shaking and minification
- 🔄 **Code Splitting**: Automatic with Vite
- 💾 **Theme Persistence**: localStorage integration
- ⏸️ **Pause on Blur**: Particles pause when tab is inactive

## 🧪 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

This is a proprietary project for Inxcode Pvt Ltd. For any inquiries or contributions, please contact:

- **Email**: hello@inxcode.com
- **Phone**: +94 (123) 456-7890
- **Address**: 123 Innovation Street, Tech City

## 📄 License

All rights reserved © 2025 Inxcode Pvt Ltd

## 🙏 Acknowledgments

- Design inspiration from [pickme.lk](https://pickme.lk)
- Built with modern web technologies
- Particle effects by [tsParticles](https://particles.js.org)

---

**Built with ❤️ by Inxcode Pvt Ltd**  
*Transforming creativity into reality through software innovation and education*
"# inxcode" 
"# inxcode" 
"# inxcode" 
"# inxcode" 
