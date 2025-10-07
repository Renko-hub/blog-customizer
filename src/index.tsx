// index.tsx

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from 'src/App';

// Получение элемента DOM-контейнера для рендера
const domNode = document.getElementById('root') as HTMLDivElement;

// Рендерим приложение внутри строгого режима
createRoot(domNode).render(
	<StrictMode>
		<App />
	</StrictMode>
);
