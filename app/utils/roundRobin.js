// Ici, je veux juste créer une fonction de génération des matchs, selon le principe Round Robin
// Chaque équipe rencontre au moins une fois toutes les autres équipes
// plus tard, on pourrait meme ajouter un tour complet (pour avoir des matchs aller/retour)
// un peu comme les championnats de foot (Ligue 1 etc...)

function generateRoundRobinMatchs(teams) {
  const pairs = [];
  const n = teams.length;

  // Pour [A, B, C, D], n = 4
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // [i] = 0 = A
      // [j] = 1 = B => [A] - [B]
      // [j] = 2 = C => [A] - [C]
      // ...
      // Puis [i] = 1 = B
      // [j] = 2 = C => [B] - [C]
      // ...
      pairs.push([teams[i], teams[j]]);
    }
  }

  return pairs;
}

module.exports = { generateRoundRobinMatchs };
