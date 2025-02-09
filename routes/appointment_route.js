const express = require("express");
const router = express.Router();
const {
    createAppointment,
    getAppointmentsByUserId,
    updateAppointmentStatus,
    deleteAppointment
} = require("../controllers/appointment_controller");
const { authGuard } = require("../middleware/authGuard");

// Middleware to authenticate user (if using authentication)

// ✅ Route to create a new appointment
router.post("/",authGuard,createAppointment);

// ✅ Route to get all appointments for the logged-in user
router.get("/",authGuard,getAppointmentsByUserId);

// ✅ Route to update appointment status
router.put("/:appointmentId",authGuard,updateAppointmentStatus);

// ✅ Route to delete an appointment
router.delete("/:appointmentId",authGuard,deleteAppointment);

module.exports = router;
