import React, { useEffect } from "react";
import "../App.css";

export const Book = (props) => {
  const { shelves, book, bookRack, handleOnSelect } = props

  return (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage:
            `url(${book.imageLinks?.thumbnail})`,
        }}
      ></div>
      <div className="book-shelf-changer">
        <select value={bookRack[book.id]} onChange={(e) => handleOnSelect(e, book.id, shelves[bookRack[book.id]])}>
          <option value="none" disabled>
            Move to...
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
    <div className="book-authors">{book.authors?.join(', ')}</div>
  </div>)
}