import { BrowserWindow, MenuItem, MenuItemConstructorOptions } from "electron";
import openMatchFiles from "@/menu/openMatchFiles";

// https://www.electronjs.org/docs/api/menu
const isMac = process.platform === "darwin";

export const menuTemplate = (
  win: BrowserWindow | null
): Array<MenuItemConstructorOptions | MenuItem> => {
  return [
    { role: "appMenu" },
    {
      label: "File",
      submenu: [
        {
          label: "Open",
          accelerator: "CommandOrControl+O",
          click: () => openMatchFiles(win)
        },
        isMac ? { role: "close" } : { role: "quit" }
      ]
    },
    { role: "editMenu" },
    {
      role: "help",
      submenu: [
        // {
        //     label: 'Learn More',
        //     click: async () => {
        //         const { shell } = require('electron')
        //         await shell.openExternal('https://electronjs.org')
        //     }
        // }
      ]
    }
  ];
};
