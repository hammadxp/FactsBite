function App() {
  return (
    <>
      <div className="mx-auto h-[40rem] max-w-7xl">
        <Header />

        <main className="grid grid-cols-[16rem,1fr]">
          <SideBar />

          <section className="p-8">
            <TagsRow />
            <FactsList />
          </section>
        </main>
      </div>
    </>
  );
}

// Header

function Header() {
  const headerTitle = "FactsBite";

  return (
    <header className="p-6">
      <div className="flex items-center">
        <img src="logo.png" alt="FactsBite logo" className="h-12" />
        <h1 className="ml-4 text-2xl font-bold">{headerTitle}</h1>
        <button className="btn-gradient ml-auto" id="btn-add-new">
          Share a fact
        </button>
      </div>

      <Form />
    </header>
  );
}

function Form() {
  return (
    <form action="" className="mb-4 mt-6 flex hidden items-center gap-4 rounded-lg bg-slate-700 p-3 text-slate-900">
      <input type="text" placeholder="Share a fact with the world" className="form-item w-full" />
      <span className="text-slate-50">200</span>

      <input type="text" placeholder="Trustworthy source" className="form-item" />
      <select name="" id="" className="form-item">
        <option value="">Choose category</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option>
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
    <ul className="mb-6 flex gap-2" id="tags-row">
      <li>
        <button className="btn-gradient">All</button>
      </li>
      <li>
        <button className="btn-tag bg-[#3b82f6]">Technology</button>
      </li>
      <li>
        <button className="btn-tag bg-[#16a34a]">Science</button>
      </li>
    </ul>
  );
}

function FactsList() {
  return (
    <ul className="font-Sono" id="facts-list">
      <li className="fact-item">
        <p>
          React is being developed by Meta (formerly facebook)
          <a href="https://opensource.fb.com/" target="_blank" className="fact-source">
            (Source)
          </a>
          <span className="tag-small bg-[#3b82f6]">technology</span>
        </p>

        <VoteButtons />
      </li>
    </ul>
  );
}

function VoteButtons() {
  return (
    <div className="ml-auto flex min-w-max max-w-fit gap-2">
      <button className="btn-vote">
        👍 <span className="font-bold">25</span>
      </button>
      <button className="btn-vote">
        🤯 <span className="font-bold">10</span>
      </button>
      <button className="btn-vote">
        ⛔️ <span className="font-bold">4</span>
      </button>
    </div>
  );
}

export default App;
