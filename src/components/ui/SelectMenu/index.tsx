type Props = {
  options: string[] | React.ReactElement[];
};

export const SelectMenu: React.FC<Props> = ({ options }) => {
  return (
    <select>
      {options.map((option) => (
        <option key={typeof option === 'string' ? option : option.key}>
          {option}
        </option>
      ))}
    </select>
  );
};
