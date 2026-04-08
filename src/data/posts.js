const INITIAL_POSTS = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    category: "React",
    author: "Alex Rivera",
    date: "2025-03-10",
    excerpt:
      "Hooks changed everything about how we write React components. Let's explore useState, useEffect, and custom hooks from the ground up.",
    content: `React Hooks were introduced in React 16.8 and fundamentally changed how we write components. Before hooks, you needed class components to use state and lifecycle methods. Now, functional components can do everything.

**useState** lets you add state to functional components. You call it with an initial value and it returns a pair: the current state value and a function to update it.

**useEffect** replaces lifecycle methods like componentDidMount and componentDidUpdate. It runs after every render by default, but you can control when it runs using the dependency array.

**Custom hooks** are the real power of the hooks system. By extracting stateful logic into a function whose name starts with "use", you can reuse that logic across multiple components without changing their hierarchy.

The mental shift from class-based thinking to hooks-based thinking takes time, but once it clicks, you'll find your components become simpler, more readable, and easier to test.`,
    tags: ["react", "hooks", "javascript"],
    readTime: 5,
  },
  {
    id: 2,
    title: "Understanding the React Context API",
    category: "React",
    author: "Sam Okafor",
    date: "2025-03-15",
    excerpt:
      "Prop drilling is painful. Context API offers a clean solution for sharing state across your component tree without passing props through every level.",
    content: `The Context API solves a fundamental problem in React: how do you share data between components without passing props through every layer of your component tree?

**Creating context** is the first step. You use createContext() to create a context object, optionally passing a default value. This context object has two important components: Provider and Consumer.

**The Provider** wraps the part of your component tree that needs access to the context value. Any component inside the Provider can access the context value using useContext().

**useContext hook** is the modern way to consume context. Instead of wrapping your component in a Consumer component, you simply call useContext(YourContext) and you get the current value.

**When to use Context** is an important question. Context is great for data that can be considered "global" for a tree of components — things like the current authenticated user, theme, or preferred language.

Remember: Context is not a replacement for state management libraries like Redux or Zustand. For complex state with many updates and interactions, a dedicated state management solution might be more appropriate.`,
    tags: ["react", "context", "state-management"],
    readTime: 6,
  },
  {
    id: 3,
    title: "CSS Grid: A Complete Layout System",
    category: "CSS",
    author: "Jordan Kim",
    date: "2025-03-18",
    excerpt:
      "CSS Grid is the most powerful layout system available in CSS. It's a two-dimensional system that can handle both columns and rows.",
    content: `CSS Grid Layout is a two-dimensional layout system designed to solve the layout problems we've been hacking around since the dawn of the web. Floats, inline-blocks, and even flexbox — all one-dimensional solutions for fundamentally two-dimensional problems.

**Grid Container** is the element on which you apply display: grid. All direct children automatically become grid items.

**Grid Template Columns and Rows** let you define the structure of your grid. You can use fixed sizes, flexible fr units, auto, and the powerful repeat() function.

**Grid Lines** are the dividing lines that make up the structure of the grid. They can be referred to by number, or you can name them for more readable code.

**Grid Areas** let you name regions of your grid and then place items by name. Combined with grid-template-areas, this creates incredibly readable layout code.

**Auto Placement** handles items you don't explicitly place — Grid figures out where to put them using its auto-placement algorithm.

The minmax() function is incredibly useful: minmax(200px, 1fr) means "at least 200px wide, but can grow to fill available space." Combined with auto-fill or auto-fit, you get responsive grids with zero media queries.`,
    tags: ["css", "grid", "layout"],
    readTime: 8,
  },
  {
    id: 4,
    title: "Async/Await: Writing Cleaner Async Code",
    category: "JavaScript",
    author: "Alex Rivera",
    date: "2025-03-22",
    excerpt:
      "Promises were a huge improvement over callbacks, but async/await makes asynchronous code look and behave more like synchronous code.",
    content: `Asynchronous programming is fundamental to JavaScript, but it has historically been difficult to write and reason about. We went from callback hell, to promise chains, to the elegant async/await syntax we have today.

**Async functions** are functions declared with the async keyword. They always return a promise, even if you return a plain value from them — it gets automatically wrapped in a resolved promise.

**Await** can only be used inside async functions. It pauses execution until the promise settles and returns the result. If the promise rejects, it throws an error.

**Error handling** with async/await uses familiar try/catch/finally syntax instead of .catch() chains. This makes error handling much more intuitive.

**Parallel execution** is important to understand. If you use await multiple times sequentially on independent promises, you're running them serially. Use Promise.all() to run them in parallel and only await the combined result.

**Top-level await** is now available in ES modules, letting you use await directly at the top level of your modules without wrapping everything in an async function.

The key insight is that async/await is syntactic sugar over promises. Understanding promises deeply makes async/await much easier to use correctly.`,
    tags: ["javascript", "async", "promises"],
    readTime: 7,
  },
];

export default INITIAL_POSTS;
