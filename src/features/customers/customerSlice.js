import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAT: "",
  status: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAT: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAT = action.payload.createdAT;
        state.status = true;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

// const customerReducer = (state = initialStateCustomer, action) => {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAT: action.payload.createdAT,
//         status: true,
//       };
//     case "cutomer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName,
//       nationalID,
//       createdAT: new Date().toISOString(),
//     },
//   };
// }

// function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }

// store.dispatch(createCustomer("Giorgi Paksashvili", "1994"));
// store.dispatch(deposit(500));

// console.log(store.getState());
