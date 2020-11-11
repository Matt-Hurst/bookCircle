const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  books: Array,
  friends: Array,
  pendingFriends: Array,
  activityLog: Array,
  yearlyTarget: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// DATA STRUCTURE TODO:
/*
{
  {
    _id: 1827312,
    name: "hairyBellyNo4",
    password: string
    books: [
      {
        title: string,
        author: string,
        imageUrl: string,
        dateRead: date,
        review: string,
        availableToBorrow: boolean,
        wantBack: boolean,
        genre: string,
        star: boolean 
      },{...},{...}
    ],
    friends: [_id, _id, _id, _id],
    pendingFriends: [_id, _id]
    activityLog: [{request: 'string', type: (bookRequest/friendRequest) 'string',}],
    yearlyTarget: number;
  }

}
*/