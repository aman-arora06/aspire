import "./App.css";
import AspireLogo from "./images/Logo.svg";
import Plus from "./images/plus.svg";
import CardsView from "./Components/CardsView";
import TransactionDetails from "./Components/TransactionDetails";
import Footer from "./Components/Footer";
import { DataProvider } from "./Context/Provider";
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import {
    generateCardNumber,
    generateRandomFutureDate,
    generateRandomAlphanumericNumber,
} from './utils.js'

function App() {
	const {
		cards,
		addCard,
		activeCard,
		setActiveCard,
		updateCard,
		updateAllCards,
	} = DataProvider();

    const [holderName, setHolderName] = useState('')

    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setError('')
        setHolderName('')
        setOpen(false)
    }

	const handleAddCard = () => {
        if (holderName) {
			const cardDetails = {
				holderName: holderName,
				cardNumber: generateCardNumber(),
				validity: generateRandomFutureDate(),
				cvv: '321',
				id: generateRandomAlphanumericNumber(),
			}
			addCard(cardDetails)
            handleClose()
        } else {
            setError('Name is mandatory')
        }
    }

	return (
		<>
			<div id="wrapper">
				<div id="a" className="panels">
					<div className="header">
						<div className="align-self-end f-14">Account Balance</div>
						<div>
							<img src={AspireLogo} />
						</div>
					</div>
					<div className="sub-header">
						<div className="flex align-center">
							<div className="currency-head">S$</div>
							<span className="f-24 w-6 ml-10">3,000</span>
						</div>
						<div className="flex align-center" onClick={handleClickOpen}>
							<img src={Plus} />
							<span
								className="ml-4 f-13"
								style={{
									color: "#23CEFD",
								}}
							>
								New Card
							</span>
						</div>
					</div>
					<div className="flex pt-8 pl-24 pr-24 pb-0 mt-8 mb-8">
						<div className="tab selected">My debit cards</div>
						<div className="tab disabled">All company cards</div>
					</div>
					<CardsView
						cards={cards}
						setActiveCard={setActiveCard}
						activeCard={activeCard}
					/>
				</div>
				<div id="b" className="panels">
					<TransactionDetails
						cards={cards}
						activeCard={activeCard}
						updateCard={updateCard}
						updateAllCards={updateAllCards}
					/>
				</div>
				<Footer />
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle>
					<div>Enter Card info</div>
				</DialogTitle>
				<DialogContent
					className="flex align-center justify-center"
					style={{ height: "120px" }}
				>
					<TextField
						required
						error={error}
						helperText={error}
						id="outlined-required"
						label="Holder Name"
						value={holderName}
						onChange={(e) => {
							setError("");
							setHolderName(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAddCard} autoFocus>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default App;
