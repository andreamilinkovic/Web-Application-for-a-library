import express from "express"
import { BookController } from "../controllers/book.controller";

const bookRouter = express.Router();

bookRouter.route("/allBooks").get(
    (req, res) => new BookController().allBooks(req, res)
)

bookRouter.route("/getGrade").post(
    (req, res) => new BookController().getGrade(req, res)
)

bookRouter.route("/myRentedBooks").post(
    (req, res) => new BookController().myRentedBooks(req, res)
)

bookRouter.route("/findBook").post(
    (req, res) => new BookController().findBook(req, res)
)

bookRouter.route("/myHistory").post(
    (req, res) => new BookController().myHistory(req, res)
)

bookRouter.route("/extendDeadline").post(
    (req, res) => new BookController().extendDeadline(req, res)
)

bookRouter.route("/searchByTitle_Author").post(
    (req, res) => new BookController().searchByTitle_Author(req, res)
)

bookRouter.route("/searchByPublisher").post(
    (req, res) => new BookController().searchByPublisher(req, res)
)

bookRouter.route("/searchByYear").post(
    (req, res) => new BookController().searchByYear(req, res)
)

bookRouter.route("/isBooked").post(
    (req, res) => new BookController().isBooked(req, res)
)

bookRouter.route("/isRented").post(
    (req, res) => new BookController().isRented(req, res)
)

bookRouter.route("/isCommented").post(
    (req, res) => new BookController().isCommented(req, res)
)

bookRouter.route("/bookReviews").post(
    (req, res) => new BookController().bookReviews(req, res)
)

bookRouter.route("/addReview").post(
    (req, res) => new BookController().addReview(req, res)
)

bookRouter.route("/updateReview").post(
    (req, res) => new BookController().updateReview(req, res)
)

bookRouter.route("/zaduzi").post(
    (req, res) => new BookController().zaduzi(req, res)
)

bookRouter.route("/rezervisi").post(
    (req, res) => new BookController().rezervisi(req, res)
)

bookRouter.route("/razduzi").post(
    (req, res) => new BookController().razduzi(req, res)
)

bookRouter.route("/checkReservations").post(
    (req, res) => new BookController().checkReservations(req, res)
)

bookRouter.route("/myAcceptedReservations").post(
    (req, res) => new BookController().myAcceptedReservations(req, res)
)

bookRouter.route("/myReservations").post(
    (req, res) => new BookController().myReservations(req, res)
)

bookRouter.route("/bookReservations").post(
    (req, res) => new BookController().bookReservations(req, res)
)

bookRouter.route("/deleteReservations").post(
    (req, res) => new BookController().deleteReservations(req, res)
)

bookRouter.route("/addBookRequest").post(
    (req, res) => new BookController().addBookRequest(req, res)
)

bookRouter.route("/getMyAcceptedBooks").post(
    (req, res) => new BookController().getMyAcceptedBooks(req, res)
)

bookRouter.route("/addBook").post(
    (req, res) => new BookController().addBook(req, res)
)

bookRouter.route("/updateBook").post(
    (req, res) => new BookController().updateBook(req, res)
)

bookRouter.route("/getBookRequests").get(
    (req, res) => new BookController().getBookRequests(req, res)
)

bookRouter.route("/updateBookRequest").post(
    (req, res) => new BookController().updateBookRequest(req, res)
)

bookRouter.route("/deleteBook").post(
    (req, res) => new BookController().deleteBook(req, res)
)

export default bookRouter;