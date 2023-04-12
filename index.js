const express =require('express')
const jwt = require('jsonwebtoken')

const application= express()

application.get('/api',(req,res)=>{
    res.json({
        message:"Working"
    })
}
)

application.post('/api/login', (req, res) => {
   
    const user = {
        id:1,
        username: 'Havish',
        email:'1234havish123@gmail.com'
    }

    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
})
application.post('/api/mlogin', (req, res) => {
   
    const user = {
        id:2,
        username: 'manager',
        email:'manager123@gmail.com'
    }

    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
})


application.post('/api/getleave',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,data)=>{
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                message:"Applying for leave"
            })
        }
        
    })
})




application.post('/api/leave/approved',verifyToken,(req,res)=>{

    const decoded= jwt.verify(req.token,'secretkey')
    
    jwt.verify(req.token,'secretkey',(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            if(decoded.user.username==='manager'){
                res.json({
                    message:"Leave is approved"
                })
            }
            else{
                res.json({
                    message:"Leave is not approved"
                })
            }
        }
    })
})


function verifyToken(req, res, next) {
    

    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {


        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        req.token = bearerToken;
        next();

    } else {
        // forbidden
        res.sendStatus(403);
    }
}


application.listen(5000,()=>{
    console.log('server started');
})