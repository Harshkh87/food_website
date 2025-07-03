"use client"

import { useState } from "react"
import Card from "./Card"
import Button from "./Button"

const RestaurantActions = ({ restaurant }) => {
  const [showBookingModal, setShowBookingModal] = useState(null)
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    guests: 2,
    name: "",
    phone: "",
    specialRequests: "",
  })

  const handleBooking = (type) => {
    setShowBookingModal(type)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    const bookingType = showBookingModal === "table" ? "Table" : "Birthday Party"
    alert(`${bookingType} booking request submitted! We'll call you to confirm.`)
    setShowBookingModal(null)
    setBookingData({
      date: "",
      time: "",
      guests: 2,
      name: "",
      phone: "",
      specialRequests: "",
    })
  }

  const handleCallWaiter = () => {
    alert("Waiter has been notified! They will be with you shortly.")
  }

  return (
    <>
      <Card className="restaurant-actions-card">
        <h3 className="actions-title">Quick Actions</h3>
        <div className="actions-grid">
          <Button variant="primary" size="medium" icon="📅" onClick={() => handleBooking("table")}>
            Book Table
          </Button>
          <Button variant="secondary" size="medium" icon="🎉" onClick={() => handleBooking("party")}>
            Birthday Party
          </Button>
          <Button variant="outline" size="medium" icon="🔔" onClick={handleCallWaiter}>
            Call Waiter
          </Button>
          <Button variant="outline" size="medium" icon="📞" onClick={() => window.open(`tel:${restaurant.phone}`)}>
            Call Restaurant
          </Button>
        </div>
      </Card>

      {showBookingModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <Card className="booking-modal">
              <div className="modal-header">
                <h3 className="modal-title">
                  {showBookingModal === "table" ? "Book a Table" : "Birthday Party Booking"}
                </h3>
                <button className="modal-close" onClick={() => setShowBookingModal(null)} aria-label="Close modal">
                  ✕
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Time *</label>
                    <input
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Guests *</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: Number.parseInt(e.target.value) })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {showBookingModal === "party" && (
                  <div className="form-group">
                    <label className="form-label">Special Requests</label>
                    <textarea
                      placeholder="Cake preferences, decorations, special arrangements..."
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                      className="form-textarea"
                      rows="3"
                    />
                  </div>
                )}

                <div className="modal-actions">
                  <Button type="button" variant="outline" onClick={() => setShowBookingModal(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

export default RestaurantActions
