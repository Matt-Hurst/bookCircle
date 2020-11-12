import React from "react"
import './SearchResults.scss'

type Book = {
  volumeInfo: Object
}

type BookProps = {
  titles: Array<Book>,
}

const SearchResults = ({titles}: BookProps) => {
  const searchResults: Array<any> = [];
    titles.forEach(title => {
        searchResults.push(title.volumeInfo)
    })
    console.log('SEARCHRESULTS ARRAY',searchResults) // TODO: delete.

    return (
      <div>{searchResults.map((result, i) => {
          return (
          <div className='searchBookResultContainer' key={i}>
              {result.imageLinks ? <img className='searchBookImage' src={result.imageLinks.thumbnail} alt=""/> : <div className='standInBook'></div> }
              <div className='searchBookTextContent'>
                <div className="titleAndAuthorContainer">
                <h2 className="searchBookTitle">{result.title}</h2>
                <h3 className="searchBookAuthor">by {result.authors[0]}</h3>
                </div>
              {result.categories ? <h2 className="searchBookGenre">{result.categories[0]}</h2> : null}
              <button className="searchAddBookBtn">add to bookcase</button>
              </div>
          </div>
          )
        })}
     </div>
    )
}

export default SearchResults;