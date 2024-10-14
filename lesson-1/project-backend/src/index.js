import * as fs from "node:fs/promises";
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

const func = async ()=> {
    const filepath = "./src/text.txt";
    // const buffer = await fs.readFile(filepath);
    // const text = buffer.toString();
    // console.log(text);
    // const text = await fs.readFile(filepath, "utf-8");
    // console.log(text);
    // const {encoding} = await DetectFileEncodingAndLanguage(filepath);
    // const text = await fs.readFile(filepath, encoding);
    // console.log(text);
    // await fs.appendFile(filepath, "\nPHP forever");
    // await fs.writeFile(filepath, "Mojo the best");
    // await fs.appendFile("./src/text2.txt", "\nPHP forever");
    // await fs.writeFile("./src/text3.txt", "Mojo the best");
    // await fs.unlink("./src/text3.txt");
};

func();

// const data = await fs.readFile("./src/text.txt");
// console.log(data);

// fs.readFile("./src/text.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message));

// fs.readFile("./src/text.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// });