const constants = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  MULTIPLY: "multiply",
};

function incrementCount(number) {
  return { type: constants.INCREMENT, payload: number };
}

function decrementCount(number) {
  return { type: constants.DECREMENT, payload: number };
}

function multiplyCount(number) {
  return { type: constants.MULTIPLY, payload: number };
}

const actions = {
  incrementCount,
  decrementCount,
  multiplyCount,
};

// Store
{
  let state = {
    count: 0,
  };

  const setState = (newState) => {
    state = newState;
  };

  // example action = { type: "increment", payload: 2}
  const reducer = (state, action) => {
    const { type, payload } = action;
    if (type === constants.INCREMENT) {
      return { count: state.count + payload };
    }
    if (type === constants.DECREMENT) {
      return { count: state.count - payload };
    }

    if (type === constants.MULTIPLY) {
      return { count: state.count * payload };
    }
  };

  const dispatch = (action) => {
    const newState = reducer(state, action);
    setState(newState);
  };

  function useDispatch() {
    return dispatch;
  }

  function useSelector(cb) {
    return cb(state);
  }
}

function ComponentA() {
  const dispatch = useDispatch();
  dispatch(actions.incrementCount(4));
  dispatch(actions.decrementCount(2));
  dispatch(actions.multiplyCount(2));
}

function ComponentB() {
  const count = useSelector((state) => state.count);
  console.log(count);
}

ComponentA();
ComponentB();
