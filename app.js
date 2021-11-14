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

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/v1/user", authRoutes)
app.use('/api/v1/post', postRoutes)
app.use("/api/v1/comments", commentRoutes)



app.use('/', (req, res, next) => {
    res.sendStatus(400)
})