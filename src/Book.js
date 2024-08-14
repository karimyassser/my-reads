import React, { Component } from "react";
class Book extends Component{
render(){
return (
  this.props.AllBooks.map((book)=>(  book.shelf===this.props.shelf //filter books by shelfs
?<li key={book.id}>
<div className="book">
  <div className="book-top">
    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
    <div className="book-shelf-changer">
     <select value = {book.shelf} onChange = {(e)=>this.props.update(book,e.target.value) }> 
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
: "" 
 ))
     )
    }
}
export default Book