/**
 * Compte le nombre de syllabes d'un mot à partir d'un lexique.
 * Le lexique doit être un objet où les clés sont des mots et les valeurs sont le nombre de syllabes.
 *
 * @param {string} inputWord - Le mot pour lequel on veut obtenir le nombre de syllabes.
 * @param {object} lexique - Un dictionnaire associant chaque mot à son nombre de syllabes (voir fonction getLexique dans getLexique.js).
 * @returns {object} - Un objet contenant le mot et son nombre de syllabes.
 */
export function countSyllabes(inputWord, lexique) {
    const wordKey = inputWord.toLowerCase(); // On convertit le mot en minuscule pour une recherche insensible à la casse
    const syllableCount = lexique[wordKey] ?? null; // Recherche le nombre de syllabes dans le lexique, ou null si introuvable

    return { word: inputWord, nbsyll: syllableCount }; // Retourne un objet avec le mot et son nombre de syllabes
}
