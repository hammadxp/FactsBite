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

const btnAddNew = document.querySelector(".btn-add-new");
const formEl = document.querySelector(".form-el");
const factsListEl = document.querySelector(".facts-list-el");

// Event listeners

btnAddNew.addEventListener("click", function () {
  if (formEl.classList.contains("hidden")) {
    formEl.classList.remove("hidden");
    btnAddNew.textContent = "Close";
  } else {
    formEl.classList.add("hidden");
    btnAddNew.textContent = "Share a fact";
  }
});

// Helper functions

const renderFactsList = function (facts) {
  factsListEl.innerHTML = "";

  factsListEl.insertAdjacentHTML(
    "beforeend",
    `
      ${facts
        .map(
          (fact) => `
            <li class="fact-item">
              <p>
                ${fact.text}
                <a href="${fact.source}" target="_blank" class="fact-source">(Source)</a>
                <span class="tag-small" style="background-color: ${
                  categories.find((category) => category.name === fact.category).color
                }">
                ${fact.category}</span>
              </p>
              <div class="ml-auto min-w-max max-w-fit">
                <button class="btn-interact">👍 <span class="font-bold">${fact.votes_interesting}</span></button>
                <button class="btn-interact">🤯 <span class="font-bold">${fact.votes_mindblowing}</span></button>
                <button class="btn-interact">⛔️ <span class="font-bold">${fact.votes_negative}</span></button>
              </div>
            </li>
          `
        )
        .join("")}
    `
  );
};

// ############################################# //

// Render facts

// renderFactsList(initialFacts);

// Load and render facts from Supabase

const loadFacts = async function () {
  const res = await fetch("https://lwhwscufycyvuowefoph.supabase.co/rest/v1/facts", {
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3aHdzY3VmeWN5dnVvd2Vmb3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1OTM4NTIsImV4cCI6MTk5NjE2OTg1Mn0.2NvwzVI-p15qIov9Q-y2974Dm05HEEntpx2S3durkTs",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3aHdzY3VmeWN5dnVvd2Vmb3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1OTM4NTIsImV4cCI6MTk5NjE2OTg1Mn0.2NvwzVI-p15qIov9Q-y2974Dm05HEEntpx2S3durkTs",
    },
  });
  const data = await res.json();

  renderFactsList(data);
};

loadFacts();
