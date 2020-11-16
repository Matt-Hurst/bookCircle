const router = require('express').Router();
const { 
  getCtrl, 
  createUserCtrl, 
  addBookCrtl, 
  addFriendCtrl,
   confirmFriendCtrl, 
   updateTargetCtrl,
   rejectFriendRequestCtrl,
   removeActivityLogElementCtrl,
   getUserCtrl,
   getFriendsNameCtrl,
   requestBookCtrl,
   acceptBookRequestCtrl,
   rejectBookRequestCtrl,
   searchUsersCtrl,
   getAvailableBooksCtrl
   } = require('./controller')

router.get('/', getCtrl)
// USER ROUTES
router.get('/getUser/:name', getUserCtrl)
router.post('/createUser', createUserCtrl)
router.put('/updateTarget', updateTargetCtrl) //TODO: Can this be deleted??
router.delete('/removeActivityLogElement', removeActivityLogElementCtrl)
//FRIEND ROUTES
router.get('/searchFriend/:name', searchUsersCtrl)
router.post('/addFriend', addFriendCtrl)
router.post('/confirmFriend', confirmFriendCtrl)
router.delete('/rejectFriendRequest', rejectFriendRequestCtrl)
router.get('/getFriendsNames/:id', getFriendsNameCtrl)
//BOOK ROUTES
router.post('/addBook', addBookCrtl)
router.post('/requestBook', requestBookCtrl)
router.post('/acceptBookRequest', acceptBookRequestCtrl)
router.post('/rejectBookRequest', rejectBookRequestCtrl)
router.get('/availableBooks/:userId', getAvailableBooksCtrl)

// ROUTES REQUIRED TODO:

// TODO: get user info upon login => router.get('/:username')

// TODO: remove book from library => router.delete('/removeBook') => if added wrong book for example


module.exports = router