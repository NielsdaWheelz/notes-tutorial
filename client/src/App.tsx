import { useState, useEffect } from "react"
import NotComponent from "./NoteComponent"
import type { Note } from "./types/types"
import noteService from "./services/notes"

export default function App() {

  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState<string>("")

  useEffect(() => {
    noteService.getAll()
      .then(notes => {
        setNotes(notes)
      })
  }, [notes])

  const noteElements = notes.map((note: Note) => (
    <NotComponent content={note.content} key={note.id} />
  ))

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const content = newNote
    noteService.create({ content })
      .then(note => {
        setNotes(prevNotes => [...prevNotes, note as Note])
      })
      .catch(error => {
        alert(`Error: ${error.message}`)
        setNotes(notes.filter((n: Note) => n.id !== note.id))
      })
  }

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value)
  }

  return (
    <main>
      <h1>Notes</h1>
      {noteElements}
      <form onSubmit={addNote}>
        <input onChange={handleContentChange} type="text" value={newNote} />
        <button type="submit">Add Note</button>
      </form>
    </main>
  )
}