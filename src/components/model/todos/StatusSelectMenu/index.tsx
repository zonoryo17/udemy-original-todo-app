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
import { Status } from '@/types/todo';
import { useEffect, useState } from 'react';

type Framework = {
  label: string;
  value: string;
  component: React.ReactNode;
};

type Props = {
  defaultValue?: Status;
  selectRef?:
    | React.RefObject<HTMLDivElement>
    | ((instance: HTMLDivElement | null) => void)
    | null;
  onStatusChange?: (status: Status) => void;
};

type ValueChangeDetails = {
  value: string[];
  selectedItems?: Array<Framework>;
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

export const StatusSelectMenu: React.FC<Props> = ({
  defaultValue = 'todo',
  selectRef,
  onStatusChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string[]>([defaultValue]);

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(defaultValue);
    }
    setSelectedValue([defaultValue]);
  }, [defaultValue, onStatusChange]);

  const handleValueChange = (details: ValueChangeDetails) => {
    if (details && Array.isArray(details.value) && details.value.length > 0) {
      const newValue = details.value[0] as Status;

      setSelectedValue([newValue]);

      if (onStatusChange) {
        onStatusChange(newValue);
      }
    }
  };

  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={frameworks}
      size="sm"
      value={selectedValue}
      onValueChange={handleValueChange}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32" zIndex={9999}>
            {frameworks.items.map((item) => (
              <Select.Item
                item={item}
                key={item.value}
                ref={selectRef}
                className={styles.selectItem}
              >
                <HStack>{item.component}</HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
