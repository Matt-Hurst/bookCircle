import React, { FunctionComponent } from "react"
import { Book } from "../Interfaces"
import './SearchResults.scss'

// TODO: make image of book clickable, bringing up a bigger image component and greying out background

type Title = {
  volumeInfo: Object
}

type SearchResultsProps = {
  titles: Array<Title>,
  handleBookClick : any,
  userLibrary: any,
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({titles, handleBookClick, userLibrary}) => {


  const searchResults: Array<any> = [];
    titles.forEach(title => {
        searchResults.push(title.volumeInfo)
    })

  const library: Array<string | undefined> = [];
  for (let i = 0; i < userLibrary.length; i++) {
    library.push(userLibrary[i].title)
  }

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
              {!(library.includes(result.title)) && 
                <button className="searchAddBookBtn" onClick={() => {
                handleBookClick({
                  title: result.title,
                  authors: result.authors,
                  imageUrl: result.imageLinks.thumbnail,
                  genre: result.categories ? result.categories[0] : undefined
                }) 
              }}
              >add to bookcase</button>}
              </div>
          </div>
          )
        })}
     </div>
    )
}

export default SearchResults;