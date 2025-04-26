import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <header className="bg-base-200 text-base-content body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-bold items-center text-primary mb-4 md:mb-0">
            <span className="ml-3 text-2xl">My QAI Journey</span>
          </a>
        </div>
      </header>
    </>
  )
}

export default Header