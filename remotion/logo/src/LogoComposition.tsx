import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import logoCore from '../assets/core-firebase.svg';
import logoFrame from '../assets/frame-react.svg';

export const logoCompSchema = z.object({});

export const LogoComposition: React.FC<z.infer<typeof logoCompSchema>> = ({}) => {
	const frame = useCurrentFrame();
	const degrees = interpolate(frame, [0, 30], [0, 60]);

	return (
		<AbsoluteFill className="bg-transparent items-center justify-center">
			<Img src={logoFrame} className='absolute' style={{
				transform: `rotate(${degrees}deg)`
			}} />
			<Img src={logoCore} className='absolute' />
		</AbsoluteFill>
	);
};
