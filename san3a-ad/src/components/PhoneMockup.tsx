import {theme} from '../theme';

// A stylized phone showing an artisan's San3a portfolio page.
export const PhoneMockup: React.FC<{scale?: number}> = ({scale = 1}) => {
	return (
		<div
			style={{
				transform: `scale(${scale})`,
				width: 430,
				height: 880,
				borderRadius: 56,
				background: theme.ink,
				padding: 14,
				boxShadow: '0 40px 90px rgba(58,46,37,0.35)',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					borderRadius: 44,
					background: theme.cream,
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* URL bar */}
				<div
					style={{
						background: theme.white,
						borderBottom: `1px solid ${theme.border}`,
						padding: '20px 24px',
						textAlign: 'center',
						color: theme.muted,
						fontSize: 24,
						fontWeight: 600,
						direction: 'ltr',
					}}
				>
					san3apages.com/<span style={{color: theme.terracotta}}>karim</span>
				</div>

				{/* Cover + avatar */}
				<div
					style={{
						height: 150,
						background: `linear-gradient(120deg, ${theme.terracotta}, ${theme.terracottaDeep})`,
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'absolute',
							bottom: -55,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 130,
							height: 130,
							borderRadius: '50%',
							background: theme.amber,
							border: `6px solid ${theme.cream}`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 60,
						}}
					>
						🪚
					</div>
				</div>

				<div style={{paddingTop: 70, textAlign: 'center', direction: 'rtl'}}>
					<div style={{fontSize: 34, fontWeight: 800, color: theme.ink}}>
						كريم للنجارة
					</div>
					<div style={{fontSize: 24, color: theme.muted, marginTop: 6}}>
						نجارة وأثاث على الطلب
					</div>

					<div
						style={{
							margin: '26px 24px 0',
							background: theme.whatsapp,
							color: theme.white,
							borderRadius: 18,
							padding: '20px 0',
							fontSize: 28,
							fontWeight: 700,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 12,
						}}
					>
						احجز موعد عبر واتساب
					</div>
				</div>

				{/* Gallery */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 12,
						padding: 24,
					}}
				>
					{['🪑', '🚪', '🛏️', '🪟'].map((e) => (
						<div
							key={e}
							style={{
								aspectRatio: '1.4',
								borderRadius: 16,
								background: theme.sand,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 46,
							}}
						>
							{e}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
