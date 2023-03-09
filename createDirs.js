#!/usr/bin/env node

import readline from "readline";
import fs from "fs";
import { execSync } from "child_process";

const main = async () => {
  // Create interface
  const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Get user directory name
  const dirName = await new Promise((resolve) =>
    userInput.question(
      "Enter name of directory you want to create:" + "\n",
      (name) => {
        userInput.close();
        resolve(name);
      },
    ),
  );

  // Check if directory exists
  const dirExists = await new Promise((resolve) =>
    fs.stat(dirName, (error) => {
      if (!error) {
        console.log("Directory already exists.");
        resolve(true);
      } else {
        resolve(false);
      }
    }),
  );

  // Create new directory if necessary
  await new Promise((resolve) => {
    if (!dirExists) {
      fs.mkdir(dirName, (error) => {
        if (error) {
          console.log(error);
          resolve();
        } else {
          console.log("New directory created.");
          resolve();
        }
      });
    }
  });

  // Log contents of current directory with execSync
  const currentDir = await new Promise((resolve) => {
    const output = execSync("ls");
    resolve(output.toString());
  });

  // console.log(currentDir);
};

main();
