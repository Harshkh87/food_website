"use client"

const LoadingSpinner = ({ size = "medium" }) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner"></div>
    </div>
  )
}

export default LoadingSpinner
