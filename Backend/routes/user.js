const express = require('express')
const connection = require('../connection')
const router = express.Router()
const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken')
require ('dotenv').config()
var auth = require('../services/authentication')
var checkRole = require('../services/checkRole')

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.post('/signup', (req, res) => {
    let user = req.body
    query = "select email from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if(!err){
            if(results.length <= 0){
               query = "insert into user (name, contactNumber, email, password, status, role) values (?,?,?,?,'false', 'user')" ;
               connection.query(query,[user.username, user.cnumber, user.email, user.password ] , (err, results) => {
                if(!err){
                    return res.status(200).json({message: "Registered Successfully."})
                }
                else{
                    return res.status(500).json(err)
                }
               })
            }
            else{
                return res.status(400).json({message: 'Email already Exist'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
}) 


router.post('/forgotPassword',(req, res ) => {
    const user = req.body
    query = "select email, password from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if(!err){
            if(results.length <= 0){
                return res.status(400).json({message: 'Email Not Found.'})
            }
            else{
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password Sent by RSKMart',
                    html: '<p><b>Password: </b><br></p><h1>'+results[0].password+'</h1><br><a href="http://localhost:4200/">click here to login</a>'
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("Mail Sent")
                        return res.status(200).json({message: "Password Sent to your email."})
                    }
                   
                })
            }
        }
        else{
           return res.status(500).json(err) 
        }
    })
}) 

router.post('/login', (req, res) => {
    const user = req.body
    console.log("User Email: ", user.email)
    query = "select email, password, role, status from user where email=?"
    connection.query(query, [user.email], (err, results)=>{
        if(!err){
            if(results.length <= 0 || results[0].password != user.password){
                console.log("Results Length: ", results.length)
                console.log("Given Password: ", user.password)
                // console.log("Original Password: ", results[0].password)
               return res.status(401).json({message: "Incorrect UserEmail/Password"}) 
            }
            else if(results[0].status === 'false'){
                return res.status(401).json({message: "Please wait for Admin Approval"})
            }
            else if(results[0].password == user.password){
               const payLoad = {
                email: results[0].email,
                role: results[0].role
               } 
               const accessToken = jwt.sign(payLoad, process.env.SECRET_KEY,{
                expiresIn: '2h'
               })
               return res.status(200).json({token: accessToken})
            }
            else{
                return res.status(500).json(err)
            }
        }
        else{
            return res.status(500).json({message:"Something went Wrong!"})
        }
    } )

})

router.get('/checkToken', (req, res) => {
    return res.status(200).json({message: 'true'})
})

router.post('/changePassword', (req, res) => {
    const user = req.body
    var query = "select * from user where email =? and password=?"
    connection.query(query, [user.email, user.oldPassword], (err, results)=>{
        if(!err){
            if(results.length <= 0){
                return res.status(400).json({message: 'Incorrect Old Password'})
            }
            else if(results[0].password == user.oldPassword){
                query= "update user set password=? where email =?"
                connection.query(query, [user.newPassword, user.email], (err, results) => {
                    if(!err){
                        return res.status(200).json({message: 'Password Updated Successfully'})
                    }
                    else{
                        return res.status(500).json(err)
                    }
                })
            }
            else{
                return res.status(400).json({message: 'Something Went wrong. Please try later'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res) => {
    var query =  "select id, name, email, contactNumber, status from user where role='user' "
    connection.query(query, (err, results) => {
        if(!err){
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err)
        }
    })
})



router.patch('/update', (req, res) => {
    let user = req.body
    var query = 'update user set status=? where id=?'
    connection.query(query, [user.status, user.id],  (err, results) =>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({messge: 'User Id does not found'})
            }
            else{
                return res.status(200).json({message: 'User Approved Successfully'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})






module.exports = router
