import React from 'react'
import { Upload, Icon, Modal, Button, message } from 'antd'

const replaceHttp = (v) => (v || '').replace(/^http:/, 'http:')

class PicUploader extends React.Component {
  constructor(props) {
    super(props)
    const fileList = (props.value || [])
      .filter((v) => !!v)
      .map((v, index) => {
        return {
          uid: -index,
          name: `${index}.png`,
          status: 'done',
          // url: replaceHttp(v),
          url: v.url,
          key: v.key
        }
      })

    this.state = {
      disabled: props.disabled || false,
      accept: props.accept || '.jpg,.jpeg,.png',
      maxLength: props.maxLength || 3,
      previewVisible: false,
      previewImage: '',
      fileList,
      multiple: props.multiple || false,
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleBeforeUpload = (file) => {
    const requiredSize = this.props.fileSize || 2 // 限制大小 默认2M
    const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
    const isJPG = types.indexOf(file.type) >= 0

    if (!isJPG) {
      message.error('请上传图片')
      return false
    }

    const isLt = file.size / 1024 / 1024 < requiredSize

    if (!isLt) {
      message.error(`图片大小不要超过限制${requiredSize}M`)
      return false
    }

    return isJPG && isLt
  }

  /**
   * 获取图片原始尺寸 （不考虑 IE 8 及以下）
   * @param {String} url
   */
  getImgNaturalDimensions(url) {
    if (!url) return {}

    let img = document.createElement('img')

    img.src = url

    const nWidth = img.naturalWidth
    const nHeight = img.naturalHeight

    img = null
    return { nWidth, nHeight }
  }

  handleChange = ({ file, fileList }) => {
    if (!file.status) return

    const nData = this.getImgNaturalDimensions(file.thumbUrl)

    this.setState({ fileList })

    // if (
    //   file.status === 'done' &&
    //   file.thumbUrl &&
    //   this.props.withOriginSize
    // ) {
    //   const { nWidth, nHeight } = nData

    //   file.response.desc += `@${nWidth}w_${nHeight}h.png`
    //   file.response.key += `@${nWidth}w_${nHeight}h.png`
    // }

    if (file.status === 'done' || file.status === 'removed') {
      // const value = fileList.map((file) =>
      //   file.response ? replaceHttp(file.response.data.url) : file.url
      // )
      const value = fileList.map(file => {
        return {
          key: file.response.data.key,
          url: file.response.data.url
        }
      })

      this.props.onChange && this.props.onChange(value)
    }
  }

  componentWillReceiveProps(nextProps) {
    const fileList = (nextProps.value || [])
      .filter((v) => !!v)
      .map((v, index) => {
        return {
          uid: -index,
          name: `${index}.png`,
          status: 'done',
          // url: replaceHttp(v),
          url: v.url,
          key: v.key
        }
      })

    this.setState({
      disabled: nextProps.disabled || false,
      fileList,
    })
  }

  render() {
    const {
      maxLength,
      previewVisible,
      previewImage,
      fileList,
      disabled,
      accept,
      multiple,
    } = this.state
    // const Host = 'https://ka.xianqu.cn'
    const Host = ''
    const uploadButton =
      this.props.listType === 'text' ? (
        <Button>
          <Icon type="upload" /> 点击上传
        </Button>
      ) : (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">上传</div>
        </div>
      )
    return (
      <div
        className={`pic-uploader-wrapper ${this.props.className || ''} ${
          this.props.forBanner ? 'banner-uploader' : ''
        }`}
        style={this.props.style || {}}>
        <Upload
          disabled={disabled}
          action={disabled ? null : `${Host}/admin/file/uploadPicture`}
          headers={{
            'amulong-token': localStorage.getItem('token') || '',
          }}
          listType={this.props.listType || 'picture-card'}
          fileList={fileList}
          accept={accept}
          multiple={multiple}
          onPreview={this.handlePreview}
          beforeUpload={disabled ? null : this.handleBeforeUpload}
          onChange={disabled ? null : this.handleChange}>
          {fileList.length >= maxLength ? null : uploadButton}
        </Upload>
        {this.props.limitTips && (
          <div className="limit-tips">{this.props.limitTips}</div>
        )}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          disabled={disabled}>
          <img
            alt="example"
            style={{ width: '100%' }}
            src={previewImage.replace(/http(s?)\:/g, '')}
          />
        </Modal>
      </div>
    )
  }
}

PicUploader.defaultProps = {
  maxLength: 3,
  // value: []
}

export default PicUploader
