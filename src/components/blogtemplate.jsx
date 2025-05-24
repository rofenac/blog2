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
    const result = []
    let i = 0
    
    while (i < sections.length) {
      const section = sections[i]
      
      if (section.includes('[IMAGE]')) {
        result.push(
          <img 
            key={i}
            src={localStorageImg} 
            alt="localStorage example" 
            className="w-full h-auto rounded-lg shadow-md my-4" 
          />
        )
      }
      else if (section.includes('[IMAGE2]')) {
        result.push(
          <img 
            key={i}
            src={nastyGram} 
            alt="Nasty Gram example" 
            className="w-full h-auto rounded-lg shadow-md my-4" 
          />
        )
      }
      else if (section.includes('[MINDMAP]')) {
        result.push(
          <img 
            key={i}
            src={mindMapImage} 
            alt="Mind Map" 
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '1em 0' }}
            className="rounded-lg shadow-md" 
          />
        )
      }
      else if (section.startsWith('```') && section.endsWith('```')) {
        const code = section.slice(3, -3).trim()
        result.push(
          <pre key={i} className="bg-base-200 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm">
              {code}
            </code>
          </pre>
        )
      }
      else if (section === '\n') {
        result.push(<br key={i} />)
      }
      else if (section.trim().startsWith('- ') || section.trim().startsWith('* ')) {
        // Group consecutive list items
        const listItems = []
        while (i < sections.length && (sections[i].trim().startsWith('- ') || sections[i].trim().startsWith('* ') || sections[i] === '\n')) {
          if (sections[i] !== '\n') {
            listItems.push(sections[i].trim().substring(2)) // Remove the '- ' or '* '
          }
          i++
        }
        i-- // Adjust because the while loop will increment
        
        result.push(
          <ul key={i} className="list-disc list-inside mb-2 space-y-0">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-tight" dangerouslySetInnerHTML={{ __html: formatText(item) }} />
            ))}
          </ul>
        )
      }
      else if (section.match(/^\d+\./)) {
        // Handle numbered lists
        const listItems = []
        while (i < sections.length && (sections[i].match(/^\d+\./) || sections[i] === '\n')) {
          if (sections[i] !== '\n') {
            listItems.push(sections[i].trim())
          }
          i++
        }
        i-- // Adjust because the while loop will increment
        
        result.push(
          <ol key={i} className="list-decimal list-inside mb-2 space-y-0">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-tight" dangerouslySetInnerHTML={{ __html: formatText(item.replace(/^\d+\.\s*/, '')) }} />
            ))}
          </ol>
        )
      }
      else {
        // Check if this is a memo header or short line for tighter spacing
        const isMemoHeader = (
          section.includes('**TO:**') || 
          section.includes('**FROM:**') || 
          section.includes('**DATE:**') || 
          section.includes('**RE:**') ||
          section.trim() === 'BRIEFING MEMO'
        )
        
        const isShortLine = section.length < 150 && (
          isMemoHeader ||
          section.startsWith('**') ||
          section.includes('**For ') ||
          section.includes('**1.') ||
          section.includes('**2.') ||
          section.includes('**3.') ||
          section.includes('**4.')
        )
        
        result.push(
          <p 
            key={i} 
            className={isMemoHeader ? "mb-0 leading-tight" : isShortLine ? "mb-1 leading-tight" : "mb-2 leading-relaxed"}
            dangerouslySetInnerHTML={{ __html: formatText(section) }}
          />
        )
      }
      i++
    }
    
    return result
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