import express from "express"
import reviewModel from "../models/review.model"
import bookModel from "../models/book.model"
import historyModel from "../models/history.model"
import reservationModel from "../models/reservation.model"
import bookRequestModel from "../models/bookRequest.model"

export class BookController{

    allBooks = (req: express.Request, res: express.Response) => {
        bookModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books);
        })
    }

    getGrade = (req: express.Request, res: express.Response) => {
        let book = req.body.id

        reviewModel.find({"book": book}, (err, reviews)=>{
            if(err) console.log(err)
            else if(reviews.length > 0){
                let grade = 0
                for(let i = 0; i < reviews.length; i++){
                    grade += reviews[i].grade - 0
                }
                return res.json({"message": Math.round((grade / reviews.length + Number.EPSILON) * 100) / 100});
            }
            else{
                return res.json({"message": "Knjiga nije ocenjena."})
            }
        })
    }

    myRentedBooks = (req: express.Request, res: express.Response) => {
        let person = req.body.person;

        historyModel.find({"person": person, "returned": ""}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp);
        })
    }

    findBook = (req: express.Request, res: express.Response) => {
        let id = Number(req.body.id);

        bookModel.findOne({"id": id}, (err, book)=>{
            if(err) console.log(err)
            else res.json(book);
        })
    }

    myHistory = (req: express.Request, res: express.Response) => {
        let person = req.body.person;
    
        historyModel.find({"person": person}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp);
        })
    }

    extendDeadline = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let period = req.body.period;

        historyModel.findOne({"id": id}, (err, book)=>{
            if(err) console.log(err)
            else {
                let date = new Date(book.deadline)
                date.setDate(date.getDate() + period)
                let deadline = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                historyModel.updateOne({"id": id}, {"deadline": deadline, "extended": true}, (err, resp)=>{
                    if(err) console.log(err);
                    else res.json({"message": "ok"})
                })
            }
        })
    }

    searchByTitle_Author = (req: express.Request, res: express.Response) => {
        let param = req.body.param;

        if(param == "") param = null;

        if(param != null){
            bookModel.find({$or: [{"title": {$regex: param, $options:'i'}}, {"author": {$regex: param, $options:'i'}}]}, (err, books)=>{
                if(err) console.log(err);
                else res.json(books)
            })
        }
        else{
            res.json(null)
        }
    }

    searchByPublisher = (req: express.Request, res: express.Response) => {
        let param = req.body.param;

        if(param == "") param = null;

        if(param != null){
            bookModel.find({"publisher": {$regex: param, $options:'i'}}, (err, books)=>{
                if(err) console.log(err);
                else res.json(books)
            })
        }
        else{
            res.json(null)
        }
    }

    searchByYear = (req: express.Request, res: express.Response) => {
        let from = req.body.from;
        let to = req.body.to;

        if(from == "") from = null;
        if(to == "") to = null;

        if(from  != null && to != null){
            bookModel.find({"year": {$gte: from, $lte: to}}, (err, books)=>{
                if(err) console.log(err);
                else res.json(books)
            })
        } 
        else if(to != null){
            bookModel.find({"year": {$lte: to}}, (err, books)=>{
                if(err) console.log(err);
                else res.json(books)
            })
        }
        else if(from != null){
            bookModel.find({"year": {$gte: from}}, (err, books)=>{
                if(err) console.log(err);
                else res.json(books)
            })
        }
        else{
            res.json(null)
        }
    }

    isBooked = (req: express.Request, res: express.Response) => {
        let book = req.body.id
        let person = req.body.username

        historyModel.findOne({"book": book, "person": person, "returned": ""}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    isRented = (req: express.Request, res: express.Response) => {
        let book = req.body.id
        let person = req.body.username

        historyModel.findOne({"book": book, "person": person}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    isCommented = (req: express.Request, res: express.Response) => {
        let book = req.body.book
        let username = req.body.username

        reviewModel.findOne({"book": book, "username": username}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    bookReviews = (req: express.Request, res: express.Response) => {
        let book = req.body.id

        reviewModel.find({"book": book}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    addReview = (req: express.Request, res: express.Response) => {
        let book = req.body.book
        let username = req.body.username
        let comment = req.body.comment
        let grade = req.body.grade
        let date = new Date()
        let date_string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

        reviewModel.create({"book": book, "username": username, "comment": comment, "grade": grade, "date": date_string}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "Komentar je dodat."})
        })
    }

    updateReview = (req: express.Request, res: express.Response) => {
        let book = req.body.book
        let username = req.body.username
        let comment = req.body.comment
        let grade = req.body.grade

        reviewModel.updateOne({"book": book, "username": username}, {"comment": comment, "grade": grade, "edited": true}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "Komentar je izmenjen."})
        })
    }

    zaduzi = (req: express.Request, res: express.Response) => {
        let book = req.body.book
        let title = req.body.title
        let author = req.body.author 
        let image = req.body.image 
        let person = req.body.username 
        let booked = req.body.booked 
        let deadline = req.body.deadline

        bookModel.updateOne({"id": book}, {$inc: {"in_stock": -1, "booked": 1}}, (err, resp1)=>{
            if(err) console.log(err)
            else {
                historyModel.find({}, (err, resp2)=>{
                    if(err) console.log(err)
                    else {
                        historyModel.create({"id": (resp2.length+1), "book": book, "title": title, "author": author, "image": image,
                            "person": person, "booked": booked, "deadline": deadline, "returned": "", "extended": false}, (err, resp3)=>{
                                if(err) console.log(err)
                                else res.json({"message": "Knjiga je zaduzena."})
                        })
                    }
                })
            }
        })
    }

    rezervisi = (req: express.Request, res: express.Response) => {
        let book = req.body.book
        let person = req.body.person

        reservationModel.create({"book": book, "person": person, "accepted": false}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "Rezervisali ste knjigu."})
        })
    }

    razduzi = (req: express.Request, res: express.Response) => {
        let book = req.body.book
        let person = req.body.person
        
        let date = new Date()
        let returned = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

        historyModel.updateOne({"book": book, "person": person, "returned": ""}, {"returned": returned}, (err, resp)=>{
            if(err) console.log(err)
            else{
                bookModel.updateOne({"id": book}, {$inc: {"in_stock": 1}}, (err, resp)=>{
                    if(err) console.log(err)
                    else {
                        reservationModel.find({"book": book, "accepted": false}, (err, reservetions)=>{
                            if(err) console.log(err)
                            else res.json(reservetions)
                        })
                    }
                })
            } 
        })
    }

    myAcceptedReservations = (req: express.Request, res: express.Response) => {
        let person = req.body.person

        reservationModel.find({"person": person, "accepted": true}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    myReservations = (req: express.Request, res: express.Response) => {
        let person = req.body.person

        reservationModel.find({"person": person, "accepted": false}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    deleteReservations = (req: express.Request, res: express.Response) => {
        let person = req.body.person

        reservationModel.deleteMany({"person": person, "accepted": true}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    checkReservations = (req: express.Request, res: express.Response) => {
        let person = req.body.person
        let book = req.body.book

        let date = new Date();
        let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

        historyModel.find({"person": person, "returned": ""}, (err, resp1)=>{
            if(err) console.log(err)
            else if(resp1.length < 3){
                historyModel.find({"person": person, "returned": "", "deadline": {$lt: today}}, (err, resp2)=>{
                    if(err) console.log(err)
                    else if(resp2.length == 0){
                        reservationModel.updateOne({"person": person, "book": book}, {"accepted": true}, (err, resp3)=>{
                            if(err) console.log(err)
                            else res.json(resp2)
                        })
                    }
                    else{
                        res.json(resp2)
                    }
                })
            }
            else{
                res.json(resp1)
            }
        })
    }

    bookReservations = (req: express.Request, res: express.Response) => {
        let book = req.body.book

        reservationModel.find({"book": book, "accepted": false}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    addBookRequest = (req: express.Request, res: express.Response) => {
        let title = req.body.title
        let author = req.body.author
        let genre = req.body.genre
        let publisher = req.body.publisher
        let year = req.body.year
        let language = req.body.language
        let image = req.body.image
        let person = req.body.person

        bookRequestModel.create({"title": title, "author": author, "genre": genre, "publisher": publisher, "year": year,
            "language": language, "image": image, "person": person, "accepted": false}, (err, resp)=>{
                if(err) console.log(err)
                else res.json({"message": "ok"})
        })
    }

    getMyAcceptedBooks = (req: express.Request, res: express.Response) => {
        let person = req.body.person

        bookRequestModel.find({"person": person, "accepted": true}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    addBook = (req: express.Request, res: express.Response) => {
        let title = req.body.title
        let author = req.body.author
        let genre = req.body.genre
        let publisher = req.body.publisher
        let year = req.body.year
        let language = req.body.language
        let image = req.body.image

        bookModel.find({}, (err, resp)=>{
            if(err) console.log(err)
            else{
                bookModel.create({"id": (resp[resp.length - 1].id+1), "title": title, "author": author, "genre": genre, "publisher": publisher, 
                "year": year, "language": language, "image": image, "in_stock": 0, "booked": 0}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({"message": "ok"})
                })
            }
        })
    }

    updateBook = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let title = req.body.title
        let author = req.body.author
        let genre = req.body.genre
        let publisher = req.body.publisher
        let year = req.body.year
        let language = req.body.language
        let image = req.body.image
        let in_stock = req.body.in_stock

        bookModel.updateOne({"id": id}, {"title": title, "author": author, "genre": genre, "publisher": publisher, 
             "year": year, "language": language, "image": image, "in_stock": in_stock}, (err, resp)=>{
                 if(err) console.log(err)
                 else {
                     bookModel.findOne({"id": id}, (err, book)=>{
                         if(err) console.log(err)
                         else res.json(book)
                     })
                 }
         })
    }

    getBookRequests = (req: express.Request, res: express.Response) => {
        bookRequestModel.find({"accepted": false}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    updateBookRequest = (req: express.Request, res: express.Response) => {
        let title = req.body.title
        let person = req.body.person

        bookRequestModel.updateOne({"title": title, "person": person}, {"accepted": true}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    deleteBook = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let book = id.toString()

        historyModel.find({"book": book, "returned": ""}, (err, resp)=>{
            if(err) console.log(err)
            else if(resp.length == 0){
                bookModel.deleteOne({"id": id}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({"message": "Knjiga je obrisana."})
                })
            }
            else{
                res.json({"message": "Nisu sve knjige vracene."})
            }
        })
    }
}