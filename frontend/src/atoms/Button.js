import React from 'react';
import classNames from 'classnames';

const DEFAULT_COLOR_CLASSES = 'white bg-blue hover-bg-dark-blue';

const COLORS = {
	blue: DEFAULT_COLOR_CLASSES,
	red: 'white bg-red hover-bg-dark-red',
};

export function Button({children, color, className, ...rest}) {
	const colorClasses = COLORS[color] || DEFAULT_COLOR_CLASSES;

	return (
		<button
			className={classNames(
				'dib bg-animate pv2 ph4 br-pill bn',
				colorClasses,
				className,
			)}
			type="button"
			{...rest}
		>
			{children}
		</button>
	);
}
