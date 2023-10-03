import React, { useEffect, useState, useContext } from "react";
import { gamesCollection } from "../services/firebase";
import { Context } from "../context/Context.js";
import HistoryComponent from "./HistoryComponent.js";
import { onSnapshot, getDocs } from "firebase/firestore";
import NavigationBar from "./NavigationBar";
import "../css/History.css";
import Load from "../Load.js";
import EmptyState from "./EmptyState";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
function History() {
	const [gameHistory, setGameHistory] = useState([]);
	const { currentUser } = useContext(Context);
	const [loading, setLoading] = useState(true);
	const [empty, setEmpty] = useState(false);
	useEffect(() => {
		async function getGamesCollection() {
			const gamesData = await getDocs(gamesCollection);
			const gamesDataArray = gamesData.docs.map((doc) => doc.data());
			if (gamesDataArray.length != 0) {
				const sortedGamesData = [gamesDataArray[0]];
				for (let i = 1; i < gamesDataArray.length; i++) {
					let position;
					let temp;
					sortedGamesData[i] = gamesDataArray[i];
					position = i;
					for (let j = sortedGamesData.length - 2; j >= 0; j--) {
						if (
							gamesDataArray[i].timeStampSubmitted >
							sortedGamesData[j].timeStampSubmitted
						) {
							temp = sortedGamesData[j];
							sortedGamesData[j] = gamesDataArray[i];
							sortedGamesData[position] = temp;
							position = j;
						}
					}
				}
				const gamesArr = sortedGamesData.map((data, index) => {
					if (
						currentUser &&
						data.currentUser === currentUser.email &&
						data.questions.length > 0
					) {
						return (
							<HistoryComponent
								key={index}
								category={data.questions[0].category || "a"}
								score={data.score}
								difficulty={data.questions[0].difficulty}
								submittedAt={data.timeStampSubmitted}
								questions={data.questions}
							/>
						);
					}
				});
				setGameHistory(gamesArr);
				setLoading(false);
			} else {
				setEmpty(true);
				setLoading(false);
			}
		}
		getGamesCollection();
	}, []);

	if (!loading && !empty) {
		return (
			<div className="game-history">
				<NavigationBar />
				<div className="game-history-data">{gameHistory}</div>
			</div>
		);
	} else if (loading && !empty) {
		return (
			<div className="game-history">
				<NavigationBar />
				<Load />
			</div>
		);
	} else if (!loading && empty) {
		return (
			<div className="game-history">
				<NavigationBar />
				<EmptyState
					textTitle="Oops!"
					textBody="Your game history is empty at the moment. Start playing now to build your gaming journey, and your history will be recorded here!"
					Icon={() => (
						<RocketLaunchIcon style={{ color: "silver" }} />
					)}
				/>
			</div>
		);
	}
}

export default History;
