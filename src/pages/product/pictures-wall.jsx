import React from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqDeleteImg } from "../../api";

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
    fileList: [],
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
  /* 增加和删除图片的回调 */
  handleChange = async ({ file, fileList }) => {
    // console.log(file);
    //一旦上传成功,将当前上传的file的信息修正
    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        message.success("上传图片成功");
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error("上传图片失败");
      }
    } else if (file.status === "removed") {
      //删除图片
      const result = await reqDeleteImg(file.name);
      if (result.data.status === 0) {
        message.success("删除图片成功");
      } else {
        message.error("删除图片失败");
      }
    }
    this.setState({ fileList });
  };

  /* 获取所有已上传图片文件名的数组 */
  getImgs = () => {
    return this.state.fileList.map((file) => file.name);
  };

  constructor(props) {
    super(props);
    let fileList = [];
    //如果传入了imgs
    const { imgs } = this.props;
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: "done", // 图片状态: done-已上传
        url: BASE_IMG_URL + img,
      }));
    }
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div>上传</div>
      </div>
    );
    return (
      <>
        <Upload
          accept="image/*" //只接受图片
          name="image" //指定后台接收的请求参数名
          action="/base/manage/img/upload" //上传图片的接口地址
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
