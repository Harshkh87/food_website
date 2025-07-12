"use client"

import { Box } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import LoadingAnimation from "./LoadingAnimation"

const MotionBox = motion(Box)

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showInitialAnimation, setShowInitialAnimation] = useState(true)

  useEffect(() => {
    // Show initial loading animation on first load
    const hasSeenAnimation = sessionStorage.getItem("hasSeenAnimation")
    if (!hasSeenAnimation) {
      setShowInitialAnimation(true)
      sessionStorage.setItem("hasSeenAnimation", "true")
    } else {
      setShowInitialAnimation(false)
    }
  }, [])

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
    },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showInitialAnimation && (
          <LoadingAnimation isVisible={showInitialAnimation} onComplete={() => setShowInitialAnimation(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation isVisible={isLoading} onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showInitialAnimation && !isLoading && (
          <MotionBox
            key="page-content"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {children}
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}

export default PageTransition
