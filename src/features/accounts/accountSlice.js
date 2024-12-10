const initialState = {
  balance: 0,
  loan: 0,
  loanPorpose: "",
  isLoading: false,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertedCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export function deposit(ammount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: ammount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertedCurrency" });
    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${ammount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    console.log(data);

    // return action
    dispatch({ type: "account/deposit", payload: converted });
  };
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
