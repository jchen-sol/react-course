import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Loading from './components/Loading'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

function App ()
{
    const [theme, setTheme] = React.useState('light')

    const toggleTheme = () => {
        setTheme((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <Router>
            <ThemeProvider value={theme}>
                <div className={theme}>
                    <div className='container'>
                        <Nav toggleTheme={toggleTheme}/>
                        <React.Suspense
                            fallback={<Loading />}
                        >
                            <Switch>
                                <Route exact path='/' component={Popular} />
                                <Route exact path='/battle' component={Battle} />
                                <Route path='/battle/results' component={Results} />
                                <Route render={() => (<h1>404</h1>)} />
                            </Switch>
                        </React.Suspense>
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}

ReactDOM.render(
    // React element
    <App/>,
    // Where to render the element
    document.getElementById('app')
)