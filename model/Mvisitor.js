// exports.getVisitors = () =>{
//     return [
//         { id: 1, name: '홍길동', comment: '내가왔다'},
//         { id: 2, name: '이찬혁', comment: '으라차차'},
//     ];
// };

const mysql = require('mysql');

//mysql 연결
const conn = mysql.createConnection({
    host: 'db-aws-asong-kdt9.coo95bktwkjx.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    database: 'kdt9',
    port : 3306,
});
conn.connect( (err)=>{
    if(err){
        console.log('error');
        return;
    }
    console.log('connect');
})

exports.getVisitors = (callback)=>{
    const query = 'SELECT * FROM visitor' //visitor 전체 선택
    conn.query(query, (err, rows)=>{ //mysql접속. 
        console.log(rows); //객체형태의 배열이 옴(visitor에 담긴 데이들이 rows에 옴)
        callback(rows); //callback함수에 rows가 담김  controller에서 사용할때 데이터가 담겨서 사용함
    });
};

exports.getVisitor = (id, callback)=>{
    const query = `SELECT * FROM visitor WHERE id=${id}`; // visitor/:id 였으면 파라미터 방식이여서 req.params.id 해야함
        conn.query(query, (err, rows)=>{
            if(err){
                console.log(err)
                return;
            }
            callback(rows)
        })
}

exports.postVisitor = (data, callback) =>{
    const query = `INSERT INTO visitor (name, comment) VALUES ('${data.name}', '${data.comment}')`; //''안넣으면 변수로 인식함
    conn.query(query, (err, rows)=>{
        console.log('rows', rows)
        callback(rows);
    });
}

exports.patchVisitor = (data, callback)=>{
    const query = `UPDATE visitor SET name='${data.name}', comment='${data.comment}' WHERE id='${data.id}'` 
    //문자열 처리 잊지말기, 클라이언트에서 입력값 받아서 쿼리문 작성 밑에 줄에서 실행
    conn.query(query, (err, rows)=>{ //수정됨
        console.log('rows',rows);
        if(err){
            console.log(err)
            //res.send({result: false});
            return;
        }
        callback(); //보낼건 없음.
        
    })
    
}

exports.deleteVisitor = (data, callback)=>{
    const query = `DELETE FROM visitor WHERE id=${data.id}`; //req인지 res인지 구분하기;;;
    conn.query(query, (err, rows)=>{
        if(err){
            console.log(err);
            // res.send({result:false});
        }
        callback();
    })
}