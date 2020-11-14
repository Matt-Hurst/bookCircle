const { init } = require('../model');
const User = require('../model');
const { v4: uuidv4 } = require('uuid');

exports.getCtrl = async (req,res) => { // TODO: remove - for testing purposes only
  const result = await User.find();
  res.send(result);
};

exports.getUserCtrl = async (req, res) => {
  const user = await User.find({name: req.params.name})
  res.send(user)
}

exports.getFriendsNameCtrl = async (req, res) => {
  // const user = await User.find({name: 'Matt'}, 'friends') // returns { friends: [], _id: 1231}
 const result = await User.findById(req.params.id, 'name')
  res.send(result)
}

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
    const newBook = {...req.body.book, id:uuidv4()};
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

exports.searchUsersCtrl = async (req, res) => {
  const { name } = req.params
  try {
    result = await User.find({name: name}, 'name _id').exec() // TODO: make regex so get all names similar
    res.send(result)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.addFriendCtrl = async (req, res) => { 
  try {
    const query = {name: req.body.user};
    const options = { new: true };
    const user = await User.findOneAndUpdate(query, { 
      $push: { 
        pendingFriends: req.body.friend_id  
    }}, options);

    // needs to add message to person that user has attempted to contact
    // add message to the front of their activity log array
    await User.findOneAndUpdate({_id: req.body.friend_id}, {
      $push: { 
        activityLog: {
          $each: [{message: `${req.body.user} wants to add you as a friend.`, type: 'friendRequest', senderId: user._id, createdAt: Date.now()}],
          $position: 0
     }}  
    }, {new: true})
    res.status(201).send(user)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.confirmFriendCtrl = async (req, res) => { 
  try {
    // { initiatorId: _id, responderId: _id, createdat }
    const { senderId, userId, createdAt } = req.body;
  
    const responder = await User.findByIdAndUpdate(userId, {
      $push : { friends: senderId },
      $pull : { activityLog: {createdAt: createdAt} }
    }, {new: true, safe: true});  

    await User.findByIdAndUpdate(senderId, {
      $push : { 
        friends: userId,
        activityLog: {
          $each: [{message: `${responder.name} accepted your friend request.`, type: 'resolved', createdAt: Date.now()}],
          $position: 0
     }
      },
      $pull : { pendingFriends: userId }
    }, {new: true})

    res.send(responder)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.rejectFriendRequestCtrl = async (req, res) => {
  try {
    const {createdAt, userId, senderId} = req.body
    // data { createdAt = _id, userId: 12312, senderId: 12321 }
 
    // remove message from responder
    const responder = await User.findByIdAndUpdate(userId, {
      $pull : { activityLog: {createdAt: createdAt} }
    }, {new: true})
    // remove responder id from initiator prending array
    const initiator = await User.findByIdAndUpdate(senderId, {
        $push : {
          activityLog: {
            $each: [{message: `${responder.name} rejected your friend request.`, type: 'resolved', createdAt: Date.now()}],
            $position: 0 
        },
      },
      $pull : { pendingFriends: userId }
    }, {new: true})
    // add rejected friend request to activity log
    res.send(responder)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.updateTargetCtrl = async (req, res) => {
  const { _id, target} = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, {
      yearlyTarget: target
    }, {new: true});
    res.send(updatedUser)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.removeActivityLogElementCtrl = async (req, res) => {
  try {
    // data { userId: 13212, createdAt: "5fad2a..." }
    const { userId, createdAt } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull : { activityLog: {createdAt: createdAt} }
    }, {new: true});
    res.send(updatedUser)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.requestBookCtrl = async (req, res) => {
  // { user = name, book, friendId } => date to receive should look something like this..
  const { user, book, friendId } = req.body
  try {
    //find and update book owner by Id
    await User.updateOne({
      _id: friendId, books: { $elemMatch: { id: book.id}}
    },
    { $set: {"books.$.availableToBorrow" : false }}
    )
    
    const result = await User.findByIdAndUpdate(friendId, {
      //push activity log type bookRequest to owner of book
      $push : {
        activityLog: {
          $each: [{message: `${user.name} wants to borrow ${book.title}.`, book: book.title, type: 'bookRequest', senderId: user._id, createdAt: Date.now()}],
          $position: 0 
        },
      },
    }, {new: true});
    // //set availableToBorrow to false
  
    res.send(result)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.acceptBookRequestCtrl = async (req, res) => {
  try {
    const {createdAt, userId, senderId, book} = req.body
    
    const user = await User.findByIdAndUpdate(userId, {
      $pull : { activityLog: {createdAt: createdAt} }
    }, {new: true})
   
    await User.findByIdAndUpdate(senderId, {
        $push : {
          activityLog: {
            $each: [{message: `${user.name} accepted your request to borrow ${book}, get in touch now to organise collection!`, type: 'resolved', createdAt: Date.now()}],
            $position: 0 
        },
      },
    })
    res.send(user)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.rejectBookRequestCtrl = async (req, res) => {
  try {
    const {createdAt, userId, senderId, book} = req.body
    
    const user = await User.findByIdAndUpdate(userId, {
      $pull : { activityLog: {createdAt: createdAt} }
    }, {new: true})
   
    await User.findByIdAndUpdate(senderId, {
        $push : {
          activityLog: {
            $each: [{message: `${user.name} rejected your request to borrow ${book}.`, type: 'resolved', createdAt: Date.now()}],
            $position: 0 
        },
      },
    })
    res.send(user)
  } catch (error) {
    console.error('ERROR', error)
  }
}