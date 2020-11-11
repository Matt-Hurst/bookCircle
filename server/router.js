const router = require('express').Router();
const { getCtrl, createUserCtrl, addBookCrtl, addFriendCtrl, confirmFriendCtrl } = require('./controller')

router.get('/', getCtrl)
router.post('/createUser', createUserCtrl)
router.post('/addBook', addBookCrtl)
router.post('/addFriend', addFriendCtrl)
router.post('/confirmFriend', confirmFriendCtrl)

// ROUTES REQUIRED TODO:

// TODO: get user info upon login => router.get('/:username')

// TODO: post friend to users friend array => router.post('/addFriend')

// TODO: remove book from library => router.delete('/removeBook') => if added wrong book for example

// TODO: update yearly target => router.put('/updateTarget')

module.exports = router