const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  message: String,
  type: String,
  senderId: {type: mongoose.Schema.Types.ObjectId},
  createdAt: Date,
  book: String,
  activityId: Number,
  title: String
})

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  books: Array,
  friends: Array,
  pendingFriends: Array,
  activityLog: [activityLogSchema],
  yearlyTarget: Number
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;