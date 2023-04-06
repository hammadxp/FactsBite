// import "./tailwind.css";

function App() {
  return (
    <header className="p-6">
      <div className="flex items-center">
        <img src="logo.png" alt="FactsBite logo" className="h-12" />
        <h1 className="ml-4 text-2xl font-bold">FactsBite</h1>
        <button className="btn-add-new btn-gradient ml-auto">Share a fact</button>
      </div>

      <form
        action=""
        className="form-el mb-4 mt-6 flex hidden items-center gap-4 rounded-lg bg-slate-700 p-3 text-slate-900"
      >
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
    </header>
  );
}

export default App;
