const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))

const reviewSchema = new mongoose.Schema({
    name: String,
    message: String,
    rating: Number
})

const Review = mongoose.model('Review', reviewSchema)

app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json(reviews)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

app.post('/reviews', async (req, res) => {
    const { name, message, rating } = req.body
    const review = new Review({
        name,
        message,
        rating
    })

    try {
        const savedReview = await review.save()
        res.status(201).json(savedReview)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useFindOneAndUpdate: false,
    useDeleteMany: true
})

mongoose.Promise.then(() => {
    console.log('Connected to DB!')
}).catch((err) => {
    console.error(err.message)
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
async function submitReview() {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const rating = parseInt(document.getElementById('rating').value;

  const response = await fetch('/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, message, rating })
  });

  const result = await response.json();

  if (result && result.success) {
    console.log('Successfully submitted review');
  } else {
    console.warn('Failed to submit review');
  }
}

document.getElementById('review-form').addEventListener('submit', event => {
  event.preventDefault();
  submitReview();
});
