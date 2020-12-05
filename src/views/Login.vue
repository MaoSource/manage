<template>
  <el-card shadow="hover" class="content_box">
    <div style="position: absolute; left: 50%; top: 0; transform: translate(-50%, 70%); font-size: 30px; font-weight: bold; font-family: '华文行楷'; ">Login</div>
    <div class="login_box">
      <div class="avatar_box">
        <img alt="icon" class="imgIcon" src="../assets/img/Icon.png"/>
      </div>
<!--      <h1>登录</h1>-->
      <div class="form_box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item prop="user">
            <el-input type="text" prefix-icon="el-icon-user-solid" v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" prefix-icon="el-icon-lock" v-model="ruleForm.pass" show-password></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input type="text" prefix-icon="el-icon-mobile" v-model="ruleForm.code" class="form_code"></el-input>
            <img style="width: 35%" class="code_img" alt="code" src="../assets/img/code.png"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        pass: '',
        user: '',
        code: ''
      },
      rules: {
        pass: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push('/main')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.content_box{
  width: 600px;
  height: 420px;
  background-color: #FFFFFF;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
  .form_box{
    width: 90%;
    height: 100%;
  }
  .avatar_box{
    width: 100px;
    height: 90px;
  }
  .login_box .imgIcon{
    width: 100%;
    height: 100%;
    margin-top: 100px;
  }
  .form_code{
    width: 60%;
    display: flex;
    float: left;
  }
</style>
