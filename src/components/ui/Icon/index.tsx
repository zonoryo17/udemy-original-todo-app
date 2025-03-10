import type { IconType } from 'react-icons/lib';
import { BsTrash } from 'react-icons/bs';

// eslint-disable-next-line react-refresh/only-export-components
export const iconNames = ['trash'] as const;

export type IconName = (typeof iconNames)[number];

const map: Record<IconName, IconType> = {
  trash: BsTrash,
};

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const Icon: React.FC<Props> = ({
  name,
  size = 32,
  color = '#000',
  strokeWidth = 0.5,
  ...props
}) => {
  const Icon = map[name];

  return (
    <Icon
      role="img"
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};
