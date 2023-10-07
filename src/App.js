import { useEffect, useState } from "react";
import RGB from "./components/RGB";

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(json => {
        const randomSolution = json[Math.floor(Math.random() * json.length)]
        setSolution(randomSolution.rgb)
        console.log(randomSolution.rgb)
      })
  }, [setSolution])

  return (
    <div className="App">
      <h1>RGBdle</h1>
      {solution && <RGB solution={solution}/>}
    </div>
  );
}

export default App