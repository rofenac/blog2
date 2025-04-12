import SpinOnHover from "../gsap/SpinOnHover"
import SpinningText from "../gsap/SpinningText"
import ParticleExplosion from "../gsap/ParticleExplosion"

export const blogEntries = [
  {
    title: 'Hi, I\'m Dave, and I\'m a Terraform-Ansible Addict',
    date: '03 Mar 2025',
    content: `Prof. introduced me to Terraform and in my investigations I found Ansible, so I’ve been working on that for the last two weeks. I have gotten to the point where I can spin up a NodeJS server and a MySQL server, and configured to the point where basic user accounts, credentials and customized command prompts, timezones and hostnames are provisioned. Also a VPC is created to facilitate the two servers communicating. MySQL is installed, but not configured, on the MySQL server. NodeJS, including NPM and NVM are installed on the NodeJS server with all the latest versions. If I knew more about MySQL, I could fully configure the MySQL via Ansible, but just installing it will have to do for now.
    
    I was practicing the Terraform script earlier with vulnerable logon credentials. I left the servers up for about an hour and within that hour someone or somebot had compromised the server and was using it for brute forcing. I got a nastygram from Akamai saying I need to fix this ASAP. I deleted the servers. From now on I will provision cloud servers with hardened credentials.

    [IMAGE2]
    
    As for the front end, I fixed the card border animations on the “home” and “howworks” pages. I think that is about as far as I will get before lab tonight.`
  },
  {
    title: 'Hi, I\'m Dave, and I\'m a GSAP Addict',
    date: '19 Feb 2025',
    content: `This week I concentrated mostly on finishing off the GSAP animations for the domain pages along with some minor tweaks and changes. Had a bit of trouble with some of the logic, but I got it sorted. I also did a full refactor of the animations so that the React specific hook, "useGSAP" is now consistently applied across the app. ChatGPT for some reason hates the wrapper and and tries to remove it whenever it can. I have to explicitly tell it to leave it. I don't what difference it makes. That's something I'll have to dig into when I have a moment.
    
    The other major change this week was splitting up the leaderboard so each quiz type gets its own. Then there were some routing issues where the full set quiz wasn't populating its leaderboard. I also fixed the GSAp countdown animation so that it is applied globally to all quiz buttons.
    
    Coming up, I'll finish up question collection and possibly add a timer function to the quizzes. Prof. mentioned something implementing a POS system as well. That could be interesting.`
  },
  {
    title: 'Greensock Animation Platform (GSAP) Showcase',
    date: '12 Feb 2025',
    content: (
      <>
        <div className="font-bold">
          <p>Here are some of the fun things I have been messing around with during our "free" week. Hover over the Vite and React icons</p>
          <div className="pt-12">
            <SpinOnHover />
          </div>
          <div className="pt-12">
            <p>Because there can never be enough spinning things:</p>
            <SpinningText />
          </div>
          <div className="pt-12">
            <p>And finally...</p>
            <div className="pt-8">
              <ParticleExplosion />
            </div>
          </div>
          <p className="pt-12">I wanted to show off the SVGMorph plugin, but alas it is behind a paywall. So you'll have to settle for confetti. In any case, I'm glad I found this library, as you can see I am having a lot of fun with it.</p>
        </div>
      </>
    )
  },
  {
    title: 'Themes, Tailwind Syntax, Grids, and UAT Feedback, Oh MY!',
    date: '11 Feb 2025',
    content: `Made the corrections suggested by my classmates. I made the entire card a button on both the home page and the newly populated "How the Quiz Works" page, instead of just the card title. The "all questions" quiz button is back on the home page; I had it toggled off. I made the cards on the home page darker than the background so they pop more. They already had a drop shadow applied. Also made hover over effects for the cards to make it more apparent that they are buttons. I pruned the DaisyUi themes down to the ones I find the least obnoxious (i. e. the dark themes). I installed a theme selector in the upper right corner of the header component. It uses localStorage to store a "theme" object that holds the name of the applied DaisyUI theme. I'm pleased how it turned out. I did a lot of tweaking of the TailwindCSS utility classes. I now know what this means:
    
    \`\`\`
    className="group card shadow-lg bg-base-300 border border-base-300 hover:shadow-xl hover:scale-105 transition-transform duration-200"
    \`\`\`
    
    It's all just CSS, man. Want to see my "actual" CSS file? Check this out:
    
    \`\`\`
    @import "tailwindcss";

    @plugin "daisyui" {
      themes: light --default, dark, abyss, aqua, business, coffee, cyberpunk, dim --prefersdark, dracula, forest, halloween, luxury, night, retro, sunset, synthwave;
    }
    \`\`\`
    
    That's it. All styling is inline for me. At first I thought I was biting off more than I could chew, but now that I understand it a little better, Tailwind is pretty slick. It makes CSS a lot easier to maintain. I'm so pleased with Tailwind that I haven't even used a single MaterialUI asset. I'll probably remove the libraries if I don't use it soon.
    
    The major block of the week was getting a prop to properly drill down to two different components. I was trying to get the cards on the home and how-it-works page to render the way I want them to. The home page has three cards, the howto page has four. I got the cards to render, but because I was using "grid" utility classes, if I told the grid to make four columns, the howto page would render correctly but the home page's cards were shoved off to the left because apparently a grid makes the columns even if there aren't enough cards to fill the row in. I spent hours upon hours trying to figure out how to make both pages render correctly. ChatGPT sent me on an infuriating goose chase. Finally I figured it out, no thanks to generative AI. I just drill a prop to each page and manually define the CSS on those pages:
    
    \`\`\`
      return (
    <PageTemplate
      bodyProps={{
        pageSubTitle,
        boxes,
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-18"
      }}
      headerLinks={headerLinks}
    />
  )
}
\`\`\`
and
\`\`\`
  return (
    <>
      <PageTemplate
        bodyProps={{
          pageFlavorText: 'So you want to be a PMP...',
          pageTitle: 'Welcome to the Darn Fine PMP Quiz App!',
          pageSubTitle: 'Learn about the PMP certification exam and take our fabulous quizzes!',
          boxes,
          showQuizButton: true,
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-18"
        }}
        headerLinks={headerLinks}
      />
      <JsonReformatter />
    </>
  )
}
\`\`\`

It was nice to finally figure it out but annoying it took so long for such an easy fix. I guess that's coding for you.`
  },
  {
    title: 'Some Thoughts on the Project',
    date: '05 Feb 2025',
    content: `I am not a coder. It's not that I am incapabale of being one, I just don't have any experience doing it....ever. So this journey I am on is fun, interesting, and infuriating all at the same time. I like coding, but small things really bug me. For instance, I have the hardest time discerning what is a built term and what is user defined. For example:
    
    \`\`\`
    const headerLinks = links.map((link, index) => (
    <Link key={index} to={link.to} className="hover:text-purple-400">
      {link.text}
    </Link>
    ))
    \`\`\`

    "links.map"...the "map" portion is a built in function. However, "{link.text}", both the "link" and "text" are user defined. This may seem like a silly thing to get blocked on, but it happens to me a lot, especially with terms I have never seen before. Another thing, I don't know the lingo around here. I get the names of things mixed up constantly. Componenets, variables, elements, and so on....What are they? Sometimes I know, other times I am not so sure. I feel like I don't have a strong foundation in coding as a whole and I'm grasping at whatever straws I can find as I muddle my way through this project.

    I upgraded TailwindCSS to 4.0 and DaisyUI to 5.0beta. Supposedly this will lead to smaller file sizes and less dependencies, which is good. The website still functions so it appears I upgraded them correctly.`
  },
  {
    title: 'Refactor Day',
    date: '03 Feb 2025',
    content: `Today was a snow day at school, even though I found out later that class still happened. In any case I used today as a refactor day. The majority of the refactor was meant to make the code more readable, maintainable, and scalable. It mostly involved splitting out components from each other. I split out things like svg icons from the rest of the header, basically giving every element it's own component. That's probably overkill, but at least this way if I want to extend or reuse any component, it should be easier this way.
    
    Another major refactor task was passing some component props as children for ease of use and to see if I could do it. It wasn't that bad, but it is easy for me to get wrapped around the axle regarding the syntax sometimes.
    
    I learned what "hoisted" means in JavaScript. If a variable is "hoisted" you can call it before it is defined. Non-hoisted variables must be defined before being called.
    
    I also learned that when ReactJS is in "Strict Mode", components run twice on a dev server, but only once in production. I disscovered this when I was console logging a component and saw that it kept running twice even though it is called once in the code. Googled it, and discovered the reason. To test this, I turned off Strict Mode and the component did indeed run only once on the dev server.`
  },
  {
    title: 'Let\'s Create Some Context!',
    date: '01 Feb 2025',
    content: `I implemented a leaderboard that persists between app reloads. Then I realized that since the score storage is client-side, anyone using a different device, or even a different browser on the same device, will never see another player's scores. That player will be the only player that populates the leaderboard. I think that's correct, anyway. I told the code to send the scores to a file called, "leaderboardscores.json", but I don't know where that file is. I poked around, and I still don't know where the actual data goes. It does persist through app reloads, but I have no idea where it lives. the documentation for "localStorage" says it has a limit of 10MB, but I don't plan to use more than that for now, not until we start working on backend support. According to AI, the user data is kept in the browser under the name "localStorage" with a key of "leaderboardscores.json". I am going to leave that for now, since it hints at future scalability. Upon further inquiry, AI lead me to the "Storage" section of my browser's dev tools where, in fact, there is a data object with the key value of JSON file name. This confirms my suspicion that only the local user will ever populate the leaderboard with this set up. Also a front-end only environment cannot write directly to a file on the local file system. I assume this is a security measure to prevent bad actors from writing arbitrary code willy-nilly all over your workstation.
    
    [IMAGE]

    And that my friends is why we use backend support!

    While I was trying to get the above image to render, I learned about "trimming" a section. React can get confused when I use a placeholder like "IMAGE" when there is surrounding whitespace. I still don't understand why whitespace is an issue but this fixed it:
    
    \`\`\`
    section = section.trim()
    \`\`\`

    Except it didn't fix it because the fix somehow broke my "dangerouslyInnerHTML" formatting, which broke my paragraph spacing. So instead I started over and just imported the image into the template file, and mapped it over each blog entry. It works now, and I can easily add more images in this manner in the future.

    Learned about a new function today, "createContext". in order to understand what this function does, I have to know what "context" is.  From what I can discern, "context" allows you to access global data without prop drilling. So, it's like a global variable I guess? It bypasses the prop drilling process and make data available to all components that need it. I guess my quesiton is, why don't just use "context" all the time then? The answer is that it is inefficient if you just need to pass one or two props up the chain. Also, rapid changes in state could cause "context" to slow things down. The use of "context" is better suited for global data like themes, language settings, authentication, and so on.`
  },
  {
    title: 'Level 3 Skills Lab Preps, State, and Effect',
    date: '29 Jan 2025',
    content: `Got the Level 3 Skills video done and uploaded for lab tonight. I have already used 'useState' in my project, but I feel like I have a slightly better grasp on how it works. 'useEfect' is new to me, and I'm struggling with its function. At first glance, it looks like it waits to run a function until after an external data source executes. I haven't done research on it, but based on my experience in making the video, that's what it seems to do. I'm sure I am either wrong or I don't have a full grasp on what it does.
    
    As for "state", I have incorporated it into rendering the accorion effect for this blog:

    \`\`\`
    const [isExpanded, setIsExpanded] = useState(false)

    ...

    <button
      className="btn btn-accent mt-4" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'See Less' : 'See More'}
    </button>

    \`\`\`
    I use state to toggle the accordion being expanded or not. I actually use 'useEffect' in my quiz app project. I use it to set up the different domain quizzes. AI wrote most of it, but looking at it myself, I can start to kind of see what the logic is doing:

    \`\`\`
    useEffect(() => {
        let filteredQuestions

        if (domain === 'people') {
          filteredQuestions = questions.filter(q => q.domain === 'People')
        } else if (domain === 'process') {
          filteredQuestions = questions.filter(q => q.domain === 'Process')
        } else if (domain === 'business') {
          filteredQuestions = questions.filter(q => q.domain === 'Business Environment')
        } else {
          filteredQuestions = [...questions]
        }

        setQuizQuestions(shuffleArray(filteredQuestions))
      }, [domain])

    \`\`\`
    I believe the component reads the "domain" field in the JSON and only pulls from the requested question subset. I think '.filter' is a premade function that I'd like to learn more about.

    Other than that, things are going well. I need to keep working on adding to the backlog and keeping my Trello board up to date.`,
  },
  {
    title: 'Big Update',
    date: '28 Jan 2025',
    content: `I'm bad at making regular log entries. I'm going through my backlog, which hasn't been maintained either, and notice that a lot of it is nearing completion or is complete. That's not good if I am trying to simulate the Agile process this quarter. I need more backlog! I'll address each backlog item with updates:
    __**Page Navigation:**__
    I installed the React Router, and most links work on each page. I still need to flesh out some of the other auxiliary pages, but the home page and individual domain pages are accessible.
    __**Question Randomization Logic:**__
    The logic is looking pretty good. Users can select individual domain exams or can test on all questions. Also, scores are tallied, but do not persist between quiz sessions. Questions are given in random order with each new session/page refresh.
    __**Responsive Design for Desktop & Mobile Usability:**__
    I am concentrating on desktop at the moment, will address mobile later.
    __**Leaderboard Functionality:**__
    No progress.
    __**Instant Feedback for Quiz Questions:**__
    Instant feedback is implemented. The app will tell you if you got the question right or wrong and why. Red card for wrong answer, green card for correct answer.
    __**Scorekeeping Functionality:**__
    Implemented in the session. Nothing persistent yet.
    __**UX/UI:**__
    Being developed in parallel with quiz functionality. Site looks...decent. Refinements needed.
    __**Question Collection:**__
    80 out of 150 questions collected.`,
  },
  {
    title: 'Getting Cozy With the Code',
    date: '22 Jan 2025',
    content: `Not too much happened, actually. Well, I tried to make this blog fancy by trying to implement a form that I could fill out to autopopulate the blog entries. Another idea is using something like Zapier to link my commit comments to my blog entries. I tried creating the form, got frustrated, cried, and then just found some pre-made components to use for now. I'll revisit those two options later.
    As for the quiz app project. It's moving ahead. I started on all the links to all the other pages using the React router. After seeing how I am implementing the links, I'm sure there is a way to refactor them. I'm trying to identify potential refactors as they occur. I think that's in keeping with the spirit of Agile. The next big thing with the quiz app is constructing the quiz logic. That might take a while. That, along with bug squashing and bringing up the UX/UI in parallel with the code, is keeping me busy.`,
  },
  {
    title: 'Picking Up Some Tailwind',
    date: '16 Jan 2025',
    content: `I've learned quite a bit about TailwindCSS today. I needed to in order how to figure out how to add links to the props on each page. Also, got the React router up and running. After some head scratching and research, I successfully added a link between the home and people pages. There was much rejoicing. One thing I discovered that I thought was really interesting, was a very elegant way (until it breaks) to only render cards that have content in them. I tried ternaries, a vanilla JS function; all of them repetitive and clunky. Then I found a two liner:
    \`\`\`
    File: pagetemplate.jsx
    [Line 71]
    const boxesToRender = boxes.filter((box) => box.title)

    and

    [Line 89]
    {boxesToRender.map((item, index) => (
     \`\`\`

    These two lines effectively block any cards from rendering that have an empty string in the card title. This makes it possible to add or subtract cards with ease on each page independently. Pretty neat.

    Also learned about "spreading operators". They make mapping props so much simpler.

    \`\`\`
    <HeaderTemplate {...props} />
    <BodyTemplate {...props} />
    \`\`\`

    _"The provided code snippet is part of a React component in the pagetemplate.jsx file. It renders two components, HeaderTemplate and BodyTemplate, and passes all the props received by the parent component to these child components using the spread operator ({...props})."_
    Got 50 high quality PMP practice questions both in plain text and JSON format. Thanks to David McLachlan for supplying them.
    Found a dark mode/purple TailwindCSS template to use for the main pages of the app. Dark background with purple components.
    Depending on screen size and resolution, the Tailwind components don't cover the entire screen. I wonder if the CSS puts a limit on the component size?`,
  },
  // Add more entries here
]