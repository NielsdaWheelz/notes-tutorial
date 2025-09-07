import { useState, useEffect } from "react"
import axios from "axios"
import Note from "./Note"

export default function App() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        const notes = response.data
        setNotes(notes)
      })
  }, [notes])

  const noteElements = notes.map((note: { content: string, id: string }) => (
    <Note content={note.content} key={note.id} />
  ))

  return (
    <main>
      {noteElements}
    </main>
  )
}