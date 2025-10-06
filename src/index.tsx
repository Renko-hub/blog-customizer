// index.tsx

import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

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
const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pageState, setPageState] = useState<FormValues>(defaultArticleState);

    const toggleOpen = () => setIsOpen(prev => !prev);
    const handleClose = () => setIsOpen(false);

    // Динамические стили
    const customStyles: CSSProperties = {
        '--font-family': pageState.fontFamilyOption.value,
        '--font-size': pageState.fontSizeOption.value,
        '--font-color': pageState.fontColor.value,
        '--container-width': pageState.contentWidth.value,
        '--bg-color': pageState.backgroundColor.value,
    } as CSSProperties;

    return (
        <div
            className={clsx(styles.main)}
            style={customStyles}
        >
            <ArticleParamsForm
                toggleOpen={toggleOpen}
                openState={isOpen}
                pageState={pageState} /* <-- Добавлена передача текущего состояния */
                setPageState={setPageState} /* <-- Добавлен диспетчер для изменения состояния */
            />
            <Article handleClose={handleClose} />
        </div>
    );
};

// Рендеринг приложения
const domNode = document.getElementById('root') as HTMLDivElement;
createRoot(domNode).render(
    <StrictMode>
        <App />
    </StrictMode>,
);