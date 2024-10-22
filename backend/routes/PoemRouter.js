const express = require('express')
const cors = require('cors')
const router = express.Router()
const {requireAuth} = require('../middleware/RequireAuth')
const {getAllPoems, getPoem, createPoem, updatePoem, deletePoem} = require('../controllers/PoemController')

router.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

router.use(requireAuth)

router.get('/', getAllPoems)

router.get('/:id', getPoem)

router.post('/', createPoem)

router.patch('/:id', updatePoem)
router.delete('/:id', deletePoem)

module.exports = router