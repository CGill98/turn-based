export default function Layout({ children }) {
	return (
		<div
			style={{
				width: 'auto',
				height: '100%',
				padding: 20,
			}}
		>
			{children}
		</div>
	);
}
