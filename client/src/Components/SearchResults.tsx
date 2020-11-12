import React from "react"
import './SearchResults.scss'

// TODO: make image of book clickable, bringing up a bigger image component and greying out background

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
              {result.imageLinks ? <img className='searchBookImage' src={result.imageLinks.thumbnail} alt=""/> : <div className='standInBook'><h3>{result.title}</h3></div> }
              <div className='searchBookTextContent'>
                <div className="titleAndAuthorContainer">
                <h2 className="searchBookTitle">{result.title}</h2>
          { result.authors ? <h3 className="searchBookAuthor">by {result.authors.join(' & ')}</h3> : null}
                </div>
              {result.categories ? <h2 className="searchBookGenre">{result.categories[0]}</h2> : <div style={{height: '23px'}}></div>}
              <button className="searchAddBookBtn">add to bookcase</button>
              </div>
          </div>
          )
        })}
     </div>
    )
}

export default SearchResults;