import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            content: 'Loading'
        }
    }

    componentDidMount()
    {
        const {intervalMs} = this.props

        this.interval = window.setInterval(() => {
            this.state.content === ('Loading' + '...')
                ? this.setState({content: 'Loading'})
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
            <p>
                {this.state.content}
            </p>
        )
    }
}

Loading.defaultProps = {
    intervalMs: 300
}

Loading.propTypes = {
    intervalMs: PropTypes.number
}