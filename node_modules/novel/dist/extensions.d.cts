import * as _tiptap_extension_horizontal_rule from '@tiptap/extension-horizontal-rule';
import * as tiptap_markdown from 'tiptap-markdown';
import * as _tiptap_extension_highlight from '@tiptap/extension-highlight';
import * as _tiptap_extension_color from '@tiptap/extension-color';
import * as _tiptap_extension_text_style from '@tiptap/extension-text-style';
import * as _tiptap_extension_underline from '@tiptap/extension-underline';
import * as _tiptap_core from '@tiptap/core';
import { Extension, Editor, Range } from '@tiptap/core';
export { InputRule } from '@tiptap/core';
import * as _tiptap_extension_placeholder from '@tiptap/extension-placeholder';
export { default as StarterKit } from '@tiptap/starter-kit';
export { default as TiptapLink } from '@tiptap/extension-link';
import * as _tiptap_extension_image from '@tiptap/extension-image';
export { default as TiptapImage } from '@tiptap/extension-image';
export { TaskItem } from '@tiptap/extension-task-item';
export { TaskList } from '@tiptap/extension-task-list';
import { ReactNode } from 'react';

declare const UpdatedImage: _tiptap_core.Node<_tiptap_extension_image.ImageOptions, any>;

declare const ImageResizer: () => JSX.Element | null;

declare const Command: Extension<any, any>;
declare const renderItems: () => {
    onStart: (props: {
        editor: Editor;
        clientRect: DOMRect;
    }) => void;
    onUpdate: (props: {
        editor: Editor;
        clientRect: DOMRect;
    }) => void;
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => any;
    onExit: () => void;
};
interface SuggestionItem {
    title: string;
    description: string;
    icon: ReactNode;
    searchTerms?: string[];
    command?: (props: {
        editor: Editor;
        range: Range;
    }) => void;
}
declare const createSuggestionItems: (items: SuggestionItem[]) => SuggestionItem[];

declare const getPrevText: (editor: Editor, { chars, offset, }: {
    chars: number;
    offset?: number | undefined;
}) => string;

declare const PlaceholderExtension: _tiptap_core.Extension<_tiptap_extension_placeholder.PlaceholderOptions, any>;
declare const simpleExtensions: readonly [_tiptap_core.Mark<_tiptap_extension_underline.UnderlineOptions, any>, _tiptap_core.Mark<_tiptap_extension_text_style.TextStyleOptions, any>, _tiptap_core.Extension<_tiptap_extension_color.ColorOptions, any>, _tiptap_core.Mark<_tiptap_extension_highlight.HighlightOptions, any>, _tiptap_core.Extension<tiptap_markdown.MarkdownOptions, tiptap_markdown.MarkdownStorage>, _tiptap_core.Extension<any, any>, _tiptap_core.Extension<any, any>];
declare const Horizontal: _tiptap_core.Node<_tiptap_extension_horizontal_rule.HorizontalRuleOptions, any>;

export { Command, Horizontal as HorizontalRule, ImageResizer, PlaceholderExtension as Placeholder, type SuggestionItem, UpdatedImage, createSuggestionItems, getPrevText, renderItems, simpleExtensions };
