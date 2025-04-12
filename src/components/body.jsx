import BlogTemplate from './blogtemplate'

function Body({ className, entries }) {
  return (
    <section className={`bg-base-200 text-base-content overflow-hidden ${className}`}>
      <div className="container mx-auto px-5 py-24">
        <div className="divide-y divide-base-300">
          {entries.map((entry, index) => (
            <BlogTemplate
              key={index}
              title={entry.title}
              date={entry.date}
              content={entry.content}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Body