const data = require('./db.json')
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

let notes = data.notes

const generatedId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
    return String(maxId + 1)
}

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (request, response) => {
    response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.post("api/notes", (request, response) => {
    const noteBody = request.body
    if(!noteBody.content)
            return response.status(400).json({
                error: "content missing"
            })
    const note = {
        content: noteBody.content,
        important: noteBody.important || false,
        id: generatedId()
    }
    notes = notes.concat(note)
    console.log(notes)
    response.json(note)
})

app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})