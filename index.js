import { getLexique } from "./utils/getLexique.js";
import { countSentences } from "./utils/countSentences.js";
import { extractWords } from "./utils/extractWords.js";
import { countSyllabes } from "./utils/countSyllabes.js";
import { chooseFile } from "./utils/chooseFile.js";

import path from "path";

// constante qui contient le répétoire parent au projet
const currentDir = path.dirname(new URL(import.meta.url).pathname);

/**
 * Calcule le score de lisibilité Flesch-Kincaid en fonction du nombre de phrases, mots et syllabes
 * Plus le score est élevé, plus le texte est facile à lire.
 *
 * @param {number} sentences - Nombre total de phrases
 * @param {number} words - Nombre total de mots
 * @param {number} syllables - Nombre total de syllabes
 * @returns {string} - Score formaté avec deux décimales
 */
const calculateReadabilityScore = (sentences, words, syllables) => {
    const score =
        206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    return score.toFixed(2);
};

/**
 * Retourne une description du niveau de lecture en fonction du score Flesch obtenu
 *
 * @param {number} score - Score de lisibilité Flesch
 * @returns {string} - Description du niveau de compréhension requis
 */
const getReadingLevelFromScore = (score) => {
    if (score >= 90) return "Très facile à lire. Élève moyen de 11 ans.";
    else if (score >= 80) return "Facile à lire. Niveau conversationnel.";
    else if (score >= 70) return "Plutôt facile à lire.";
    else if (score >= 60) return "Clair. Pour les 13–15 ans.";
    else if (score >= 50) return "Plutôt difficile à lire.";
    else if (score >= 30) return "Difficile. Niveau universitaire.";
    else return "Très difficile. Pour diplômés universitaires.";
};

function displayReadabilityResult(results) {
    // Calcul de la longueur maximale du texte à afficher
    const texts = [
        `Score : ${results.score}`,
        `Note : ${results.grade}`,
        ``,
        `Nombre de phrases : ${results.sentencesNb}`,
        `Nombre de mots : ${results.wordsNb}`,
        `Nombre de syllabes : ${results.syllNb}`,
    ];

    // Trouver la longueur maximale du texte
    const maxLength = Math.max(...texts.map((text) => text.length));

    // Créer une ligne de séparation dynamique
    const line = "-".repeat(maxLength + 4); // +4 pour les lignes verticales à gauche et à droite

    // Fonction pour ajouter les lignes verticales
    const addVerticalLines = (text) => `| ${text.padEnd(maxLength, " ")} |`;

    // Affichage avec lignes verticales et horizontales
    console.log(line);
    texts.forEach((text) => console.log(addVerticalLines(text)));
    console.log(line);
}

async function startCalculating(inputText) {
    const totalSentences = countSentences(inputText);

    // Affiche une erreur si le texte ne contient pas au moins une phrase valide
    if (totalSentences === 0) {
        console.error("Votre texte doit contenir 1 phrase au minimum.");
        return;
    }

    const lexique = await getLexique();

    const { countableWords, phoneticWords } = extractWords(inputText); // Fonction externe

    // Calcule le nombre total de syllabes à l'aide du lexique phonétique
    const totalSyllables = phoneticWords.reduce((sum, word) => {
        const syllableCount = countSyllabes(word, lexique)?.nbsyll; // Fonction externe
        return syllableCount ? sum + syllableCount : sum;
    }, 0);

    // Calcule le score de lisibilité Flesch
    const score = calculateReadabilityScore(
        totalSentences,
        countableWords.length,
        totalSyllables,
    );

    // Sauvegarde et affiche les résultats
    const readabilityResult = {
        wordsNb: countableWords.length,
        sentencesNb: totalSentences,
        syllNb: totalSyllables,
        score,
        grade: getReadingLevelFromScore(score),
    };

    displayReadabilityResult(readabilityResult);
}

(async function main() {
    const text = await chooseFile(currentDir);

    if (text) {
        startCalculating(text);
    }
})();
