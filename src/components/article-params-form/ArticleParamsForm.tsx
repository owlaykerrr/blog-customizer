import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	currentArticle: ArticleStateType;
	setCurrentArticle: (article: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticle,
	setCurrentArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectArticleData, setSelectArticleData] = useState(currentArticle);

	const rootRef = useRef<HTMLDivElement>(null);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticle({
			...selectArticleData,
		});
	};

	const handleFormReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSelectArticleData(currentArticle);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(!isOpen),
		onChange: setIsOpen,
		eventName: 'mousedown',
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text uppercase={true} size={31} weight={800}>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={selectArticleData.fontFamilyOption}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontFamilyOption: data,
							})
						}
						title='ШРИФТ'
					/>

					<RadioGroup
						options={fontSizeOptions}
						selected={selectArticleData.fontSizeOption}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontSizeOption: data,
							})
						}
						name='размер шрифта'
						title='размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={selectArticleData.fontColor}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontColor: data,
							})
						}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={selectArticleData.backgroundColor}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								backgroundColor: data,
							})
						}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						selected={selectArticleData.contentWidth}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								contentWidth: data,
							})
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
