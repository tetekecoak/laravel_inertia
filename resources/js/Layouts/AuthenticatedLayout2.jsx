import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { DarkThemeToggle, Flowbite } from "flowbite-react";

const customTheme =   {
    checkbox :{
        "root": {
          "base": "h-4 w-4 rounded border border-base-300 bg-base-100 focus:ring-2 dark:border-base-600 dark:bg-base-700",
          "color": {
            "default": "text-primary-600 focus:ring-primary-600 dark:ring-offset-base-800 dark:focus:ring-primary-600",
          }
        }
    },
    table : {
        "root": {
          "base": "w-full text-left text-sm text-base-500 dark:text-base-400",
          "shadow": "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
          "wrapper": "relative"
        },
        "body": {
          "base": "group/body",
          "cell": {
            "base": "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg"
          }
        },
        "head": {
          "base": "group/head text-xs uppercase text-base-700 dark:text-base-400",
          "cell": {
            "base": "bg-base-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-base-700"
          }
        },
        "row": {
          "base": "group/row",
          "hovered": "hover:bg-base-50 dark:hover:bg-base-600",
          "striped": "odd:bg-white even:bg-base-50 odd:dark:bg-base-800 even:dark:bg-base-700"
        }
    },
    button : {
        color : {
            secondary : "border border-base-300 bg-white  text-base-700 shadow-sm transition duration-150 ease-in-out hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:opacity-25 dark:border-base-500 dark:bg-base-800 dark:text-base-300 dark:hover:bg-base-700 dark:focus:ring-offset-gray-800",
            primary : "border border-transparent bg-primary-700 text-white focus:ring-4 focus:ring-primary-300 enabled:hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
        }
    },
    dropdown : {
        "floating": {
          "arrow": {
            "style": {
              "dark": "bg-base-900 dark:bg-base-700",
              "light": "bg-white",
              "auto": "bg-white dark:bg-base-700"
            },
          },
          "content": "py-1 text-sm text-base-700 dark:text-base-200",
          "divider": "my-1 h-px bg-base-100 dark:bg-base-600",
          "header": "block px-4 py-2 text-sm text-base-700 dark:text-base-200",
          "item": {
            "base": "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-base-700 hover:bg-base-100 focus:bg-base-100 focus:outline-none dark:text-base-200 dark:hover:bg-base-600 dark:hover:text-white dark:focus:bg-base-600 dark:focus:text-white",
            "icon": "mr-2 h-4 w-4"
          },
          "style": {
            "dark": "bg-base-900 text-white dark:bg-base-700",
            "light": "border border-base-200 bg-white text-base-900",
            "auto": "border border-base-200 bg-white text-base-900 dark:border-none dark:bg-base-700 dark:text-white"
          },
        },
    },
    label : {
        root: {
            colors: {
                default: "text-sm font-medium text-base-700 dark:text-base-300 ",
            }
        },
    },
    textInput :   {
        field : {
            input : {
                "base" : "block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-base-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-base-700 dark:bg-base-900 dark:text-base-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
                colors: {
                    "base" : "border-base-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-base-700 dark:bg-base-900 dark:text-base-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
                    "failure": "border-red-500 text-red-500  focus:border-red-500 focus:ring-red-500 dark:border-red-400  dark:focus:border-red-500 dark:focus:ring-red-500",
                },
            }
        }
    },
    pagination : {
        "layout": {
          "table": {
            "base": "text-sm text-base-700 dark:text-base-400",
            "span": "font-semibold text-base-900 dark:text-white"
          }
        },
        "pages": {
          "previous": {
            "base": "ml-0 rounded-l-lg border border-base-300 bg-white px-3 py-2 leading-tight text-base-500 enabled:hover:bg-base-100 enabled:hover:text-base-700 dark:border-base-700 dark:bg-base-800 dark:text-base-400 enabled:dark:hover:bg-base-700 enabled:dark:hover:text-white",
          },
          "next": {
            "base": "rounded-r-lg border border-base-300 bg-white px-3 py-2 leading-tight text-base-500 enabled:hover:bg-base-100 enabled:hover:text-base-700 dark:border-base-700 dark:bg-base-800 dark:text-base-400 enabled:dark:hover:bg-base-700 enabled:dark:hover:text-white",
          },
          "selector": {
            "base": "w-12 border border-base-300 bg-white py-2 leading-tight text-base-500 enabled:hover:bg-base-100 enabled:hover:text-base-700 dark:border-base-700 dark:bg-base-800 dark:text-base-400 enabled:dark:hover:bg-base-700 enabled:dark:hover:text-white",
            "active": "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-base-700 dark:bg-base-700 dark:text-white",
          }
        }
      },
}

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <Flowbite theme={{theme: {...customTheme} }}>
    <div className="min-h-screen ">
                <nav className="border-b border-base-100 bg-white dark:border-base-700 dark:bg-base-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex shrink-0 items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-base-800 dark:text-base-200" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route('user.index')}
                                        active={route().current('user.*')}
                                    >
                                        User
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <DarkThemeToggle />
                                <div className="relative ms-3">
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
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-base-400 transition duration-150 ease-in-out hover:bg-base-100 hover:text-base-500 focus:bg-base-100 focus:text-base-500 focus:outline-none dark:text-base-500 dark:hover:bg-base-900 dark:hover:text-base-400 dark:focus:bg-base-900 dark:focus:text-base-400"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? 'block' : 'hidden') +
                            ' sm:hidden'
                        }
                    >
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-base-200 pb-1 pt-4 dark:border-base-600">
                            <div className="px-4">
                                <div className="text-base font-medium text-base-800 dark:text-base-200">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-base-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow dark:bg-base-800">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>`
        </div>
        </Flowbite>
      
    );
}
