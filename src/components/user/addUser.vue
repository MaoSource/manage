<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" :title="addTitle">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="TbUser" :rules="rules" size="mini" label-width="100px"
          label-position="top">
          <el-col :span="24">
            <el-form-item label="上传头像" prop="avatar" required>
              <upload-file ref="avatar"/>
<!--              <el-upload ref="avatar" :file-list="avatarfileList" :action="avatarAction"-->
<!--                :before-upload="avatarBeforeUpload" list-type="picture">-->
<!--                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>-->
<!--                <div slot="tip" class="el-upload__tip">只能上传不超过 2MB 的文件</div>-->
<!--              </el-upload>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="TbUser.username" placeholder="请输入用户名" :maxlength="16" clearable
                prefix-icon='el-icon-user' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="选择部门" prop="departmentId">
              <el-select v-model="TbUser.departmentId" placeholder="请选择选择部门" clearable
                :style="{width: '100%'}">
<!--                <el-option v-for="(item, index) in departments" :key="index" :label="item.label"-->
<!--                  :value="item.value" :disabled="item.disabled"></el-option>-->
                <el-option
                  v-for="item in departments"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  <span>{{ item.name }}</span>
                  <span style="float: right">{{ item.deptCount }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择性别" prop="sex">
              <el-radio-group v-model="TbUser.sex" size="medium">
                <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                          :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="TbUser.nickname" placeholder="请输入昵称" :maxlength="16" clearable
                prefix-icon='el-icon-user-solid' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="TbUser.password" placeholder="请输入密码" :maxlength="16" clearable
                prefix-icon='el-icon-lock' show-password :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input v-model="TbUser.phoneNumber" placeholder="请输入手机号" :maxlength="11" clearable
                        prefix-icon='el-icon-phone-outline' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="TbUser.email" placeholder="请输入邮箱" clearable prefix-icon='el-icon-message'
                :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日" prop="birth">
              <el-date-picker v-model="TbUser.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                :style="{width: '100%'}" placeholder="请选择生日" clearable></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import uploadFile from '@/components/upload/uploadFile'
import { deleteFile } from '@/api/upload'
import { addFile } from '@/api/user'
export default {
  inheritAttrs: false,
  components: { uploadFile },
  props: {
    addTitle: {
      type: String,
      default: '添加'
    },
    departments: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      TbUser: {
        avatar: '',
        username: '',
        departmentId: undefined,
        nickname: undefined,
        sex: undefined,
        password: undefined,
        email: '',
        phoneNumber: undefined,
        birth: null
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        departmentId: [{
          required: true,
          message: '请选择选择部门',
          trigger: 'change'
        }],
        nickname: [],
        sex: [],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          pattern: /^(?![a-z]+$)(?![A-Z]+$)(?![0-9]+$)[0-9a-zA-Z\W]\S{7,20}$/,
          message: '密码长度不小于八位最少包含一个大小写字符或数字',
          trigger: 'blur'
        }],
        email: [{
          pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          message: '请输入正确的邮箱',
          trigger: 'blur'
        }],
        phoneNumber: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
          message: '请输入正确的手机号',
          trigger: 'blur'
        }],
        birth: []
      },
      avatarAction: 'https://jsonplaceholder.typicode.com/posts/',
      avatarfileList: [],
      departmentIdOptions: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }],
      sexOptions: [{
        label: '男',
        value: 1
      }, {
        label: '女',
        value: 0
      }],
      imageName: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onOpen () {},
    onClose () {
      this.$refs.elForm.resetFields()
    },
    toFile () {
      if (this.$refs.avatar.filesNames === null) {
        this.imageName = null
      } else {
        const chil = this.$refs.avatar.filesNames.response
        this.imageName = JSON.parse(chil).data.file
        this.TbUser.avatar = this.imageName
      }
    },
    close () {
      this.$emit('update:visible', false)
      this.toFile()
      if (this.imageName !== null) {
        deleteFile(this.imageName).then(response => {
        })
        this.imageName = ''
        this.avatarInit()
      }
    },
    handelConfirm () {
      this.toFile()
      // this.TbUser.avatar = this.imageName
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        addFile(this.TbUser).then(response => {
          if (response.data.code === 200) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: response.data.message
            })
          }
        })
        this.avatarInit()
        this.$emit('update:visible', false)
      })
    },
    avatarBeforeUpload (file) {
      const isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
    // 初始化
    avatarInit () {
      this.$refs.avatar.handleClearFileList()
    }
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
