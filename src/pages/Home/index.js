import React, { Component } from 'react';
import cato from './cat.json'
import Lottie from 'lottie-react-web'

class Home extends Component {
  render () {
    return (
      <div>
        <Lottie
          options={{
            animationData: cato
          }}
          width={980}
          height={980}
        />
      </div>
    )
  }
}

export default Home;
