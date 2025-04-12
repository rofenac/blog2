import { useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

function SpinningText() {
  const textRef = useRef(null)
  const buttonRef = useRef(null)
  const timeline = useRef(null)
  const [animationStage, setAnimationStage] = useState(0) // 0: not started, 1: spinning, 2: exploded

  // Helper to get all letter spans
  const getLetterElements = () =>
    textRef.current ? textRef.current.querySelectorAll("span > span") : []

  const startSpin = () => {
    const letters = getLetterElements()
    if (!letters.length) return
    // Make the text visible before starting the animation
    gsap.set(textRef.current, { opacity: 1 })
    gsap.fromTo(
      letters,
      { scale: 0, rotation: 720, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "bounce.out", stagger: 0.05 }
    )
    setAnimationStage(1)
  }

  const explodeText = () => {
    if (animationStage !== 1) return
    const letters = getLetterElements()
    letters.forEach(letter => {
      gsap.to(letter, {
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
    })
    setAnimationStage(2)
  }

  const resetAnimation = () => {
    const letters = getLetterElements()
    gsap.set(letters, { x: 0, y: 0, rotation: 0, opacity: 0, scale: 0 })
    gsap.set(textRef.current, { opacity: 0 })
    setAnimationStage(0)
  }

  // Setup flashing animation when button appears
  useGSAP(() => {
    if (animationStage === 1 && buttonRef.current) {
      timeline.current = gsap.timeline({
        repeat: -1,
        yoyo: true
      })

      timeline.current
        .to(buttonRef.current, {
          duration: 0.5,
          backgroundColor: '#ff69b4',
          scale: 1.1,
          ease: 'power2.inOut'
        })
        .to(buttonRef.current, {
          duration: 0.5,
          backgroundColor: '#4a90e2',
          scale: 1,
          ease: 'power2.inOut'
        })
    }

    return () => {
      if (timeline.current) {
        timeline.current.kill()
      }
    }
  }, [animationStage])

  // Setup hover effects for letters
  useGSAP(() => {
    const letters = getLetterElements()
    letters.forEach(letter => {
      let hoverTl = null

      // Create hover effect for each letter
      letter.addEventListener('mouseenter', () => {
        if (animationStage === 1) { // Only apply hover effect when text is visible and not exploded
          // Kill any existing timeline
          if (hoverTl) hoverTl.kill()

          // Create new timeline
          hoverTl = gsap.timeline()
          hoverTl.to(letter, {
            scale: 2,
            color: '#ffd700', // Gold color on hover
            duration: 0.3,
            ease: 'power2.out',
            zIndex: 10,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          })
            .to(letter, {
              scale: 2, // Maintain the scale
              duration: 0.1 // Small duration to keep the animation active
            }, "+=0") // Add a small delay to keep the animation active
        }
      })

      letter.addEventListener('mouseleave', () => {
        if (animationStage === 1) {
          // Kill the hover timeline
          if (hoverTl) hoverTl.kill()

          // Create a new timeline for the reset animation
          gsap.to(letter, {
            scale: 1,
            color: '#d8b4fe', // Return to original purple-300 color
            duration: 0.3,
            ease: 'power2.inOut',
            zIndex: 1,
            textShadow: 'none'
          })
        }
      })
    })
  }, [animationStage])

  return (
    <div className="text-center mt-12">
      <h1 ref={textRef} className="text-5xl text-purple-300 font-bold inline-block opacity-0">
        {"NEVER PUSH THAT BUTTON AGAIN! (But DO hover over this text)".split(" ").map((word, index) => (
          <span key={index} className="inline-block mr-2">
            {word.split("").map((letter, idx) => (
              <span
                key={idx}
                className="inline-block cursor-pointer"
                style={{ position: 'relative' }}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </h1>
      <div className="mt-8">
        {animationStage === 0 && (
          <button onClick={startSpin} className="btn btn-primary">
            Push This Button!
          </button>
        )}
        {animationStage === 1 && (
          <button
            ref={buttonRef}
            onClick={explodeText}
            className="btn btn-secondary"
          >
            Push It Again!
          </button>
        )}
        {animationStage === 2 && (
          <button onClick={resetAnimation} className="btn btn-outline">
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

export default SpinningText