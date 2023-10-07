import React, { useEffect, useState } from "react";
import useRGB from "../hooks/useRGB";
import Grid from "./Grid"
import Modal from "./modal";

export default function RGB({ solution }) {
    const { currentGuess, handleKeyUp, guesses, isCorrect, turn } = useRGB(solution)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        if (isCorrect) {
            console.log("won!")
            setTimeout(() => setShowModal(true), 1000)
            window.removeEventListener('keyup', handleKeyUp)
        }

        if (turn > 5) {
            console.log("loss!")
            setTimeout(() => setShowModal(true), 1000)
            window.removeEventListener('keyup', handleKeyUp)
        }
        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp, isCorrect, turn])

    return (
        <div>
            <div>solution - {solution}</div>
            <div>current guess: {currentGuess}</div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
        </div>
    )
}