import "./App.css";
import React, { useState } from "react";
import { SearchBook } from "./components/searchBook";
import { Home } from "./components/home";

const App = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [shelves, setShelves] = useState({});
  const [bookRack, setBookRack] = useState({});

  return (
    <div className="app">
      {showSearchPage ? <SearchBook showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage} shelves={shelves} setShelves={setShelves} bookRack={bookRack} setBookRack={setBookRack} /> : <Home showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage} shelves={shelves} setShelves={setShelves} bookRack={bookRack} setBookRack={setBookRack} />
      }
    </div>
  );
}

export default App;
