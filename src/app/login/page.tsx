"use client";
import { Input } from "@/shared/ui/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try{
            const response = await signIn("credentials",{
                email,
                password,
                redirect: false,
                callbackUrl: "/",
            });

            if(!response?.ok){
                toast.error(response?.error);
                return;
            }

            router.push("/");
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="loginContainer min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 z-0"
                style={{
                    backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/fcfcd5ee-d40a-43d7-bebc-9e9aae7f7798/web/IN-en-20250922-TRIFECTA-perspective_4fd75b17-c493-446a-a3de-3d1ab753c304_large.jpg")`
                }}
            />

            <div className="max-w-[480px] w-full bg-[#000000b3] backdrop-blur-sm rounded-sm py-12 px-16 
                      font-bold text-[2rem] text-white flex flex-col gap-5 z-10 relative">
                <h1>Login</h1>

                <Input type="email" placeholder="Email" className="py-6 px-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" className="py-6 px-4" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button className="cursor-pointer w-full bg-[#e50914] hover:bg-[#f40612] 
                         text-base font-medium rounded-lg py-3.5 transition" onClick={handleLogin}>
                    Sign Up
                </button>

                <p className="text-base text-[#ffffffb3] text-center">OR</p>

                <div className="flex items-center justify-center gap-6">
                    <FcGoogle className="cursor-pointer w-11 h-11 hover:scale-110 transition" />
                    <BsGithub className="cursor-pointer w-11 h-11 hover:scale-110 transition text-white" />
                </div>

                <div className="text-center">
                    <span className="text-[#ffffffb3] text-base font-normal">
                        New to Neftlix?{" "}
                    </span>
                    <Link href="/signup" className="font-medium text-base hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;