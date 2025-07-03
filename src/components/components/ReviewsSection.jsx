"use client"

import { useState } from "react"
import Card from "./Card"
import Button from "./Button"
import Badge from "./Badge"

const ReviewsSection = ({ reviews = [], restaurantId, restaurantName }) => {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showAddReview, setShowAddReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
    name: "",
    email: "",
  })
  const [sortBy, setSortBy] = useState("newest")

  // Calculate review statistics
  const totalReviews = reviews.length
  const averageRating =
    totalReviews > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1) : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      totalReviews > 0 ? (reviews.filter((review) => review.rating === rating).length / totalReviews) * 100 : 0,
  }))

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date)
      case "oldest":
        return new Date(a.date) - new Date(b.date)
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      default:
        return 0
    }
  })

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3)

  const handleSubmitReview = (e) => {
    e.preventDefault()
    alert(`Thank you for your review! Your feedback helps ${restaurantName} improve their service.`)
    setNewReview({
      rating: 5,
      title: "",
      comment: "",
      name: "",
      email: "",
    })
    setShowAddReview(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const renderStars = (rating, size = "medium") => {
    return (
      <div className={`star-rating ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? "filled" : "empty"}`}>
            ⭐
          </span>
        ))}
      </div>
    )
  }

  return (
    <Card className="reviews-section">
      <div className="reviews-header">
        <h3 className="reviews-title">Customer Reviews</h3>
        <Button variant="primary" size="medium" onClick={() => setShowAddReview(true)}>
          Write a Review
        </Button>
      </div>

      {/* Review Summary */}
      <div className="review-summary">
        <div className="rating-overview">
          <div className="average-rating">
            <span className="rating-number">{averageRating}</span>
            {renderStars(Math.round(averageRating), "large")}
            <span className="total-reviews">Based on {totalReviews} reviews</span>
          </div>

          <div className="rating-breakdown">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="rating-bar">
                <span className="rating-label">{rating} ⭐</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="rating-count">({count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Controls */}
      {totalReviews > 0 && (
        <div className="review-controls">
          <div className="sort-controls">
            <label className="sort-label">Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {totalReviews === 0 ? (
          <div className="no-reviews">
            <div className="no-reviews-icon">💬</div>
            <h4>No reviews yet</h4>
            <p>Be the first to share your experience with {restaurantName}!</p>
          </div>
        ) : (
          <>
            {displayedReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">{review.user.charAt(0).toUpperCase()}</div>
                    <div className="reviewer-details">
                      <h5 className="reviewer-name">{review.user}</h5>
                      <span className="review-date">{formatDate(review.date)}</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <Badge variant="secondary" size="small">
                      {review.rating}/5
                    </Badge>
                  </div>
                </div>

                {review.title && <h6 className="review-title">{review.title}</h6>}

                <p className="review-comment">{review.comment}</p>

                {review.helpful && (
                  <div className="review-actions">
                    <button className="helpful-btn">👍 Helpful ({review.helpful})</button>
                  </div>
                )}
              </div>
            ))}

            {totalReviews > 3 && (
              <div className="show-more-reviews">
                <Button variant="outline" size="medium" onClick={() => setShowAllReviews(!showAllReviews)}>
                  {showAllReviews ? "Show Less Reviews" : `Show All ${totalReviews} Reviews`}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddReview && (
        <div className="modal-overlay">
          <div className="modal-container">
            <Card className="review-modal">
              <div className="modal-header">
                <h3 className="modal-title">Write a Review for {restaurantName}</h3>
                <button className="modal-close" onClick={() => setShowAddReview(false)} aria-label="Close modal">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="review-form">
                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">Your Rating *</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${star <= newReview.rating ? "active" : ""}`}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        >
                          ⭐
                        </button>
                      ))}
                      <span className="rating-text">
                        {newReview.rating === 1 && "Poor"}
                        {newReview.rating === 2 && "Fair"}
                        {newReview.rating === 3 && "Good"}
                        {newReview.rating === 4 && "Very Good"}
                        {newReview.rating === 5 && "Excellent"}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Review Title</label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      className="form-input"
                      placeholder="Summarize your experience"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review *</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="form-textarea"
                      placeholder="Share your experience with the food, service, and atmosphere..."
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="form-input"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email (Optional)</label>
                      <input
                        type="email"
                        value={newReview.email}
                        onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                        className="form-input"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <Button type="button" variant="outline" onClick={() => setShowAddReview(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Submit Review
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </Card>
  )
}

export default ReviewsSection
