import React, { useState } from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import { EditorContent } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import { Extension } from "@tiptap/react";
import "../../styles.scss";
import { useEditor, FloatingMenu } from "@tiptap/react";
import { UpdateNotes } from "../../integration/server";
import { useCallback } from "react";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import Youtube from "@tiptap/extension-youtube";
import Bold from "@tiptap/extension-bold";
import { useEffect } from "react";

// import renderItems from "./suggestion/renderitems";

// Create lowlight instance with common languages
const lowlight = createLowlight(common);

// Register the languages with lowlight
lowlight.register("css", css);
console.log("====================================");
console.log(lowlight.registered("css"));
console.log("====================================");

export const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: fontSize + "px" })
            .run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
const initialContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "sndcdn" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "This is a " },
        { type: "text", marks: [{ type: "italic" }], text: "basic" },
        { type: "text", text: " example of " },
        { type: "text", marks: [{ type: "bold" }], text: "tiptap" },
        {
          type: "text",
          text: ". Sure, there are all kinds of basic text styles you’d probably expect from a text editor. But wait until you see the lists:",
        },
      ],
    },
  ],
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };
  const setFontSize = () => {
    const fontSize = window.prompt("Enter font size (e.g., 16):");
    if (fontSize) {
      editor.chain().setFontSize(fontSize).run();
    }
  };

  const unsetFontSize = () => {
    editor.chain().unsetFontSize().run();
  };

  return (
    <div className="menu-bar">
      <button
        onClick={() =>
          editor.chain().focus().toggleCodeBlock({ language: "js" }).run()
        }
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        toggleCodeBlock
      </button>
      <button onClick={addYoutubeVideo}>Add YouTube video</button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        U
      </button>
      <button onClick={setFontSize}>Set Font Size</button>
      <button onClick={unsetFontSize}>Unset Font Size</button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        toggleStrike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive("subscript") ? "is-active" : ""}
      >
        sub
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive("superscript") ? "is-active" : ""}
      >
        sup
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()
        }
        className={
          editor.isActive("highlight", { color: "#ffc078" }) ? "is-active" : ""
        }
      >
        orange
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#8ce99a" }).run()
        }
        className={
          editor.isActive("highlight", { color: "#8ce99a" }) ? "is-active" : ""
        }
      >
        green
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#74c0fc" }).run()
        }
        className={
          editor.isActive("highlight", { color: "#74c0fc" }) ? "is-active" : ""
        }
      >
        blue
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#b197fc" }).run()
        }
        className={
          editor.isActive("highlight", { color: "#b197fc" }) ? "is-active" : ""
        }
      >
        purple
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#ffa8a8" }).run()
        }
        className={
          editor.isActive("highlight", { color: "#ffa8a8" }) ? "is-active" : ""
        }
      >
        red
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>

      <button
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        setLink
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        unsetLink
      </button>
    </div>
  );
};

const EditorComponent = ({ content }) => {
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      Underline,
      Subscript,
      Superscript,
      BulletList,
      FontSize,
      Highlight.configure({ multicolor: true }),
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      History,
      Image,
      Dropcursor,
      Youtube.configure({
        controls: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: content,
    onUpdate: async ({ editor }) => {
      const jsoner = await editor.getJSON();
      const text = await editor.getText();
      await UpdateNotes("65e60c40617c9e90eed6", jsoner);
      console.log("====================================");
      console.log(text);
      console.log("====================================");
    },
  });
  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  if (!content) return <div>Loading...</div>;

  return (
    <div className="editor">
      <div>
        <input
          type="checkbox"
          checked={isEditable}
          onChange={() => setIsEditable(!isEditable)}
        />
        Editable
      </div>

      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            h1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            h2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            bullet list
          </button>
        </FloatingMenu>
      )}

      <MenuBar editor={editor} />
      <button onClick={addImage}>Add Image</button>
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorComponent;
