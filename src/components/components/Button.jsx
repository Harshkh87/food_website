"use client"

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${disabled ? "disabled" : ""} ${loading ? "loading" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="btn-spinner"></div>}
      {icon && !loading && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  )
}

export default Button
