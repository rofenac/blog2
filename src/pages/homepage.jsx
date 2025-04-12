import Header from '../components/header'
import Footer from '../components/footer'
import Body from '../components/body'
import { blogEntries } from '../components/blogentries'

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Body className="flex-grow" entries={blogEntries} />
      <Footer />
    </div>
  )
}

export default HomePage