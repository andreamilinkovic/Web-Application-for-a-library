import express from "express"
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/login").post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route("/signup").post(
    (req, res) => new UserController().signup(req, res)
)

userRouter.route("/updateProfile").post(
    (req, res) => new UserController().updateProfile(req, res)
)

userRouter.route("/changePassword").post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route("/allUsers").get(
    (req, res) => new UserController().allUsers(req, res)
)

userRouter.route("/registerUser").post(
    (req, res) => new UserController().registerUser(req, res)
)

userRouter.route("/blockUser").post(
    (req, res) => new UserController().blockUser(req, res)
)

userRouter.route("/unblockUser").post(
    (req, res) => new UserController().unblockUser(req, res)
)

userRouter.route("/deleteUser").post(
    (req, res) => new UserController().deleteUser(req, res)
)

export default userRouter;