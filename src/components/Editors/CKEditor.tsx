/* [object Object]*/
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const ClassicEditor = require('../../../build/ckeditor.js');
// import './App.css';
import React from 'react';
 const editorConfiguration = {
 	toolbar: ['heading', 'bulletedList', 'numberedList', 'bold', 'italic'],
 	heading: {
 		options: [
 			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
 			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
 			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
 			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
 			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
 			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
 			{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
 		],
 	},
 };
/**
 *
 */
const CKeditor = () => {
	// console.log(ClassicEditor.builtinPlugins.map((plugin) => plugin.pluginName));
	return (
		<CKEditor
			editor={ClassicEditor}
			data=''
		  config={editorConfiguration}
			onReady={(editor: any) => {
				// You can store the "editor" and use when it is needed.
				console.log('Editor is ready to use!', editor);
			}}
			onChange={(event: any, editor: any) => {
				const data = editor.getData();
				console.log({ event, editor, data });
			}}
			onBlur={(__: any, editor: any) => {
				console.log('Blur.', editor);
			}}
			onFocus={(__: any, editor: any) => {
				console.log('Focus.', editor);
			}}
		/>
	);
};
export default CKeditor;
