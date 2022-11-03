import React, { useState } from "react";
import "../App.css";
import { search } from '../BooksAPI';
import { useNavigate } from "react-router-dom";

export const SearchBook = ({ shelves, setShelves, bookRack, setBookRack, handleOnSelect }) => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const navigate = useNavigate();

  const onSearch = async (event) => {
    let response = await search(event.target.value, 50);
    if (response && !response?.error) {
      let _searchedBooks = response.map((res) => {
        return { authors: res.authors, id: res.id, title: res.title, image: res.imageLinks?.thumbnail } 
      });
      setSearchedBooks(_searchedBooks)
    } else {
      setSearchedBooks([]);
    }
  }

  return (
  <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => navigate('/')}
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
                <select value={bookRack[book.id]?? 'none'} onChange={(e) => handleOnSelect(e, book.id, searchedBooks)}>
                  <option disabled>
                    Add to...
                  </option>
                  <option value="currentlyReading">
                    Currently Reading
                  </option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
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