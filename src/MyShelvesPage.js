import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Bookshelf from "./Bookshelf";

function MyShelvesPage(props) {
  const books = props.books;
  const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
  const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
  const read = books.filter((book) => book.shelf === 'read');

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            title="Currently Reading"
            books={currentlyReading}
            handleBookMove={props.handleBookMove}
          />
          <Bookshelf
            title="Want to Read"
            books={wantToRead}
            handleBookMove={props.handleBookMove}
          />
          <Bookshelf
            title="Read"
            books={read}
            handleBookMove={props.handleBookMove}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

MyShelvesPage.propTypes = {
  books: PropTypes.array.isRequired,
  handleBookMove: PropTypes.func.isRequired
};

export default MyShelvesPage;
