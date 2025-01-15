// const bookingController = require("../controllers/bookingController");
// const Booking = require("../models/Booking");
// const User = require("../models/User");

// jest.mock("../models/Booking");
// jest.mock("../models/User");

// describe("Booking Controller Tests", () => {
//   let req, res;

//   beforeEach(() => {
//     req = {
//       user: { id: "123456" },
//       body: {},
//     };
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//   });

//   describe("createBookings", () => {
//     it("should create a new booking", async () => {
//       const newBookingData = {
//         place: "place_id",
//         checkIn: "2025-01-01",
//         checkOut: "2025-01-10",
//         numOfGuests: 2,
//         name: "John Doe",
//         phone: "1234567890",
//         price: 100,
//       };

//       req.body = newBookingData;
//       Booking.create.mockResolvedValue(newBookingData);

//       await bookingController.createBookings(req, res);

//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ booking: newBookingData });
//     });

//     it("should handle errors when creating a booking", async () => {
//       const newBookingData = {
//         place: "place_id",
//         checkIn: "2025-01-01",
//         checkOut: "2025-01-10",
//         numOfGuests: 2,
//         name: "John Doe",
//         phone: "1234567890",
//         price: 100,
//       };

//       req.body = newBookingData;
//       Booking.create.mockRejectedValue(new Error("Database error"));

//       await bookingController.createBookings(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({
//         message: "Internal server error",
//         error: expect.any(Error),
//       });
//     });
//   });

//   describe("getBookings", () => {
//     it("should return user specific bookings", async () => {
//       const bookings = [
//         { place: "place_id", checkIn: "2025-01-01", checkOut: "2025-01-10" },
//       ];

//       // Mock de la méthode find et populate
//       Booking.find.mockReturnValue({
//         populate: jest.fn().mockResolvedValue(bookings),
//       });

//       await bookingController.getBookings(req, res);

//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({
//         booking: bookings,
//         success: true,
//       });
//     });

//     it("should handle errors when fetching bookings", async () => {
//       Booking.find.mockReturnValue({
//         populate: jest.fn().mockRejectedValue(new Error("Database error")),
//       });

//       await bookingController.getBookings(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({
//         message: "Internal server error",
//         error: expect.any(Error),
//       });
//     });
//   });
// });

const bookingController = require("../controllers/bookingController");
const Booking = require("../models/Booking");
const User = require("../models/User");

jest.mock("../models/Booking");
jest.mock("../models/User");

describe("Booking Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: "123456" },
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("createBookings", () => {
    it("should create a new booking", async () => {
      const newBookingData = {
        place: "place_id",
        checkIn: "2025-01-01",
        checkOut: "2025-01-10",
        numOfGuests: 2,
        name: "John Doe",
        phone: "1234567890",
        price: 100,
      };

      req.body = newBookingData;
      Booking.create.mockResolvedValue(newBookingData);

      await bookingController.createBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ booking: newBookingData });
    });

    it("should handle errors when creating a booking", async () => {
      const newBookingData = {
        place: "place_id",
        checkIn: "2025-01-01",
        checkOut: "2025-01-10",
        numOfGuests: 2,
        name: "John Doe",
        phone: "1234567890",
        price: 100,
      };

      req.body = newBookingData;
      Booking.create.mockRejectedValue(new Error("Database error"));

      await bookingController.createBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: expect.any(Error),
      });
    });
  });

  describe("getBookings", () => {
    it("should return user specific bookings", async () => {
      const bookings = [
        { place: "place_id", checkIn: "2025-01-01", checkOut: "2025-01-10" },
      ];

      // Mock de la méthode find et populate
      Booking.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(bookings),
      });

      await bookingController.getBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        booking: bookings,
        success: true,
      });
    });

    it("should handle errors when fetching bookings", async () => {
      Booking.find.mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      await bookingController.getBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: expect.any(Error),
      });
    });
  });
});
