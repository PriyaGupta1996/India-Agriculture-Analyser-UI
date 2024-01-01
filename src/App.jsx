"use client";

import { ErrorBoundary } from "react-error-boundary";
const { Dashboard } = require("./pages/Dashboard");

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Dashboard />
      </ErrorBoundary>
    </div>
  );
}

export default App;
