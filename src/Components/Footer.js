import React from 'react'
import footerLogo from '../images/footerLogo.svg'
import footerCard from '../images/footerCard.svg'
import footerPayments from '../images/footerPayments.svg'
import footerCredit from '../images/footerCredit.svg'
import footerProfile from '../images/footerProfile.svg'
import '../css/Footer.css'

const footerMap = [
    { icon: footerLogo, label: 'Home', key: 'home' },
    { icon: footerCard, label: 'Cards', key: 'cards' },
    { icon: footerPayments, label: 'Payments', key: 'payments' },
    { icon: footerCredit, label: 'Credit', key: 'credit' },
    { icon: footerProfile, label: 'Profile', key: 'profile' },
]

const Footer = () => {
    const selected = 'cards'
    return (
        <>
            <div className="footer-container">
                <div className="footer-map">
                    {footerMap.map((item) => (
                        <div className="text-center" key={item.key}>
                            <img src={item.icon} />
                            <div
                                className={`footer-item ${
                                    item.key === selected
                                        ? 'footer-item-selected'
                                        : ''
                                }`}
                            >
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Footer
