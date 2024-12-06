const initialState = {
  balance: 0,
  loan: 0,
  loanPorpose: "",
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //   LATER
      return {
        ...state,
        loan: action.payload.ammount,
        loanPorpose: action.payload.purpose,
        balance: state.balance + action.payload.ammount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPorpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
};

export function deposit(ammount) {
  return { type: "account/deposit", payload: ammount };
}
export function withdraw(ammount) {
  return { type: "account/withdraw", payload: ammount };
}

export function requestLoan(ammount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { ammount: ammount, purpose: purpose },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}

// store.dispatch(deposit(500));
// store.dispatch(requestLoan(200, "Buy a new car"));
// store.dispatch(withdraw(300));
// store.dispatch(payLoan());

export default accountReducer;
