function Footer() {
  return (
    <footer className="bg-base-200 text-base-content body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-bold items-center text-primary mb-4 md:mb-0">
          <span className="ml-3 text-2xl">My Reaction to ReactJS</span>
        </a>
        <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l sm:border-base-300 sm:py-2 sm:mt-0 mt-4">
          © 2025 David Derr —
          <a
            href="https://github.com/rofenac"
            className="text-gray ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer