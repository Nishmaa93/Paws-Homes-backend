const Appointment = require("../models/appointment_model")

// ✅ Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const { appointmentDate, appointmentTime, reason } = req.body;

        // Ensure required fields are provided
        if (!appointmentDate || !appointmentTime || !reason) {
            return res.status(400).json({
                success: false,
                message: "All fields (appointmentDate, appointmentTime, reason) are required",
            });
        }

        const newAppointment = new Appointment({
            userId: req.user.id, // Assuming `req.user.id` is set via authentication middleware
            appointmentDate,
            appointmentTime,
            reason,
        });

        await newAppointment.save();

        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            appointment: newAppointment,
        });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({
            success: false,
            message: "Error creating appointment",
            error: error.message,
        });
    }
};

// ✅ Get all appointments for the logged-in user
const getAppointmentsByUserId = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.id });

        if (appointments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No appointments found for this user",
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            appointments,
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching appointments",
            error: error.message,
        });
    }
};

// ✅ Update appointment status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        // Ensure valid status
        if (!["pending", "confirmed", "canceled", "completed"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment: updatedAppointment,
        });
    } catch (error) {
        console.error("Error updating appointment status:", error);
        res.status(500).json({
            success: false,
            message: "Error updating appointment status",
            error: error.message,
        });
    }
};

// ✅ Delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting appointment",
            error: error.message,
        });
    }
};

// Export controllers
module.exports = {
    createAppointment,
    getAppointmentsByUserId,
    updateAppointmentStatus,
    deleteAppointment
};
