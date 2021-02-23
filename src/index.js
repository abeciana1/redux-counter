import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles.scss';

import { createStore } from 'redux' //! ability to create a store
import { connect, Provider } from 'react-redux'

const initialState = {
  count:0,
}

const INCREMENT = 'INCREMENT' //! common practice to avoid spelling errors with redux action types
const DECREMENT = 'DECREMENT'

const increment = () => ({ //! old name incrementValue
  type: INCREMENT,
})

const decrement = () => ({ //! old name decrementValue
  type: DECREMENT,
})

const reducer = ( state = initialState, action ) => {
  if (action.type === INCREMENT) { //! Watch out for spelling errors
    return {
      count: state.count + 1
    }
  }
  if (action.type === DECREMENT) {
    return {
      count: state.count - 1,
    };
  }
  return state
}

const store = createStore(reducer)

class Counter extends Component {

  render() {
    const  { count, increment, decrement} = this.props
    // console.log({ count, increment })

    return (
      <main className="Counter">
        <p className="count">{ count }</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button>Reset</button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
// const mapDispatchToProps = (dispatch) => {
  //! dispatch gives you the ability to dispatch action to state and invoke 
  // return { //! old solution
  //   increment() {
  //     dispatch(incrementValue())
  //   },
  //   decrement() {
  //     dispatch(decrementValue())
  //   }
  // };

  // return bindActionCreators({ //! alternative solution
  //   increment, 
  //   decrement
  // }, dispatch)

  increment, //! modern redux - can just pass in object
  decrement
}

//! names ^^ don't matter - but convention helps

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter) //! returns function waiting for a react component
//! has two arguments usually ^^ msp & mdp

//! msp, mdp in that order in connect function

render(
  //! Provider connects redux to react - pass in prop so entire app
  //! has access to the store (state object)
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root'),
);
