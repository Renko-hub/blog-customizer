// RadioGroup.tsx

import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Option } from './Option';

import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
  name: string;                              // Имя группы радиокнопок
  options: OptionType[];                     // Массив вариантов выбора
  selected: OptionType;                      // Выбранный вариант
  onChange?: (value: OptionType) => void;    // Колбек для смены выбранного варианта
  title: string;                             // Заголовок группы
};

export const RadioGroup = (props: RadioGroupProps) => {
  const { name, options, selected, onChange, title } = props;

  const handleChange = (option: OptionType) => onChange?.(option); // Обработчик изменения

  return (
    <div className={styles.container}>
      {title && (                                     // Условие отображения заголовка
        <Text weight={800} size={12} uppercase>{title}</Text>
      )}
      <div className={styles.group}>
        {options.map((option) => (                   // Рендер списка опций
          <Option
            key={option.value}
            groupName={name}
            value={option.value}
            title={option.title}
            selected={selected.value === option.value} // Проверка соответствия значения
            onChange={() => handleChange(option)}
            option={option}
          />
        ))}
      </div>
    </div>
  );
};