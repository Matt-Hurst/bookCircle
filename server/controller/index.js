const { init } = require('../model');
const User = require('../model');

exports.getCtrl = async (req,res) => { // TODO: remove - for testing purposes only
  const result = await User.find();
  res.send(result);
};

exports.createUserCtrl = async (req,res) => {
  try {
    const newUser = new User({
      ...req.body,
      books: [],
      friends: [],
      activityLog: [],
      yearlyTarget: 0
    });
    await newUser.save((err) => {
      if (err) return console.log(err);
    });
    res.send(newUser);
  } catch (error) {
    console.error('ERROR', error)
  }
};

exports.addBookCrtl = async (req, res) => { //TODO: delete comments before publishing
  try {
    // will receive book information on req.body
    const newBook = req.body.book;
    // find user by _id or name
    const query = {name: req.body.user};
    const options = { new: true };
    // need to push to front of books array in database
    const user = await User.findOneAndUpdate(query, { 
      $push: { 
        books: {
          $each: [newBook],
          $position: 0
     }}  
    }, options);
    // send back updated users books array + send 201 status
    res.status(201).send(user.books)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.addFriendCtrl = async (req, res) => { 
  try {
    const query = {name: req.body.user};
    const options = { new: true };
    // need to push to front of books array in database
    const user = await User.findOneAndUpdate(query, { 
      $push: { 
        pendingFriends: req.body.friend_id  
    }}, options);

    // needs to add message to person that user has attempted to contact
    // add message to the front of their activity log array
    await User.findOneAndUpdate({_id: req.body.friend_id}, {
      $push: { 
        activityLog: {
          $each: [{message: `${req.body.user} wants to add you as a friend.`, type: 'friendRequest', senderId: user._id}],
          $position: 0
     }}  
    })
    res.status(201).send('SUCCESS')
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.confirmFriendCtrl = async (req, res) => { 
  try {
    // { initiatorId: _id, responderId: _id }
    const { initiatorId, responderId } = req.body;

    // 1. get initiator info (previous user)
    const initiator = await User.findById(initiatorId)
    // responderId is in Initator pendingFriends
    // a => remove responderId from pendingFriends array

      // b => add responderId to friends array

      // c => get responder info and add initiator id to friends array

      // send back Success


  } catch (error) {
    console.error('ERROR', error)
  }
}
