import React from "react";

export default function Row({ guess, currentGuess }) {
    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, i) => (
                    <div key={i} className={l.color}>{l.key}</div>
                ))}
            </div>
        )
    }

    if (currentGuess) {
        const chunkSize = 3;
        let chunks = [];
        for (let i = 0; i < currentGuess.length; i += chunkSize) {
            chunks.push(currentGuess.slice(i, i + chunkSize));
        }

        return (
            <div className="row current">
                {chunks.map((chunk, i) => (
                    <div key={i} className="filled">{chunk}</div>
                ))}
                {[...Array(3 - chunks.length)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>
        )
    }

    return (
        <div className="row">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}