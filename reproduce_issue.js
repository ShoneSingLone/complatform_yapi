
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

// Mock xU
global.xU = {
    _: _,
    $response: (data) => data,
    var: {
        RESOURCE_ASSETS: "resource_assets"
    }
};

const { asyncResolvePathFileOrDir } = require("./server/controllers/Autoware/api/Resource.service");

async function test() {
    // Create a temporary directory structure
    const testDir = path.resolve("./test_search_dir");
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
    
    const subDir = path.resolve(testDir, "subDir");
    if (!fs.existsSync(subDir)) fs.mkdirSync(subDir);
    
    fs.writeFileSync(path.resolve(testDir, "file1.txt"), "hello");
    fs.writeFileSync(path.resolve(subDir, "file2.txt"), "world");

    console.log("--- Testing listing ---");
    const list = await asyncResolvePathFileOrDir({
        fileOrDirPath: ["file1.txt", "subDir"],
        relativePathArray: [testDir],
        search_key: ""
    });
    console.log("List results:", JSON.stringify(list, null, 2));

    console.log("\n--- Testing search for 'file1' ---");
    const search1 = await asyncResolvePathFileOrDir({
        fileOrDirPath: ["file1.txt", "subDir"],
        relativePathArray: [testDir],
        search_key: "file1"
    });
    console.log("Search 'file1' results:", JSON.stringify(search1, null, 2));

    console.log("\n--- Testing search for 'file2' ---");
    const search2 = await asyncResolvePathFileOrDir({
        fileOrDirPath: ["file1.txt", "subDir"],
        relativePathArray: [testDir],
        search_key: "file2"
    });
    console.log("Search 'file2' results:", JSON.stringify(search2, null, 2));

    // Clean up
    fs.unlinkSync(path.resolve(subDir, "file2.txt"));
    fs.rmdirSync(subDir);
    fs.unlinkSync(path.resolve(testDir, "file1.txt"));
    fs.rmdirSync(testDir);
}

test().catch(console.error);
