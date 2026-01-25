"use client";

import Link from "next/link";
import {useEffect,useCallback,useState} from "react";
import {usePathname} from "next/navigation";
import {Home} from "lucide-react";
import {Button} from "@/components/ui/button";
import {NavbarAuthButtons} from "@/components/navbar-auth-buttons";
import {getIdToken} from "@/lib/auth";

type MeResponse={
  user?:{
    userID?:string;
    email?:string;
    fullName?:string;
  };
};

export function Navbar(){
  const [fullName,setFullName]=useState<string|null>(null);
  const pathname=usePathname();

  const loadMe=useCallback(async ()=>{
    const token=getIdToken();
    if(!token){
      setFullName(null);
      return;
    }

    try{
      const res=await fetch("/api/users/me",{
        headers:{Authorization:`Bearer ${token}`},
        cache:"no-store",
      });

      if(!res.ok){
        setFullName(null);
        return;
      }

      const data:MeResponse=await res.json();
      setFullName(data?.user?.fullName??null);
    }catch{
      setFullName(null);
    }
  },[]);

  useEffect(()=>{
    void loadMe();

    const onAuth=()=>{
      void loadMe();
    };

    window.addEventListener("sharespace-auth",onAuth);
    window.addEventListener("storage",onAuth);

    return ()=>{
      window.removeEventListener("sharespace-auth",onAuth);
      window.removeEventListener("storage",onAuth);
    };
  },[loadMe]);

  useEffect(()=>{
    void loadMe();
  },[pathname,loadMe]);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-8 w-8 text-rose-600" />
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ShareSpace
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/browse" className="text-gray-600 hover:text-rose-600">
            Browse Profiles
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-rose-600">
            How It Works
          </Link>
          <Link href="/safety" className="text-gray-600 hover:text-rose-600">
            Safety
          </Link>
          <Link href="/messages/inbox" className="text-gray-600 hover:text-rose-600">
            Messages
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {fullName?(
            <span className="hidden sm:inline text-sm text-gray-700">
              Hello, <span className="font-semibold">{fullName}</span>
            </span>
          ):null}
          <NavbarAuthButtons />
          <Button asChild>
            <Link href="/profile/create">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
