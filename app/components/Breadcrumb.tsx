import Link from 'next/link'

interface BreadcrumbProps {
  currentPage: string
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link 
        href="/" 
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Home
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-900 font-medium">{currentPage}</span>
    </nav>
  )
}
