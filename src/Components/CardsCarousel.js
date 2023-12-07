import React, { useContext, useState, useRef, useEffect } from 'react'
import showEye from '../images/showEye.svg'
import visaLogo from '../images/visaLogo.svg'
import logoPlusAspire from '../images/logoPlusAspire.svg'
import '../css/CardsCarousel.css'

const Card = ({ color, cardNumber, holderName, validity, freeze }) => {
    const [showDetails, setShowDetails] = useState(false)
    const characterSplit = cardNumber.split(' ')
    const [charsA, charsB, charsC, charsD] = characterSplit

    return (
        <div className="img-container">
            {!freeze && (
                <div
                    className="show-details"
                    onClick={() =>
                        setShowDetails((showDetails) => !showDetails)
                    }
                >
                    <img src={showEye} height={16} width={16} />
                    Show card number
                </div>
            )}
            <div
                className={`card-ui ${freeze ? 'card-frozen' : ''}`}
                style={{ background: color }}
            >
                <div className="text-align-right">
                    <img src={logoPlusAspire} />
                </div>
                <div className="card-details">
                    <div className="holder w-6 ls-1">{holderName}</div>
                    <div className="number flex">
                        <div
                            className="f-14 card-char"
                            style={{
                                width: '50px',
                                letterSpacing: '2px',
                                marginRight: '16px',
                            }}
                        >
                            {showDetails ? charsA : '●●●●'}
                        </div>
                        <div className="f-14 card-char">
                            {showDetails ? charsB : '●●●●'}
                        </div>
                        <div className="f-14 card-char">
                            {showDetails ? charsC : '●●●●'}
                        </div>
                        <div className="ls-12 f-14 card-char">{charsD}</div>
                    </div>
                    <div className="creds">
                        <div className="validity w-6 ls-3">
                            Thru: {validity}
                        </div>
                        <div className="cvv">
                            <span className="ls-half">CVV:</span>
                            <span className="cvv-char">***</span>
                        </div>
                    </div>
                </div>

                <div className="text-align-right">
                    <img src={visaLogo} />
                </div>
            </div>
        </div>
    )
}

const CardsCarousel = ({ cards, setActiveCard, activeCard }) => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [activeIndicator, setActiveIndicator] = useState(1)
    const elementRef = useRef(null)
    const showScroll = () => {
        setScrollPosition(elementRef.current.scrollLeft)
    }

    const visibleCards = cards?.filter((card) => !card.deleted).length

    useEffect(() => {
        const activeCardCopy = parseInt(scrollPosition / 360)
        setActiveIndicator(activeCardCopy + 1)
        setActiveCard(cards[activeCardCopy].id)
    }, [scrollPosition])

    return (
        <>
            <div class="horizontal-snap" onScroll={showScroll} ref={elementRef}>
                {cards.map(
                    ({
                        holderName,
                        cardNumber,
                        validity,
                        id,
                        freeze,
                        deleted,
                    }) =>
                        !deleted && (
                            <div className="img-container" key={id}>
                                <Card
                                    color={id === activeCard ? '#01D167' : '#536DFF'}
                                    holderName={holderName}
                                    cardNumber={cardNumber}
                                    validity={validity}
                                    id={id}
                                    freeze={freeze}
                                    deleted={deleted}
                                />
                            </div>
                        )
                )}
            </div>
            {visibleCards > 1 && (
                <div className="flex justify-center">
                    <div
                        className={`indicator ${
                            activeIndicator === 1 ? 'active' : 'inactive'
                        }`}
                    ></div>
                    <div
                        className={`indicator ${
                            activeIndicator > 1 &&
                            activeIndicator < visibleCards
                                ? 'active'
                                : 'inactive'
                        }`}
                    ></div>

                    {visibleCards > 2 && (
                        <div
                            className={`indicator ${
                                activeIndicator === visibleCards
                                    ? 'active'
                                    : 'inactive'
                            }`}
                        ></div>
                    )}
                </div>
            )}
        </>
    )
}

export default CardsCarousel
