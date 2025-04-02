import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  SelectAll,
  Style,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

export default function Test() {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);  // Use `any` since ClassicEditor has complex internal types
  const [content, setContent] = useState<string | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        'undo', 'redo', '|', 'heading', 'style', '|', 'bold', 'italic', 'underline',
        '|', 'link', 'insertImage', 'insertTable', 'blockQuote', '|', 'alignment',
        '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp, Alignment, Autoformat, AutoImage, Autosave, Base64UploadAdapter,
      BlockQuote, Bold, Essentials, GeneralHtmlSupport, Heading, HorizontalLine, ImageBlock,
      ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle,
      ImageTextAlternative, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link,
      LinkImage, List, ListProperties, Paragraph, SelectAll, Style, Table, TableCaption,
      TableCellProperties, TableColumnResize, TableProperties, TableToolbar, TextTransformation,
      TodoList, Underline, Undo,
    ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ],
    },
    htmlSupport: {
      allow: [
        { name: /^.*$/, styles: true, attributes: true, classes: true },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline',
        'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage'
      ],
    },
    initialData: '<h2>Congratulations on setting up CKEditor 5! 🎉</h2><p>Sample content</p>',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: { download: 'file' },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: 'Type or paste your content here!',
    style: {
      definitions: [
        { name: 'Article category', element: 'h3', classes: ['category'] },
        { name: 'Title', element: 'h2', classes: ['document-title'] },
        { name: 'Subtitle', element: 'h3', classes: ['document-subtitle'] },
        { name: 'Info box', element: 'p', classes: ['info-box'] },
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
    },
  };

  return (
    <div className='max-w-screen-lg mx-auto'>
      <div className='no-tailwindcss-base'>
        <div className="main-container">
          <div className="editor-container editor-container_classic-editor editor-container_include-style" ref={editorContainerRef}>
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    onReady={(editor) => {
                      editorRef.current = editor;
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => console.log(editorRef.current?.getData())}>Check</button>

        {/* Render the saved content */}
        <div
          dangerouslySetInnerHTML={{ __html: content || '' }}
          className="ck-content"
        ></div>
      </div>
    </div>
  );
}
