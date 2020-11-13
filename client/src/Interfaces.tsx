
interface Book {
  title: string | undefined;
  authors: string[] | undefined;
  imageUrl: string | undefined;
  dateRead: string | undefined;
  review: string | undefined;
  availableToBorrow: boolean | undefined;
  genre: string | undefined;
  star: boolean | undefined;
  _id: string | undefined;
}

interface User {
  books: Array<Book> | null;
  friends: Array<string> | null;
  pendingFriends: Array<string | null>;
  _id: string | null;
  name: string | null;
  password: string | null; //TODO: UPDATE WHEN ADDING AUTHENTICATION
  activityLog: Array<object | null>
}


export type {
  Book,
  User,
};