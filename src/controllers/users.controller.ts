import config from "../config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/users.model";
const user = new UserModel();
const token = (u: User): string => {
  return jwt.sign({ user: u }, config.tokenSecret as string);
};
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await user.create(req.body);
    if (newUser) {
      //const token = jwt.sign({ user: newUser }, config.tokenSecret as string);
      res.json({
        status: "Success",
        message: "New User has been created",
        data: { user: newUser, token: token(newUser) },
      });
    } else {
      res.status(400).json({
        status: "Faild",
        message: "Couldn't create a new user",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const selectUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.id;
    const selectedUser = await user.selectUser(userId);
    console.log(userId, req.params);
    if (selectedUser) {
      res.json({
        status: "Success",
        message: "Selected a user",
        data: { user: selectedUser },
      });
    } else {
      res.status(400).json({
        status: "Faild",
        message: "Couldn't Select a user",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const selectAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await user.selectAll();

    if (users.length) {
      res.json({
        status: "Succeded",
        message: "Selected All Users",
        users: { ...users },
      });
    } else {
      res.status(400).send({
        status: "Faild",
        message: "Something went wrong",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resault = await user.delete(req.body.id);
    if (resault !== undefined) {
      res.json({
        status: "Succeded",
        message: "User has been deleted",
        data: resault,
      });
    } else {
      res
        .status(400)
        .json({ status: "Faild", message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = await user.updateUser(req.body);

    if (update !== null) {
      res.json({
        status: "Succeded",
        message: "User has been Updated",
        data: { user: update, token: token(update) },
      });
    } else {
      res
        .status(400)
        .json({ status: "Faild", message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
export const authinticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const userInfo = await user.login(username, password);
    if (userInfo?.username === username) {
      res.json({
        status: "Succeded",
        message: "Authorized User",
        data: { user: userInfo, token: token(userInfo as User) },
      });
    } else {
      res.status(401).json({
        status: "Faild",
        message: "UnAuthorized User",
      });
    }
  } catch (error) {
    next(error);
  }
};
