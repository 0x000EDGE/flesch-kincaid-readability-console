# Calculateur de score de lisibilité - Version console
Ce dépôt contient le code d’une application console qui calcule le score de lisibilité d’un texte selon l’algorithme [Flesch-Kincaid](https://fr.wikipedia.org/wiki/Tests_de_lisibilit%C3%A9_Flesch-Kincaid).

## Fonctionnement
### Prérequis
* **Node.js** : Environnement d'exécution JavaScript côté serveur. Il permet d’exécuter du code JavaScript en dehors d’un navigateur, souvent utilisé pour développer des applications web back-end.
* **pnpm / npm** : Gestionnaires de paquets pour Node.js. Ils permettent d’installer, mettre à jour et gérer les dépendances (bibliothèques, outils, etc.) d’un projet. `pnpm` est une alternative plus rapide et plus efficace en termes d’espace disque que `npm`.

Pour faire fonctionner l’application, l'installation de **Node.js** suffit ([Lien vers la documentation](https://nodejs.org/en/download)), car un gestionnaire de paquets est inclus dans l'installation.

### Lancement de l'application
Pour lancer l'application :
1. Commencez par installer les librairies utilisées par ce projet en lançant, depuis une invite de commande, à la racine du projet, la commande suivante (selon le gestionnaire de paquets utilisé) :
    ```bash
    pnpm install
    ```
    ou
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```
2. Collez votre texte dans un fichier texte à la racine du projet (ou utilisez le fichier `texte.txt` déjà présent).
3. Lancez la commande suivante (toujours à la racine du projet) :
    ```bash
    node .
    ```
4. Le programme se lance et vous demande de choisir le fichier texte contenant le texte à analyser.
