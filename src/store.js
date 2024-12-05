import { combineReducers, createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPorpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAT: "",
  status: false,
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
const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAT: action.payload.createdAT,
        status: true,
      };
    case "cutomer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { ammount: 1000, purpose: "Buy a car" },
// });
// store.dispatch({ type: "account/payLoan" });

function deposit(ammount) {
  return { type: "account/deposit", payload: ammount };
}
function withdraw(ammount) {
  return { type: "account/withdraw", payload: ammount };
}

function requestLoan(ammount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { ammount: ammount, purpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(requestLoan(200, "Buy a new car"));
store.dispatch(withdraw(300));
store.dispatch(payLoan());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAT: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

// store.dispatch(createCustomer("Giorgi Paksashvili", "1994"));
// store.dispatch(deposit(500));
console.log(store.getState());
