const express = require('express')
const connection = require('../connection')
const router = express.Router()
const nodeMailer = require('nodemailer')



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

module.exports = router
