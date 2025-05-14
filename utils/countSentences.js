/**
 * Compte approximativement le nombre de phrases dans un texte.
 * Une phrase est considérée comme terminée lorsqu'elle se termine par un '.', '!' ou '?'.
 * Si du texte sans ponctuation reste à la fin mais contient un mot significatif, il est aussi compté.
 *
 * @param {string} text - Le texte à analyser.
 * @returns {number} - Le nombre de phrases détectées.
 */
export function countSentences(text) {
    let sentenceCount = 0; // Nombre de phrases détectées
    let isInsideSentence = false; // Indique si on est actuellement dans une phrase
    let sentenceBuffer = ""; // Accumule les caractères d'une phrase en cours

    for (let i = 0; i < text.length; i++) {
        const currentChar = text[i];

        // Ignorer les espaces, retours à la ligne, tabulations
        if (
            currentChar !== " " &&
            currentChar !== "\n" &&
            currentChar !== "\t"
        ) {
            isInsideSentence = true;
            sentenceBuffer += currentChar;
        }

        // Si on atteint un marqueur de fin de phrase
        if (
            isInsideSentence &&
            (currentChar === "." || currentChar === "!" || currentChar === "?")
        ) {
            sentenceCount++;
            isInsideSentence = false;
            sentenceBuffer = "";
        }
    }

    // Cas où le texte se termine sans ponctuation mais contient une phrase valable
    if (isInsideSentence) {
        const hasValidWord = sentenceBuffer
            .trim()
            .split(/\s+/)
            .some((word) => word.length > 1); // On vérifie s’il y a un mot significatif (2 lettres ou plus)

        if (hasValidWord) {
            sentenceCount++;
        }
    }

    return sentenceCount;
}
