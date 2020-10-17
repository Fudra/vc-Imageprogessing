import { BrowserWindow, dialog } from "electron";
import { readFileSync } from "fs";

export default (win: BrowserWindow | null) => {
  if (win == null) return;

  const selectedImageFiles = dialog.showOpenDialogSync({
    title: "Select an Image",
    filters: [
      {
        name: "Images",
        extensions: ["png"]
      }
    ],
    properties: ["openFile"]
  });

  if (typeof selectedImageFiles === "undefined") {
    return;
  }

  const selectedImageFile = selectedImageFiles.pop();
  if (typeof selectedImageFile === "undefined") {
    return;
  }

  const imageContent = readFileSync(selectedImageFile);

  // 'binary'
  const base64Image = Buffer.from(imageContent).toString("base64");

  const extensionName = "png";

  const imageSrcString = `data:image/${extensionName
    .split(".")
    .pop()};base64,${base64Image}`;

  win.webContents.send("imageFileSelected", {
    contents: imageSrcString
  });
};
