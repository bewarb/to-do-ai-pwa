// scan-imports.mjs
import fs from "fs";
import path from "path";

const TARGET_DIR = process.cwd(); // current working directory
const OUTPUT_FILE = path.join(process.cwd(), "ui-imports.txt");

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

function extractImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return content
    .split("\n")
    .filter((line) => line.trim().startsWith("import "))
    .map((line) => line.trim());
}

function main() {
  console.log(`📁 Scanning current directory: ${TARGET_DIR}`);
  const files = getAllFiles(TARGET_DIR);
  const results = [];

  for (const file of files) {
    const imports = extractImports(file);
    if (imports.length) {
      results.push(`\n// ${path.relative(TARGET_DIR, file)}\n` + imports.join("\n"));
    }
  }

  fs.writeFileSync(OUTPUT_FILE, results.join("\n"), "utf8");
  console.log(`✅ Done! Found imports from ${files.length} files.`);
  console.log(`📝 Results saved to: ${OUTPUT_FILE}`);
}

main();
