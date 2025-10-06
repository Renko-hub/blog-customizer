// ArticleParamsForm.tsx

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef } from 'react';

// Компоненты UI
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

// Константы для настроек формы
import {
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontFamilyOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

// Хук для слежения за внешним кликом
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

// Интерфейс значений формы
import { FormValues } from 'src/index';

// Определяем интерфейс свойств компонента
type ArticleParamsFormProps = {
	toggleOpen: () => void;
	openState: boolean;
	pageState: FormValues;
	setPageState: React.Dispatch<React.SetStateAction<FormValues>>;
};

// Функция сравнения объектов состояний
const areStatesEqual = (a: FormValues, b: FormValues) =>
	JSON.stringify(a) === JSON.stringify(b);

// Основной компонент формы параметров статьи
export const ArticleParamsForm = ({
	toggleOpen,
	openState,
	pageState,
	setPageState,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(pageState);
	const rootRef = useRef(null);

	// Закрываем форму при клике вне нее
	useOutsideClickClose({
		isOpen: openState,
		rootRef,
		onClose: () => {
			if (!areStatesEqual(formState, pageState)) {
				setFormState(defaultArticleState);
			}
			toggleOpen();
		},
	});

	// Изменение значения поля формы
	const handleChange =
		(fieldName: keyof FormValues) => (value: FormValues[keyof FormValues]) =>
			setFormState((prevState) => ({ ...prevState, [fieldName]: value }));

	// Отправляем форму и сохраняем изменения
	const submitForm = (event: React.FormEvent) => {
		event.preventDefault();
		setPageState(formState);
	};

	// Сбрасываем форму
	const resetForm = () => {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={openState} onClick={toggleOpen} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, openState && styles.container_open)}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Выбор шрифтов */}
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>

					{/* Размер шрифта */}
					<RadioGroup
						title='размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>

					{/* Цвет шрифта */}
					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>

					<Separator />

					{/* Цвет фона */}
					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>

					{/* Ширина контента */}
					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={resetForm} type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
