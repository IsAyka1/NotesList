import React, { useEffect, useState } from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import './styles/main.css'
import { Note } from './components/note'

const BASE_URL = 'http://127.0.0.1:8000'

const App = () => {

    const [formVisible, setFormVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [notes, setNotes] = useState([])

    const createNote = async (event) => {
        event.preventDefault()

        const newRequest = new Request(
            `${BASE_URL}/notes/`, 
            {
                body:JSON.stringify({title, content}),
                headers: {
                    'Content-Type': 'Application/Json'
                },
                method: 'POST'
            }
        )

        const response = await fetch(newRequest)

        const data = await response.json()

        if (response.ok) {
            console.log(data)
        }
        else {
            console.log('Faild request')
        }

        // console.log(title)
        // console.log(content)

        setTitle('')
        setContent('')
        setFormVisible(false)

        getAllNotes()
    }

    const getAllNotes =  async () => {
        const response = await fetch(`${BASE_URL}/notes`)
        
        const data = await response.json()

        if (response.ok) {
            console.log(data)
            setNotes(data)
        }
        else {
            console.log('Faild request')
        }
    }

    useEffect(
        () => {
            getAllNotes()
        }, []
    )

    const deleteItem = async (itemId) => {
        console.log(itemId)

        const newRequest = new Request(
            `${BASE_URL}/notes/${itemId}`, 
                {method: 'DELETE'}
        )

        const response = await fetch(newRequest)

        if (response.ok) {
            console.log(response.status)
        }
        else {
            console.log('Faild request')
        }

        getAllNotes()
    }

    const NoNotes = () => {
        return (
            <div className="notes">
                <p className="no-notes">No Notes</p>
            </div>
        )
    }
    
    const NotesList = () => {
        return (
            <div className="notes-list">
                {
                    notes.map(
                        (item) => (
                            <Note 
                            title={item.title} 
                            content={item.content}
                            key={item.id} 
                            deleteNote={() => deleteItem(item.id)}/>
                        )
                    )
                }
            </div>
        )
    }

    return (
        <div>
            <div className="header">
                <div className="title">
                    <p>Note Book</p>
                </div>
                <div className="add-section">
                    <a className='add-btn' href='#'
                        onClick={() => setFormVisible(true)}
                    >Add Note</a>
                </div>
            </div>
            {notes.length > 0? NotesList() : NoNotes()}
            <div className={formVisible? 'form-visible' : 'form-unvisible'}>
                <div className="form">
                    <div className="form-header">
                        <div>
                            <p className="form-header-text">Create a Note</p>
                        </div>
                        <div>
                            <a href='#' className='form-close-btn'
                            onClick={() => setFormVisible(false)}
                            >X</a>
                        </div>
                    </div> 
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name='title' id='title' className="form-control" 
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea name="content" id="content" cols="30" rows="7" className="form-control"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-save">
                             <input type="submit" value="Save" className="form-save-btn" onClick={createNote}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

// ReactDOM.render(<App/>, document.querySelector('#root'));


const root = createRoot(document.querySelector('#root')); // createRoot(container!) if you use TypeScript
root.render(<App/>);
