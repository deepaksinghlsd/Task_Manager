const express = require('express');
const {GetAllTask ,TaskCreate , TaskUpdate, TaskDelete} = require("../controller/TaskController")

const router = express.Router();

router.get('/', GetAllTask) 

router.post('/', TaskCreate)

router.put('/:id', TaskUpdate ) 

router.delete('/:id',TaskDelete) 

module.exports = router;