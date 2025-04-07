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
  Bold,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontSize,
  Italic,
  Subscript,
  Superscript,
  Underline,
  Undo,
  Paragraph,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  initialData?: string;
  onValueChange?: (value: string) => void;
  onClickOutside?: () => void;
}

export default function QuestionEditor({
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
        "bold",
        "italic",
        "underline",
        "subscript",
        "superscript",
        "|",
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
      ],
      shouldNotGroupWhenFull: true,
    },
    plugins: [
      Paragraph,
      Essentials,
      Undo,
      Bold,
      Italic,
      Underline,
      Subscript,
      Superscript,
      FontSize,
      FontColor,
      FontBackgroundColor,
    ],
    initialData: initialData,
    placeholder: "Type or paste your content here!",
    fontSize: {
      options: [9, 11, 13, "default", 17, 19, 21],
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
