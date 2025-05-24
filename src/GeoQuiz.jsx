import { useState, useEffect } from "react"


// API à utiliser : https://restcountries.com/v3.1/all (pas de clé API)

// Dans ce composant vous devrez : 

// 1 - Afficher un drapeau aléatoire 
// 
// 2 - Au choix : 
// 
// En dessous, afficher 4 boutons chacun ayant un nom de pays 
// et dont l'un d'eux ayant le bon nom de pays. 
//
// OU
//
// Un inpyut dans lequel vous devrez mettre le bon nom de pays. 
// On mettra la réponse en minuiscule, on échappe les caractères spéciaux, les espaces 
// et on viendra vérifier si la réponse est la bonne en Francais et en Anglais 

// ON fera en sorte qu'une manche dure 10 tours et on affiche le score (+1 pour bonne réponse)



function GeoQuiz() {
  const [country, setCountry] = useState(null)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [correction, setCorrection] = useState("")
  const [name, setName] = useState("")

  // On vient fetch l'API pour recup la liste des pays lors du premier render 
  // mais aussi lorsque le state "round" change de valeur
  useEffect(() => {
    fetchAPI()
  }, [round])

  // Notre fonction pour fetch 
  function fetchAPI() {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => {
        // On vide le message dit de correction (Bonne ou mauvaise réponse)
        setCorrection("")

        // On genere un index aléatoire pour recup un pays aléatoire
        let randomIndex = Math.floor(Math.random() * data.length)
        // On enregistre le pays dans le state "country"
        setCountry(data[randomIndex])
        // On appelle la fonction d'affichage des options en lui passant l'index du pays 
        // (pour avoir la bonne réponse et pouvoir comparer) et aussi data qui contient la liste des pays 
        // afin d'y piocher 3 autres pays random pour les options
        fetchOptions(randomIndex, data)
      })
      .catch(error => console.log(error))
  }

  function fetchOptions(currentIndex, data) {
    // On génère un chiffre random dans l'optique de mélanger les elems du tableau de réponses
    // (afin que la bonne réponse ne soit pas toujours au meme endroit)
    let random = Math.floor(Math.random() * 4)

    // On crée un tableau destiné à recevoir nos options 
    let newArray = []

    // Avec une boucle on vient ajouter 3 fois un pays aléatoire à notre tableau 
    // plus le pays dont le drapeau est affiché que l'on ajoute au tableau après 
    // l'index aléatoire généré plus haut (random)
    for (let i = 0; i < 4; i++) {
      if (i == random) {
        newArray.push(data[currentIndex])
      } else {
        let randomIndex = Math.floor(Math.random() * data.length)

        if (randomIndex != currentIndex) {
          newArray.push(data[randomIndex])
        } else {
          newArray.push(data[randomIndex + 1])
        }
      }
    }

    // On vient ajouter notre tableau d'options au state "options"
    setOptions(newArray)
  }

  // Fonction qui vioent vérifier la réponse, mettre à jour le score, 
  // afficher le message dit de "correction" et passe au tour suivant au bout de 3 sec
  function handleOptionClick(optionName) {
    if (optionName === country.name.common) {
      setScore(score + 1)
      setCorrection("Bonne réponse !")

      setTimeout(() => {
        setRound(round + 1)
      }, 3000);
    } else {
      setCorrection("Faux ! La réponse est : " + country.name.common)

      setTimeout(() => {
        setRound(round + 1)
      }, 3000);
    }
  }

  // Fonction pour redémarrer le jeu : on remet les rounds et le score à 0
  function handleRestart() {
    setScore(0)
    setRound(0)
  }

  // Fonction pour sauvegarder le score
  function saveScore() {
    if (name) {
      let scoreData = { name, score }
      fetch("http://localhost:3000/save_score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(scoreData)
      })
        .then(response => response.json())
        .then(data => console.log("Score saved:", data))
        .catch(error => console.error("Error:", error));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">🌍 Geo Quiz en React 🌍</h2>

      {/* Affichage conditionnel */}
      {round === 11 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-bold text-green-600">🎉 Fin de partie !</h3>
          <h3 className="text-xl text-gray-800">Votre score est de {score} / 10</h3>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-4"
            onClick={() => handleRestart()}
          >
            🔄 Recommencer
          </button>
          <div>
            <input
              type="text"
              placeholder="Ton nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => saveScore}>Sauvegarde ton score</button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
          <h3 className="text-xl font-bold text-gray-800">Round : {round} / 10</h3>
          <h3 className="text-lg text-gray-600">Score : {score} / 10</h3>

          {country && (
            <img
              src={country.flags.png}
              alt="Drapeau"
              className="rounded-lg w-48 h-32 mt-6 mx-auto shadow-md"
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {options && options.map((option, index) => (
              <button
                key={index}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition w-full"
                onClick={() => handleOptionClick(option.name.common)}
              >
                {option.name.common}
              </button>
            ))}
          </div>

          {correction && (
            <h3 className="text-red-500 text-lg font-bold mt-4">{correction}</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default GeoQuiz;
