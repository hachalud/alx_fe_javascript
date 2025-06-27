const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    category: "Inspiration",
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    category: "Philosophy",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
      <p><strong>Quote:</strong> ${quote.text}</p>
      <p><strong>Category:</strong> ${quote.category}</p>
    `;
}

function createAddQuoteForm() {
  if (document.getElementById("quoteForm")) return;

  const form = document.createElement("form");
  form.id = "quoteForm";

  form.innerHTML = `
      <h3>Add a New Quote</h3>
      <label>Quote Text:<br>
        <textarea id="quoteText" rows="3" cols="40" required></textarea>
      </label><br><br>
      <label>Category:<br>
        <input type="text" id="quoteCategory" required>
      </label><br><br>
      <button type="submit">Add Quote</button>
    `;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = document.getElementById("quoteText").value.trim();
    const category = document.getElementById("quoteCategory").value.trim();
    if (text && category) {
      quotes.push({ text, category });
      form.reset();
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields.");
    }
  });

  document.body.appendChild(form);
}

newQuoteBtn.addEventListener("click", showRandomQuote);

createAddQuoteForm();


quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    category: "Inspiration",
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    category: "Philosophy",
  },
];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;

  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

window.onload = function () {
  const last = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (last) {
    quoteDisplay.innerHTML = `
      <p><strong>Last Viewed Quote:</strong> ${last.text}</p>
      <p><strong>Category:</strong> ${last.category}</p>
    `;
  }
};

function createAddQuoteForm() {
  if (document.getElementById("quoteForm")) return;

  const form = document.createElement("form");
  form.id = "quoteForm";

  form.innerHTML = `
    <h3>Add a New Quote</h3>
    <label>Quote Text:<br>
      <textarea id="quoteText" rows="3" cols="40" required></textarea>
    </label><br><br>
    <label>Category:<br>
      <input type="text" id="quoteCategory" required>
    </label><br><br>
    <button type="submit">Add Quote</button>
  `;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = document.getElementById("quoteText").value.trim();
    const category = document.getElementById("quoteCategory").value.trim();

    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      form.reset();
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields.");
    }
  });

  document.body.appendChild(form);
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (
        Array.isArray(importedQuotes) &&
        importedQuotes.every((q) => q.text && q.category)
      ) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert(
          "Invalid file format. Expected an array of quotes with text and category."
        );
      }
    } catch (error) {
      alert("Error reading JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

newQuoteBtn.addEventListener("click", showRandomQuote);
createAddQuoteForm();
const categoryFilter = document.getElementById("categoryFilter");

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

function populateCategories() {
  const selected = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.innerHTML = `<option value="all">All</option>`;
  const categories = [...new Set(quotes.map((q) => q.category))];
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === selected) option.selected = true;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  const filtered =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);
  if (filtered.length === 0) {
    quoteDisplay.innerHTML = `<p>No quotes in this category.</p>`;
  } else {
    quoteDisplay.innerHTML = filtered
      .map(
        (q) =>
          `<p><strong>Quote:</strong> ${q.text}<br><strong>Category:</strong> ${q.category}</p>`
      )
      .join("<hr>");
  }
}

function createAddQuoteForm() {
  if (document.getElementById("quoteForm")) return;
  const form = document.createElement("form");
  form.id = "quoteForm";
  form.innerHTML = `
    <h3>Add a New Quote</h3>
    <label>Quote Text:<br>
      <textarea id="quoteText" rows="3" cols="40" required></textarea>
    </label><br><br>
    <label>Category:<br>
      <input type="text" id="quoteCategory" required>
    </label><br><br>
    <button type="submit">Add Quote</button>
  `;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = document.getElementById("quoteText").value.trim();
    const category = document.getElementById("quoteCategory").value.trim();
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      form.reset();
      alert("Quote added successfully!");
      populateCategories();
      filterQuotes();
    } else {
      alert("Please fill in both fields.");
    }
  });
  document.body.appendChild(form);
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (
        Array.isArray(importedQuotes) &&
        importedQuotes.every((q) => q.text && q.category)
      ) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch (err) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

window.onload = function () {
  populateCategories();
  filterQuotes();
};

newQuoteBtn.addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", filterQuotes);
createAddQuoteForm();


async function fetchQuotesFromServer() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const data = await response.json();
  return data.map((item) => ({
    id: item.id,
    text: item.title,
    category: "Server",
  }));
}

async function postQuoteToServer(quote) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
  });
  const result = await response.json();
  return result;
}

function getLocalQuotes() {
  return JSON.parse(localStorage.getItem("quotes")) || [];
}

function saveToLocalQuotes(quotes) {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function notifyUser(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style =
    "background:#e0f7fa; border:1px solid #00acc1; padding:10px; margin:10px; color:#006064;";
  document.body.prepend(notification);
  setTimeout(() => notification.remove(), 5000);
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = getLocalQuotes();
  let updated = false;
  const mergedQuotes = [...localQuotes];

  serverQuotes.forEach((serverQuote) => {
    const localIndex = mergedQuotes.findIndex((q) => q.id === serverQuote.id);
    const localQuote = mergedQuotes[localIndex];

    if (!localQuote) {
      mergedQuotes.push(serverQuote);
      updated = true;
    } else if (localQuote.text !== serverQuote.text) {
      const userChoice = confirm(
        `Conflict for quote ID ${serverQuote.id}:\n\nLocal: "${localQuote.text}"\nServer: "${serverQuote.text}"\n\nClick OK to accept server version, Cancel to keep local.`
      );
      if (userChoice) {
        mergedQuotes[localIndex] = serverQuote;
        updated = true;
      }
    }
  });

  if (updated) {
    saveToLocalQuotes(mergedQuotes);
    displayQuotes(mergedQuotes);
    notifyUser("Quotes synced with server!");
  }
}

function displayQuotes(quotes) {
  const container = document.getElementById("quoteDisplay");
  container.innerHTML = "";
  quotes.forEach((q) => {
    const div = document.createElement("div");
    div.innerText = `"${q.text}" — ${q.category}`;
    div.style.margin = "8px 0";
    container.appendChild(div);
  });
}

async function addNewQuote() {
  const text = prompt("Enter new quote text:");
  if (!text) return;

  const newQuote = {
    text: text,
    category: "User",
  };

  const posted = await postQuoteToServer(newQuote);
  const localQuotes = getLocalQuotes();
  posted.category = "User";
  localQuotes.push(posted);
  saveToLocalQuotes(localQuotes);
  displayQuotes(localQuotes);
  notifyUser("New quote added and sent to server.");
}

function setupSyncSystem() {
  const initialQuotes = getLocalQuotes();
  displayQuotes(initialQuotes);
  syncQuotes();
  setInterval(syncQuotes, 30000);

  const syncBtn = document.getElementById("syncNow");
  if (syncBtn) {
    syncBtn.addEventListener("click", syncQuotes);
  }

  const addBtn = document.getElementById("addQuote");
  if (addBtn) {
    addBtn.addEventListener("click", addNewQuote);
  }
}

document.addEventListener("DOMContentLoaded", setupSyncSystem);


