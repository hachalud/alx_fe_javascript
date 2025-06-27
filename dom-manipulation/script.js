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
