const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require ('express');
const Book = require('../model/Book'); 
const { getAllBooks, getById, addBook, updateBook, deleteBook } = require("../controllers/books-controller"); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Book Controller', () => {
  // Define test data
  const testBookData = {
    name: 'Test Book',
    author: 'Test Author',
    description: 'Test Description',
    price: 19.99,
    available: true,
    image: 'test.jpg',
  };

  let testBookId;

  // Clear the database before running the tests
  before(async () => {
    await Book.deleteMany({});
    const book = new Book(testBookData);
    await book.save();
    testBookId = book._id;
  });

  // Test for getAllBooks
  describe('getAllBooks', () => {
    it('should return all books', (done) => {
      chai
        .request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.books).to.be.an('array');
          done();
        });
    });
  });

  // Test for getById
  describe('getById', () => {
    it('should return a book by ID', (done) => {
      chai
        .request(app)
        .get(`/api/books/${testBookId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.book).to.be.an('object');
          expect(res.body.book.name).to.equal(testBookData.name);
          done();
        });
    });

    it('should return 404 when book ID is not found', (done) => {
      chai
        .request(app)
        .get('/api/books/invalidId')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Test for addBook
  describe('addBook', () => {
    it('should add a new book', (done) => {
      chai
        .request(app)
        .post('/api/books')
        .send(testBookData) // Send the test data
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.book).to.be.an('object');
          expect(res.body.book.name).to.equal(testBookData.name);
          done();
        });
    });
  });

  // Test for updateBook
  describe('updateBook', () => {
    it('should update a book by ID', (done) => {
      const updatedBookData = {
        name: 'Updated Book',
        author: 'Updated Author',
        description: 'Updated Description',
        price: 29.99,
        available: false,
        image: 'updated.jpg',
      };

      chai
        .request(app)
        .put(`/api/books/${testBookId}`)
        .send(updatedBookData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.book).to.be.an('object');
          expect(res.body.book.name).to.equal(updatedBookData.name);
          done();
        });
    });

    it('should return 404 when book ID is not found', (done) => {
      chai
        .request(app)
        .put('/api/books/invalidId')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Test for deleteBook
  describe('deleteBook', () => {
    it('should delete a book by ID', (done) => {
      chai
        .request(app)
        .delete(`/api/books/${testBookId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Product Successfully Deleted');
          done();
        });
    });

    it('should return 404 when book ID is not found', (done) => {
      chai
        .request(app)
        .delete('/api/books/invalidId')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  after(async () => {
    await Book.deleteMany({});
  });
});
