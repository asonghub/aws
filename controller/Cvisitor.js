// const Visitor = require('../model/Mvisitor')
const models = require('../models') 

exports.main = (req, res)=>{
    res.render('index');
};
    //res.render('visitor',{data: Visitor.getVisitors()});

exports.getVisitors = (req,res) =>{ //방명록 전체 가져오기 
    // Visitor.getVisitors((rows)=>{
    //     res.render('visitor', { data: rows });//rows를 data에 담아서 visitor.ejs로 보내줌
    // });

    //select * from visitor
    models.Visitor.findAll().then( result =>{
        console.log('findAll',result)
        // res.render('visitor',{ data: result}); //렌더링 하는것. ejs를 렌더링 어떤걸 랜더링 할지 지정, 그리고 그 ejs안에 데이터를 넣음. 객체형태로 그래서 ejs안에서 데이터 접근 가능
        res.send({ hahah: result}) //send는 데이터만 보낼때 사용. 
    });
};

//방명록 하나 조회
exports.getVisitor =(req,res) =>{
    // Visitor.getVisitor(req.query.id, (result) =>{
    //     res.render('visitor', {data: result}); //길이가 1인 배열로 나옴. 
    // });
    models.Visitor.findOne({ //배열로 안나오고 객체로 나옴. 하나만 나오니까
        where: { id: req.query.id},
    }).then(result =>{
        console.log([result])
        res.render('visitor',{ data: [result] }); //다시 배열로 해줘야 오류 안남
    });
    };

//방명록 하나 추가
exports.postVisitor = (req,res)=>{
    // Visitor.postVisitor(req.body, (result)=>{
    //     res.send({id: result.insertId, name: result.name, comment:result.comment });
    //     // callback(rows);
    // });
    models.Visitor.create({
        name: req.body.name,
        comment: req.body.comment
    }).then(result=>{
        console.log(result)
        res.send({id: result.dataValues.id, name: req.body.name, comment:req.body.comment });
    });
};

//방명록 하나 수정
exports.patchVisitor = (req,res)=>{
    // Visitor.patchVisitor(req.body, ()=>{ //req.body를 보내고 콜백함수 들어감. 수정할때는 받아올게 없으니까 매개변수 필요없음. 
    //     res.send({result:true});
    // })
    models.Visitor.update(
        {
        name: req.body.name,
        comment: req.body.comment,
        },{
            where: {id: req.body.id}
        }
    ).then(()=>{
        res.send({result: true});
    });
};

//방명록 하나 삭제
exports.deleteVisitor = (req,res)=>{
    // res.send('방명록 하나 삭제');
    // Visitor.deleteVisitor(req.body, ()=>{
    //     res.send({result:true});
    // })
    models.Visitor.destroy({
        where : { id: req.body.id }
    }).then(()=>{
        res.send({result: true});
    });
};