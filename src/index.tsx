import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentArticle, setCurrentArticle] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticle.fontFamilyOption.value,
					'--font-size': currentArticle.fontSizeOption.value,
					'--font-color': currentArticle.fontColor.value,
					'--container-width': currentArticle.contentWidth.value,
					'--bg-color': currentArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentArticle={currentArticle}
				setCurrentArticle={setCurrentArticle}
			/>

			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
