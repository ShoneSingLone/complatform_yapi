const Jimp = require("jimp");
const path = require("path");

async function testJimp() {
    try {
        const imagePath = path.join(__dirname, "input.png");
        console.log("Reading image from:", imagePath);
        const image = await Jimp.Jimp.read(imagePath);
        await image.resize({ w: 80 });
        await image.write(path.join(__dirname, "output.png"));
        console.log("Image processed successfully");
    } catch (err) {
        console.error("Error processing image:", err.message);
        if (err.stack) {
            console.error("Stack trace:", err.stack);
        }
    }
}

testJimp();