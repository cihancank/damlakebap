import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = "", width = 160, height = 160 }: LogoProps) {
  return (
    <Link href="/" aria-label="Damla Kebap Anasayfa" className={`block ${className}`}>
      <Image
        src="/images/damla-logo.png"
        alt="Damla Kebap Logo - Kebap, Pide, Lahmacun, Çorba"
        width={width}
        height={height}
        className="w-auto h-auto max-w-full transition-transform duration-300 hover:scale-105 object-contain"
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
        priority
      />
    </Link>
  )
}
