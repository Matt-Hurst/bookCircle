const { init } = require('../model');
const User = require('../model');

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
    await User.findOneAndUpdate(query, { 
      $push: { 
        pendingFriends: req.body.friend_id  
    }}, options);

    // needs to add message to person that user has attempted to contact
    // add message to the front of their activity log array
    const result = await User.findOneAndUpdate({_id: req.body.friend_id}, {
      $push: { 
        activityLog: {
          $each: [{message: `${req.body.user} wants to add you as a friend.`, type: 'friendRequest', senderId: req.body.name, createdAt: Date.now()}],
          $position: 0
     }}  
    }, {new: true})
    res.status(201).send(result)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.confirmFriendCtrl = async (req, res) => { 
  try {
    // { initiatorId: _id, responderId: _id }
    const { initiatorId, responderId, createdAt } = req.body;

    // 1. get initiator info (previous user)
    await User.findByIdAndUpdate(initiatorId, {
      // b => add responderId to friends array
      $push : { friends: responderId },
      $pull : { pendingFriends: responderId }
    }, {new: true})
    // c => get responder info and add initiator id to friends array
    const responder = await User.findByIdAndUpdate(responderId, {
      $push : { friends: initiatorId },
      $pull : { activityLog: {createdAt: createdAt} }
    }, {new: true, safe: true});  
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

exports.rejectFriendRequestCtrl = async (req, res) => {
  try {
    const {createdAt, responderId, initiatorId} = req.body
    // data { createdAt = _id, responderId: 12312, initiatorId: 12321 }
 
    // remove message from responder
    const responder = await User.findByIdAndUpdate(responderId, {
      $pull : { activityLog: {createdAt: createdAt} }
    }, {new: true})
    // remove responder id from initiator prending array
    const initiator = await User.findByIdAndUpdate(initiatorId, {
        $push : {
          activityLog: {
            $each: [{message: `${responder.name} rejected your friend request.`, type: 'rejectedFriendRequest', createdAt: Date.now()}],
            $position: 0 
        },
      },
      $pull : { pendingFriends: responderId }
    }, {new: true})
    // add rejected friend request to activity log
    res.send(initiator.activityLog)
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