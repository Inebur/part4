const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

/*
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = require('./models/blogs')

//const mongoUrl = 'mongodb+srv://phonebook-app-full:evangelion@cluster0.mppidvy.mongodb.net/?retryWrites=true&w=majority'
//mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/
//const PORT = 3003

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})