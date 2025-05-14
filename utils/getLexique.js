import fs from "fs/promises"; // Utiliser fs.promises pour lire des fichiers de manière asynchrone

/**
 * Charge un dictionnaire (objet) à partir d'un fichier TSV contenant des mots et leur nombre de syllabes.
 * Utilisé pour l'analyse phonétique des textes.
 *
 * @returns {Promise<Record<string, number> | null>} - Un objet { mot: nbSyllabes } ou null en cas d'erreur.
 */
export async function getLexique() {
    try {
        // Récupère le contenu du fichier TSV situé dans le dossier 'data'
        const filePath = "./data/Lexique383.tsv"; // Chemin relatif du fichier
        const text = await fs.readFile(filePath, "utf8"); // Lire le fichier comme texte brut

        // Découpe le texte en lignes, puis sépare la première ligne pour obtenir les en-têtes de colonnes
        const lines = text.trim().split("\n");
        const headers = lines[0].split("\t");

        // Trouve les indices des colonnes "ortho" (mot orthographié) et "nbsyll" (nombre de syllabes)
        const orthoIndex = headers.indexOf("ortho");
        const nbSyllIndex = headers.indexOf("nbsyll");

        // Vérifie que les deux colonnes nécessaires sont présentes dans les en-têtes
        if (orthoIndex === -1 || nbSyllIndex === -1) {
            throw new Error(
                "Colonnes 'ortho' ou 'nbsyll' manquantes dans le fichier TSV.",
            );
        }

        // Initialise un objet sans prototype pour stocker les mots et leur nombre de syllabes
        const lexicon = Object.create(null);

        // Parcourt toutes les lignes (sauf la première) pour extraire les données mot/syllabes
        for (let i = 1; i < lines.length; i++) {
            // Sépare chaque ligne en colonnes selon les tabulations
            const values = lines[i].trim().split("\t");

            // Récupère le mot en minuscules et le nombre de syllabes
            const word = values[orthoIndex]?.toLowerCase();
            const syllables = parseInt(values[nbSyllIndex], 10);

            // Ajoute à l'objet seulement si le mot est non vide et le nombre de syllabes est un entier valide
            if (word && Number.isInteger(syllables)) {
                lexicon[word] = syllables;
            }
        }

        // Retourne l'objet contenant tous les mots et leur nombre de syllabes
        return lexicon;
    } catch (error) {
        // En cas d'erreur (réseau, parsing, etc.), affiche un message et retourne null
        console.error("Erreur lors du chargement du lexique :", error.message);
        return null;
    }
}
