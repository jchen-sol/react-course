import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'

function isAuthed()
{
    return true
}

// First component
//   State
//   Lifecycle
//   UI
class App extends React.Component
{
    render()
    {
        const authed = isAuthed();
        const name = 'Rylan'

        return (
            <div className='container'>
                <Battle/>
            </div>
        )
    }
}

ReactDOM.render(
    // React element
    <App/>,
    // Where to render the element
    document.getElementById('app')
)