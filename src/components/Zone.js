const styles = {
	table: {
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: 'red',
		// backgroundColor: 'red',
		// position: 'absolute',
	},
	td: cell => ({
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
	return (
		<table style={styles.table}>
			{zone.map(row => (
				<tr>
					{row.map(cell => (
						<td style={styles.td(cell)}>
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
						</td>
					))}
				</tr>
			))}
		</table>
	);
}
