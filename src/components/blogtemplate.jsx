import { useState } from 'react'
import localStorageImg from '../assets/localStorage.jpg'
import nastyGram from '../assets/nastyGram.png'
import mindMapImage from '../assets/mind_map.png'

function BlogTemplate({ title, date, content }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Handle JSX content separately
  if (typeof content !== 'string') {
    return (
      <div className="bg-base-100 shadow-lg rounded-lg p-6 mb-6">
        <div className="mb-4">
          <p className="text-sm text-base-content/70 mb-2">
            {date}
          </p>
          <h2 className="text-2xl font-bold text-base-content mb-4">
            {title}
          </h2>
          <div className="prose max-w-none">
            {/* Show either the full JSX content or a preview */}
            <div className={isExpanded ? '' : 'max-h-48 overflow-hidden'}>
              {content}
            </div>
            <button 
              className="btn btn-primary btn-sm mt-4"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'See Less' : 'See More'}
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  // Process string content as before
  const sections = content.split(/(\`\`\`.*?\`\`\`|\n)/gs)
  const previewSections = sections.slice(0, 2)
  
  const formatText = (text) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold (**bold**)
      .replace(/__(.+?)__/g, '<u>$1</u>') // Underline (__underline__)
      .replace(/_(.+?)_/g, '<em>$1</em>') // Italic (_italic_)
  }
  
  const renderSections = (sections) => {
    return sections.map((section, index) => {
      if (section.includes('[IMAGE]')) {
        return (
          <img 
            key={index}
            src={localStorageImg} 
            alt="localStorage example" 
            className="w-full h-auto rounded-lg shadow-md my-4" 
          />
        )
      }
      if (section.includes('[IMAGE2]')) {
        return (
          <img 
            key={index}
            src={nastyGram} 
            alt="Nasty Gram example" 
            className="w-full h-auto rounded-lg shadow-md my-4" 
          />
        )
      }
      if (section.includes('[MINDMAP]')) {
        return (
          <img 
            key={index}
            src={mindMapImage} 
            alt="Mind Map" 
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '1em 0' }}
            className="rounded-lg shadow-md" 
          />
        )
      }
      if (section.startsWith('```') && section.endsWith('```')) {
        const code = section.slice(3, -3).trim()
        return (
          <pre key={index} className="bg-base-200 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm">
              {code}
            </code>
          </pre>
        )
      }
      if (section === '\n') {
        return <br key={index} />
      }
      return (
        <p 
          key={index} 
          className="mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatText(section) }}
        />
      )
    })
  }
  
  return (
    <div className="bg-base-100 shadow-lg rounded-lg p-6 mb-6">
      <div className="mb-4">
        <p className="text-sm text-base-content/70 mb-2">
          {date}
        </p>
        <h2 className="text-2xl font-bold text-base-content mb-4">
          {title}
        </h2>
        <div className="prose max-w-none">
          {isExpanded
            ? renderSections(sections)
            : renderSections(previewSections)}
          <button 
            className="btn btn-primary btn-sm mt-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogTemplate