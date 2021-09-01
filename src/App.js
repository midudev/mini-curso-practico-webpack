import { useState, useEffect } from 'react'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch(url).then(response => response.json())
    	.then(notes => {
      	setNotes(notes)
    	})
  }, [url])

  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])
  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick} >press</button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}

export default App