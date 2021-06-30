import {configureStore} from '@reduxjs/toolkit'

import cardsReducer from './ducks/cardsSlice'

export default configureStore({
    reducer: {
        cards: cardsReducer
    }
})