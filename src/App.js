import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './currentlyreading'
import Read from './read'
import WantToRead from './wanttoread'
import SearchBooks from './searchbooks'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
class App extends React.Component {
  state = {
    rBooks:[],
    wrBooks:[],
    crBooks:[],
    sbooks:[]
  }
  showSearchedBooks=(query)=>{
    if(query)
      BooksAPI.search(query).then(res=>{
        if(res.length){
          res.map((book)=>{
            BooksAPI.get(book.id).then(books=>{
              this.setState(state=>({
                sbooks:this.state.sbooks.concat([ books ])
              }))
            })
          })
        }
  })}
//   rBooks
  componentDidMount(){
    BooksAPI.getAll().then((res)=>{
      res.map((book)=>{
        if(book.shelf==="wantToRead"){
          this.setState(state=>({
            wrBooks:this.state.wrBooks.concat([ book ])
          }))
        }
        if(book.shelf==="read"){
          this.setState(state=>({
            rBooks:this.state.rBooks.concat([ book ])
          }))
        }
       if(book.shelf==="currentlyReading"){
          this.setState(state=>({
            crBooks:this.state.crBooks.concat([ book ])
          }))
        }
      })
    })
  }
    updateReadShelf=(book,value)=>{
        this.setState((state)=>({
            rBooks:this.state.rBooks.filter((obj)=>obj.id!==book.id)
        }))
      if(value==="wantToRead"){
        this.setState(state=>({
          wrBooks:this.state.wrBooks.concat([ book ])
        }))
        BooksAPI.update(book,value)
      }
      if(value==="currentlyReading"){
        this.setState(state=>({
          crBooks:this.state.crBooks.concat([ book ])
        }))
        BooksAPI.update(book,value)
      }
    }
//    wrBooks
    updateWantToReadShelf=(book,value)=>{
        this.setState((state)=>({
            wrBooks:this.state.wrBooks.filter((obj)=>obj.id!==book.id)
      }))
      if(value==="currentlyReading"){
        this.setState(state=>({
          crBooks:this.state.crBooks.concat([ book ])
        }))
        BooksAPI.update(book,value)
      }
      if(value==="read"){
        this.setState(state=>({
          rBooks:this.state.rBooks.concat([ book ])
        }))
        BooksAPI.update(book,value)
      }
      if(value==="none"){
        BooksAPI.update(book,value)
      }
    }
  //crBooks
    updateCurrentlyReadingShelf=(book,value)=>{
      this.setState((state)=>({
        crBooks:this.state.crBooks.filter((obj)=>obj.id!==book.id)
        }))
      if(value==="wantToRead"){
        this.setState(state=>({
          wrBooks:this.state.wrBooks.concat([ book ])
        }))
        BooksAPI.update(book,value)
      }
      if(value==="read"){
        this.setState(state=>({
          rBooks:this.state.rBooks.concat([ book ])
        }))
        BooksAPI.update(book,value)
      }
      if(value==="none"){
        BooksAPI.update(book,value)
      }
    }
    updateSeachedBooksShelf=(book,value)=>{
      BooksAPI.get(book.id).then((res)=>{
        if(res.shelf==="wantToRead"){
          this.setState((state)=>({
            wrBooks:this.state.wrBooks.filter((obj)=>obj.id!==book.id)
        }))
      }
        if(res.shelf==="read"){
          this.setState((state)=>({
            rBooks:this.state.rBooks.filter((obj)=>obj.id!==book.id)
        }))
      }
        if(res.shelf==="currentlyReading"){
          this.setState((state)=>({
            crBooks:this.state.crBooks.filter((obj)=>obj.id!==book.id)
        }))
      }
    })
        if(value==="wantToRead"){
          this.setState(state=>({
            wrBooks:this.state.wrBooks.concat([ book ])
        }))
          BooksAPI.update(book,value)
      }
        if(value==="read"){
          this.setState(state=>({
            rBooks:this.state.rBooks.concat([ book ])
         }))
          BooksAPI.update(book,value)
      }
        if(value==="currentlyReading"){
          this.setState(state=>({
            crBooks:this.state.crBooks.concat([ book ])
         }))
        BooksAPI.update(book,value)
      }
    }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({history})=>(
          <div>
            <SearchBooks 
            onChangeSearchBooksShelf={this.updateSeachedBooksShelf} 
            sbooks={this.state.sbooks} 
            onGenerateQuery={this.showSearchedBooks} />
            </div>
        )}/>
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <CurrentlyReading 
                    onChangeCurrentlyReadingShelf={this.updateCurrentlyReadingShelf} 
                    crBooks={this.state.crBooks}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                   <WantToRead
                    onChangeWantToReadShelf={this.updateWantToReadShelf} 
                    wrBooks={this.state.wrBooks}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <Read
                     onChangeReadShelf={this.updateReadShelf} 
                     rBooks={this.state.rBooks}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
          )}/>
        </div>
      )
    }
  }
export default App