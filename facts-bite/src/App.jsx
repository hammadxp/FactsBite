function App() {
  return (
    <header class="p-6">
      <div class="flex items-center">
        <img src="logo.png" alt="FactsBite logo" class="h-12" />
        <h1 class="ml-4 text-2xl font-bold">FactsBite</h1>
        <button class="btn-add-new btn-gradient ml-auto">Share a fact</button>
      </div>

      <form
        action=""
        class="form-el mb-4 mt-6 flex hidden items-center gap-4 rounded-lg bg-slate-700 p-3 text-slate-900"
      >
        <input type="text" placeholder="Share a fact with the world" class="form-item w-full" />
        <span class="text-slate-50">200</span>

        <input type="text" placeholder="Trustworthy source" class="form-item" />
        <select name="" id="" class="form-item">
          <option value="">Choose category</option>
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="finance">Finance</option>
        </select>
        <button class="btn-gradient">Post</button>
      </form>
    </header>
  );
}

export default App;
