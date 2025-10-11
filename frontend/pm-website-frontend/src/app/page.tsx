"use client";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Particles from "../components/Particles";
import { Button } from "../components/ui/button";
import ActiveLink from "../utils/ActiveLink";
import { motion } from "motion/react";
import SignUpDialog from "./signup/signup-dialog";

export default function Home(): ReactElement {
  const [open , setOpen] = useState(false)
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
      className="overflow-x-hidden"
    >
      <Particles
        className="bg-black w-full h-full "
        particleCount={200}
        particleSpread={10}
        speed={0.2}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={true}
      />

      <motion.header
        initial={{ y: -50, opacity: 0 }}
        transition={{ duration: 1.5 }}
        animate={{ y: [-30, -20, -10, -5, 0], opacity: 1 }}
        className="w-full flex justify-around absolute z-10 "
      >
        <div className=" w-60 relative  flex align-middle justify-center gap-4">
          <img
            src="https://res.cloudinary.com/dndlajzvq/image/upload/v1759648588/Adobe_Express_-_file_n09rji.png"
            alt=""
            className="w-40 top-[-30%] left-[-10%] absolute h-60"
          />
          <span className="logo text-font text-5xl z-10 text-gradient absolute bottom-5 right-0">
            Stroma
          </span>
        </div>

        <nav className=" h-20 mt-5 m-2 flex items-center">
          <ul className="flex justify-around pl-6 pr-6 gap-6 items-center text-3xl h-[70%] text-gray-500 font-medium bg-white rounded-3xl opacity-35 backdrop-blur-sm">
            {ActiveLink("/", <li className="home">Home</li>)}
            {ActiveLink("/about", <li className="about">About</li>)}
            {/* {ActiveLink("/signup", <li className="sign_up">Sign Up</li>)} */}
            <li className="sign_up cursor-pointer" onClick={() => setOpen(true)}>Sign Up</li>
            <SignUpDialog open={open} onClose={() => setOpen(false)}></SignUpDialog>
          </ul>
        </nav>
      </motion.header>

      <main className="flex flex-col mt-50 absolute  w-full items-center">
        <motion.h1
        initial={{ opacity: 0}}
        transition={{duration : 1}}
        animate = {{x : [75,50,25,0], opacity: 1}}
        className="text-gradient text-center text-7xl text-font">
          Stroma, Your team's backbone <br /> for better planning
        </motion.h1>
        <motion.div 
        initial= {{opacity:0}}
        animate={{ y : [50,40,30,20,10,0], opacity:1}}
        className="flex flex-col items-center">
          <p className="text-gradient mt-5 text-xl">
          A collaborative project management app which streamline your workflow
        </p>
        <Button className="w-70 mt-10 p-7 text-2xl">
          {" "}
          Get Started <span>⟶</span>
        </Button>
        </motion.div>
        
      </main>
    </div>
  );
}
