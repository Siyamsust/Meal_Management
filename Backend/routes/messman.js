const express=require('express')
const router=express.Router();
const messmmancontroller=require('../controllers/messman');
router.post('/mess/create',messmmancontroller.createMess);
router.post('/mess/add/:id',messmmancontroller.addMem);
module.exports = router;