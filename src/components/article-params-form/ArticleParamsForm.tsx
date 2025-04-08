import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';

import React, { useRef, useState } from 'react';
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
import { useCloseForm } from 'src/hooks/useCloseForm';

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
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isOpen, setOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	useCloseForm({
		isOpen: isOpen,
		onClose: toggleOpen,
		rootRef: formRef,
	});

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

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

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
					onSubmit={handleApply}
					onReset={handleReset}>
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
						<Button title='Сбросить' type='clear' htmlType={'reset'} />
						<Button title='Применить' type='apply' htmlType={'submit'} />
					</div>
				</form>
			</aside>
		</>
	);
};
