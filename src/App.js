import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import LoadingOverlay from './LoadingOverlay';

import MyShelvesPage from './MyShelvesPage';
import SearchPage from "./SearchPage";

import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    isLoading: false
  };

  componentDidMount() {
    this.retrieveBooks();
  }

  handleBookMove = (selectedBook, updatedShelf) => {
    this.startLoading();
    BooksAPI.update(selectedBook, updatedShelf)
      .then(() => { this.retrieveBooks(); })
      .catch(() => { alert('Something went wrong with your request.'); })
      .then(this.endLoading);
  };

  retrieveBooks() {
    BooksAPI.getAll()
      .then(books => this.setState({ books }))
      .catch(() => { alert('Something went wrong with your request.'); });
  }

  startLoading = () => {
    this.setState({ isLoading: true });
  };

  endLoading = () => {
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="app">
        <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text="Loading..."
        >
          <Route exact path="/" render={() => (
            <MyShelvesPage
              books={this.state.books}
              handleBookMove={this.handleBookMove}
            />
          )} />
          <Route exact path="/search" render={() => (
            <SearchPage
              handleBookMove={this.handleBookMove}
              books={this.state.books}
            />
          )} />
        </LoadingOverlay>
      </div>
    )
  }
}

export default BooksApp
