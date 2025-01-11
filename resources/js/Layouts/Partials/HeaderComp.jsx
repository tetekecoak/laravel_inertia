
import ApplicationLogo from "@/Components/ApplicationLogo"
import Dropdown from "@/Components/Dropdown"
import { DarkThemeToggle } from "flowbite-react"
import { Button } from "flowbite-react"
import { MdFullscreen } from "react-icons/md";

export default function ({user}) {
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      };
      
    return (
        <nav className="fixed w-full top-0 md:pl-64 z-40  bg-white  dark:bg-base-800">
        <div className="flex h-16 justify-between items-center px-4">
            <div className="flex items-center ">
                <div className="flex items-center md:hidden">
                <ApplicationLogo className="block mr-2 h-8 w-auto fill-current text-primary-500" />              
                <span className="text-3xl font-bold text-primary-500"> Laravel</span>
                </div>
                
            </div>
            <div className="flex space-x-1 items-center ">
                <div onClick={toggleFullscreen} className="text-base-500 dark:text-white rounded-md hover:bg-base-100 hover:dark:bg-base-600 p-2"><MdFullscreen className="h-6 w-6"/></div>
                <DarkThemeToggle className="text-base-500 dark:text-white rounded-md hover:bg-base-100 hover:dark:bg-base-600 p-2 active:border-none"/>
                    <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-base-500 transition duration-150 ease-in-out hover:text-base-700 focus:outline-none dark:bg-base-800 dark:text-base-400 dark:hover:text-base-300"
                            >
                                {user.name}

                                <svg
                                    className="-me-0.5 ms-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link
                            href={route('profile.edit')}
                        >
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route('logout')}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
                
                {/* <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-base-800 dark:text-base-200" />
                </Link> */}
            </div>
        </div>
    </nav>
    )
    
}