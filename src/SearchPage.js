import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from "./BooksAPI";

import Book from './Book';

class SearchPage extends Component {
  state = {
    results: [],
    query: ''
  };

  constructor() {
    super();
    this.performSearch = debounce(300, false, this.performSearch);
  }

  handleQueryChange(event) {
    const query = event.target.value;
    this.setState({ query });

    this.performSearch(query);
  }

  performSearch(query) {
    if (query === '' || query === undefined){
      this.setState({ results: [] });
      return;
    }

    BooksAPI.search(query).then((books) => {
      if (books.constructor === Array) {
        this.setState({ results: books });
      } else {
        this.setState({ results: [] });
      }
    });
  }

  render() {
    let message;

    if (this.state.query === '') {
      message = (
        <h2 style={{ textAlign: 'center' }}>
          Write one or more keywords above to start searching.
        </h2>
      );
    } else if (this.state.results.length === 0) {
      message = (
        <h2 style={{ textAlign: 'center' }}>
          No results found. Try different keywords.
        </h2>
      );
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.handleQueryChange(event)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {message}

          <ol className="books-grid">
            {this.state.results.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  books={this.props.books}
                  handleBookMove={this.props.handleBookMove}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  handleBookMove: PropTypes.func.isRequired
};

export default SearchPage;
