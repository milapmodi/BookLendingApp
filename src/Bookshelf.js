import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

function Bookshelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.length === 0 && (
            <h3>(empty bookshelf)</h3>
          )}

          {props.books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                books={props.books}
                handleBookMove={props.handleBookMove}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  handleBookMove: PropTypes.func.isRequired
};

export default Bookshelf;
