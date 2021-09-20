import React from 'react'
import { Link } from 'react-router-dom'

class BooksList extends React.Component {
	render(){
		return(
			<div className="list-books">
				<div className="list-books-title">
				<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
				<div>
					<div className="bookshelf">
					<h2 className="bookshelf-title">Currently Reading</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
						{this.props.readingBooks.map(booky=> (
							<li key = {booky.id}>
								<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: booky.url }}></div>
									<div className="book-shelf-changer">
									<label htmlFor="bookShelfs"></label>
									<select id = {booky.id} onChange={this.props.onChangeInvoke} value="currentlyReading">
										<option value="currentlyReading">✓Currently Reading</option>
										<option value="wantToRead">Want to Read</option>
										<option value="read">Read</option>
										<option value="none">None</option>
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
					<div className="bookshelf">
					<h2 className="bookshelf-title">Want to Read</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
						{this.props.wantToBooks.map(booky=> (
							<li key = {booky.id}>
								<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: booky.url }}></div>
									<div className="book-shelf-changer">
									<label htmlFor="bookShelfs"></label>
									<select id = {booky.id} onChange={this.props.onChangeInvoke} value="wantToRead">
										<option value="currentlyReading">Currently Reading</option>
										<option value="wantToRead">✓Want to Read</option>
										<option value="read">Read</option>
										<option value="none">None</option>
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
					<div className="bookshelf">
					<h2 className="bookshelf-title">Read</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
						{this.props.readBooks.map(booky=> (
							<li key = {booky.id}>
								<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: booky.url }}></div>
									<div className="book-shelf-changer">
									<label htmlFor="bookShelfs"></label>
									<select id = {booky.id} onChange={this.props.onChangeInvoke} value="read">
										<option value="currentlyReading">Currently Reading</option>
										<option value="wantToRead">Want to Read</option>
										<option value="read">✓Read</option>
										<option value="none">None</option>
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
				<div className="open-search">
					<Link to='/search'><button></button></Link>
				</div>
			</div>
		)
	}
	
}

export default BooksList