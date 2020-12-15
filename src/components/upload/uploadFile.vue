<template>
  <div id="app">
    <file-pond
      name="file"
      ref="pond"
      credits="https://asource.top,Source"
      label-idle="点击选择文件或将文件拖拽到此处"
      :allow-multiple="true"
      maxFiles="1"
      labelFileProcessing="上传中"
      labelFileProcessingComplete="上传完成"
      labelFileProcessingAborted="取消上传"
      labelFileProcessingError="上传错误"
      labelTapToCancel="点击取消"
      labelTapToRetry="点击重试"
      :server="server"
      :files="fileList"
      v-on:init="handleFilePondInit"/>
  </div>
<!--  :allowRevert="false" 上传成功后点击右上角的x会继续往后走，执行删除的操作，关掉的话就不会，还有一个方法能够解决，就是把revert设置为null-->
<!--  :server= "'/upload/uploadFile'"-->
</template>

<script>
import { deleteFile } from '@/api/upload'
// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)

export default {
  name: 'uploadFile',
  components: {
    FilePond
  },
  data: function () {
    return {
      // server: {
      //   url: 'http://localhost:8081/upload',
      //   timeout: 7000,
      //   process: '/uploadFile',
      //   fetch: null,
      //   revert: null
      // },
      server: {
        url: 'http://localhost:8081/upload',
        timeout: 7000,
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
          // fieldName is the name of the input field
          // file is the actual file object to send
          const formData = new FormData()
          formData.append(fieldName, file, file.name)

          const request = new XMLHttpRequest()
          request.open('POST', this.server.url + '/uploadFile')

          // Should call the progress method to update the progress to 100% before calling load
          // Setting computable to false switches the loading indicator to infinite mode
          request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total)
          }

          // Should call the load method when done and pass the returned server file id
          // this server file id is then used later on when reverting or restoring a file
          // so your server knows which file to return without exposing that info to the client
          request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
              // 这个是上传文件时的加载，加载执行完后会进入revert也就是删除
              load(request.responseText)
              // JSON.parse().data.file
              // the load method accepts either a string (id) or an object
            } else {
              // 失败的话进入
              // Can call the error method if something is wrong, should exit after
              error('oh no')
            }
          }
          request.send(formData)
          this.filesNames = request
          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              console.log('进入')
              // 点击取消进入该方法
              // This function is entered if the user has tapped the cancel button
              request.abort()

              // Let FilePond know the request has been cancelled
              abort()
            }
          }
        },
        revert: (uniqueFileId, load, error) => {
          // Should remove the earlier created temp file here
          // ...
          const file = JSON.parse(uniqueFileId).data.file
          this.file = file
          deleteFile(this.file).then(response => {
            const data = response.data
            console.log(data)
          })
          console.log(this.file)
          this.filesNames = null

          // Can call the error method if something is wrong, should exit after
          error('oh my goodness')

          // Should call the load method when done, no parameters required
          load()
        }
      },
      fileList: [],
      file: ''
    }
  },
  methods: {
    // 初始化文件
    handleFilePondInit: function () {
      this.filesNames = null
      console.log('FilePond has initialized')

      // FilePond instance methods are available on `this.$refs.pond`
    },
    // 删除文件
    handleClearFileList () {
      this.$refs.pond.removeFiles()
      this.filesNames = null
    },
    deleteFiles: () => {
      deleteFile(this.file).then(response => {
        const data = response.data
        console.log(data)
      })
    }
  }
}
</script>
