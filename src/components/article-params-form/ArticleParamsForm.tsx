import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';

import React, { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useCloseForm } from 'components/article-params-form/useCloseForm';

export interface ArticleState {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
}

interface ArticleParamsFormProps {
	onApply: (formState: ArticleState) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleChange = (field: keyof ArticleState) => {
		return (value: OptionType) => {
			setFormState((prevState: ArticleState) => ({
				...prevState,
				[field]: value,
			}));
		};
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	const handleApply = () => {
		onApply(formState);
	};

	// const handleChangeBackgroundColor = (value: OptionType) => {
	// 	setState({ ...state, backgroundColor: value });
	// };
	//
	// const handleChangeContentWidth = (value: OptionType) => {
	// 	setState({ ...state, contentWidth: value });
	// };
	//
	// const handleChangeFontFamily = (value: OptionType) => {
	// 	setState({ ...state, fontFamilyOption: value });
	// };
	//
	// const handleChangeFontSize = (value: OptionType) => {
	// 	setState({ ...state, fontSizeOption: value });
	// };
	//
	// const handleChangeFontColor = (value: OptionType) => {
	// 	setState({ ...state, fontColor: value });
	// };

	const formRef = useRef<HTMLFormElement | null>(null);

	useCloseForm({
		isOpen: isOpen,
		onClose: toggleOpen,
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton onClick={toggleOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={(e: FormEvent) => e.preventDefault()}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						onChange={handleChange('fontFamilyOption')}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						onChange={handleChange('fontSizeOption')}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
					/>
					<Select
						title='цвет шрифта'
						placeholder='Выберите цвет'
						onChange={handleChange('fontColor')}
						selected={formState.fontColor}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='цвет фона'
						placeholder='Выберите цвет'
						onChange={handleChange('backgroundColor')}
						selected={formState.backgroundColor}
						options={backgroundColors}
					/>
					<Select
						title='ширина контента'
						placeholder='Выберите ширину'
						onChange={handleChange('contentWidth')}
						selected={formState.contentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
