import {
  useState,
  useEffect,
  useRef,
  HTMLAttributes,
  useCallback,
} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AccessibilityHelp,
  Base64UploadAdapter,
  AutoImage,
  GeneralHtmlSupport,
  ImageTextAlternative,
  Image,
  Alignment,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlEmbed,
  ImageCaption,
  ImageBlock,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  SelectAll,
  PasteFromOffice,
  RemoveFormat,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  WordCount,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { Button } from "@/components/ui/button";

interface Props extends HTMLAttributes<HTMLDivElement> {
  initialData?: string;
  onValueChange?: (value: string) => void;
  onClickOutside?: () => void;
}

export default function TextEditor({
  onClickOutside,
  onValueChange,
  initialData,
  ...props
}: Props) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [content, setContent] = useState<string | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        onClickOutside &&
        editorContainerRef.current &&
        !editorContainerRef.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "style",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "subscript",
        "superscript",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "highlight",
        "removeFormat",
        "|",
        "link",
        "blockQuote",
        "code",
        "codeBlock",
        "insertImage",
        "mediaEmbed",
        "insertTable",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
        "|",
        "horizontalLine",
        "pageBreak",
        "|",
        "specialCharacters",
        "htmlEmbed",
        "sourceEditing",
        "|",
        "selectAll",
      ],
      shouldNotGroupWhenFull: true,
    },
    plugins: [
      Image,
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      Autosave,
      Base64UploadAdapter,
      BlockQuote,
      Bold,
      CloudServices,
      Code,
      CodeBlock,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlEmbed,
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
      MediaEmbed,
      Mention,
      PageBreak,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SelectAll,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
      WordCount,
      MediaEmbed,
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    htmlSupport: {
      allow: [{ name: /^.*$/, styles: true, attributes: true, classes: true }],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    initialData: initialData,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: { download: "file" },
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
    placeholder: "Type or paste your content here!",
    style: {
      definitions: [
        { name: "Article category", element: "h3", classes: ["category"] },
        { name: "Title", element: "h2", classes: ["document-title"] },
        { name: "Subtitle", element: "h3", classes: ["document-subtitle"] },
        { name: "Info box", element: "p", classes: ["info-box"] },
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };
  const handleValueChange = useCallback(
    (event: Event, editor: ClassicEditor) => {
      const data = editor.getData();
      setContent(data);
      if (onValueChange) {
        onValueChange(data);
      }
    },
    [onValueChange]
  );
  return (
    <div {...props}>
      <div className="no-tailwindcss-base">
        <div className="main-container">
          <div
            className="editor-container editor-container_classic-editor editor-container_include-style"
            ref={editorContainerRef}
          >
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    onChange={handleValueChange}
                    onReady={(editor) => {
                      editorRef.current = editor;

                      const editableElement = editor.ui.getEditableElement();

                      if (document.documentElement.classList.contains("dark")) {
                        editableElement.classList.add("ckeditor-dark");
                        console.log(editableElement);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
