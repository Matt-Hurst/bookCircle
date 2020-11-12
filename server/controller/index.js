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
    await User.findOneAndUpdate(query, { 
      $push: { 
        pendingFriends: req.body.friend_id  
    }}, options);

    // needs to add message to person that user has attempted to contact
    // add message to the front of their activity log array
    const result = await User.findOneAndUpdate({_id: req.body.friend_id}, {
      $push: { 
        activityLog: {
          $each: [{message: `${req.body.user} wants to add you as a friend.`, type: 'friendRequest', senderId: req.body.name, activityId: 10}],
          $position: 0
     }}  
    })
    res.status(201).send(result)
  } catch (error) {
    console.error('MATT LOGGED THIS ERROR', error)
  }
}

exports.confirmFriendCtrl = async (req, res) => { 
  try {
    // { initiatorId: _id, responderId: _id }
    const { initiatorId, responderId, messageId } = req.body;

    // 1. get initiator info (previous user)
    await User.findByIdAndUpdate(initiatorId, {
      // b => add responderId to friends array
      $push : { friends: responderId },
      $pull : { pendingFriends: responderId }
    }, {new: true})
    // c => get responder info and add initiator id to friends array
    const responder = await User.findByIdAndUpdate(responderId, {
      $push : { friends: initiatorId },
      $pull : { activityLog: {activityId: messageId} }
    }, {new: true, safe: true});
    // const responder = await User.findById(responderId)

    // responder.friends.push(initiatorId);
    // responder.activityLog.pull({activityId: messageId})
    // responder.markModified("friends", "activityLog")
    // await responder.save()
    
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
    const {activityId, responderId, initiatorId} = req.body
    // data { activityId = _id, responderId: 12312, initiatorId: 12321 }
 
    // remove message from responder
    const responder = await User.findByIdAndUpdate(responderId, {
      $pull : { activityLog: {activityId: activityId} }
    }, {new: true})
    // remove responder id from initiator prending array
    const initiator = await User.findByIdAndUpdate(initiatorId, {
        $push : {
          activityLog: {
            $each: [{message: `${responder.name} rejected your friend request.`, type: 'rejectedFriendRequest', activityId: 11}],
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