import { useEffect, useState } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar";
import Page from "./components/Page";

function App() {
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    window.alert(
      "Please note that the dashboard is for demonstration purpose only. It DOES NOT contain all the rows (computer scientists) or all the columns (attributes)."
    );
  }, []);

  return (
    <div>
      <SearchBar onSubmit={setSelected} />
      <Page id={selected} />
    </div>
  );
}

export default App;
