import { ReactElement } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { loginUser } from "@/api/auth";

type FormInputs = {
  username_email: string;

  password: string;
};

export default function LoginPage({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm<FormInputs>();
  
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // handle form submission
    console.log("form data :",data)
    loginUser(data)
    onClose()
  };

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
          <span className="text-3xl m-5">Login</span>
          <div className="flex flex-col gap-5 items-center">
            <div className="username_email flex gap-5 w-full pl-10 pr-7">
              <label htmlFor="username_email">Username or Email :</label>
              <input
                {...register("username_email")}
                id="username-email"
                placeholder="username"
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
                Login
              </Button>
            </DialogActions>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
