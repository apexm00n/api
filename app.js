const express = require('express')
const mongoose = require('mongoose')


const postRoutes = require('./routes/post-routes')
const commentRoutes = require('./routes/comment-routes')
const authRoutes = require('./routes/auth-routes')

const PORT = process.env.PORT || 3000

const app = express()


mongoose
  .connect('mongodb+srv://apexmoon:chepson123q@cluster0.ey4uq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called")
  console.log('Path: ', req.path)
  console.error('Error: ', error)
 
  if (error.type == 'redirect')
      res.redirect('/error')

   else if (error.type == 'time-out') // arbitrary condition check
      res.status(408).send(error)
  else
      res.status(500).send(error)
})


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/v1/user", authRoutes)
app.use('/api/v1/post', postRoutes)
app.use("/api/v1/comments", commentRoutes)
app.use("/api/v1/ping", (req, res) =>{
  res.send("api not dead")
})


app.use('/', (req, res, next) => {
    res.sendStatus(400)
})