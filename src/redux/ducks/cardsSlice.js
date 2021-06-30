import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
	{
		id: "1",
		title: "Bruce Wein",
		createdAt: "2019-10-09",
	},
	{
		id: "2",
		title: "Harley Quinn",
		createdAt: "2020-04-07",
	},
];
const cardsSlice = createSlice({
	name: "cards",
	initialState,
	reducers: {
		createCard(state, action) {
			state.push(action.payload);
		},
		prepare(name, address, isVirtual) {
			return {
				payload: {
					id: nanoid(),
					date: new Date().toISOString(),
					name,
					address,
					isVirtual,
				},
			};
		},
	},
});

export default cardsSlice.reducer;
