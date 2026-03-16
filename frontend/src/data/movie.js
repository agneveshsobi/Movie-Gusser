import titanicImg from "../img/titanic.jpg"
import fightclubImg from "../img/fightclub.jpg"
import avatarImg from "../img/avatar.jpg"

export const MOVIES = [
  {
    id: 1,
    title: "Titanic",
    year: 1997,
    image: titanicImg,
    color: "#38bdf8",
    clues: [
      "Based on a real historical disaster",
      "A love story between two people from different social classes",
      "The ship sinks after hitting an iceberg",
      "Directed by James Cameron",
    ],
  },
  {
    id: 2,
    title: "Fight Club",
    year: 1999,
    image: fightclubImg,
    color: "#f97316",
    clues: [
      "First rule — you do not talk about it",
      "An insomniac office worker seeks an escape from his boring life",
      "Features a very famous plot twist",
      "Directed by David Fincher",
    ],
  },
  {
    id: 3,
    title: "Avatar",
    year: 2009,
    image: avatarImg,
    color: "#34d399",
    clues: [
      "Set on a moon called Pandora",
      "Humans are mining a valuable resource",
      "Features a native tribe called the Na'vi",
      "Directed by James Cameron",
    ],
  },
]