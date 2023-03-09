#!/usr/bin/env node

import fs from "fs";

const main = async () => {
  // Read files in directory
  const itemsArray = await new Promise((resolve) => {
    fs.readdir("./", (error, files) => {
      if (error) {
        console.log(error);
      } else {
        resolve(files);
      }
    });
  });

  // console.log("ITEMS:", itemsArray);

  // Check if item is file or directory
  let removedDirs = [];
  for (let i = 0; i < itemsArray.length; i++) {
    if (fs.lstatSync(itemsArray[i]).isDirectory()) {
      const files = fs.readdirSync(itemsArray[i]);
      // Remove empty directories
      if (files.length === 0) {
        removedDirs.push(itemsArray[i]);
        fs.rmdirSync(itemsArray[i]);
      }
    }
  }
  console.log("REMOVED DIRS:", removedDirs);
};

main();
