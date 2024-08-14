import React, { Component } from "react";
import Book from "./Book";
class Read extends Component{ 
  state = {
    shelf : "read"
  }
render(){
  return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
             <Book AllBooks={this.props.AllBooks} update = {this.props.update} shelf={this.state.shelf}/>
            </ol>
          </div>
      </div>
     )
  }
}
export default Read