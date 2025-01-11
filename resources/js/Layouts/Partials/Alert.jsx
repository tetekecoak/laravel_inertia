import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";

export default function({ flash = [] }) {
    const [message,setMessage] = useState(null)
    const [type,setType] = useState(null)

    useEffect(()=>{
       
        if (flash.success != null) {
            setMessage(flash.success)
            setType('success')
        }
        setTimeout(() => {
            setMessage(null)
            setType(null)
        }, 2000); 

    },[flash])
   
    return (
        <div
        className={`fixed top-2 right-2 z-50 transition-opacity duration-500 ease-in-out ${
            type ? "opacity-100" : "opacity-0"
        }`}
        >
        {type && (
            <Toast theme={customTheme}>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle />
            </Toast>
        )}
        </div>
    );
}


const customTheme = {
    "root": {
      "base": "flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-base-500 shadow dark:bg-base-800 dark:text-base-400",
      "closed": "opacity-0 ease-out"
    },
    "toggle": {
      "base": "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-base-400 hover:bg-base-100 hover:text-base-900 focus:ring-2 focus:ring-base-300 dark:bg-base-800 dark:text-base-500 dark:hover:bg-base-700 dark:hover:text-white",
      "icon": "h-5 w-5 shrink-0"
    }
  }
