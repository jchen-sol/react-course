import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
      fontSize: '35px',
      position: 'absolute',
      left: '0',
      right: '0',
      marginTop: '20px',
      textAlign: 'center',
    }
}

export default function Loading ({text = 'Loading', intervalMs = 300})
{
    const [content, setContent] = React.useState(text)
    React.useEffect(() => {
        const id = window.setInterval(() => {
            setContent((oldContent) => {
                return oldContent === `${text}...` ?
                    (text) :
                    `${oldContent}.`
                }
            )
        }, intervalMs)

        return (() => window.clearInterval(id))
    }, [text, intervalMs])

    return (
        <p style={styles.content}>
            {content}
        </p>
    )
}

Loading.propTypes = {
    text: PropTypes.string,
    intervalMs: PropTypes.number
}

/*
export default class Loading extends React.Component
{
    state = {
        content: this.props.text
    }

    componentDidMount()
    {
        const {intervalMs, text} = this.props

        this.interval = window.setInterval(() => {
            this.state.content === (text + '...')
                ? this.setState({content: text})
                : this.setState(({ content }) => { return { content: (content + '.')}})
        }, intervalMs)
    }

    componentWillUnmount()
    {
        window.clearInterval(this.interval)
    }

    render()
    {
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}

Loading.defaultProps = {
    text: 'Loading',
    intervalMs: 300
}


*/