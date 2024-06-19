import { readdirSync, statSync, writeFileSync } from "fs";
import { join, posix } from "path";

const targetDir = "./"; // Diretório alvo para listar

function generateReadme(dir, level = 0, parentPath = "") {
  const files = readdirSync(dir);
  let readmeContent = "";

  files.forEach((file) => {
    // Ignora arquivos e pastas ocultas começando com um ponto (.)
    if (file.startsWith(".") || file === "node_modules") {
      return;
    }

    const filePath = join(dir, file);
    const stats = statSync(filePath);
    const indent = "  ".repeat(level);
    const fileLink = posix.join(parentPath, file); // Usando path.posix.join para garantir barras normais mesmo em sistemas Windows

    if (stats.isDirectory()) {
      readmeContent += `${indent}- [${file}/](${fileLink}/)\n`;
      readmeContent += generateReadme(filePath, level + 1, fileLink);
    } else {
      readmeContent += `${indent}- [${file}](${fileLink})\n`;
    }
  });

  return readmeContent;
}

const readmeContent = `# Estrutura de Pastas e Arquivos\n\n${generateReadme(
  targetDir
)}`;

writeFileSync(join(targetDir, "directory_structure.md"), readmeContent, "utf8");

console.log("directory_structure.md gerado com sucesso!");
