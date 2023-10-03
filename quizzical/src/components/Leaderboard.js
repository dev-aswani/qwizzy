import React, { useEffect, useState, useContext } from "react";
import { gamesCollection } from "../services/firebase";
import { Context } from "../context/Context.js";
import LeaderboardComponent from "./LeaderboardComponent.js";
import { onSnapshot, getDocs } from "firebase/firestore";
import NavigationBar from "./NavigationBar";
import "../css/Leaderboard.css";
import Load from "../Load.js";
import EmptyState from "./EmptyState.js";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);
	const { currentUser } = useContext(Context);
	const [loading, setLoading] = useState(true);
	const [empty, setEmpty] = useState(false);
	useEffect(() => {
		let isMounted = true;
		async function getGamesCollection() {
			const gamesData = await getDocs(gamesCollection);
			let playersData = [];
			gamesData.docs.forEach((doc) => {
				const data = doc.data();
				if (currentUser && data.questions.length > 0) {
					if (
						!playersData.some(
							(player) => player.id === data.currentUser
						)
					) {
						let id = data.currentUser;
						let totalScore = data.score;
						let matches = 1;
						playersData.push({ id, totalScore, matches });
					} else {
						let playerIndex = -1;
						playersData.forEach((player, index) => {
							if (player.id === data.currentUser) {
								playerIndex = index;
							}
						});
						playersData[playerIndex].totalScore += data.score;
						playersData[playerIndex].matches += 1;
					}
				}
			});
			if (
				playersData !== [] &&
				playersData !== null &&
				playersData !== undefined &&
				playersData[0]
			) {
				const sortedHalf = [playersData[0]];
				for (let i = 1; i < playersData.length; i++) {
					let position;
					let temp;
					sortedHalf[i] = playersData[i];
					position = i;
					for (let j = sortedHalf.length - 2; j >= 0; j--) {
						if (playersData[i].score > sortedHalf[j].score) {
							temp = sortedHalf[j];
							sortedHalf[j] = playersData[i];
							sortedHalf[position] = temp;
							position = j;
						}
					}
				}
				if (sortedHalf !== [] && sortedHalf) {
					const sortedPlayersData = sortedHalf.map(
						(player, index) => {
							return (
								<LeaderboardComponent
									rank={index + 1}
									id={player.id}
									matches={player.matches}
									score={player.totalScore}
									key={index}
								/>
							);
						}
					);
					if (isMounted) {
						setLeaderboard(sortedPlayersData);
						setLoading(false);
					}
				}
			} else {
				setEmpty(true);
				setLoading(false);
			}
		}
		getGamesCollection();
		return () => {
			isMounted = false;
		};
	}, []);
	if (!loading && !empty) {
		return (
			<div className="leaderboard">
				<NavigationBar />
				<div className="leaderboard-data">{leaderboard}</div>
			</div>
		);
	} else if (loading && !empty) {
		return (
			<div className="leaderboard">
				<NavigationBar />
				<Load />
			</div>
		);
	} else if (!loading && empty) {
		return (
			<div className="leaderboard">
				<NavigationBar />
				<EmptyState
					textTitle="Oops!"
					textBody="The leaderboard is empty at the moment. Be the first to join the game and top the charts!"
					Icon={() => (
						<EmojiEventsIcon
							style={{
								color: "silver",
							}}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Leaderboard;
