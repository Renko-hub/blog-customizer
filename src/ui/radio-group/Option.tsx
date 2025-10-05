// Option.tsx

import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
  value: OptionType['value'];                           // Свойства объекта варианта выбора
  title: OptionType['title'];                           // Название опции
  selected: boolean;                                    // Статус выбранной опции (булево значение)
  groupName: string;                                    // Имя группы radio-полей
  onChange?: (option: OptionType) => void;              // Колбек на изменение выбранного пункта
  option: OptionType;                                   // Текущий пункт выборки
};

export const Option = (props: OptionProps) => {
  const { value, title, selected, groupName, onChange, option } = props;

  const optionRef = useRef<HTMLDivElement>(null);       // Референс текущего элемента опции

  const handleChange = () => onChange?.(option);        // Колбек-обработчик изменения состояния

  useEnterSubmit({ onChange, option });                 // Использование хука для отправки формы Enter-ом

  const inputId = `${groupName}_radio_item_with_value__${value}`; // ID поля ввода

  return (
    <div
      className={styles.item}
      data-checked={selected}                            // Атрибут data-checked теперь булевый
      data-testid={inputId}
      tabIndex={0}
      ref={optionRef}>
      <input
        className={styles.input}
        type='radio'
        name={groupName}
        id={inputId}
        value={value}
        onChange={handleChange}
        tabIndex={-1}
        checked={selected}                               // Новое свойство checked для визуализации статуса выбора
      />
      <label className={styles.label} htmlFor={inputId}>
        <Text size={18} uppercase>{title}</Text>
      </label>
    </div>
  );
};