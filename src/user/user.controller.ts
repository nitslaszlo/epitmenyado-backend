import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "./user.dto";
import IUser from "./user.interface";
import userModel from "./user.model";

export default class UserController implements Controller {
    public path = "/users";
    public router = Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
        this.router.get(this.path, authMiddleware, this.getAllUsers);
        this.router.post(this.path, [authMiddleware, validationMiddleware(CreateUserDto, false)], this.createUser);
        this.router.patch(
            `${this.path}/:id`,
            [authMiddleware, validationMiddleware(CreateUserDto, true)],
            this.modifyUser,
        );
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteUser);
    }

    private createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: IUser = req.body;
            const createdDocument = new this.user({
                ...body,
            });
            const savedDocument = await createdDocument.save();
            res.send(savedDocument);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.user.find().then(users => {
                res.send(users);
            });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                // const userQuery = this.user.findById(id);
                // if (request.query.withPosts === "true") {
                //     userQuery.populate("posts").exec();
                // }
                const user = await this.user.findById(id);
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const userData: IUser = req.body;
                let new_password = undefined;
                if (userData.password) {
                    new_password = await bcrypt.hash(userData.password, 10);
                }
                const user = await this.user.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            name: userData.name,
                            email: userData.email,
                            password: new_password,
                            auto_login: userData.auto_login,
                            "address.city": userData.address?.city,
                            "address.country": userData.address?.country,
                            "address.street": userData.address?.street,
                        },
                    },
                    { new: true },
                );
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.user.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
