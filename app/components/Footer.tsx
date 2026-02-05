export default function Footer() {
  return (
    <footer className="relative py-8 px-6 md:px-12 lg:px-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © 2026 ZISARKNAR
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="mailto:zisarknar.me@gmail.com" className="hover:text-gray-900 transition-colors">Email</a>
          <a href="https://github.com/zisarknar" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/zisarknar" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
