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

  useEffect(function () {
    async function loadFacts() {
      setIsLoading(true);

      const { data: facts, error } = await supabase
        .from("facts")
        .select("*")
        .order("votes_interesting", { ascending: false })
        .limit(1000);
      setFacts(facts);

      setIsLoading(false);
    }
    loadFacts();
  }, []);

  return (
    <>
      <Header formVisibility={formVisibility} setFormVisibility={setFormVisibility} setFacts={setFacts} />

      <main className="grid grid-cols-[16rem,1fr]">
        <SideBar />

        <section className="overflow-x-hidden p-8 pt-4">
          <TagsRow />
          {isLoading ? <LoadingSpinner /> : <FactsList facts={facts} />}
        </section>
      </main>
    </>
  );
}

// Header

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

  const textMaxLimit = 200;

  // Form Submission

  function handleSubmit(e) {
    // 01. Prevent reload
    e.preventDefault();

    // 02. Make sure data is valid
    if (text && source && category && text.length <= 200) {
      //
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

      // 04. Add new fact to the state (which will update the UI)
      setFacts((facts) => [newFact, ...facts]);

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
      className="mb-4 mt-6 flex items-center gap-4 rounded-lg bg-slate-700 p-3 text-slate-900"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Share a fact with the world"
        className="form-item w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span className="text-slate-50">{textMaxLimit - text.length}</span>
      <input
        type="url"
        placeholder="Trustworthy source"
        className="form-item"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <select className="form-item" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category</option>
        {categories.map((category) => (
          <option value={category.name} key={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn-gradient">Post</button>
    </form>
  );
}

// Main

function SideBar() {
  return (
    <nav className="p-4" id="sidebar">
      <ul>
        <li>
          <a href="#" className="sidebar-item sidebar-item-active">
            Popular
          </a>
        </li>
        <li>
          <a href="#" className="sidebar-item">
            Mind-blowing
          </a>
        </li>
      </ul>
    </nav>
  );
}

function TagsRow() {
  return (
    <ul className="mb-6 flex gap-2 overflow-x-scroll pt-[6px]" id="tags-row">
      <li>
        <button className="btn-gradient">All</button>
      </li>

      {categories.map((category) => (
        <li key={category.name}>
          <button className="btn-tag" style={{ backgroundColor: category.color }}>
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Facts list

function FactsList({ facts }) {
  return (
    <>
      <ul className="font-Sono" id="facts-list">
        {facts.map((fact) => (
          <Fact fact={fact} key={fact.id} />
        ))}
      </ul>

      <TotalFacts facts={facts} />
    </>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact-item">
      <p>
        {fact.text}
        <a href={fact.source} target="_blank" className="fact-source">
          (Source)
        </a>
        <span
          className="tag-small"
          style={{
            backgroundColor: categories.find((category) => category.name === fact.category).color,
          }}
        >
          {fact.category}
        </span>
      </p>

      <VoteButtons fact={fact} />
    </li>
  );
}

function VoteButtons({ fact }) {
  return (
    <div className="ml-auto flex min-w-max max-w-fit gap-2">
      <button className="btn-vote">
        👍 <span className="font-bold">{fact.votes_interesting}</span>
      </button>
      <button className="btn-vote">
        🤯 <span className="font-bold">{fact.votes_mindblowing}</span>
      </button>
      <button className="btn-vote">
        ⛔️ <span className="font-bold">{fact.votes_negative}</span>
      </button>
    </div>
  );
}

// Test

function TotalFacts({ facts }) {
  return (
    <div className="py-4 font-Sono">
      <span className="block text-center">There are currently {facts.length} facts in the database.</span>
    </div>
  );
}

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
      <span className="text-4xl">Interesting facts incoming...</span>
    </div>
  );
}

export default App;
