import stats from '../constants/character.js';

export default function Enemy() {
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
		</div>
	);
}
