const exppress = require('express')
const router = exppress.Router()
const Book = require('../models/book')

//all books route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== '' ){
        searchOptions.title = new RegExp(req.query.title, 'i')
    } 
    try {
        const books = await Book.find(searchOptions)
        res.render('books/index', { 
            books: books,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
    res.render('books/index')
})

//new book route
router.get('/new', (req, res) => {
    res.render('books/new', { book: new Book() })
})

//create book route
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title
    })
    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect(`books`)
    } catch {
        res.render('books/new', {
         book: book,
         errorMessage: 'Error creating book'
         })
    }
})

module.exports = router