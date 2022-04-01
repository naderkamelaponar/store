import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/users.model";
const user = new UserModel();
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await user.create(req.body);
    res.json({
      status: "Success",
      message: "New User has been created",
      data: { ...newUser },
    });
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
    res.json({
      status: "Successed",
      message: "Users have been retrived",
      data: { ...users },
    });
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
    const resault = await user.delete(req.params.id as string);
    const resJson = {
      status: "",
      message: "",
      data: {},
    };

    if (resault !== undefined) {
      resJson.status = "Succeded";
      resJson.message = "User has been deleted";
      resJson.data = { ...resault };
    } else {
      resJson.status = "Faild";
      resJson.message = "Something went wrong";
    }
    res.json(resJson);
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
    const resJson = {
      status: "",
      message: "",
      data: {},
    };

    if (update !== undefined) {
      resJson.status = "Succeded";
      resJson.message = "User has been Uodated";
      resJson.data = { ...update };
    } else {
      resJson.status = "Faild";
      resJson.message = "Something went wrong";
    }
    res.json(resJson);
  } catch (error) {
    next(error);
  }
};
