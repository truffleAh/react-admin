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
      />
    );
  }
}
