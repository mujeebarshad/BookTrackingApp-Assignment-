import React, { useState } from "react";
import "../App.css";
import { search } from '../BooksAPI';

export const SearchBook = ({ showSearchPage, setShowSearchpage, shelves, setShelves, bookRack, setBookRack }) => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const onSearch = async (event) => {
    if (event.key === 'Enter') {
      let response = await search(event.target.value, 50);
      let _searchedBooks = response.map((res) => {
        return { authors: res.authors, id: res.id, title: res.title, image: res.imageLinks?.thumbnail } 
      });
      setSearchedBooks(_searchedBooks)
    }
  }

  const handleOnSelect = (event, bookId) => {
    let book = searchedBooks.find((book) => book.id === bookId);
    let _shelves = {...shelves};
    if (!_shelves[event.target.value]) _shelves[event.target.value] = [];
    _shelves[event.target.value].push(book);
    let _bookRack = bookRack;
    _bookRack[book.id] = event.target.value;
    setBookRack(_bookRack);
    setShelves(_shelves);
  }

  return (
  <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => setShowSearchpage(!showSearchPage)}
      >
        Close
      </a>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onKeyDown={onSearch}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {searchedBooks.map((book, index) => {
          return <li key={index} ><div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.image})`
                }}
              ></div>
              <div className="book-shelf-changer">
                <select value={bookRack[book.id]?? 'none'} onChange={(e) => handleOnSelect(e, book.id)}>
                  <option value="none" disabled>
                    Add to...
                  </option>
                  <option value="currentlyReading">
                    Currently Reading
                  </option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors?.map((author, index) => <React.Fragment key={index}>{author}<br/></React.Fragment>)}</div>
          </div></li>
        })}
      </ol>
    </div>
  </div>);
}