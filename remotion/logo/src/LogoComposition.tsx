import { AbsoluteFill, Easing, Img, interpolate, interpolateColors, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import logoCore from '../assets/core-firebase.svg';
import LogoFrame from './parts/LogoFrame';

export const logoCompSchema = z.object({});

export const LogoComposition: React.FC<z.infer<typeof logoCompSchema>> = ({}) => {
	const frame = useCurrentFrame();
	const degrees = interpolate(
		frame,
		[0, 30],
		[0, 60],
		{
			easing: Easing.elastic(1),
		},
	);

	const colors = {
		dark: '#f57c00ff',
		mid: '#ffa000ff',
		light: '#ffca28ff',
	} as const;

	const colorInterpolations = {
		darkToLight: interpolateColors(frame, [0, 30], [colors.dark, colors.light]),
		lightToDark: interpolateColors(frame, [0, 30], [colors.light, colors.dark]),
	};

	return (
		<AbsoluteFill className="bg-transparent items-center justify-center">
			{/* <Img src={logoFrame} className='absolute' style={{
				transform: `rotate(${degrees}deg)`
			}} /> */}
			<div className='absolute' style={{
				transform: `rotate(${degrees}deg)`
			}}>
				<LogoFrame
					darkColor={colorInterpolations.darkToLight}
					midColor={colors.mid}
					lightColor={colorInterpolations.lightToDark}
				/>
			</div>
			<Img src={logoCore} className='absolute' />
		</AbsoluteFill>
	);
};
