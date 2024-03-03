import { Plugin } from '@tiptap/pm/state';
import { DecorationSet, EditorView } from '@tiptap/pm/view';

declare const UploadImagesPlugin: () => Plugin<DecorationSet>;
declare function startImageUpload(file: File, view: EditorView, pos: number): void;
declare const handleImageUpload: (file: File) => void;

export { UploadImagesPlugin, handleImageUpload, startImageUpload };
