const connection = require('./connection')
const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')
const billRoute = require('./routes/bill')
const dashboardRoute = require('./routes/dashboard')


const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')


const options = {
    definition: {
        openapi: "3.1.0" ,
        info: {
            title: "MEAN Project API",
            version: "1.0.0"
        },
        servers: [
            {
                url : 'http://localhost:8080/'
            }
            
        ]
    },
    apis: ['./index.js']

}
const swaggerSpec = swaggerJsDoc(options)
/**
 * @swagger
 *  /user/get:
 *  get:
 *      summary: Some summary of get request
 *      description: Some Description here
 *      responses: 
 *          200:    
 *              description: To test get method
 */

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/category', categoryRoute)
app.use('/bill', billRoute)
app.use('/dashboard', dashboardRoute)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
module.exports = app