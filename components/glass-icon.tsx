export function GlassIcon({ color = "#888888", className = "h-6 w-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      className={className}
      stroke={color}
      strokeWidth="2"
      fill="none"
    >
      <path d="M30,10 L70,10 L65,90 C65,95 60,100 50,100 C40,100 35,95 35,90 L30,10 Z" />
      <path d="M25,10 L75,10" />
      <path d="M40,100 L40,110 L60,110 L60,100" />
      <path d="M35,110 L65,110" />
    </svg>
  )
}
