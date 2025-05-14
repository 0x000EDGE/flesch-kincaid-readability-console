import path from "path";
import fs from "fs";
import inquirer from "inquirer";

// Fonction pour lister les fichiers txt dans le même dossier
export function listTxtFiles(dirname) {
    const directoryPath = dirname; // Dossier où se trouve le fichier index.js
    return fs
        .readdirSync(directoryPath)
        .filter((file) => path.extname(file) === ".txt");
}

// Fonction pour demander à l'utilisateur de choisir un fichier via inquirer
export async function askUserToChooseFile(files) {
    const choices = files.map((file) => ({
        name: file,
        value: file,
    }));

    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "chosenFile",
            message: "Choisis un fichier :",
            choices: choices,
        },
    ]);

    return answers.chosenFile;
}

export async function chooseFile(dirname) {
    const txtFiles = listTxtFiles(dirname);
    if (txtFiles.length === 0) {
        console.error("Aucun fichier .txt trouvé dans le dossier.");
        return;
    }

    const chosenFile = await askUserToChooseFile(txtFiles);
    const filePath = path.join(dirname, chosenFile);
    const fileContent = fs.readFileSync(filePath, "utf8");

    return fileContent;
}
