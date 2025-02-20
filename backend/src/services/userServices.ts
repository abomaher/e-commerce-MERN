import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";

interface RegisterParams {
  fristName: string;
  lastName: string;
  email: string;
  password: string;
}
export const register = async ({
  fristName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email: email });

  if (findUser) {
    return { data: "User already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    fristName: fristName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();

  return { data: generateJWT({ fristName, lastName, email }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email: email });

  if (!findUser) {
    return { data: "Incorrect email or password!!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return {
      data: generateJWT({
        email,
        fristName: findUser.fristName,
        lastName: findUser.lastName,
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect email or password!!", statusCode: 400 };
};

interface MyOrderParams {
  userId: string;
}

export const getMyOrder = async ({ userId }:MyOrderParams) => {
  try{
    return { data: await orderModel.find({ userId }), statusCode: 200 }
  }catch (err){
    throw err;
  }
}

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || "");
};
