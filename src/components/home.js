import React from "react";
import "../App.css";

export const Home = ({ showSearchPage, setShowSearchpage, shelves, setShelves, bookRack, setBookRack }) => {

  const handleOnSelect = (e , bookId) => {
    let existingRack = bookRack[bookId];
    let _shelves = {...shelves};
    let _bookRack = {...bookRack};
    let book = _shelves[existingRack].find((b) => b.id === bookId);
    _shelves[existingRack] = _shelves[existingRack].filter((b) => b.id !== bookId);
    if(e.target.value !== 'none') {
      if (!_shelves[e.target.value]) _shelves[e.target.value] = [];
      _shelves[e.target.value].push(book);
      _bookRack[bookId] = e.target.value;
    } else {
      delete _bookRack[bookId];
    }
    setBookRack(_bookRack);
    setShelves(_shelves);
  }

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
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage:
                            `url(${book.image})`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select value={bookRack[book.id]} onChange={(e) => handleOnSelect(e, book.id)}>
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
                    <div className="book-authors">{book.authors?.map((author, index) => <React.Fragment key={index}>{author}<br/></React.Fragment>)}</div>
                  </div>
                </li>) : 'No books available'}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {shelves['wantToRead'] && shelves['wantToRead'].length > 0 ? shelves['wantToRead'].map((book, index) => <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage:
                            `url(${book.image})`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select value={bookRack[book.id]} onChange={(e) => handleOnSelect(e, book.id)}>
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
                    <div className="book-authors">{book.authors?.map((author, index) => <React.Fragment key={index}>{author}<br/></React.Fragment>)}</div>
                  </div>
                </li>) : 'No books available'}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {shelves['read'] && shelves['read'].length > 0 ? shelves['read'].map((book, index) => <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage:
                            `url(${book.image})`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select value={bookRack[book.id]} onChange={(e) => handleOnSelect(e, book.id)}>
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
                    <div className="book-authors">{book.authors?.map((author, index) => <React.Fragment key={index}>{author}<br/></React.Fragment>)}</div>
                  </div>
                </li>) : 'No books available'}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
      </div>
    </div>
  )
}