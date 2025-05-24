import React from "react";
import quiz from "./data/quiz";
import { useState } from "react";



// PAGE DU QUIZ !

// Vous devez à partir de quiz.js générer un petit QCM :

// Pour chaque élément de quiz vous afficherez : 
// - La question 
// - Les choix possibles de réponses 
// - La réponse est validée lorsque l'on clique sur celle-ci  
// - Vous devrez ensuite vérifier que la réponse choisie soit bien la bonne (regarder dans quiz.js)
// - Une fois toutes les questions répondues le jeu s'arrete et un bouton permet de recommencer 

// BONUS : affichage du score 


// Concepts à utiliser : 

// useState (le numéro de la question, le score ...)
// Le rendu conditionnel (if .. else => ? :)
// Ecouteur d'événement avec onClick (lorsque l'on clique sur une des réponses)
// méthode .map pour afficher les différents choix possibles


// Indices : 

// Un state pourra s'occuper de l'index de la question (index à 1 au départ pour la première question 
// puis lorsque l'on répond on incrémente celui-ci)
// Un state sera aussi très utile pour le score (à chaque bonne réponse on incrémente ce state de 1)
// If ... else à utiliser aussi dans le JSX (ex: si le state de l'index arrive à la fin on affiche 
// un bouton recommencer et le score sinon on affiche les questions)


// Comment utiliser l'index:

// Pour récupérer une question avec un certain index : quiz[index].question
// Pareil pour les choix : quiz[index].choices


function Quiz() {
    const [questionIndex, setQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)

    // Fonction pour passer à la question suivante (et ajouter +1 au score si bonne réponse)
    function handleClick(choice) {
        if (choice === quiz[questionIndex].correctAnswer) {
            // Ajout de +1 au score
            setScore(score + 1)
        }

        // Passer à la question suivante
        setQuestionIndex(questionIndex + 1)
    }

    // Fonction de reset (on remet index et score à 0)
    function handleReset() {
        setQuestionIndex(0)
        setScore(0)
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">🎯 Quiz en React 🎯</h2>
    
            <h3 className="text-xl text-gray-600 mb-4">Score : {score} / 5</h3>
    
            {/* Affichage conditionnel */}
            {questionIndex < quiz.length ? (
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-3xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{quiz[questionIndex].question}</h2>
    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {quiz[questionIndex].choices.map((choice, index) => (
                            <button
                                key={index}
                                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition w-full"
                                onClick={() => handleClick(choice)}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
                    <h2 className="text-2xl font-bold text-green-600">🎉 Fin de partie !</h2>
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-4"
                        onClick={() => handleReset()}
                    >
                        🔄 Recommencer
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quiz;