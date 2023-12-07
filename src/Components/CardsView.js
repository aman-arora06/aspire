import CardsCarousel from './CardsCarousel'

const CardsView = ({cards, setActiveCard, activeCard}) => {
    return (
        <div>
            <CardsCarousel cards={cards} setActiveCard={setActiveCard} activeCard={activeCard} />
        </div>
    )
}

export default CardsView
