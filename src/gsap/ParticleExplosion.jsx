import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

function ParticleExplosion() {
  const particlesRef = useRef(null)
  const [explosionKey, setExplosionKey] = useState(0)

  const createParticles = () => {
    const particles = []
    const colors = [
      '#FF6B6B', // Coral
      '#4ECDC4', // Turquoise
      '#FFE66D', // Yellow
      '#FF69B4', // Pink
      '#7A5FFF'  // Purple
    ]

    // Center explosion particles
    for (let i = 0; i < 40; i++) {
      particles.push(
        <div
          key={`center-${i}`}
          className="center-particle absolute w-2 h-2 rounded-full opacity-0"
          style={{
            backgroundColor: colors[i % colors.length],
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )
    }

    // Confetti particles
    for (let i = 0; i < 30; i++) {
      // Left confetti
      particles.push(
        <div
          key={`left-${i}`}
          className="confetti absolute w-3 h-1 opacity-0"
          style={{
            backgroundColor: colors[i % colors.length],
            left: '10%',
            bottom: '5%'
          }}
        />
      )

      // Right confetti
      particles.push(
        <div
          key={`right-${i}`}
          className="confetti absolute w-3 h-1 opacity-0"
          style={{
            backgroundColor: colors[i % colors.length],
            right: '10%',
            bottom: '5%'
          }}
        />
      )
    }

    return particles
  }

  // Wait until the particles container mounts
  useEffect(() => {
    if (particlesRef.current) {
      gsap.set(
        particlesRef.current.querySelectorAll('.center-particle, .confetti'),
        {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0
        }
      )
    }
  }, [explosionKey])

  const triggerExplosion = () => {
    if (!particlesRef.current) return

    const elements = particlesRef.current.querySelectorAll('.center-particle, .confetti')

    // Reset particles before starting the animation
    gsap.set(elements, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0
    })

    // Animate the center explosion
    gsap.to(particlesRef.current.querySelectorAll('.center-particle'), {
      opacity: 1,
      scale: 'random(1, 2)',
      duration: 0.2,
      stagger: {
        each: 0.02,
        from: 'center'
      },
      onComplete: () => {
        gsap.to(particlesRef.current.querySelectorAll('.center-particle'), {
          x: (i) => {
            const angle = (i / 40) * 360
            const radius = window.innerWidth * 1.5
            return Math.cos(angle * Math.PI / 180) * radius
          },
          y: (i) => {
            const angle = (i / 40) * 360
            const radius = window.innerHeight * 1.5
            return Math.sin(angle * Math.PI / 180) * radius
          },
          rotation: 'random(-720, 720)',
          duration: 2,
          ease: 'power2.out',
          stagger: {
            each: 0.02,
            from: 'center'
          }
        })
      }
    })

    // Animate the confetti sequence
    gsap.to(particlesRef.current.querySelectorAll('.confetti'), {
      opacity: 1,
      duration: 0.1,
      stagger: 0.02,
      onComplete: () => {
        gsap.to(particlesRef.current.querySelectorAll('.confetti'), {
          x: (i) => (i % 2 === 0 ? 'random(200, 400)' : 'random(-200, -400)'),
          y: -window.innerHeight,
          rotation: 'random(-180, 180)',
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.02,
          onComplete: () => {
            gsap.to(particlesRef.current.querySelectorAll('.confetti'), {
              y: window.innerHeight + 100,
              duration: 1.5,
              ease: 'power2.in',
              stagger: 0.02,
              onComplete: () => {
                // Instead of clearing inline styles, force a re-render of the particle elements
                setExplosionKey(prev => prev + 1)
              }
            })
          }
        })
      }
    })
  }

  return (
    <div className="card w-full bg-base-300 shadow-xl min-h-[600px]">
      <div className="card-body relative">
        {/* The key forces this container to re-mount when explosionKey changes */}
        <div ref={particlesRef} key={explosionKey} className="absolute inset-0 overflow-hidden">
          {createParticles()}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={triggerExplosion}
            className="btn btn-primary btn-lg"
          >
            Kaboom!
          </button>
        </div>
      </div>
    </div>
  )
}

export default ParticleExplosion