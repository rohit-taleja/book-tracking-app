import React , {Component} from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
class SearchBooks extends Component{
  state={
    query:'',
  }
    render()
    {
      let showingBooks=this.props.sbooks
        return(
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">
                 <DebounceInput type="text" placeholder="Search by title or author" 
                  debounceTimeout={3000}
                  onChange={(event)=>this.props.onGenerateQuery(event.target.value)}/>
              </div>
            </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map((book,index)=>(
                <li key={book.id} className='book-list-item'>
                  <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ 
                         width: 128,
                         height: 193,
                         backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail?`
                         ${book.imageLinks.thumbnail}`:`http://via.placeholder.com/128x193?text=No%20Cover`})`
                           }}>
                        </div>
                        <div className="book-shelf-changer">
                          <select
                            defaultValue={book.shelf}
                            onChange={(event)=>this.props.onChangeSearchBooksShelf(book,event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            {
                            book.shelf==="currentlyReading" ?(
                            <option value="currentlyReading">✔Currently Reading</option>
                            ):(<option value="currentlyReading">Currently Reading</option>)
                            }
                            {
                            book.shelf==="wantToRead" ?(
                            <option value="wantToRead">✔Want to Read</option>
                            ):(<option value="wantToRead">Want to Read</option>)
                            }
                            {
                            book.shelf==="read" ?(
                            <option value="read">✔Read</option>
                            ):(<option value="read">Read</option>)
                            }
                            {
                            book.shelf==="none" ?(
                            <option value="none">✔None</option>
                            ):(<option value="none">None</option>)
                            }
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )
    }
}
export default SearchBooks