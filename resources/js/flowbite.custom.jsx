const customTheme =   {
  textarea: {
    "base" : "rounded rounded-md block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-base-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-base-700 dark:bg-base-900 dark:text-base-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
    "colors": {
      "gray": "border-base-300 bg-base-50 text-base-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-base-600 dark:bg-base-700 dark:text-white dark:placeholder-base-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
      "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
      "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
      "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
      "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
    },
    "withShadow": {
      "on": "shadow-sm dark:shadow-sm-light",
      "off": ""
    }
  },
    select : {
      field : {
        select: {
          "base" : "block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-base-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-base-700 dark:bg-base-900 dark:text-base-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
          colors: {
              "base" : "border-base-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-base-700 dark:bg-base-900 dark:text-base-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
              "failure": "border-red-500 text-red-500  focus:border-red-500 focus:ring-red-500 dark:border-red-400  dark:focus:border-red-500 dark:focus:ring-red-500",
          },
        }
  
      }
    },
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
              discord : "border border-transparent bg-[#5865F2] text-white focus:ring-4 focus:ring-[#5865F2] enabled:hover:bg-[#5865F2] dark:bg-[#5865F2] dark:hover:bg-[#5865F2] dark:focus:ring-[#5865F2]",
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
        modal : {
          "root": {
            "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
              "on": "flex bg-base-900 bg-opacity-50 dark:bg-opacity-80",
              "off": "hidden"
            },
            "sizes": {
              "sm": "max-w-sm",
              "md": "max-w-md",
              "lg": "max-w-lg",
              "xl": "max-w-xl",
              "2xl": "max-w-2xl",
              "3xl": "max-w-3xl",
              "4xl": "max-w-4xl",
              "5xl": "max-w-5xl",
              "6xl": "max-w-6xl",
              "7xl": "max-w-7xl"
            },
            "positions": {
              "top-left": "items-start justify-start",
              "top-center": "items-start justify-center",
              "top-right": "items-start justify-end",
              "center-left": "items-center justify-start",
              "center": "items-center justify-center",
              "center-right": "items-center justify-end",
              "bottom-right": "items-end justify-end",
              "bottom-center": "items-end justify-center",
              "bottom-left": "items-end justify-start"
            }
          },
          "content": {
            "base": "relative h-full w-full p-4 md:h-auto text-base-500 dark:text-base-400",
            "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-base-800"
          },
          "body": {
            "base": "flex-1 overflow-auto p-6",
            "popup": "pt-0"
          },
          "header": {
            "base": "flex items-start justify-between rounded-t border-b p-5 dark:border-base-600",
            "popup": "border-b-0 p-2",
            "title": "text-xl font-medium text-base-900 dark:text-white",
            "close": {
              "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-base-400 hover:bg-base-200 hover:text-base-900 dark:hover:bg-base-600 dark:hover:text-white",
              "icon": "h-5 w-5"
            }
          },
          "footer": {
            "base": "flex items-center space-x-2 rounded-b border-base-200 p-6 dark:border-base-600",
            "popup": "border-t"
          }
        }
  }

  export default customTheme