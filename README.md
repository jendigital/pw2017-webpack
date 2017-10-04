# Support d’atelier Webpack à Paris Web 2017

## Mise en place

1. Assure-toi d’avoir un **Node récent** installé (idéalement 8+)
  - Pour Windows et Mac, hors nvm : [les installeurs officiels](https://nodejs.org/en/download/current/)
  - Pour Linux, hors nvm : [les dépôts NodeSource](https://github.com/nodesource/distributions#table-of-contents)
  - Avec nvm : `nvm install 8 && nvm use 8` (voire `nvm alias default 8`)
2. Mets à jour ton `npm` : `npm install -g npm` (si besoin en `sudo`)
3. Assure-toi d’avoir un **Git récent**, ça sera utile ici…
  - Pour Windows, hors Linux Subsystem : [l’installeur officiel](https://git-scm.com/downloads)
  - Pour Linux (Debian/Ubuntu/Mint ou Windows Linux Subsystem) : [le PPA qui va bien](https://launchpad.net/~git-core/+archive/ubuntu/ppa)
  - Pour Mac, hors Homebrew : [l’installeur officiel](https://git-scm.com/downloads)
  - Pour Mac, avec Homebrew : `brew update` puis `brew install git` (ou `brew upgrade git`)
4. Clone ce dépôt depuis un dossier de ton choix, genre ton bureau :

```bash
git clone https://github.com/deliciousinsights/pw2017-webpack
```

5. Procède à une première installation :

```bash
cd pw2017-webpack
npm install
```

Tu es prêt·e !
