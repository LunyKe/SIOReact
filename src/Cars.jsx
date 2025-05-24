import Input from "./Input.jsx"
import { useState } from "react";


// Je veux 3 input de type texte :
// - Un input pour la marque 
// - Un input pour le modèle de la voiture 
// - Un input pour la couleur 

// Idéalement on utilisera notre composant existant Input

// En dessous de ces inputs un bouton de validation. 
// Une fois le bouton cliqué on affichera dans une phrase en dessous 
// ce que le user aura écrit dans les champs : 

// ex : "Je conduis la Renault Twingo de couleur Jaune" 

function Cars() {
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [color, setColor] = useState("")
    const [submit, setSubmit] = useState(false)

    // Fonction de changement de state (on recup le name de l'input via l'event et on update le bon state) 
    function handleChange(e) {
        if (e.target.name === "brand") {
            setBrand(e.target.value)
        } else if (e.target.name === "model") {
            setModel(e.target.value)
        } else {
            setColor(e.target.value)
        }
    }

    // On gére la soumission du bouton de submit
    function handleSubmit() {
        setSubmit(true)
    }

    // Mon tableau qui contient les infos pour chaque input
    let array = [
        {name: "brand", value: brand, placeholder: "Votre marque ..."},
        {name: "model", value: model, placeholder: "Votre modèle ..."},
        {name: "color", value: color, placeholder: "Votre couleur ..."}
    ]

    
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 space-y-6">
              {array.map((elem, id) => (
                <Input
                  key={id}
                  name={elem.name}
                  value={elem.value}
                  placeholder={elem.placeholder}
                  handleChange={handleChange}
                />
              ))}
          
              {/* Bouton de soumission stylisé */}
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
              >
                Afficher infos
              </button>
          
              {/* Affichage conditionnel de l'info */}
              {submit && (
                <h3 className="text-xl text-gray-800">
                  La {brand} {model} est de couleur {color}
                </h3>
              )}
            </div>
          );
}

export default Cars;