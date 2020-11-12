import React from "react"

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

    return (
        <div> Results
            <ul>{searchResults.map((result, i) => {
                return (
                <div key={i}>
                    <li>{result.title}</li>
                    {result.imageLinks.smallThumbnail !== undefined ? 
                    <img src={result.imageLinks.smallThumbnail} alt={result.title} />
                    : null
                }
                </div>
                )
            })}
        </ul>
        </div>

    )
}

export default SearchResults;