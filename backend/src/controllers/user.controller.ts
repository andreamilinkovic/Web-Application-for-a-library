import express from "express"
import historyModel from "../models/history.model"
import userModel from "../models/user.model"
import UserModel from "../models/user.model"

export class UserController{

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let password = req.body.password

        UserModel.findOne({"username": username, "password": password, "registered": true}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    signup = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let address = req.body.address
        let tel = req.body.tel
        let mail = req.body.mail
        let type = "citalac"
        let image = req.body.image
        let registered = false
        let blocked = false

        UserModel.findOne({$or:[{"username": username}, {"mail": mail}], "registered": true}, (err, user)=>{
            if(err) console.log(err);
            else if(user == null){
                UserModel.create({"username": username, "password": password, "firstname": firstname, "lastname": lastname, 
                    "address": address, "tel": tel, "mail": mail, "type": type, "image": image, "registered": registered, "blocked": blocked}, (err, resp)=>{
                        
                    if(err) console.log(err);
                    else res.json({"message": "Zahtev za registraciju je poslat."});
                })
            }
            else{
                res.json({"message": "Korisnik je vec registrovan."});
            }
        })
    }

    updateProfile = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let address = req.body.address
        let tel = req.body.tel
        let mail = req.body.mail
        let image = req.body.image
        let type = req.body.type

        UserModel.findOne({"mail": mail}, (err, resp)=>{
            if(err) console.log(err)
            else if(resp != null && resp.username != username){
               return res.json(null);
            }
            else{
                UserModel.updateOne({"username": username}, {"firstname": firstname, "lastname": lastname, "address": address, "tel": tel,
                        "mail": mail, "image": image, "type": type}, (err, resp)=>{
                    if(err) console.log(err)
                    else {
                        UserModel.findOne({"username": username}, (err, user)=>{
                            if(err) console.log(err);
                            else res.json(user);
                        })
                    }
                })
            }
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let password = req.body.old_password

        userModel.findOne({"username": username, "password": password}, (err, resp1)=>{
            if(err) console.log(err)
            else if(resp1 != null){
                password = req.body.new_password
                userModel.updateOne({"username": username}, {"password": password}, (err, resp2)=>{
                    if(err) console.log(err)
                    else return res.json({"message": "Lozinka je uspesno promenjena."})
                })
            }
            else{
                return res.json(null)
            }
        })
    }

    allUsers = (req: express.Request, res: express.Response) => {
        userModel.find({$or: [{"type": "citalac"}, {"type": "moderator"}]}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    registerUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        userModel.updateOne({"username": username}, {"registered": true}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    blockUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        userModel.updateOne({"username": username}, {"blocked": true}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    unblockUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        userModel.updateOne({"username": username}, {"blocked": false}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        historyModel.find({"person": username, "returned": ""}, (err, resp)=>{
            if(err) console.log(err)
            else if(resp.length == 0){
                userModel.deleteOne({"username": username}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({"message": "Korisnik je obrisan."})
                })
            }
            else{
                res.json({"message": "Korisnik nije vratio sve knjige."})
            }
        })        
    }

}