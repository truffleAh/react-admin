import React from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false, //标识是否显示大图预览
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done", //图片状态
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
    ],
  };
  /* 修改状态数据,隐藏Modal */
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    // console.log(file);
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
    return (
      <>
        <Upload
          accept="image/*" //只接受图片
          name="image" //指定后台接收的请求参数名
          action="/manage/img/upload" //上传图片的接口地址
          listType="picture-card"
          fileList={fileList} //已上传文件的列表
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
