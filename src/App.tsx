// App.tsx

import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

// Интерфейс для значений формы
export type FormValues = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

// Главная компонента App
export const App: React.FunctionComponent = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false); // Изменено имя переменной
	const [pageState, setPageState] = useState<FormValues>(defaultArticleState);

	const toggleOpen = () => setIsMenuOpen((prev) => !prev); // Используем новое имя переменной
	const handleClose = () => setIsMenuOpen(false); // Используем новое имя переменной

	// Динамические стили
	const customStyles: CSSProperties = {
		'--font-family': pageState.fontFamilyOption.value,
		'--font-size': pageState.fontSizeOption.value,
		'--font-color': pageState.fontColor.value,
		'--container-width': pageState.contentWidth.value,
		'--bg-color': pageState.backgroundColor.value,
	} as CSSProperties;

	return (
		<div className={styles.main} style={customStyles}>
			<ArticleParamsForm
				toggleOpen={toggleOpen}
				openState={isMenuOpen}
				pageState={pageState}
				setPageState={setPageState}
			/>
			<Article handleClose={handleClose} />
		</div>
	);
};
