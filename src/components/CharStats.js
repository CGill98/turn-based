import { useContext } from 'react';
import stats from '../constants/character.js';
import { PlayerContext } from '../components/contexts/PlayerContext';

export default function CharStats() {
	// console.log(stats);
	const { state: player } = useContext(PlayerContext);
	console.log(player);
	// s[1]('ajajajaj');
	return (
		<div
			style={{
				backgroundColor: '#223',
				padding: 20,
				borderRadius: 10,
				width: 200,
			}}
		>
			<div>Character Stats: {player.name}</div>
			<div>Health {player.stats.health}</div>
			<div>Endurance {player.stats.endurance}</div>
			<div>Strength {player.stats.strength}</div>
			<div>Intelligence {player.stats.intelligence}</div>
		</div>
	);
}
