<template>
  <div>
<!--    面包屑-->
    <el-breadcrumb style="padding-bottom: 15px; border-bottom: 1px solid darkgray" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片-->
    <el-card class="box-card">
        <el-card class="box-card">
          <el-row>
            <el-tooltip class="item" effect="dark" content="添加" placement="bottom">
            <el-button style="margin-right: 10px" @click="dialogVisible = true" size="mini" type="success" icon="el-icon-circle-plus-outline" circle></el-button>
            </el-tooltip>
            <el-dialog
              title="添加"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <span>这是一段信息</span>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
            <el-button style="margin-right: 10px" @click="dialogVisible1 = true" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-dialog
              title="修改"
              :visible.sync="dialogVisible1"
              width="30%"
              :before-close="handleClose">
              <span>这是一段信息</span>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
            <el-button  size="mini" icon="el-icon-search" circle></el-button>
            </el-tooltip>
          </el-row>
        </el-card>
        <!--    查询表单-->
      <el-collapse>
        <el-collapse-item title="查询" name="1">
          <div>
            <el-form :inline="true" ref="form" :model="sizeForm" label-width="80px" size="mini">
              <el-form-item label="部门">
                <el-select v-model="value" placeholder="请选择部门">
                  <el-option
                    v-for="item in sizeForm.sector"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="sizeForm.user"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="sizeForm.email"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio v-model="sizeForm.radio" label="1">男</el-radio>
                <el-radio v-model="sizeForm.radio" label="2">女</el-radio>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="sizeForm.date"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']">
                </el-date-picker>
              </el-form-item>
              <el-form-item size="mini">
                <el-button type="primary" @click="onSubmit()">立即创建</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
<!--      表格-->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      分页-->
      <el-pagination
        style="display: flex; justify-content: center; margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      sizeForm: {
        name: '',
        sector: [{
          value: '选项一',
          label: '部门一'
        }],
        user: '',
        email: '',
        radio: '1',
        date: ''
      },
      value: '',
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 1
    }
  },
  methods: {
    onSubmit () {
      console.log(this.sizeForm.date)
      console.log('submit!')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
  .box-card{
    margin-top: 15px;
  }
</style>
