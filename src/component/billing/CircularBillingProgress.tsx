import clsx from 'clsx';
import { styled } from '@mui/material';

import { BILLING_CRITICAL_PERCENT } from './constants';

const RADIUS = 45;
const CIRCUIT = RADIUS * Math.PI * 2;

const StyledCircleBackground = styled('circle')`
  fill: none;
  stroke-width: 17px;
  stroke: ${({ theme }) => theme.palette.billingProgress.background};
`;

const StyledCircleContent = styled('circle')`
  fill: none;
  stroke-width: 17px;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke-dasharray: ${CIRCUIT};
  stroke: ${({ theme }) => theme.palette.billingProgress.sufficient};
  &.critical {
    stroke: ${({ theme }) => theme.palette.billingProgress.low};
  }
`;

type Props = {
  percent: number;
  size?: number;
};

export const CircularBillingProgress = ({ percent, size = 28 }: Props) => {
  const normalized = percent > 100 ? 100 : percent < 0 ? 0 : percent;
  const critical = normalized < BILLING_CRITICAL_PERCENT;
  const strokeDashoffset = CIRCUIT - (normalized / 100) * CIRCUIT;
  return (
    <svg viewBox="0 0 114 114" style={{ width: size, height: size }}>
      <StyledCircleBackground
        className={clsx({ critical })}
        cx="57"
        cy="57"
        r={RADIUS}
      />
      <StyledCircleContent
        className={clsx({ critical })}
        cx="57"
        cy="57"
        r={RADIUS}
        sx={{ strokeDashoffset }}
      />
    </svg>
  );
};
