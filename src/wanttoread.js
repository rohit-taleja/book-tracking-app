import React , {Component} from 'react'
class WantToRead extends Component{
    render()   {
        let showingBooks=this.props.wrBooks
        return(
          <div>
            <ol className="books-grid">
              {showingBooks.map((book)=>(
                <li key={book.id} className='book-list-item'>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193,
                         backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                      </div>
                      <div className="book-shelf-changer">
                        <select defaultValue="wantToRead"
                          onChange={(event)=>this.props.onChangeWantToReadShelf(book,event.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">✔Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
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
        )
    }
}
export default WantToRead