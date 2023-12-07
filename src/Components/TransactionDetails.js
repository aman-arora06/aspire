import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import freezeCardIcon from '../images/freezeCard.svg'
import setSpendLimit from '../images/setSpendLimit.svg'
import gpay from '../images/gpay.svg'
import replaceCard from '../images/replaceCard.svg'
import cancelCard from '../images/cancelCard.svg'
import recentTransaction from '../images/recentTransaction.svg'
import downCaret from '../images/downCaret.svg'
import upCaret from '../images/upCaret.svg'
import cardDetails from '../images/cardDetails.svg'
import exp1 from '../images/exp1.svg'
import exp2 from '../images/exp2.svg'
import exp3 from '../images/exp3.svg'
import bizAndFin from '../images/bizAndFin.svg'
import '../css/TransactionDetails.css'

const imageMap = {
    shopping: { icon: exp1, bg: '#009DFF1A' },
    travel: { icon: exp2, bg: '#00D6B51A' },
    alert: { icon: exp3, bg: '#F251951A' },
}

const transactions = [
    {
        origin: 'Hamleys',
        amount: '+ S$ 150',
        credit: true,
        message: 'Refund on debit card',
        date: '20 May 2020',
        type: 'shopping',
    },
    {
        origin: 'Hamleys',
        amount: '- S$ 150',
        credit: false,
        message: 'Charged to debit card',
        date: '20 May 2020',
        type: 'travel',
    },
    {
        origin: 'Hamleys',
        amount: '- S$ 150',
        credit: false,
        message: 'Charged to debit card',
        date: '20 May 2020',
        type: 'alert',
    },
    {
        origin: 'Hamleys',
        amount: '- S$ 150',
        credit: false,
        message: 'Charged to debit card',
        date: '20 May 2020',
        type: 'shopping',
    },
]

const TransactionDetails = ({ cards, activeCard, updateCard, updateAllCards }) => {
    const [showTransactions, setShowTransactions] = useState(false)

    const [currentCard, setCurrentCard] = useState({})
    useEffect(() => {
        const card = cards.find((item) => item.id === activeCard)
        setCurrentCard(card)
    }, [activeCard])
    const freezeFunc = () => {
        updateCard()
    }

    const cancelFunc = () => {
        if (cards.length === 1) return
        updateAllCards()
    }

    const headerMap = [
        {
            icon: freezeCardIcon,
            label: currentCard?.freeze ? 'Unfreeze Card' : 'Freeze Card',
            key: 'home',
            onClick: freezeFunc,
            size: 2,
        },
        {
            icon: setSpendLimit,
            label: 'Set spend limit',
            key: 'cards',
            size: 3,
        },
        { icon: gpay, label: 'Add to Gpay', key: 'payments', size: 2 },
        { icon: replaceCard, label: 'Replace Card', key: 'credit', size: 3 },
        {
            icon: cancelCard,
            label: 'Cancel Card',
            key: 'profile',
            onClick: cancelFunc,
            size: 2,
            disabled: cards.length === 1,
        },
    ]
    return (
        <div>
            <Grid container className="flex card-info-header">
                {headerMap.map((item) => (
                    <Grid item xs={item.size} key={item.key}>
                        <div
                            className={`text-center p-8 ${
                                item.disabled ? 'cursor-disabled' : ''
                            }`}
                            onClick={item.onClick && item.onClick}
                        >
                            <img src={item.icon} />
                            <div
                                className="f-12"
                                style={{
                                    color: 'black',
                                    color: '#0C365A',
                                }}
                            >
                                {item.label}
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <div className="accordion-header align-center flex cursor-disabled">
                <div className="accordion-title">
                    <img src={cardDetails} />
                    <div className="pl-8">Card Details</div>
                </div>
                <div>
                    <img src={downCaret} />
                </div>
            </div>

            <div
                className="accordion-header align-center flex"
                onClick={() =>
                    setShowTransactions((showTransactions) => !showTransactions)
                }
            >
                <div className="accordion-title">
                    <img src={recentTransaction} />
                    <div className="pl-8">Recent transactions</div>
                </div>
                <div>
                    {showTransactions ? <img src={upCaret} /> : <img src={downCaret} />}
                </div>
            </div>
            {showTransactions && (
                <div className="accordion-content">
                    {transactions.map((item) => (
                        <Grid
                            container
                            className="content-container"
                            key={item.key}
                        >
                            <Grid item xs={3} className="text-center">
                                <div
                                    className="flex justify-center align-center"
                                    style={{
                                        height: 48,
                                        width: 48,
                                        margin: 'auto',
                                        background: imageMap[item.type].bg,
                                        borderRadius: '50%',
                                    }}
                                >
                                    <img src={imageMap[item.type].icon} />
                                </div>
                            </Grid>
                            <Grid container item xs={9}>
                                <Grid item xs={8}>
                                    <div className="item-origin f-14 mb-8">
                                        {item.origin}
                                    </div>
                                    <div className="item-date f-13 mb-8">
                                        {item.date}
                                    </div>
                                    <div className="item-message f-12 flex align-center">
                                        <div className="flex trans-img-container mr-8">
                                            <img src={bizAndFin} />
                                        </div>
                                        {item.message}
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div
                                        className={`f-14 item-amount ${
                                            item.credit ? 'amount-credit' : ''
                                        }`}
                                    >
                                        {item.amount}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        // <div>{item.origin}</div>
                    ))}
                    <div className="view-all flex justify-center align-center">
                        <div>View all card transactions</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TransactionDetails
