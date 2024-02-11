import { AbsoluteFill } from 'remotion';
import { z } from 'zod';

export const logoCompSchema = z.object({});

export const LogoComposition: React.FC<z.infer<typeof logoCompSchema>> = ({}) => {
	return (
		<AbsoluteFill className="bg-transparent items-center justify-center">
			
		</AbsoluteFill>
	);
};
