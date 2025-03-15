'use client';

import {
  HStack,
  Portal,
  Select,
  createListCollection,
  useSelectContext,
} from '@chakra-ui/react';
import { RiForbidLine } from 'react-icons/ri';
import { StatusBudge } from '../../../ui/StatusBudge';
import styles from './index.module.css';

type Framework = {
  label: string;
  value: string;
  component: React.ReactNode;
};

const frameworks = createListCollection({
  items: [
    { label: 'Todo', value: 'todo', component: <StatusBudge status="todo" /> },
    {
      label: 'InProgress',
      value: 'inProgress',
      component: <StatusBudge status="inProgress" />,
    },
    { label: 'Done', value: 'done', component: <StatusBudge status="done" /> },
  ],
});

const SelectTrigger = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Framework[];
  return (
    <button className={styles.button} {...select.getTriggerProps()}>
      {select.hasSelectedItems ? items[0].component : <RiForbidLine />}
    </button>
  );
};

export const StatusSelectMenu: React.FC = () => {
  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={frameworks}
      size="sm"
      width="320px"
      defaultValue={['todo']}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {frameworks.items.map((movie) => (
              <Select.Item
                item={movie}
                key={movie.value}
                className={styles.selectItem}
              >
                <HStack>{movie.component}</HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
