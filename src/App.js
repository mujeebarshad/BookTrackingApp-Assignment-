import "./App.css";
import React, { useState, useEffect } from "react";
import { SearchBook } from "./components/searchBook";
import { Home } from "./components/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAll, update, get } from "./BooksAPI";

const App = () => {

  const [shelves, setShelves] = useState({});
  const [bookRack, setBookRack] = useState({});

  useEffect(async () => {
    let response = await getAll();
    let _shelves = {};
    let _bookRack = {...bookRack};
    response?.forEach((book) => {
      if(!_shelves[book.shelf]) _shelves[book.shelf] = [];
      _shelves[book.shelf].push(book);
      _bookRack[book.id] = book.shelf;
    });
    setBookRack(_bookRack);
    setShelves(_shelves);
  }, []);


  const handleOnSelect = async (e, bookId, rackTosearch) => {
    let book = rackTosearch.find((book) => book.id === bookId);
    let existingRack = bookRack[bookId];
    let _bookRack = {...bookRack};
    let target = e.target.value;
    let response = await update(book, target);
    if (response && !response.error) {
      let _shelves = {...shelves};
      _shelves[existingRack] = _shelves[existingRack]?.filter((b) => b.id !== bookId);
      if(target !== 'none') {
        if (!_shelves[target]) _shelves[target] = [];
        book = await get(bookId);
        _shelves[target].push(book);
        _bookRack[book.id] = target;
      } else {
        delete _bookRack[bookId];
      }
      setBookRack(_bookRack);
      setShelves(_shelves);
    }
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home shelves={shelves} setShelves={setShelves} bookRack={bookRack} setBookRack={setBookRack} handleOnSelect={handleOnSelect} />}/>
          <Route path="/search" element={<SearchBook shelves={shelves} setShelves={setShelves} bookRack={bookRack} setBookRack={setBookRack} handleOnSelect={handleOnSelect} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
