import { JSONContent, EditorProviderProps, BubbleMenuProps, Editor } from '@tiptap/react';
export { JSONContent, useCurrentEditor as useEditor } from '@tiptap/react';
import { Editor as Editor$1, Range } from '@tiptap/core';
export { Editor } from '@tiptap/core';
import * as react from 'react';
import { ReactNode } from 'react';

declare const EditorRoot: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
type EditorContentProps = {
    children: ReactNode;
    className?: string;
    initialContent?: JSONContent;
} & Omit<EditorProviderProps, "content">;
declare const EditorContent: react.ForwardRefExoticComponent<{
    children: ReactNode;
    className?: string | undefined;
    initialContent?: JSONContent | undefined;
} & Omit<EditorProviderProps, "content"> & react.RefAttributes<HTMLDivElement>>;
declare const defaultEditorProps: EditorProviderProps["editorProps"];

interface EditorBubbleProps extends Omit<BubbleMenuProps, "editor"> {
    children: ReactNode;
}
declare const EditorBubble: react.ForwardRefExoticComponent<EditorBubbleProps & react.RefAttributes<HTMLDivElement>>;

interface EditorBubbleItemProps {
    children: ReactNode;
    asChild?: boolean;
    onSelect?: (editor: Editor) => void;
}
declare const EditorBubbleItem: react.ForwardRefExoticComponent<EditorBubbleItemProps & Omit<Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "onSelect"> & react.RefAttributes<HTMLDivElement>>;

declare const EditorCommand: react.ForwardRefExoticComponent<Omit<{
    children?: react.ReactNode;
} & react.HTMLAttributes<HTMLDivElement> & {
    label?: string | undefined;
    shouldFilter?: boolean | undefined;
    filter?: ((value: string, search: string) => number) | undefined;
    defaultValue?: string | undefined;
    value?: string | undefined;
    onValueChange?: ((value: string) => void) | undefined;
    loop?: boolean | undefined;
    vimBindings?: boolean | undefined;
} & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

interface EditorCommandItemProps {
    onCommand: ({ editor, range }: {
        editor: Editor$1;
        range: Range;
    }) => void;
}
declare const EditorCommandItem: react.ForwardRefExoticComponent<EditorCommandItemProps & Omit<{
    children?: react.ReactNode;
} & Omit<react.HTMLAttributes<HTMLDivElement>, "onSelect" | "value" | "disabled"> & {
    disabled?: boolean | undefined;
    onSelect?: ((value: string) => void) | undefined;
    value?: string | undefined;
    forceMount?: boolean | undefined;
} & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const EditorCommandEmpty: react.ForwardRefExoticComponent<{
    children?: react.ReactNode;
} & react.HTMLAttributes<HTMLDivElement> & react.RefAttributes<HTMLDivElement>>;

export { EditorBubble, EditorBubbleItem, EditorCommand, EditorCommandEmpty, EditorCommandItem, EditorContent, type EditorContentProps, EditorRoot, defaultEditorProps };
