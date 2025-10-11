"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ReactElement } from "react";
import { Button } from "../components/ui/button";
import { registerUser } from "@/api/auth";
import { Tuple } from "@reduxjs/toolkit";

type Inputs = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: string;
};

export default function SignUp(): ReactElement {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    registerUser({ ...data });
  };

  return (
    <div className="text-shadow-black font-bold flex flex-col rounded-2xl bg-white backdrop-blur-[1px] opacity-10 w-[35vw] m-auto mt-20 items-center">
      <form
        action="post"
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="text-3xl m-5">SignUp</span>
        <div className="flex flex-col gap-5 items-center">
          <div className="fullname flex gap-5 w-full pl-10 pr-7">
            <label htmlFor="fullname">Fullname :</label>
            <input
              {...register("fullname")}
              id="fullname"
              placeholder="fullname"
              className="p-1 pl-4 flex-1 rounded-[1rem] shadow-sm shadow-black"
            />
          </div>

          <div className="user_name flex gap-5 w-full pl-10 pr-7">
            <label htmlFor="username">Username :</label>
            <input
              {...register("username")}
              id="username"
              placeholder="username"
              className="p-1 pl-4 flex-1 rounded-[1rem] shadow-sm shadow-black"
            />
          </div>
          <div className="avatar flex w-100 gap-6 pl-10 pr-7">
            <label htmlFor="avatar">Avatar :</label>
            <input
              {...register("avatar")}
              id="avatar"
              type="file"
              accept="image/*"
              className="p-1 pl-4 w-27 shadow-sm shadow-black bg-blue-300 cursor-pointer"
            />
          </div>
          <div className="email flex gap-5 w-full pl-10 pr-7">
            <label htmlFor="email">Email :</label>
            <input
              {...register("email")}
              id="email"
              placeholder="email"
              className="p-1 pl-4 flex-1 rounded-[1rem] shadow-sm shadow-black"
            />
          </div>
          <div className="password flex gap-5 w-full pl-10 pr-7">
            <label htmlFor="password">Password :</label>
            <input
              {...register("password")}
              id="password"
              placeholder="password"
              className="p-1 pl-4 flex-1 rounded-[1rem] shadow-sm shadow-black"
            />
          </div>
          <Button className="w-30 cursor-pointer" type="submit">
            {" "}
            Sign Up
          </Button>
        </div>
      </form>
      <span className=" mt-5 mb-5">Already have a account? </span>
    </div>
  );
}
