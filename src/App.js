import React from "react";

import Counter from "./components/Counter";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>React Tally Counter</h3>
      </header>
      <main>
        <Counter />
      </main>
    </div>
  );
}

export default App;
