# GoZeroing AI - Advanced Voice Interface

A modern, production-ready AI voice interface with stunning particle visualization and real-time audio processing. Built with React, TypeScript, Three.js, and modern web technologies.

## Features

✨ **Advanced Particle System**: Thousands of animated particles that respond to voice input
🎙️ **Real-time Voice Visualization**: Web Audio API integration with frequency analysis
🎨 **Modern UI/UX**: Beautiful gradients, animations, and responsive design
⚡ **High Performance**: Optimized for smooth 60fps animations
🔧 **Production Ready**: TypeScript, ESLint, modern build tools
📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Styling**: Styled Components + CSS-in-JS
- **Build Tool**: Vite
- **Audio Processing**: Web Audio API
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gozeroing-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ParticleField.tsx      # 3D particle system
│   ├── VoiceVisualizer.tsx    # Main voice interface
│   └── ControlPanel.tsx       # Control buttons
├── App.tsx                    # Main application
├── main.tsx                   # Entry point
├── index.css                  # Global styles
└── index.html                 # HTML template
```

## Features Overview

### Particle Field
- **2000+ animated particles** in spherical distribution
- **Audio-reactive movement** based on voice frequency
- **Breathing animations** for organic feel
- **Color transitions** based on activity levels

### Voice Visualization
- **Real-time frequency analysis** with Web Audio API
- **Circular frequency bars** around the main interface
- **Volume indicators** and visual feedback
- **Smooth animations** and transitions

### Control Panel
- **Microphone toggle** with visual feedback
- **Settings panel** for configuration
- **Status indicators** for connection state

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimizations

- **WebGL rendering** for smooth 3D graphics
- **Efficient particle updates** using Float32Arrays
- **RequestAnimationFrame** for smooth animations
- **Audio worklet** for real-time processing
- **Tree shaking** and code splitting

## Customization

### Colors and Themes
Modify CSS custom properties in `src/index.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success: #00ff88;
  --error: #ff4757;
}
```

### Particle Configuration
Adjust particle behavior in `ParticleField.tsx`:

```typescript
const particleCount = 2000
const radius = 5 + Math.random() * 15
```

## API Integration

The interface is designed to integrate with your backend API. Add your API calls in `App.tsx`:

```typescript
// Example API integration
const sendAudioData = async (audioBuffer: ArrayBuffer) => {
  const response = await fetch('/api/process-audio', {
    method: 'POST',
    body: audioBuffer,
  })
  return response.json()
}
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if necessary
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

For support and questions:
- Email: support@gozeroing.ai
- Discord: [Join our community](https://discord.gg/gozeroing)

---

Built with ❤️ by the GoZeroing team
