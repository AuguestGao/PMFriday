import React from 'react'
import CardContainer from './Card.styles';

const Card = ({title,createdAt }) => {
    return(
        <CardContainer>
            <h2>{title}</h2>
            <span>Date: {createdAt}</span>
        </CardContainer>
    )
}

export default Card;