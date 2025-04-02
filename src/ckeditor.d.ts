// src/ckeditor.d.ts
declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import { ComponentType } from 'react';

  const CKEditor: ComponentType<{
    editor: typeof ClassicEditor;
    data?: string;
    onChange?: (event: Event, editor: ClassicEditor) => void;
    onBlur?: (event: Event, editor: ClassicEditor) => void;
    onFocus?: (event: Event, editor: ClassicEditor) => void;
    onReady?: (editor: ClassicEditor) => void;
    config?: any;
  }>;

  export { CKEditor };
}

declare module '@ckeditor/ckeditor5-build-classic' {
  const ClassicEditor: any;
  export = ClassicEditor;
}
