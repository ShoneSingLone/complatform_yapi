#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration
const config = {
	replaceMap: {
		XSpace: "XSpace",
		xspace: "xspace",
		"_api.xspace": "_api.xspace",
		XSpace: "XSpace",
		'data-app-name="xspace"': 'data-app-name="xspace"',
		'data-loading-img="_xspace-loading"': 'data-loading-img="_xspace-loading"',
		'class="x-xspace-app"': 'class="x-xspace-app"',
		"_.$xspaceRouter": "_.$xspaceRouter"
	},
	fileRenameMap: {
		"xspace.html": "xspace.html",
		"entry.xspace.html": "entry.xspace.html"
	},
	excludePaths: [
		".git",
		"node_modules",
		"static/common",
		"DocFlow",
		"test",
		"server/xspace_logs"
	],
	includeExtensions: [".html", ".vue", ".js", ".ts", ".md", ".json"]
};

// Parse command line arguments
const args = process.argv.slice(2);
const isApply = args.includes("--apply");
const isVerify = args.includes("--verify");
const isDryRun = !isApply;

// Update exclude paths if provided
const excludeArgIndex = args.findIndex(arg => arg.startsWith("--exclude="));
if (excludeArgIndex !== -1) {
	const excludePaths = args[excludeArgIndex].split("=")[1].split(",");
	config.excludePaths = [...config.excludePaths, ...excludePaths];
}

// Files to process
const filesToProcess = [];

// Walk directory function
function walk(dir) {
	try {
		const files = fs.readdirSync(dir);
		for (const file of files) {
			const fullPath = path.join(dir, file);
			const stat = fs.statSync(fullPath);

			// Convert to forward slashes for consistency
			const normalizedPath = fullPath.replace(/\\/g, "/");

			// Check if path should be excluded
			const shouldExclude = config.excludePaths.some(excludePath =>
				normalizedPath.includes(excludePath)
			);

			if (shouldExclude) {
				continue;
			}

			if (stat.isDirectory()) {
				walk(fullPath);
			} else {
				const ext = path.extname(file);
				if (config.includeExtensions.includes(ext)) {
					filesToProcess.push({ fullPath, normalizedPath });
					// Check if this is one of the important files
					if (
						normalizedPath.includes("static/business_xspace/entry.vue") ||
						normalizedPath.includes("static/business_xspace/utils/api.vue")
					) {
						console.log(`Found important file: ${normalizedPath}`);
					}
				}
			}
		}
	} catch (error) {
		console.error(`Error walking directory ${dir}:`, error.message);
	}
}

// Process files
function processFiles() {
	console.log("Scanning files...");
	walk(".");

	console.log(`Found ${filesToProcess.length} files to process`);

	// Check if specific files are being processed
	const importantFiles = [
		"static/business_xspace/entry.vue",
		"static/business_xspace/utils/api.vue"
	];

	for (const file of importantFiles) {
		const isProcessed = filesToProcess.some(item => item.normalizedPath.includes(file));
		if (isProcessed) {
			console.log(`✓ ${file} is being processed`);
		} else {
			console.log(`✗ ${file} is NOT being processed`);
		}
	}

	let totalChanges = 0;
	const changesByFile = {};
	const renamedFiles = [];

	// First process content changes
	for (const { fullPath, normalizedPath } of filesToProcess) {
		try {
			const content = fs.readFileSync(fullPath, "utf8");
			let modifiedContent = content;
			let fileChanges = 0;

			// Apply replacements
			for (const [search, replace] of Object.entries(config.replaceMap)) {
				// Escape special regex characters
				const escapedSearch = search.replace(/[.*+?^${}()|[\\[\\]\\\\]/g, "\\$&");
				const regex = new RegExp(escapedSearch, "g");
				const matches = content.match(regex);
				if (matches) {
					fileChanges += matches.length;
					modifiedContent = modifiedContent.replace(regex, replace);
				}
			}

			// Special case for _.$xspaceRouter to _.$xspaceRouter
			const xspaceRouterRegex = /_\.\$xspaceRouter/g;
			const xspaceRouterMatches = content.match(xspaceRouterRegex);
			if (xspaceRouterMatches) {
				fileChanges += xspaceRouterMatches.length;
				modifiedContent = modifiedContent.replace(xspaceRouterRegex, "_.$xspaceRouter");
			}

			if (fileChanges > 0) {
				totalChanges += fileChanges;
				changesByFile[normalizedPath] = fileChanges;

				if (!isDryRun && !isVerify) {
					fs.writeFileSync(fullPath, modifiedContent, "utf8");
				}
			}
		} catch (error) {
			console.error(`Error processing ${fullPath}:`, error.message);
		}
	}

	// Then handle file renaming
	const filesToRename = [
		"static/business_xspace/xspace.html",
		"static/business_xspace/entry.xspace.html"
	];

	for (const oldPath of filesToRename) {
		if (fs.existsSync(oldPath)) {
			const newPath = oldPath.replace("xspace.html", "xspace.html");
			renamedFiles.push({ old: oldPath, new: newPath });

			if (!isDryRun && !isVerify) {
				fs.renameSync(oldPath, newPath);
			}
		}
	}

	// Output results
	console.log("\n=== Migration Results ===");
	console.log(`Total files changed: ${Object.keys(changesByFile).length}`);
	console.log(`Total changes made: ${totalChanges}`);
	console.log(`Total files renamed: ${renamedFiles.length}`);

	if (Object.keys(changesByFile).length > 0) {
		console.log("\nFiles modified:");
		for (const [filePath, changes] of Object.entries(changesByFile)) {
			console.log(`- ${filePath}: ${changes} changes`);
		}
	}

	if (renamedFiles.length > 0) {
		console.log("\nFiles renamed:");
		for (const { old: oldPath, new: newPath } of renamedFiles) {
			console.log(`- ${oldPath} -> ${newPath}`);
		}
	}

	if (isDryRun) {
		console.log("\n=== Dry Run Mode ===");
		console.log("No files were modified. Use --apply to make changes.");
	} else if (!isVerify) {
		console.log("\n=== Changes Applied ===");
		console.log("Files have been modified.");
	}

	return { changesByFile, renamedFiles };
}

// Verify function
function verify() {
	console.log("Verifying no xspace references remain...");
	walk(".");

	const remainingReferences = {};

	for (const { fullPath, normalizedPath } of filesToProcess) {
		try {
			const content = fs.readFileSync(fullPath, "utf8");
			const matches = content.match(/xspace|xspace/g);
			if (matches) {
				remainingReferences[normalizedPath] = matches.length;
			}
		} catch (error) {
			console.error(`Error verifying ${fullPath}:`, error.message);
		}
	}

	console.log("\n=== Verification Results ===");
	if (Object.keys(remainingReferences).length === 0) {
		console.log("✓ No xspace references found!");
	} else {
		console.log("✗ Found remaining xspace references:");
		for (const [filePath, count] of Object.entries(remainingReferences)) {
			console.log(`- ${filePath}: ${count} references`);
		}
	}

	return remainingReferences;
}

// Run the appropriate function
if (isVerify) {
	verify();
} else {
	processFiles();
}
