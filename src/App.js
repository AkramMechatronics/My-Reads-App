/* Import needed libraries */
import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BooksList from './BooksList'
import BooksSearchPage from './BooksSearchPage'

class BooksApp extends React.Component {
/* All the states needed in the are configured in state */
  state = {
	allBooks: [{
		url: "" 
		, title: ""
		, author: []
		, state: ""
		, id: ""
	}],
	searchedBooks: [{
		url: "" 
		, title: ""
		, author: []
		, state: ""
		, id: ""
	}],
	query:"",	
	booksList: [{}],
	booksSearchedList: [{}]
  }
/* componentDidMount function is used to get the data of books from the server */
  componentDidMount(){
	BooksAPI.getAll()
		.then((booksList) => {
			this.setState({
				booksList
			}, () => {
					let allBooksBuffer = this.state.allBooks; 
					let booksListBuffer2 = this.state.booksList;
					let allBooksTitlesBuffer = allBooksBuffer.map(booka=>booka.title);
					booksListBuffer2 = booksListBuffer2.filter(booky=>{ 
						let returnValue = (!(allBooksTitlesBuffer.includes(booky.title)));
						return(returnValue);
					});
					let booksListBuffer1 = booksListBuffer2.map((book) => ({
						url: "url("+book.imageLinks.smallThumbnail+")" 
						, title: book.title
						, author: book.authors
						, state: book.shelf
						, id: book.id
					}));
					this.setState({allBooks: this.state.allBooks.concat(booksListBuffer1)});
				})
		})		  
}
  
/* handleChange function is invoked when any change is happened to the books shelf options in the main page */  
  handleChange = (event) => {  
	let bookChanged = this.state.allBooks.filter(booky => (booky.id === event.target.id));
	let newState = event.target.value;
	this.setState({allBooks: this.state.allBooks.filter(booky => (booky.id !== event.target.id))}, () => {
		bookChanged[0].state = newState;
		this.setState({allBooks: this.state.allBooks.concat(bookChanged[0])});
	});
	BooksAPI.update(bookChanged[0], newState);
  }

  /* handleChangeSearch function is invoked when any change is happened to the books shelf options in the search page */  
  handleChangeSearch = (event) => {  
	let bookChanged = [{
		url: "" 
		, title: ""
		, author: []
		, state: ""
		, id: ""
	}];
	bookChanged = this.state.allBooks.filter(booky => (booky.id === event.target.id));
	let newState = event.target.value;
	if(bookChanged.length===1) {
			this.setState({allBooks: this.state.allBooks.filter(booky => (booky.id !== event.target.id))}, () => {
			bookChanged[0].state = newState;
			this.setState({allBooks: this.state.allBooks.concat(bookChanged[0])});
		})
		BooksAPI.update(bookChanged[0], newState);
	}
	else{
		bookChanged = this.state.searchedBooks.filter(booky => (booky.id === event.target.id));
		this.setState({searchedBooks: this.state.searchedBooks.filter(booky => (booky.id !== event.target.id))}, () => {
			bookChanged[0].state = newState;
			this.setState({allBooks: this.state.allBooks.concat(bookChanged[0])});
		})
		BooksAPI.update(bookChanged[0], newState);
	}
  }
  
/* handleSearch function is invoked when any text is inserted in the search bar */    
  handleSearch = (event) => {
    this.setState({query: event.target.value});
	
	if(event.target.value !== "")
	{		
		BooksAPI.search(event.target.value)
			.then((booksSearchedList) => {
				this.setState({
					booksSearchedList
				}
				,()=>{
					  if(booksSearchedList.error !=="empty query"){
					  	let allBooksBuffer = this.state.allBooks; 
					  	let booksListBuffer2 = this.state.booksSearchedList;
					  	let allBooksTitlesBuffer = allBooksBuffer.map(booka=>booka.title);
					  	booksListBuffer2 = booksListBuffer2.filter(booky=>{ 
					  		let returnValue = (!(allBooksTitlesBuffer.includes(booky.title)));
					  		return(returnValue);
					  	});
					  	let booksListBuffer1 = booksListBuffer2.map((book) => (((book.hasOwnProperty('authors'))&(book.hasOwnProperty('imageLinks'))) ? ({
					  		url: "url("+book.imageLinks.smallThumbnail+")" 
					  		, title: book.title
					  		, author: book.authors
					  		, state: "none"
					  		, id: book.id
					  	}):({
					  		url: "" 
					  		, title: book.title
					  		, author: [""]
					  		, state: "none"
					  		, id: book.id							
						})));					
					  	this.setState({searchedBooks: booksListBuffer1});
					  }
					  else{
						  this.setState({searchedBooks: [{}]});
					  }
					}
				)
		})		
	}
  }

/* render method contain the app body and the return jsx code */   
  render() {
  const showingBooks = this.state.query === "" ? [{}] : this.state.allBooks.filter((booky) => ((booky.title.toLowerCase().includes(this.state.query.toLowerCase()))|
  (booky.author.join(" ").toLowerCase().includes(this.state.query.toLowerCase()))));
  const showingBooks2 = showingBooks.concat(this.state.searchedBooks);

  const readingBooks2 = this.state.allBooks.filter((book)=>(book.state === "currentlyReading")); 
  const wantToBooks2 = this.state.allBooks.filter((book)=>(book.state === "wantToRead")); 
  const readBooks2 = this.state.allBooks.filter((book)=>(book.state === "read")); 
    return (
      <div className="app">
	  {/* serch page handle */}
		<Route path = '/search' render = {()=>(
			<BooksSearchPage 
				Query = {this.state.query} 
				searchedBooksBuffer = {showingBooks2} 
				onChangeSearchInvoke = {this.handleChangeSearch} 
				onChangeInputsearch={this.handleSearch}
			/>
		)}/>
		{/* main page handle */}
		<Route exact path = '/' render = {()=>(
			<BooksList 
				readingBooks = {readingBooks2} 
				wantToBooks = {wantToBooks2} 
				readBooks = {readBooks2} 
				onChangeInvoke = {this.handleChange} 
			/>
		)}/>		
      </div>
    )
  }
}

/* exporting the component to be render in the dom */
export default BooksApp
