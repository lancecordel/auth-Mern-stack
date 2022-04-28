const { Router} = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/', (req, res) => res.send('This is the root!'))
// create PRODUCT
router.post('/admin/items', controllers.createItem)
// router.post('/users/register', controllers.createUser)

// DUPLICATE USER CREATOR, use above for UNIQUE USER
router.post('/users/register', controllers.createDuplicateUser)

router.get('/items', controllers.getAllItems)


router.get('/items/:id', controllers.getItemById)

router.put('/items/:id', controllers.updateItem)

router.delete('/items/:id', controllers.deleteItem)
router.delete('/users', controllers.deleteAllUsers)

module.exports = router