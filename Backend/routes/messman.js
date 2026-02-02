const express=require('express')
const router=express.Router();
const messmmancontroller=require('../controllers/messman');
router.post('/mess/create',messmmancontroller.createMess);
router.post('/mess/add/:id',messmmancontroller.addMem);
router.get('/users/search',messmmancontroller.searchMem);
router.get('/mess/:id/members',messmmancontroller.messMember);
router.put('/mess/:id/change-manager', messmmancontroller.editMan);
module.exports = router;