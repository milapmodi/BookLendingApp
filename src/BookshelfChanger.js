import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {
  getShelfFromBook(book) {
    const bookFound = this.props.books.find(b => b.id === book.id);

    if (bookFound) {
      return bookFound.shelf;
    } else {
      return 'none'
    }
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          onChange={event => this.props.handleBookMove(this.props.book, event.target.value)}
          defaultValue={this.getShelfFromBook(this.props.book)}
        >
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookshelfChanger.propTypes = {
  books: PropTypes.array.isRequired,
  handleBookMove: PropTypes.func.isRequired
};

export default BookshelfChanger;
