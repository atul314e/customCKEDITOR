/* [object Object]*/
import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor, Descendant, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';

import { Button, Icon, Toolbar } from './Components';

const HOTKEYS: any = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isBlockActive = (editor: any, format: any) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === format,
	});

	return !!match;
};

const isMarkActive = (editor: any, format: any) => {
	const marks: any = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};
const toggleBlock = (editor: any, format: any) => {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type),
		split: true,
	});
	const newProperties: Partial<SlateElement> = {
		type: isActive ? 'paragraph' : isList ? 'list-item' : format,
	} as any;
	Transforms.setNodes(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const toggleMark = (editor: any, format: any) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const Element = ({ attributes, children, element }: any) => {
	switch (element.type) {
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>;
		case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>;
		case 'heading-one':
			return <h1 {...attributes}>{children}</h1>;
		case 'heading-two':
			return <h2 {...attributes}>{children}</h2>;
		case 'heading-three':
			return <h3 {...attributes}>{children}</h3>;
		case 'heading-four':
			return <h4 {...attributes}>{children}</h4>;
		case 'heading-five':
			return <h5 {...attributes}>{children}</h5>;
		case 'heading-six':
			return <h6 {...attributes}>{children}</h6>;
		case 'list-item':
			return <li {...attributes}>{children}</li>;
		case 'numbered-list':
			return <ol {...attributes}>{children}</ol>;
		default:
			return <p {...attributes}>{children}</p>;
	}
};

const Leaf = ({ attributes, children, leaf }: any) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: any) => {
	const editor = useSlate();
	return (
		<Button
			active={isBlockActive(editor, format)}
			onMouseDown={(event: any) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

const MarkButton = ({ format, icon }: any) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={(event: any) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [
			{ text: 'This is editable ' },
			{ text: 'rich', bold: true },
			{ text: ' text, ' },
			{ text: 'much', italic: true },
			{ text: ' better than a ' },
			{ text: '<textarea>', code: true },
			{ text: '!' },
		],
	} as any,
	{
		type: 'paragraph',
		children: [
			{
				text: " a-ban on fa-camera😀🤓😎🥸Since it's rich text, you can do things like turn a selection of text ",
			},
			{ text: 'bold', bold: true },
			{
				text: ', or add a semantically rendered block quote in the middle of the page, like this:',
			},
		],
	},
	{
		type: 'block-quote',
		children: [{ text: 'A wise quote.' }],
	},
	{
		type: 'paragraph',
		children: [{ text: 'Try it out for yourself!' }],
	},
];

const SlateEditor = (): any => {
	const [value, setValue] = useState<Descendant[]>(initialValue);
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor() as any)), []);
	console.log({ editor, value });
	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(value) => {
				console.log(value);
				setValue(value);
			}}
		>
			<Toolbar>
				<MarkButton format='bold' icon='format_bold' />
				<MarkButton format='italic' icon='format_italic' />
				<MarkButton format='underline' icon='format_underlined' />
				<MarkButton format='code' icon='code' />
				<BlockButton format='heading-one' icon='looks_one' />
				<BlockButton format='heading-two' icon='looks_two' />
				<BlockButton format='heading-three' icon='looks_3' />
				<BlockButton format='heading-four' icon='looks_4' />
				<BlockButton format='heading-five' icon='looks_5' />
				<BlockButton format='heading-six' icon='looks_6' />
				<BlockButton format='block-quote' icon='format_quote' />
				<BlockButton format='numbered-list' icon='format_list_numbered' />
				<BlockButton format='bulleted-list' icon='format_list_bulleted' />
			</Toolbar>
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				placeholder='Enter some rich text…'
				spellCheck
				autoFocus
				onKeyDown={(event) => {
					for (const hotkey in HOTKEYS) {
						if (isHotkey(hotkey, event as any)) {
							event.preventDefault();
							const mark = HOTKEYS[hotkey];
							toggleMark(editor, mark);
						}
					}
				}}
			/>
		</Slate>
	);
};

export default SlateEditor;
