const express = require('express');
const controller = require('../controller/Cvisitor'); //router는 controller에게 명령
const router = express.Router();

//get /visitor 방명록 전체 보이기
router.get('/', controller.getVisitors);

//get /visitor/get 방명록 하나 조회 이건 queryString임
router.get('/get', controller.getVisitor);

// //post /visitor/write 방명록 하나 생성
router.post('/write', controller.postVisitor);

// //patch /visitor/edit 방명록 하나 수정
router.patch('/edit', controller.patchVisitor);

// //delete /visitor/delete 방명록 하나 삭제
router.delete('/delete', controller.deleteVisitor);


module.exports = router;