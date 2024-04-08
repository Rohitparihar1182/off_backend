"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./temp.css";
import { markdownToDraft } from "markdown-draft-js"; // Import markdownToDraft from markdown-draft-js

const EditorComponent = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

export default function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const submitMarkdown = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const markdown = markdownToDraft(JSON.stringify(rawContentState)); // Convert to markdown using markdownToDraft
    console.log(markdown);
    // Here you can send the markdown to your backend or perform any other action with it
  };

  return (
    <div className="p-4">
      <EditorComponent
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={submitMarkdown}>Submit Markdown</button>
    </div>
  );
}
