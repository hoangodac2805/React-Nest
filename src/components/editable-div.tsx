import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
  } from 'react';
  
  interface ContentEditableProps {
    initialValue?: string;
    onChangeValue?: (value: string) => void;
    className?: string;
    placeholder?: string;
  }
  
  export interface ContentEditableRef {
    setValue: (value: string) => void;
    getValue: () => string;
  }
  
  const ContentEditable = forwardRef<ContentEditableRef, ContentEditableProps>(
    ({ initialValue = '', onChangeValue, className, placeholder }, ref) => {
      const divRef = useRef<HTMLDivElement>(null);
      const [isEmpty, setIsEmpty] = useState(!initialValue);
  
      // Handle initial value and value updates from parent
      useEffect(() => {
        if (divRef.current && divRef.current.textContent !== initialValue) {
          divRef.current.textContent = initialValue;
          setIsEmpty(initialValue === '');
        }
      }, [initialValue]);
  
      // Expose methods via ref
      useImperativeHandle(ref, () => ({
        setValue: (value: string) => {
          if (divRef.current) {
            divRef.current.textContent = value;
            setIsEmpty(value === '');
          }
        },
        getValue: () => divRef.current?.textContent || '',
      }));
  
      const handleInput = () => {
        if (!divRef.current) return;
        const value = divRef.current.textContent || '';
        setIsEmpty(value === '');
        onChangeValue?.(value);
      };
  
      const handleBlur = () => {
        if (!divRef.current) return;
        const value = divRef.current.textContent || '';
        onChangeValue?.(value);
      };
  
      return (
        <div
          ref={divRef}
          className={className}
          contentEditable
          onInput={handleInput}
          onBlur={handleBlur}
          data-placeholder={placeholder}
        />
      );
    }
  );
  
  export default ContentEditable;