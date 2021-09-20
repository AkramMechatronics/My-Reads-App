import React from 'react'
import { Link } from 'react-router-dom'

class BooksSearchPage extends React.Component {
	render(){
		return(
			<div className="search-books">
				<div className="search-books-bar">
				<Link to='/'><button className="close-search"></button></Link>
				<div className="search-books-input-wrapper">
					<input 
						type="text" 
						placeholder="Search by title or author"
						value= {this.props.Query}
						onChange={this.props.onChangeInputsearch}
					/>
				</div>
				</div>
				<div className="search-books-results">
				<ol className="books-grid"></ol>
				</div>
				{(this.props.Query !== "" & this.props.searchedBooksBuffer.length ===1) ?(
				<div className="list-books-content">
					<h2 className="bookshelf-title">Invalid search Key Word</h2>
				</div>
				):(
				<div>
				</div>
				)}
				{this.props.Query === "" ?(
				<div className="list-books-content">
				<h2 className="bookshelf-title">Enter Search Key Word</h2>
				</div>
				):(
				<div className="list-books-content">
				<div>
					<div className="bookshelf">
						{(this.props.Query !== "" & this.props.searchedBooksBuffer.length ===1) ?(
							<div>
							</div>
							):(
							<div className="list-books-content">
								<h2 className="bookshelf-title">Searched Books</h2>
							</div>
						)}
					<div className="bookshelf-books">
						<ol className="books-grid">
						{this.props.searchedBooksBuffer.map(booky=> (
							<li key = {booky.id}>
								<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: booky.url }}></div>
									<div className="book-shelf-changer">
									<label htmlFor="bookShelfs"></label>
									<select id = {booky.id} onChange={this.props.onChangeSearchInvoke} value={booky.state}>
										{booky.state === "currentlyReading" ? (
										<option value="currentlyReading">✓Currently Reading</option>):(
										<option value="currentlyReading">Currently Reading</option>)}
										
										{booky.state === "wantToRead" ? (
										<option value="wantToRead">✓Want to Read</option>):(
										<option value="wantToRead">Want to Read</option>)}
										
										{booky.state === "read" ? (
										<option value="read">✓Read</option>):(
										<option value="read">Read</option>)}
										
										{booky.state === "none" ? (
										<option value="none">✓None</option>):(
										<option value="none">None</option>)}
									</select>
									</div>
								</div>
								<div className="book-title">{booky.title}</div>
								<div className="book-authors">{booky.author.join(", ")}</div>
								</div>
							</li>
						))}
						</ol>
					</div>
					</div>
				</div>
				</div>
				)}
			</div>		
		)
	}
	
}

export default BooksSearchPage