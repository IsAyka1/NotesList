import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.css'

const App = () => {
    return (
        <div>
            <div className="header">
                <div className="title">
                    <p>Note Book</p>
                </div>
                <div className="add-section">
                    <a className='add-btn' href='#'>Add Note</a>
                </div>
            </div>
            <div className="notes">
                 <p className="no-notes">No Notes</p>
            </div>
            <div className="form-back">
                <div className="form">
                    <div className="form-header">
                        <div>
                            <p className="form-header-text">Create a Note</p>
                        </div>
                        <div>
                            <a href='#' className='form-close-btn'>X</a>
                        </div>
                    </div> 
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name='title' id='title' className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea name="content" id="content" cols="30" rows="7" className="form-control"></textarea>
                        </div>
                        <div className="form-save">
                             <input type="submit" value="Save" className="form-save-btn" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector('#root'));

