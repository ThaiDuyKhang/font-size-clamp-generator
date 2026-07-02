/**
 * External dependencies
 */
import styled from '@emotion/styled';

const Wrapper = styled.div`
	display: inline-flex;
	border: 1px solid var(--border);
	border-radius: 6px;
	overflow: hidden;
	margin-bottom: 1.5rem;
`;

const ToggleButton = styled.button<{ active: boolean }>`
	appearance: none;
	border: 0;
	cursor: pointer;
	padding: 0.5rem 1.25rem;
	font-size: 0.875rem;
	font-weight: 600;
	font-family: inherit;
	background: ${({ active }) => (active ? 'var(--primary)' : 'transparent')};
	color: ${({ active }) => (active ? '#fff' : 'var(--foreground)')};
	transition: background 100ms, color 100ms;

	&:not(:last-of-type) {
		border-right: 1px solid var(--border);
	}

	&:hover {
		background: ${({ active }) =>
			active ? 'var(--primary)' : 'var(--background100)'};
	}
`;

export type OutputUnit = 'rem' | 'px';

function OutputUnitToggle({
	value,
	onChange,
}: {
	value: OutputUnit;
	onChange: (unit: OutputUnit) => void;
}): JSX.Element {
	return (
		<Wrapper role="radiogroup" aria-label="Output unit">
			<ToggleButton
				type="button"
				active={value === 'rem'}
				aria-pressed={value === 'rem'}
				onClick={() => onChange('rem')}
			>
				rem
			</ToggleButton>
			<ToggleButton
				type="button"
				active={value === 'px'}
				aria-pressed={value === 'px'}
				onClick={() => onChange('px')}
			>
				px
			</ToggleButton>
		</Wrapper>
	);
}

export default OutputUnitToggle;
