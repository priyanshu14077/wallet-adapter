import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Free image sources - Unsplash + Pexels (no API key needed for these direct URLs)
const FREE_IMAGES = [
  // Unsplash - Abstract/Dark/Cyber
  { id: 'u1', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80', source: 'unsplash', description: 'Abstract fluid' },
  { id: 'u2', url: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c7c?w=1920&q=80', source: 'unsplash', description: 'Geometric gradient' },
  { id: 'u3', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&q=80', source: 'unsplash', description: 'Dark waves' },
  { id: 'u4', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80', source: 'unsplash', description: 'Smooth gradient' },
  { id: 'u5', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80', source: 'unsplash', description: 'Dark minimal' },
  { id: 'u6', url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1920&q=80', source: 'unsplash', description: 'Neon glow' },
  { id: 'u7', url: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=1920&q=80', source: 'unsplash', description: 'Cyber grid' },
  // Pexels - Free to use
  { id: 'p1', url: 'https://images.pexels.com/photos/207529/pexels-photo-207529.jpeg?auto=compress&cs=tinysrgb&w=1920', source: 'pexels', description: 'Deep space' },
  { id: 'p2', url: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1920', source: 'pexels', description: 'Abstract light' },
  { id: 'p3', url: 'https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&w=1920', source: 'pexels', description: 'Geometric dark' },
];

// Interactive particle system
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function Background() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? '#00d4aa' : '#7c3aed',
    }));
    setParticles(initialParticles);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate particles
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          
          // Wrap around screen
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;
          
          // Mouse interaction - particles flee from mouse
          const dx = mouseRef.current.x - newX;
          const dy = mouseRef.current.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            newX -= (dx / distance) * force * 2;
            newY -= (dy / distance) * force * 2;
          }
          
          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Image slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FREE_IMAGES.length);
    }, 8000); // Change every 8 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Preload images
    FREE_IMAGES.forEach((img: typeof FREE_IMAGES[0]) => {
      const image = new Image();
      image.src = img.url;
    });
    setLoaded(true);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -10,
      overflow: 'hidden',
    }}>
      {/* Deep base */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: '#050505',
      }} />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '10%',
          left: '10%',
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '20%',
          right: '10%',
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 60%)',
          filter: 'blur(40px)',
          top: '50%',
          left: '50%',
          marginLeft: '-250px',
          marginTop: '-250px',
        }}
      />

      {/* Image slideshow with crossfade */}
      {loaded && FREE_IMAGES[currentIndex] && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              inset: 0,
            }}
          >
            <img
              src={FREE_IMAGES[currentIndex].url}
              alt={FREE_IMAGES[currentIndex].description}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.15,
                filter: 'grayscale(60%) contrast(1.2) brightness(0.5)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Dark overlay gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 5, 0.4) 100%),
          linear-gradient(180deg, rgba(5, 5, 5, 0.8) 0%, transparent 50%, rgba(5, 5, 5, 0.8) 100%)
        `,
      }} />

      {/* Vignette effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Animated noise texture */}
      <motion.div
        animate={{
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Scanline effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)',
        pointerEvents: 'none',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        pointerEvents: 'none',
      }} />

      {/* Interactive Particles */}
      <div ref={containerRef} style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: [1, 1.2, 1],
            }}
            transition={{
              x: { duration: 0, ease: "linear" },
              y: { duration: 0, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: 'absolute',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
