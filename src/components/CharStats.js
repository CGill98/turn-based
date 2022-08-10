import stats from '../constants/character.js';

export default function CharStats() {
	console.log(stats);
	return (
		<div
			style={{
				backgroundColor: '#223',
				padding: 20,
				borderRadius: 10,
				width: 200,
			}}
		>
			<div>Character Stats</div>
			<div>Health {stats.health}</div>
			<div>Endurance {stats.endurance}</div>
			<div>Strength {stats.strength}</div>
			<div>Intelligence {stats.intelligence}</div>
		</div>
	);
}
