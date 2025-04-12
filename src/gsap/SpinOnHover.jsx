import { useRef } from 'react'
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

function SpinOnHover() {
  const componentRef = useRef(null) // Reference for the container div
  const viteRef = useRef(null) // Reference for Vite logo
  const reactRef = useRef(null) // Reference for React logo

  useGSAP(() => {
    const viteEl = viteRef.current
    const reactEl = reactRef.current

    // Function to rotate elements on hover
    const spin = (el) => {
      gsap.to(el, { rotate: '+=360', duration: 1, ease: "power2.out" })
    }

    // Add event listeners
    viteEl.addEventListener("mouseenter", () => spin(viteEl))
    reactEl.addEventListener("mouseenter", () => spin(reactEl))

    // Cleanup event listeners
    return () => {
      viteEl.removeEventListener("mouseenter", () => spin(viteEl))
      reactEl.removeEventListener("mouseenter", () => spin(reactEl))
    }
  }, [])

  return (
    <div ref={componentRef} className="hover-spin flex gap-12">
      <a href="https://vite.dev" target="_blank">
        <img ref={viteRef} src={viteLogo} className="w-24 h-24 logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img ref={reactRef} src={reactLogo} className="w-24 h-24logo react" alt="React logo" />
      </a>
    </div>
  )
}

export default SpinOnHover