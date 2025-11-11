'use client'

import { useState } from 'react'

interface Project {
  title: string
  description: string
  tech: string[]
  icon: string
  link?: string
  fullDescription?: string
  features?: string[]
  github?: string
  demo?: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        className="group relative bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400 transition-all duration-500 overflow-hidden cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Hover glow */}
        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-all duration-500"></div>
        
        <div className="relative p-8 z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="text-4xl filter group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all">
              {project.icon}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">{'// '}{String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-400 mb-6 leading-relaxed text-sm">
            {project.description}
          </p>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom accent line */}
          <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500"></div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative max-w-2xl w-full bg-black/95 backdrop-blur-xl border-2 border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.4)] animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>

            {/* Header */}
            <div className="border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{project.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{project.title}</h3>
                    <p className="text-xs font-mono text-gray-500 mt-1">PROJECT_DETAILS.SYS</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500"></div>
                  <span className="text-xs font-mono text-gray-500 hover:text-red-400">CLOSE</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {/* Description */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500"></div>
                  <h4 className="font-mono text-cyan-400 text-sm">&gt; DESCRIPTION_</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500"></div>
                    <h4 className="font-mono text-purple-400 text-sm">&gt; FEATURES_</h4>
                  </div>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                        <span className="text-cyan-400 mt-1">▹</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-500"></div>
                  <h4 className="font-mono text-blue-400 text-sm">&gt; TECH_STACK_</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-cyan-500/20">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 transition-all font-mono text-sm text-center"
                  >
                    {'<'} VIEW CODE {'>'}
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-purple-500/10 border border-purple-500 text-purple-400 hover:bg-purple-500/20 transition-all font-mono text-sm text-center"
                  >
                    {'<'} LIVE DEMO {'>'}
                  </a>
                )}
              </div>
            </div>

            {/* Bottom accent */}
            <div className="h-px w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectCard
