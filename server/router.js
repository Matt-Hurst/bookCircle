const router = require('express').Router();
const { authMiddleware } = require('./middleware/authMiddleware')
const { 
  getCurrentUserCtrl,
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
   getAvailableBooksCtrl,
   editBookCtrl,
   deleteBookCtrl,
   loginCtrl
   } = require('./controller')

// USER ROUTES
router.get('/getCurrentUser', authMiddleware, getCurrentUserCtrl)
router.get('/getUser/:name', authMiddleware, getUserCtrl)
router.post('/createUser', createUserCtrl)
router.post('/login', loginCtrl)
router.put('/updateTarget', authMiddleware, updateTargetCtrl)
router.delete('/removeActivityLogElement', authMiddleware, removeActivityLogElementCtrl)
//FRIEND ROUTES
router.get('/searchFriend/:name', authMiddleware, searchUsersCtrl)
router.post('/addFriend', authMiddleware, addFriendCtrl)
router.post('/confirmFriend', authMiddleware, confirmFriendCtrl)
router.delete('/rejectFriendRequest', authMiddleware, rejectFriendRequestCtrl)
router.get('/getFriendsNames/:id', authMiddleware, getFriendsNameCtrl)
//BOOK ROUTES
router.post('/addBook', authMiddleware, addBookCrtl)
router.post('/requestBook', authMiddleware, requestBookCtrl)
router.post('/acceptBookRequest', authMiddleware, acceptBookRequestCtrl)
router.post('/rejectBookRequest', authMiddleware, rejectBookRequestCtrl)
router.get('/availableBooks/:userId', authMiddleware, getAvailableBooksCtrl)
router.put('/editBook', authMiddleware, editBookCtrl)
router.delete('/deleteBook', authMiddleware, deleteBookCtrl )

module.exports = router