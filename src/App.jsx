import { useEffect, useState } from "react";
import supabase from "./supabase";

const categories = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votes_interesting: 24,
    votes_mindblowing: 9,
    votes_negative: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source: "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votes_interesting: 11,
    votes_mindblowing: 2,
    votes_negative: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votes_interesting: 8,
    votes_mindblowing: 3,
    votes_negative: 1,
    createdIn: 2015,
  },
];

//

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [facts, setFacts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function loadFacts() {
        setIsLoading(true);

        // Build query string

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all") {
          query.eq("category", currentCategory);
        }

        query.order("votes_interesting", { ascending: false }).limit(1000);

        // Load facts

        const { data: facts, error } = await query;

        if (!error) {
          setFacts(facts);
        } else {
          alert("There was a problem loading the facts.");
        }

        setIsLoading(false);
      }
      loadFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header formVisibility={formVisibility} setFormVisibility={setFormVisibility} setFacts={setFacts} />

      <main className="mx-auto grid grid-cols-[2fr,8fr] gap-2 1200px:grid-cols-[1fr,8fr] 704px:gap-4">
        <SideBar />

        <section
          className="mb-2 h-[calc(100vh-104px)] overflow-x-hidden overflow-y-scroll rounded-lg bg-gray-800 p-8 pt-4 704px:px-4"
          id="facts-container"
        >
          <CategoriesRow setCurrentCategory={setCurrentCategory} />
          {isLoading ? <LoadingSpinner /> : <FactsList facts={facts} setFacts={setFacts} />}
        </section>
      </main>
    </>
  );
}

// ### HEADER ###

function Header({ formVisibility, setFormVisibility, setFacts }) {
  const headerTitle = "FactsBite";

  return (
    <header className="p-6">
      <div className="flex items-center">
        <img src="logo.png" alt="FactsBite logo" className="h-12" />
        <h1 className="ml-4 text-2xl font-bold">{headerTitle}</h1>
        <button className="btn-gradient ml-auto" onClick={() => setFormVisibility((current) => !current)}>
          {formVisibility ? "Close" : "Share a fact"}
        </button>
      </div>

      {formVisibility ? <Form setFormVisibility={setFormVisibility} setFacts={setFacts} /> : null}
    </header>
  );
}

function Form({ setFormVisibility, setFacts }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const textMaxLimit = 200;

  // Form Submission

  async function handleSubmit(e) {
    // 01. Prevent reload
    e.preventDefault();

    // 02. Make sure data is valid
    if (text && source && category && text.length <= 200) {
      /*
      // 03. Create new fact object
      const newFact = {
        id: Math.round(Math.random() * 100000),
        text,
        source,
        category,
        votes_interesting: 0,
        votes_mindblowing: 0,
        votes_negative: 0,
        createdIn: new Date().getFullYear(),
      };
      */

      // 03. Upload fact to supabase
      setIsUploading(true);

      const { data: newFact, error } = await supabase.from("facts").insert([{ text, source, category }]).select();

      setIsUploading(false);

      // 04. Add new fact to the state (which will update the UI)
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 05. Reset form values
      setText("");
      setSource("");
      setCategory("");

      // 06. Close the form
      setFormVisibility(false);
    }
  }

  return (
    <form
      className="mb-4 mt-6 flex items-center gap-4 rounded-lg bg-gray-800 p-3 text-slate-900 950px:mx-auto 950px:max-w-2xl 950px:flex-col 950px:gap-6 950px:px-4 950px:py-6"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Share a fact with the world"
        className="form-item w-full"
        value={text}
        disabled={isUploading}
        onChange={(e) => setText(e.target.value)}
      />
      <span className="text-slate-50">{textMaxLimit - text.length}</span>
      <input
        type="url"
        placeholder="Trustworthy source"
        className="form-item 950px:w-full"
        value={source}
        disabled={isUploading}
        onChange={(e) => setSource(e.target.value)}
      />

      <select
        className="form-item"
        value={category}
        disabled={isUploading}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Choose category</option>
        {categories.map((category) => (
          <option value={category.name} key={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn-gradient" style={isUploading ? { cursor: "not-allowed" } : {}}>
        Post
      </button>
    </form>
  );
}

// ### MAIN ###

// Sidebar

function SideBar() {
  return (
    <nav className="rounded-lg p-4 950px:px-2 704px:px-0" id="sidebar">
      <ul>
        <li>
          <a href="#" className="sidebar-item sidebar-item-active ">
            <p>👍</p>
            <p className="1200px:hidden">Interesting</p>
          </a>
        </li>
        <li>
          <a href="#" className="sidebar-item">
            <p>🤯</p>
            <p className="1200px:hidden">Mind-blowing</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}

// Categories row

function CategoriesRow({ setCurrentCategory }) {
  return (
    <ul className="mb-6 flex gap-2 overflow-x-scroll pt-[6px]" id="categories-row">
      <li>
        <button className="btn-gradient" onClick={() => setCurrentCategory("all")}>
          All
        </button>
      </li>

      {categories.map((category) => (
        <li key={category.name}>
          <button
            className="btn-category"
            style={{ backgroundColor: category.color }}
            onClick={() => setCurrentCategory(category.name)}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Facts list

function FactsList({ facts, setFacts }) {
  return (
    <>
      <ul className="font-Sono" id="facts-list">
        {facts.map((fact) => (
          <Fact fact={fact} setFacts={setFacts} key={fact.id} />
        ))}
      </ul>

      <TotalFacts facts={facts} />
    </>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votes_negative > fact.votes_interesting + fact.votes_mindblowing;

  async function handleVote(columnName) {
    setIsUpdating(true);

    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();

    if (!error) setFacts((facts) => facts.map((curFact) => (curFact.id === fact.id ? updatedFact[0] : curFact)));

    setIsUpdating(false);
  }

  return (
    <li
      className="mb-4 flex cursor-default items-center gap-2 rounded-lg border-b-2 border-slate-600 bg-gray-700 px-6 py-4 duration-200 hover:-translate-y-1 hover:shadow-md 1200px:flex-col"
      id="fact-item"
    >
      <div className="1200px:mb-2 1200px:w-full">
        {isDisputed ? <span className="mr-2 font-bold text-red-700">[⛔️DISPUTED]</span> : null}
        <p className="inline 500px:block">{fact.text}</p>

        <a
          href={fact.source}
          target="_blank"
          className="mx-2 text-slate-400 hover:text-inherit 500px:ml-0"
          id="fact-source"
        >
          (Source)
        </a>
        <span
          className="h-fit rounded-full px-3 py-1 text-xs font-semibold uppercase"
          id="category-tag"
          style={{
            backgroundColor: categories.find((category) => category.name === fact.category).color,
          }}
        >
          {fact.category}
        </span>
      </div>

      <div className="ml-auto flex min-w-max max-w-fit gap-2">
        <button
          className="btn-vote"
          style={isUpdating ? { cursor: "not-allowed" } : {}}
          onClick={() => handleVote("votes_interesting")}
        >
          👍 <span className="font-bold">{fact.votes_interesting}</span>
        </button>

        <button
          className="btn-vote"
          style={isUpdating ? { cursor: "not-allowed" } : {}}
          onClick={() => handleVote("votes_mindblowing")}
        >
          🤯 <span className="font-bold">{fact.votes_mindblowing}</span>
        </button>

        <button
          className="btn-vote"
          style={isUpdating ? { cursor: "not-allowed" } : {}}
          onClick={() => handleVote("votes_negative")}
        >
          ⛔️ <span className="font-bold">{fact.votes_negative}</span>
        </button>
      </div>
    </li>
  );
}

function TotalFacts({ facts }) {
  if (facts.length === 0) {
    return (
      <div className="pt-4 font-Sono 500px:text-xs">
        <span className="block text-center">
          There are no facts for this category right now. Try adding one yourself 🙂
        </span>
      </div>
    );
  }

  return (
    <div className="pt-4 font-Sono 500px:text-xs">
      <span className="block text-center">There are currently {facts.length} facts for this category.</span>
    </div>
  );
}

// Test

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span className="px-4">{count}</span>
      <button className="btn" onClick={() => setCount((current) => current + 1)}>
        +1
      </button>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex h-96 items-center justify-center font-Sono">
      <span className="text-4xl 704px:text-2xl 500px:text-xl">Interesting facts incoming...</span>
    </div>
  );
}

export default App;
