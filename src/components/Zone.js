import { useState, useContext } from 'react';
import { PlayerContext } from '../components/contexts/PlayerContext';
import { getConnectedRooms } from '../scripts/generateZone';

const styles = {
	table: {
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'red',
		// backgroundColor: 'red',
		// position: 'absolute',
	},
	td: (cell, player, zone) => ({
		position: 'relative',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'red',
		width: 80,
		height: 80,
		backgroundColor: cell.type === 'WALL' ? 'red' : null,
	}),
};

export default function Zone({ zone }) {
	const [selectedCell, setSelectedCell] = useState(null);
	const { state: player } = useContext(PlayerContext);
	//to import:
	// const zone = [
	// 	[
	// 		{ type: 'ROOM', zoneExit: true },
	// 		{ type: 'ROOM' },
	// 		{ type: 'WALL' },
	// 		{ type: 'WALL' },
	// 	],
	// 	[
	// 		{ type: 'WALL' },
	// 		{ type: 'ROOM' },
	// 		{ type: 'ROOM', levelExit: true },
	// 		{ type: 'ROOM' },
	// 	],
	// 	[
	// 		{ type: 'WALL' },
	// 		{ type: 'ROOM', levelExit: true, zoneExit: true },
	// 		{ type: 'WALL' },
	// 		{ type: 'ROOM', enemy: true },
	// 	],
	// 	[
	// 		{ type: 'WALL' },
	// 		{ type: 'WALL' },
	// 		{ type: 'WALL' },
	// 		{ type: 'ROOM' },
	// 	],
	// ];
	// let tdStyle;
	function tdMouseOver(e, cell) {
		if (cell.type === 'ROOM') {
			e.target.style.cursor = 'pointer';
			const playerCell = zone[player.pos.y][player.pos.x];
			const connectedRooms = getConnectedRooms(cell, zone);
			if (connectedRooms.find(room => room.id === playerCell.id)) {
				e.target.style.borderColor = 'lime';
				return;
			}
			e.target.style.borderColor = 'orange';
		}
	}
	function tdMouseLeave(e, cell) {
		// e.target.style = tdStyle;
		e.target.style.borderColor = 'red';
	}
	return (
		<table style={styles.table}>
			{zone.map((row, i) => (
				<tr>
					{row.map((cell, j, zone) => (
						<td
							style={styles.td(cell, player)}
							onMouseOver={e => tdMouseOver(e, cell)}
							onMouseLeave={e => tdMouseLeave(e, cell)}
							onClick={() => setSelectedCell(cell)}
						>
							{player.pos.x === j && player.pos.y === i && (
								<div
									style={{
										width: 10,
										height: 10,
										backgroundColor: 'lime',
										zIndex: 1,
										position: 'absolute',
										left: 10,
										top: 10,
									}}
								/>
							)}
							{cell.levelExit && (
								<div
									style={{
										width: 10,
										height: 10,
										backgroundColor: 'yellow',
										zIndex: 1,
										position: 'absolute',
										left: 33,
										top: 33,
									}}
								/>
							)}
							{cell.zoneExit && (
								<div
									style={{
										width: 10,
										height: 10,
										backgroundColor: 'blue',
										zIndex: 1,
										position: 'absolute',
										left: 0,
										top: 0,
									}}
								/>
							)}
							{cell.enemy && (
								<div
									style={{
										width: 10,
										height: 10,
										backgroundColor: 'purple',
										zIndex: 1,
										position: 'absolute',
										left: 67,
										top: 0,
									}}
								/>
							)}
							{cell.id === selectedCell?.id && (
								<div
									style={{
										width: 10,
										height: 10,
										backgroundColor: 'purple',
										zIndex: 1,
										position: 'absolute',
										left: 67,
										top: 0,
									}}
								/>
							)}
						</td>
					))}
				</tr>
			))}
		</table>
	);
}
