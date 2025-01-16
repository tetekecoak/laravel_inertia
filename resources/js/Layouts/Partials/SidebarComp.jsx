import { Sidebar } from "flowbite-react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {  HiChartPie, HiUserGroup,HiKey} from "react-icons/hi";
import { Link } from "@inertiajs/react";
import usePermission from "@/Hooks/PermissionHook";

const routes = [
  { title : "Users" , route : "users.index", icon : HiUserGroup, permission:"users.view"},
  { title : "Roles" , route : "roles.index", icon : HiKey, permission:"roles.view"},
]

export default function() {
  return (
    <Sidebar theme={customTheme} className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full  md:translate-x-0 " aria-label="Sidebar with logo branding example">
      <div className="flex items-center mb-6 text-primary-500 ">
         <ApplicationLogo className="block mr-2 h-9 w-auto fill-current" />              
         <span className="text-4xl font-bold text-primary-500"> Laravel</span>
      </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Sidebar.Item active={route().current('dashboard')}  as={Link} href={route('dashboard')} icon={HiChartPie}>Dashboard</Sidebar.Item>
            {routes.map((item, key) => 
              usePermission(item.permission) && (
                item.children ? (
                  <Sidebar.Collapse open={route().current(item.permissions)} key={key} icon={item.icon} label={item.title}>
                    {item.children.map((child, childKey) =>
                      usePermission(child.permission) && (
                        <Sidebar.Item  active={child.route ? route().current(child.route.split('.')[0]+".*") : false} key={childKey} as={Link} href={child.route ? route(child.route) : "#"}>
                          {child.title}
                        </Sidebar.Item>
                      )
                    )}
                  </Sidebar.Collapse>
                ) : (
                  <Sidebar.Item active={item.route ? route().current(item.route.split('.')[0]+".*") : false} key={key} as={Link} href={item.route ? route(item.route) : "#"} icon={item.icon}>
                    {item.title}
                  </Sidebar.Item>
                )
              )
            )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

const customTheme ={
  "root": {
    "base": "h-full",
    "collapsed": {
      "on": "w-16",
      "off": "w-64"
    },
    "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-base-50 px-3 py-4 dark:bg-base-800"
  },
  "collapse": {
    "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-base-900 transition duration-75 hover:bg-base-100 dark:text-white dark:hover:bg-base-700",
    "icon": {
      "base": "h-6 w-6 text-base-500 transition duration-75 group-hover:text-base-900 dark:text-base-400 dark:group-hover:text-white",
      "open": {
        "off": "",
        "on": "text-base-900"
      }
    },
    "label": {
      "base": "ml-3 flex-1 whitespace-nowrap text-left",
      "icon": {
        "base": "h-6 w-6 transition delay-0 ease-in-out",
        "open": {
          "on": "rotate-180",
          "off": ""
        }
      }
    },
    "list": "space-y-2 py-2"
  },
  "cta": {
    "base": "mt-6 rounded-lg bg-base-100 p-4 dark:bg-base-700",
    "color": {
      "blue": "bg-cyan-50 dark:bg-cyan-900",
      "dark": "bg-dark-50 dark:bg-dark-900",
      "failure": "bg-red-50 dark:bg-red-900",
      "base": "bg-alternative-50 dark:bg-alternative-900",
      "green": "bg-green-50 dark:bg-green-900",
      "light": "bg-light-50 dark:bg-light-900",
      "red": "bg-red-50 dark:bg-red-900",
      "purple": "bg-purple-50 dark:bg-purple-900",
      "success": "bg-green-50 dark:bg-green-900",
      "yellow": "bg-yellow-50 dark:bg-yellow-900",
      "warning": "bg-yellow-50 dark:bg-yellow-900"
    }
  },
  "item": {
    "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-base-900 hover:bg-base-100 dark:text-white dark:hover:bg-base-700",
    "active": "bg-base-100 dark:bg-base-700",
    "collapsed": {
      "insideCollapse": "group w-full pl-8 transition duration-75",
      "noIcon": "font-bold"
    },
    "content": {
      "base": "flex-1 whitespace-nowrap px-3"
    },
    "icon": {
      "base": "h-6 w-6 flex-shrink-0 text-base-500 transition duration-75 group-hover:text-base-900 dark:text-base-400 dark:group-hover:text-white",
      "active": "text-base-700 dark:text-base-100"
    },
    "label": "",
    "listItem": ""
  },
  "items": {
    "base": ""
  },
  "itemGroup": {
    "base": "mt-4 space-y-2 border-t border-base-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-base-700"
  },
  "logo": {
    "base": "mb-5 flex items-center pl-2.5",
    "collapsed": {
      "on": "hidden",
      "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    },
    "img": "mr-3 h-6 sm:h-7"
  }
}