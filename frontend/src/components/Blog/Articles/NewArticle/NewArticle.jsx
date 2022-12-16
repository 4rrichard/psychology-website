import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../../../../api/axios";
import "./NewArticle.css";

function NewArticle() {
  const [bodyValue, setBodyValue] = useState("");
  const [formData, setFormData] = useState({
    photo: "",
    title: "",
    desc: "",
  });

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

  const saveBlog = () => {
    axios
      .post("/api/addpost", {
        photo: "",
        title: formData.title,
        desc: formData.desc,
        textBody: bodyValue,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleForm = (event) => {
    event.preventDefault();
    saveBlog();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleQuillChange = (content, delta, source, editor) => {
    setBodyValue(editor.getContents());
  };

  return (
    <form className="new-blog" onSubmit={handleForm}>
      <h1 className="new-blog--main-title">Create new post</h1>
      <label className="new-blog--title-container">
        Post title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="new-blog--title"
        />
      </label>
      <label className="new-blog--desc-container">
        Post description
        <textarea
          type="text"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          className="new-blog--desc"
        />
      </label>
      <label className="new-blog--img-container">
        Upload cover photo
        <input
          type="file"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          className="new-blog--img"
        />
      </label>
      <ReactQuill
        theme="snow"
        value={bodyValue}
        onChange={handleQuillChange}
        modules={modules}
        formats={formats}
        style={style}
      />
      <button type="submit" className="save-blog-btn">
        Save
      </button>
    </form>
  );
}

export default NewArticle;
