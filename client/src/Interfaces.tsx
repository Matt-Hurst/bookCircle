
interface Book {
  title: string | undefined;
  authors: string[] | undefined;
  imageUrl: string | undefined;
  dateRead: string | undefined;
  review: string | undefined;
  availableToBorrow: boolean | undefined;
  genre: string | undefined;
  star: boolean | undefined;
  id?: string | undefined;
  book?: Book;
  friendName?: string;
}

interface User {
  books: Array<Book> | null;
  friends: Array<string> | null;
  pendingFriends: Array<string | null>;
  _id: string | null;
  name: string | null;
  password: string | null; //TODO: UPDATE WHEN ADDING AUTHENTICATION
  activityLog: Array<object | null>;
  yearlyTarget: number;
}

interface ActivityLog {
  _id: string;
  message: string;
  type: string;
  senderId: string;
  createdAt: string;
}

interface AddFriend  {
  user: string;
  friend_id: string;
}

interface BookRequest  {
  user: User;
  book: Book;
  friendId: any;
}

interface UserInfo {
  _id: string;
  name: string;
}

interface BorrowableBook {
  friendName: string;
  book: Book;
}

interface NewBook {
  book: Book;
  user: string | null;
}


export type {
  Book,
  User,
  ActivityLog,
  AddFriend,
  BookRequest, 
  UserInfo,
  BorrowableBook,
  NewBook
};