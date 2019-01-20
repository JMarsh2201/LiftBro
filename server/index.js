const express = require('express')
// Parse incoming request bodies in a middleware before your handlers
const bodyParser = require('body-parser')
// Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional
// HTTP headers to tell a browser to let a web application running at one origin
// (domain) have permission to access selected resources from a server at a different origin.
const cors = require('cors')
// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose')
const DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/liftbroapi';

const app = express()

// connects mongoose to either local or remote database
mongoose.connect(DB, {useNewUrlParser: true})

//Middleware
app.use(bodyParser.json())
app.use(cors())

// routes for user sign in and admin only exercise adding
const UserSignUpAndSignIn = require('./routes/api/signin.js')
const muscleGroupsRouter = require('./routes/api/muscleGroups.js')

app.use('/api', muscleGroupsRouter)
app.use('/api', UserSignUpAndSignIn)


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
