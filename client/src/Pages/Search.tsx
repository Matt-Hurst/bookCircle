import React, {useState} from 'react';
import SearchResults from '../Components/SearchResults'
import { User, NewBook } from '../Interfaces'
import { AiFillCloseCircle } from "react-icons/ai";
import './Search.scss'

// TODO: add component did unmount equivalent so that bookClicked is undefined if user leaves page 

interface myProps {
  user: User;
  addBookToBookCase: Function;
}

interface bookClicked {
  title: string | undefined;
  authors: Array<string> | undefined;
  imageUrl: string | undefined;
  genre: string | undefined;
}

interface userInput {
  date: any | undefined;
  review: string | undefined;
  availableToLend: boolean | undefined;
  star: boolean | undefined;
  genre: string | undefined;
}

const Search = ({user, addBookToBookCase}: myProps) => {
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState('title'); 
  const [isSearch, setIsSearch] = useState(false);
  const [titles, setTitles] = useState([]);
  const [bookClicked, setBookClicked] = useState<bookClicked>();
  const [userInput, setUserInput] = useState<userInput>({
    date: 1,
    review: '',
    availableToLend: false,
    star: false,
    genre: 'fiction',
  });
  const [questionSetion, setQuestionSection] = useState(1)

  const getBook = (name : String) : void => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=in${placeholder}:${name}&maxResults=40&printType=books&key=AIzaSyCPGabDlZJ8QKPihWNWfW-kl5yQtNFSlDc`)
    .then(result => {
      return result.json();
    })
    .then(books => { 
      let data = books.items
      setTitles(data.slice(0, 40))
      setIsSearch(true)
    })
    .catch(error => {console.log(error)})
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await getBook(search);
      setSearch('');
    } catch (error) {
      console.error(error)
      alert("Oops, that didn't work, please try again")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  };

  const handleAuthorClick = () => {
    setPlaceholder('author')
  };
  
  const handleTitleClick = () => {
    setPlaceholder('title')
  };

  const handleBookClick = (newBook: any): void => {
    setBookClicked(newBook)
  }
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, word: string) => {
    if (word === 'date') {
      setUserInput(prevUserInput => {
        return {
        ...prevUserInput,
        date: e.target.value
      }})
    }
    if (word === 'review') {
      setUserInput(prevUserInput => {
        return {
        ...prevUserInput,
        review: e.target.value
      }})
    }
    if (word === 'lend') {
      setUserInput(prevUserInput => {
        return {
        ...prevUserInput,
        availableToLend: !prevUserInput.availableToLend
      }})
    }
    if (word === 'genre') {
      setUserInput(prevUserInput => {
        return {
          ...prevUserInput,
          genre: e.target.value
        }
      })
    }
    if (word === 'star') {
      setUserInput(prevUserInput => {
        return {
        ...prevUserInput,
        star: !prevUserInput.star
      }})
    }
  }

  const moveToNextQuestion = () => {
    setQuestionSection((questionSection) => questionSection + 1 )
  }

  const moveToPreviousQuestion = () => {
    if (questionSetion === 1) {
      setBookClicked(undefined)
    } else {
      setQuestionSection((questionSection) => questionSection - 1 )
    }
  }

  // TODO: create fetch request to send new book to server to add to user library
  const addBookToDataBase = async () => {
    const newBook:NewBook = {
      book: {
        title: bookClicked?.title,
        authors: bookClicked?.authors,
        imageUrl: bookClicked?.imageUrl,
        dateRead: userInput.date,
        review: userInput.review,
        availableToBorrow: userInput.availableToLend,
        genre: userInput.genre,
        star: userInput.star 
      },
      user: user.name
    }
    await addBookToBookCase(newBook)

    setBookClicked(undefined);
    setUserInput({
      date: undefined,
      review: undefined,
      availableToLend: false,
      star: false,
      genre: '',
    });
    setQuestionSection(1);
  }

  const handleCloseBtnClick = () => {
    setBookClicked(undefined)
    setUserInput({
      date: 1,
      review: '',
      availableToLend: false,
      star: false,
      genre: '',
    })
    setQuestionSection(1)
  }

  return (
    <div>
      
      {bookClicked && <div className="bookClickedDiv">
        <div className="addBookPopOutDiv">
          <AiFillCloseCircle className="closeBtn" onClick={handleCloseBtnClick}/>
          {questionSetion === 1 && <div className="addBookPopOutForm">
            <h2>When did you read this book?</h2>
            <input type="date" value={userInput.date} onChange={(e) => handleDataChange(e, 'date')}/>
            <div className="addBookPopOutFormBtns">
              <button onClick={moveToPreviousQuestion}>back</button>
              <button onClick={() => {
                if (userInput.date && userInput.date !== 1) {
                  moveToNextQuestion()
                }
              }
                }>next</button>
            </div>
          </div>}
          {questionSetion === 2 && <div className="addBookPopOutForm">
            <div className="reviewPopOutText">
              <h2>What did you think?</h2>
              <p>(max 100 characters)</p>
            </div>
            <textarea className="addBookReviewInput" maxLength={100} value={userInput.review} onChange={(e) => handleDataChange(e, 'review')}/>
            <div className="addBookPopOutFormBtns">
              <button onClick={moveToPreviousQuestion}>back</button>
              <button onClick={() => {
                if (userInput.review) {
                  moveToNextQuestion()
                }
              }
              }>next</button>
            </div>
          </div>}
          {questionSetion === 3 && <div className="addBookPopOutForm">
            <h2>Are you willing and able to lend this book to friends?</h2>
            <div>
              <div className="checkboxDiv">
                <input className="addBookReviewInputRadio" type="checkbox" id='yes' value='yes' onChange={(e) => handleDataChange(e, 'lend')}/>
                <label htmlFor="yes">I'm happy to lend this book</label>
              </div>
              <div className="addBookPopOutFormBtns">
                <button onClick={moveToPreviousQuestion}>back</button>
                <button onClick={moveToNextQuestion}>next</button>
              </div>
            </div>
          </div>}
          {questionSetion === 4 && <div className="addBookPopOutForm">
            <h2>What genre was this book?</h2>
            <div>
              <div className="checkboxDiv">
                <select id="pickGenre" onChange={(e) => handleDataChange(e, 'genre')}>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="crime">Crime & Thriller</option>
                  <option value="science fiction">Science Fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="action & adventure">Action & Adventure</option>
                  <option value="politics & history">Politics & History</option>
                  <option value="romance">Romance</option>
                  <option value="comedy">Comedy</option>
                  <option value="science & technology">Science & Technology</option>
                  <option value="biography">Biography</option>
                  <option value="arts & culture">Arts & Culture</option>
                  <option value="self-improvement">Self-Improvement</option>
                </select>
              </div>
              <div className="addBookPopOutFormBtns">
                <button onClick={moveToPreviousQuestion}>back</button>
                <button onClick={moveToNextQuestion}>next</button>
              </div>
            </div>
          </div>}
          {questionSetion === 5 && <div className="addBookPopOutForm">
            <h2>Did this book change your life? Is it a must read? Check the below to mark it as a star read.</h2>
            <div>
              <div className="checkboxDiv">
                <input className="addBookReviewInputRadio" type="checkbox" id='yes' value='yes' onChange={(e) => handleDataChange(e, 'star')}/>
                <label htmlFor="yes">star read</label>
              </div>
              <div className="addBookPopOutFormBtns">
                <button onClick={moveToPreviousQuestion}>back</button>
                <button onClick={addBookToDataBase}>add book</button>
              </div>
            </div>
          </div>}
        </div>
      </div>}

      <h1 className='searchHeader'>Search:</h1>
      <form className='searchForm' action="submit" onSubmit={handleSubmit}>
        <div className='inputAndBtnContainer'>
          <input className='searchInput' type="text" onChange={handleChange} value={search} placeholder={`search by ${placeholder}`}/>
          <button className="searchBtn">search</button>
        </div>
      </form>
      <div className="buttonContainer">
        <button className={placeholder === 'title' ? "selectedSearchMethod" : "otherSearchMethod"} id="bookTitleBtn" onClick={handleTitleClick}>book title</button>
        <button className={placeholder === 'author' ? "selectedSearchMethod" : "otherSearchMethod"} id="authorBtn" onClick={handleAuthorClick}>author</button>
      </div>
    { isSearch && <SearchResults titles={titles} handleBookClick={handleBookClick} userLibrary={user.books}/>}
    </div>
  )
}

export default Search;