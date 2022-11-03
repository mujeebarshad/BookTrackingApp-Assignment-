import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Book } from "./book";

export const Home = ({ shelves, setShelves, bookRack, setBookRack, handleOnSelect }) => {

  const navigate = useNavigate();

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {shelves['currentlyReading'] && shelves['currentlyReading'].length > 0 ? shelves['currentlyReading'].map((book, index) => <li key={index}>
                  <Book book={book} bookRack={bookRack} handleOnSelect={handleOnSelect} shelves={shelves} />
                </li>) : 'No books available'}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {shelves['wantToRead'] && shelves['wantToRead'].length > 0 ? shelves['wantToRead'].map((book, index) => <li key={index}>
                  <Book book={book} bookRack={bookRack} handleOnSelect={handleOnSelect} shelves={shelves} />
                </li>) : 'No books available'}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {shelves['read'] && shelves['read'].length > 0 ? shelves['read'].map((book, index) => <li key={index}>
                  <Book book={book} bookRack={bookRack} handleOnSelect={handleOnSelect} shelves={shelves} />
                </li>) : 'No books available'}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => navigate('/search')}>Add a book</a>
      </div>
    </div>
  )
}