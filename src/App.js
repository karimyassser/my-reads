import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './CurrentlyReading'
import Read from './Read'
import Search from './Search'
import WantToRead from './WantToRead'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    AllBooks:[],
    searchedBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then ((AllBooks)=>{
this.setState(()=>({
  AllBooks
}))
    })
  }
  // api call to update books shelf's
  updateBookShelf = (book,shelf)=>BooksAPI.update(book,shelf)
  .then((update)=>{
    book.shelf = shelf
    this.setState((currentState)=>({
      //concat book after filtering it to match get function after refreshing
      AllBooks:  currentState.AllBooks.filter((c) => {return c.id !== book.id}).concat([book])
    }))
  })
  render() {
    return (
      <div className="app">
          <Route exact={true} path='/search' render={()=>(<Search AllBooks={this.state.AllBooks} update={this.updateBookShelf}/>)}/>
          <Route exact={true} path="/" render={()=>(<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Route exact={true} path="/" render={()=>(<CurrentlyReading AllBooks={this.state.AllBooks}update={this.updateBookShelf}/>)}/>
                <Route exact={true} path="/" render={()=>(<WantToRead AllBooks={this.state.AllBooks}update={this.updateBookShelf}/>)} />
                <Route exact={true} path="/" render={()=>(<Read AllBooks={this.state.AllBooks} update={this.updateBookShelf}/>)}/>
              </div>
              </div>
            <Link exact="true"className="open-search" to="/search">
              <button></button>
            </Link>
          </div>)}/>
      </div>
    )
  }
}

export default BooksApp
