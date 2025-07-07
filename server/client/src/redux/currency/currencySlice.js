import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currency: 'usd'
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        selectCurrency: (state, action) => {
            state.currency = action.payload;

        }
    }
});

export const { selectCurrency } = currencySlice.actions;

export default currencySlice.reducer;