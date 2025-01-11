import { Head, Link } from '@inertiajs/react';
import { Button } from 'flowbite-react';
import { IoIosLogIn } from "react-icons/io";
import { FaDonate ,FaDiscord} from "react-icons/fa";

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Welcome" />
            <div className="w-screen h-screen flex items-center justify-center bg-base-200 text-black/50 dark:bg-base-900 dark:text-white/50">
            <div class="text-center text-base-900 dark:text-base-100 p-8 rounded-lg  max-w-md bg-white shadow-sm sm:rounded-lg dark:bg-base-800">
            <Button color='blue' className='mb-4'  href={route("login")} as={Link}><IoIosLogIn className='h-5 w-5 mr-2' /> <span>Login</span></Button>

                    <h1 class="text-4xl font-bold  mb-4">Welcome my friend :)</h1>
                    <p class="mb-6">
                        Thank you for visiting! If you enjoy the content, feel free to support us through donations.
                    </p>

                    <div class="flex flex-col items-center space-y-2">
                        <a href="https://saweria.co/tetekecoak" target="_blank" rel="noopener noreferrer">
                            <Button color='yellow'><FaDonate className='h-5 w-5 mr-2' /> <span>Donate via Saweria</span></Button>
                        </a>
                        <a href="https://discord.gg/3WDDUFXmUd" target="_blank" rel="noopener noreferrer">
                            <Button color='discord'><FaDiscord className='h-5 w-5 mr-2' /> <span>Join Discord</span></Button>
                        </a>
                    </div>
    </div>
            </div>
        </>
    );
}
