import React, { Component } from "react";
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
class Search extends Component{
    state={
        SearchedBooks:[],
        query:"",
    }
    updateQuery=(query)=>{
        this.setState(()=>({
            query
        }))
    }
    updateBookShelf = (book,shelf)=>BooksAPI.update(book,shelf)
  .then((update)=>{
    book.shelf = shelf
  })

render(){
  //calls Api search function and set promise in a new state
 const search = this.state.query !==""? BooksAPI.search(this.state.query)
 .then((SearchedBooks) =>{
   SearchedBooks = SearchedBooks.map((book=>{return {...book,shelf:"none"}}))
   this.setState(()=>({
     SearchedBooks
   }))
 }):""
    // function to filter main page books 
    const filteredBooks =this.props.AllBooks.filter((book)=>(book.title.toLowerCase().includes(this.state.query.toLowerCase())
    ))
    return(
<div className="search-books">
            <div className="search-books-bar">
           <Link className="close-search"  to='/'></Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"value={this.state.query} onChange={(event)=>this.updateQuery(event.target.value)} search={search} />
                {console.log("searchedbooks",this.state.SearchedBooks)}
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.state.query!== "" ?filteredBooks.map((book)=>(book.shelf!=="none" //render filtered books while searching 
 ?<li key={book.id}>
<div className="book">
  <div className="book-top">
    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
    <div className="book-shelf-changer">
    <select value = {book.shelf} onChange = {(e)=>this.props.update(book,e.target.value)}>
        <option value="move" disabled >Move to...</option>
        <option value="currentlyReading" >Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  </div>
  <div className="book-title">{book.title}</div>
  {book.authors.map((author)=>(
            <div className="book-authors" key={author}>{author}</div>
            ))}
</div>
</li>
:"")
):""}
 
            {this.state.SearchedBooks.length>0 && this.state.query.length>0 ? //handle search results when text is empty or deleted
              this.state.SearchedBooks.map((book)=>( book.imageLinks && book.authors && book.shelf==="none" // filter books that don't have image thumbnail or authors
?<li key={book.id}>
<div className="book">
  <div className="book-top">
    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url(${book.imageLinks ? book.imageLinks.thumbnail:""})`}}></div>
    <div className="book-shelf-changer">
      <select value = {book.shelf} onChange = {(e)=>this.props.update(book,e.target.value) && this.updateBookShelf(book,e.target.value)}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  </div>
  <div className="book-title">{book.title}</div>
  {book.authors?book.authors.map((author)=>(
            <div className="book-authors" key={author}>{author}</div>
            )):""}
</div>
</li>
:""))
 :""}
              </ol>
        </div>
        </div>
    )}
}
export default Search