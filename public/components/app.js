import React from 'react'
import Home from './home'

class RenderForcer extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
        <Home />
    )
  }
}
export default RenderForcer