const sharp = require("sharp");

sharp("./input.png")
    .resize(300, 200) // 300px 宽，200px 高
    .toFile("output.jpg", (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log(info);
        }
    });