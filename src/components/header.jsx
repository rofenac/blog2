import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <header className="bg-base-200 text-base-content body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-bold items-center text-primary mb-4 md:mb-0">
            <span className="ml-3 text-2xl">My Reaction to ReactJS</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-base-300 flex flex-wrap items-center text-base justify-center">
            <a href="https://rofenac.github.io/quiz-app/" className="mr-5 hover:hover:text-primary">DFPMPQA</a>
            <Link to="/jsonreformatter">JSON Formatter</Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header