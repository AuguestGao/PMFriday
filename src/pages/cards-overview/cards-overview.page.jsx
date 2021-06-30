import React from 'react'
import { useSelector } from 'react-redux'


import Card from '../../components/Card/Card.component'

const CardsOverview = () => {
    const cards = useSelector(state => state.cards)

const renderCards = cards.map(card => (
    <Card key={card.id} {...card} />
))

    return(
        <div>
            {renderCards}
        </div>
    )
}

export default CardsOverview