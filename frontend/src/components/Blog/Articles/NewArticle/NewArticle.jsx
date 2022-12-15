import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./NewArticle.css";

function NewArticle() {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ color: [] }, { background: [] }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      // [],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];
  const style = {
    backgroundColor: "#fff",
    color: "#000",
    minHeight: "300px",
  };

  return (
    <section className="new-blog">
      <label className="new-blog--title-container">
        Blog title
        <input type="text" className="new-blog--title" />
      </label>
      <label className="new-blog--desc-container">
        Blog description
        <textarea type="text" className="new-blog--desc" />
      </label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        style={style}
      />
    </section>
  );
}

export default NewArticle;
