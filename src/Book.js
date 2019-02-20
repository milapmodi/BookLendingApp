import React from 'react';
import PropTypes from 'prop-types';

import BookshelfChanger from "./BookshelfChanger";

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover"
             style={{ width: 128,
               height: 193,
               backgroundImage: `url("${props.book.imageLinks && props.book.imageLinks.thumbnail}")`
             }}
        />
        <BookshelfChanger
          book={props.book}
          books={props.books}
          handleBookMove={props.handleBookMove}
        />
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors ? props.book.authors.join(", ") : ''}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  handleBookMove: PropTypes.func.isRequired
};

export default Book;
