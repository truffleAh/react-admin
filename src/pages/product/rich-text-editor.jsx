import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
/* 用来指定商品详情的富文本编辑器 */

export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(), //创建一个没有内容的编辑对象
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  // 获取输入数据Html格式的文本
  getDetail = () => {
    return draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  };
  /* 上传图片的回调 */
  uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/base/manage/img/upload");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        const url = response.data.url; //自定义,取出url
        resolve({ data: { link: url } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  //原有数据的初始展示(html数据对象转换为draft)
  constructor(props) {
    super(props);
    const html = this.props.detail;
    //如果有值,根据html格式字符串创建一个对应编辑对象
    if (html) {
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        editorStyle={{
          border: "1px solid black",
          minHeight: 100,
          paddingLeft: 10,
        }}
        onEditorStateChange={this.onEditorStateChange} //绑定事件监听
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: this.uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
      />
    );
  }
}
