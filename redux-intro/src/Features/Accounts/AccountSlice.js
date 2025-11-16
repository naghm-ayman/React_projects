import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.purpose = '';
    },
    currencyConverting(state){
      state.isLoading = true;
    }
  },
});

export const {withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposite(amount, currency) {
  if(currency === "USD")
  return { type: "account/deposite", payload: amount };

  return async function(dispatch) {
    dispatch({type: "account/currencyConverting"})
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    //console.log(data)
    const converted = data.rates.USD;

    dispatch({ type: "account/deposite", payload: converted })
  }
}
export default accountSlice.reducer
// export default function accountReducer(state = intialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposite":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };
//     case "account/currencyConverting":
//       return{
//         ...state, isLoading: true,
//       }
//     default:
//       return state;
//   }
// }

// export function deposite(amount, currency) {
//   if(currency === "USD")
//   return { type: "account/deposite", payload: amount };

//   return async function(dispatch) {
//     dispatch({type: "account/currencyConverting"})
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     //console.log(data)
//     const converted = data.rates.USD;

//     dispatch({ type: "account/deposite", payload: converted })
//   }

// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
