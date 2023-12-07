import { useState} from 'react'

const initialState = {
    cards: [
        {
            holderName: 'Mark Henry',
            cardNumber: '1234 1231 2123 2021',
            validity: '12/23',
            cvv: '321',
            id: '1a',
            freeze: false,
            deleted: false,
        },
        {
            holderName: 'John Doe',
            cardNumber: '1234 1231 2123 2022',
            validity: '12/24',
            cvv: '321',
            id: '1b',
            freeze: false,
            deleted: false,
        },
        {
            holderName: 'John Doe',
            cardNumber: '1234 1231 2123 2023',
            validity: '12/25',
            cvv: '321',
            id: '1c',
            freeze: false,
            deleted: false,
        },
    ],
}

export const DataProvider = () => {
    const [cards, setCards] = useState(initialState.cards)
    const [activeCard, setActiveCard] = useState(initialState.cards[0].id)

    // method to add card
    const addCard = (cardDetails) => {
        setCards((prevCards) => [...prevCards, cardDetails])
    }

    const updateCard = () => {
        const newState = [...cards]
        const cardToToggle = newState.findIndex(
            (card) => card.id === activeCard
        )
        const newCard = initialState.cards[cardToToggle]
        newCard.freeze = !newCard.freeze
        newState[cardToToggle] = newCard
        setCards(newState)
    }

    const updateAllCards = () => {
        const newState = [...cards]
        const index = newState.findIndex(
            (card) => card.id === activeCard
        )
        newState.splice(index, 1)
        setCards(newState)
    }

    return {
        cards,
        addCard,
        activeCard,
        setActiveCard,
        updateCard,
        updateAllCards,
    }
}
