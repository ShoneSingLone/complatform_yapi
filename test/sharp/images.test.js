var images = require("images");

images("./input.png")
    .size(40) //Resize the image to 100x100
    .save("./input.preview.png", { //Save the image to a file,whih quality 50
        quality: 60 //保存图片到文件,图片质量为50
    });

