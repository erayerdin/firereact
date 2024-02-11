import { Composition } from 'remotion';
import { LogoComposition, logoCompSchema } from './LogoComposition';
import './style.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="LogoComp"
				component={LogoComposition}
				durationInFrames={60*12}
				fps={60}
				width={512}
				height={512}
				schema={logoCompSchema}
				defaultProps={{}}
			/>
		</>
	);
};
