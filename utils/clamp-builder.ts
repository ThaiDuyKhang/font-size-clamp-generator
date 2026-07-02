/**
 * Internal dependencies
 */
import { parseUnit } from './units';

function convertToRem(value: string, root: number): number {
	const [num, unit] = parseUnit(value);

	if (unit === 'rem') {
		return parseFloat(num);
	}

	return parseFloat(num) / root;
}

function convertToPx(value: string, root: number): number {
	const [num, unit] = parseUnit(value);

	if (unit === 'rem') {
		return parseFloat(num) * root;
	}

	return parseFloat(num);
}

function toFixed(value: number) {
	return parseFloat(value.toFixed(4));
}

/**
 * Formats a slope value (in vw) with a proper leading sign, e.g.
 * `8px + 3.4375vw` or `8px - 3.4375vw` instead of `8px + -3.4375vw`.
 */
function formatPreferred(
	intersection: number,
	slopeVw: number,
	unit: 'rem' | 'px'
): string {
	const sign = slopeVw < 0 ? '-' : '+';
	const absSlope = Math.abs(slopeVw);

	return `${intersection}${unit} ${sign} ${absSlope}vw`;
}

export type OutputUnit = 'rem' | 'px';

export default function clampBuilder(options: {
	minFontSize: string;
	maxFontSize: string;
	minWidth: string;
	maxWidth: string;
	root: string;
	outputUnit?: OutputUnit;
}): string {
	if (
		Object.values({
			minFontSize: options.minFontSize,
			maxFontSize: options.maxFontSize,
			minWidth: options.minWidth,
			maxWidth: options.maxWidth,
			root: options.root,
		}).some((value) => !value)
	) {
		return '';
	}
	const root = parseInt(options.root, 10);
	const outputUnit: OutputUnit = options.outputUnit || 'rem';

	if (outputUnit === 'px') {
		const minFontSize = convertToPx(options.minFontSize, root);
		const maxFontSize = convertToPx(options.maxFontSize, root);
		const minWidth = convertToPx(options.minWidth, root);
		const maxWidth = convertToPx(options.maxWidth, root);

		if (
			[minFontSize, maxFontSize, minWidth, maxWidth].some((v) => isNaN(v))
		) {
			return '';
		}

		const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
		const yAxisIntersection = toFixed(-minWidth * slope + minFontSize);

		const bounds = [minFontSize, maxFontSize].sort((a, b) => a - b);
		const min = `${bounds[0]}px`;
		const max = `${bounds[1]}px`;
		const preferred = formatPreferred(
			yAxisIntersection,
			toFixed(slope * 100),
			'px'
		);

		return `clamp(${min}, calc(${preferred}), ${max})`;
	}

	const minFontSize = convertToRem(options.minFontSize, root);
	const maxFontSize = convertToRem(options.maxFontSize, root);
	const minWidth = convertToRem(options.minWidth, root);
	const maxWidth = convertToRem(options.maxWidth, root);

	if ([minFontSize, maxFontSize, minWidth, maxWidth].some((v) => isNaN(v))) {
		return '';
	}

	const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
	const yAxisIntersection = toFixed(-minWidth * slope + minFontSize);

	const bounds = [minFontSize, maxFontSize].sort((a, b) => a - b);
	const min = `${bounds[0]}rem`;
	const max = `${bounds[1]}rem`;
	const preferred = formatPreferred(
		yAxisIntersection,
		toFixed(slope * 100),
		'rem'
	);

	return `clamp(${min}, ${preferred}, ${max})`;
}
