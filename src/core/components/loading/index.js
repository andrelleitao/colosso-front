import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

function Loading(props) {
  const backgroundColor = {
    background: props.background
  }
  const loaderColor = {
    background: props.loaderColor
  }

  if (props.loading) {
    return (
      <div className="loading-background" style={backgroundColor}>
        <div className="loading-bar" >
          <div className="loading-circle-1" style={loaderColor} />
          <div className="loading-circle-2" style={loaderColor} />
        </div>
      </div>
    )
  }

  return null;
}

Loading.defaultProps = {
  loading: false,
  background: 'rgba(236, 240, 241, 0.7)',
  loaderColor: '#e74c3c'
}

Loading.propTypes = {
  loading: PropTypes.bool,
  background: PropTypes.string,
  loaderColor: PropTypes.string
}

export default Loading;