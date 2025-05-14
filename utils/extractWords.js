// Ensemble des mots considérés comme exceptionnels, qui sont toujours pertinents phoniquement
const exceptions = new Set(["a", "à", "y"]);

/**
 * Détermine si un mot est phoniquement pertinent.
 * Un mot est considéré pertinent s'il a plus d'une lettre ou fait partie des exceptions.
 *
 * @param {string} word - Le mot à tester.
 * @returns {boolean} - Retourne true si le mot est pertinent, sinon false.
 */
function isPhoneticallyRelevant(word) {
    return word.length > 1 || exceptions.has(word); // Les mots de 1 lettre sauf exceptions ne sont pas pertinents
}

/**
 * Extrait les mots pertinents d'un texte pour l'analyse phonétique.
 * Le texte est analysé pour extraire les mots et les mots phoniquement pertinents.
 *
 * @param {string} text - Le texte à analyser.
 * @returns {object} - Un objet contenant deux tableaux : les mots que l'on peut compter et les mots qui sont pertinents pour le comptage de syllabes.
 */
export function extractWords(text) {
    const allWords = text.match(/[\p{L}\p{N}]+/gu) || []; // Extraction de tous les mots et nombres

    const relevantWords = allWords.filter((word) =>
        isPhoneticallyRelevant(word.toLowerCase()),
    ); // Filtre les mots pertinents phoniquement

    return {
        countableWords: allWords, // Mots comptables (tous les mots extraits)
        phoneticWords: relevantWords, // Mots pertinents phoniquement
    };
}
