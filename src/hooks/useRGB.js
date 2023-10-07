import { type } from '@testing-library/user-event/dist/type'
import {useState} from 'react'

const useRGB = (solution) => {
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    const formatGuess = () => {
        let solutionArray = [...solution];

        let formattedGuess = [];
        for (let i = 0; i < currentGuess.length; i += 3) {
            let chunk = currentGuess.slice(i, i + 3);
            formattedGuess.push(chunk);
        }
        formattedGuess = formattedGuess.map((triple) => {
            return{key: triple, color: 'wrong'}
        })

        //console.log(typeof solution[0])
        //console.log(typeof formattedGuess[0].key)

        formattedGuess.forEach((triple, i) => {
            console.log(solutionArray[i], triple.key)
            if (solutionArray[i] === triple.key) {
                formattedGuess[i].color = 'right'
                solutionArray[i] = null
            }
        })

        formattedGuess.forEach((triple, i) => {
            if (Math.abs(triple.key - solutionArray[i]) <= 50 && triple.color !== 'right') {
                formattedGuess[i].color = 'close'
                solutionArray[solutionArray.indexOf(triple.key)] = null
            }
        })

        document.documentElement.style.setProperty('--red', Number(solution[0]));
        document.documentElement.style.setProperty('--green', Number(solution[1]));
        document.documentElement.style.setProperty('--blue', Number(solution[2]));

        if (solution[0] > 128) {
            document.documentElement.style.setProperty('--close_red', Math.round(Number(solution[0])*75));
        } else {
            document.documentElement.style.setProperty('--close_red', Math.round(Number(solution[0])*1.33));
        }
        if (solution[1] > 128) {
            document.documentElement.style.setProperty('--close_green', Math.round(Number(solution[1])*.75));
        } else{
            document.documentElement.style.setProperty('--close_green', Math.round(Number(solution[1])*1.33));

        }
        if (solution[1] > 128) {
            document.documentElement.style.setProperty('--close_blue', Math.round(Number(solution[2])*.75));
        } else {
            document.documentElement.style.setProperty('--close_blue', Math.round(Number(solution[2])*1.33));
        }

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        //console.log(currentGuess, solution)

        let solutionString = '';
        for (let i = 0; i < solution.length; i += 1) {
            solutionString += solution[i]
        }
        
        if (currentGuess === solutionString) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setCurrentGuess('')
    }

    const handleKeyUp = ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) {
                console.log('all guesses used')
                return
            }

            if (history.includes(currentGuess)) {
                console.log('rgb already guessed')
                return
            }

            if (currentGuess.length !== 9) {
                console.log('rgb must be 9 chars')
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if (/^[0-9]$/.test(key)) {
            if (currentGuess.length < 9) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp}
}

export default useRGB