import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { ReactElement, useState } from "react";
import { registerUser } from "@/api/auth";
import Link from "next/link";
import LoginPage from "../login/loginPage"

type Inputs = {
  fullname: string;
  username: string;
  avatar: FileList;
  email: string;
  password: string;
};

export default function SignUpDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): ReactElement {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const res = registerUser({ ...data });
    onClose(); // Close dialog after submission
    if(!res){
      alert("Please submit a file for avatar")
    }
  };

  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="items-center bg-gray-600 "
      fullWidth
      maxWidth="sm"
    >
      {/* <DialogTitle className="bg-black text-white">Sign Up</DialogTitle> */}
      <DialogContent className=" items-center bg-black text-white">
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
            <div className="avatar flex gap-6 pl-10 pr-7">
              <label htmlFor="avatar">Avatar :</label>
              <input
                {...register("avatar")}
                id="avatar"
                type="file"
                accept="image/*"
                className="p-1 pl-1  shadow-sm shadow-black bg-blue-300 cursor-pointer"
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
            <DialogActions>
              <Button className="w-30 cursor-pointer" type="submit">
                {" "}
                Sign Up
              </Button>
            </DialogActions>
            <span>OR</span>
            <div className="flex items-center">
              Already have a account? &nbsp;
              <span className="text-blue-500 cursor-pointer" onClick={()=> setLoginOpen(true)}>
                login
              </span>
              <LoginPage open={loginOpen} onClose={()=>setLoginOpen(false)} />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
