// Charger les variables d'environnement
require("dotenv").config();

// Import des models
const { Team, Match, Tournament, User } = require("./app/models");

const test = async () => {
  try {
    const tournament = await Tournament.findOne({
      where: { id: 1 },
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "pseudo", "email"],
        },
        {
          model: Match,
          as: "matchs",
          include: [
            {
              model: Team,
              as: "teams",
              through: {
                attributes: ["team_position", "score"],
              },
            },
          ],
        },
      ],
    });

    const team = await Team.findOne({
      where: { id: 1 },
      include: {
        model: Tournament,
        as: "tournaments",
      },
    });

    console.log(JSON.stringify(team, null, 2));

    // console.log(JSON.stringify(tournament, null, 2));
  } catch (error) {
    console.log(error);
  }
};

test();
