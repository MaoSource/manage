<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb style="padding-bottom: 15px; border-bottom: 1px solid darkgray"
                   separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片-->
    <el-card class="box-card">
      <el-card class="box-card">
        <el-row>
          <el-tooltip class="item" effect="dark" content="添加" placement="bottom">
            <el-button @click="dialogVisible = true" size="mini" type="success"
                       icon="el-icon-circle-plus-outline" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button @click="open" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
            <el-button @click="open" size="mini" type="primary"
                       icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" :open-delay="500" effect="dark" content="查询" placement="bottom">
            <el-button size="mini" icon="el-icon-search" @click="toggleFilter" circle></el-button>
          </el-tooltip>
        </el-row>
      </el-card>
      <!-- 添加表单 -->
      <add-user
                ref="add"
                :before-close="handleClose"
                addTitle="添加"
                :departments="sizeForm.sector"
                :visible.sync="dialogVisible"/>
      <!--    查询表单-->
      <el-collapse v-model="toggleFlag" accordion @change="handleToggle">
        <el-collapse-item title="查询" name="1">
          <div>
            <el-form :inline="true" ref="form" :model="sizeForm" label-width="80px" size="mini">
              <el-form-item label="部门">
                <el-select v-model="query.departmentId" @click.native="findDept" placeholder="请选择部门">
                  <el-option
                    v-for="item in sizeForm.sector"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span>{{ item.name }}</span>
                    <span style="float: right">{{ item.deptCount }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="query.username"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="query.email"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio v-model="query.sex" label="1">男</el-radio>
                <el-radio v-model="query.sex" label="0">女</el-radio>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="query.nickname"></el-input>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker
                  type="datetimerange"
                  align="right"
                  v-model="timeRange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']">
                </el-date-picker>
              </el-form-item>
              <el-form-item size="mini">
                <el-button type="primary" @click="onSubmit(query)">查询</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!--      表格-->
      <el-scrollbar class="page-scroll">
        <el-table
          :data="tableData"
          v-loading="loading"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            label="username"
            width="100">
            <template slot-scope="scope">
            <span v-if="scope.row.username">
            {{ scope.row.username }}
            </span>
              <span v-else>
              暂无数据
            </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="昵称"
            width="100">
            <template slot-scope="scope">
            <span v-if="scope.row.nickname">
            {{ scope.row.nickname }}
            </span>
              <span v-else>
              暂无数据
            </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="email"
            width="180">
            <template slot-scope="scope">
            <span v-if="scope.row.email">
            {{ scope.row.email }}
            </span>
              <span v-else>
              暂无数据
            </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="部门"
            width="150">
            <template slot-scope="scope">
            <span v-if="scope.row.name">
            {{ scope.row.name }}
            </span>
              <span v-else>
              暂无数据
            </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="头像">
            <template slot-scope="scope">
            <span v-if="scope.row.avatar">
            {{ scope.row.avatar }}
            </span>
              <span v-else>
              暂无数据
            </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="手机"
            width="130px"
          >
            <template slot-scope="scope">
            <span v-if="scope.row.phoneNumber">
            {{ scope.row.phoneNumber }}
            </span>
              <span v-else>
              暂无数据
            </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="性别"
            width="50px"
          >
            <template slot-scope="scope">
            <span v-if="scope.row.sex">
              男
            </span>
            <span v-else>
              女
            </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="生日"
            width="200px"
          >
            <template slot-scope="scope">
            <span v-if="scope.row.modifiedTime">
            {{ scope.row.modifiedTime }}
            </span>
              <span v-else>
              暂无数据
            </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否可用"
            width="90px"
          >
            <template slot-scope="scope">
              <el-switch
                disabled
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus($event,scope.row.status)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
            width="200px"
          >
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <!--      分页-->
      <el-pagination
        style="display: flex; justify-content: center; margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.current"
        :page-sizes="[7, 10, 15, 20]"
        :page-size=page.size
        layout="total, sizes, prev, pager, next, jumper"
        :total=this.total>
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { list } from '@/api/user'
import { findDeptAndCount } from '@/api/department'
import addUser from '@/components/user/addUser'

export default {
  name: 'User',
  data () {
    return {
      sizeForm: {
        name: '',
        // 部门数据集合
        sector: [],
        user: '',
        email: '',
        radio: '1',
        date: ''
      },
      value: '',
      dialogVisible: false,
      dialogVisible1: false,
      // 数据集合
      tableData: [],
      toggleFlag: '',
      total: 0,
      page: {
        current: 1,
        size: 7
      },
      query: {
        current: 1,
        size: 7,
        username: '',
        nickname: '',
        email: '',
        sex: '',
        departmentId: '',
        startDate: '',
        endDate: ''
      },
      loading: false,
      state: '0',
      // 时间
      timeRange: []
    }
  },
  components: {
    addUser
  },
  props: {
    addTitle: {
      type: String,
      default: '添加'
    }
  },
  // computed: {
  //   statu: (val) => {
  //     return val === 1
  //   }
  // },
  created () {
    this.getUser()
    this.findDept()
  },
  methods: {
    open () {
      this.$notify.info({
        title: '开发中',
        message: '当前功能还在开发中'
      })
    },
    onSubmit () {
      this.query.size = 7
      this.query.current = 1
      this.query.startDate = this.timeRange[0]
      this.query.endDate = this.timeRange[1]
      this.getUser()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.add.close()
          done()
        })
        .catch(_ => {
        })
    },
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      this.query.size = val
      this.getUser()
    },
    handleCurrentChange (val) {
      this.query.current = val
      this.getUser()
    },
    handleToggle (val) {
      this.toggleFlag = val
    },
    toggleFilter () {
      if (this.toggleFlag === '') {
        this.toggleFlag = '1'
      } else {
        this.toggleFlag = ''
      }
    },
    getUser () {
      this.loading = true
      list(this.query).then(response => {
        this.tableData = response.data.data.list.records
        this.total = response.data.data.list.total
        // this.switchVal = response.data.data.page.status
        this.loading = false
      })
    },
    findDept () {
      findDeptAndCount().then(response => {
        if (this.sizeForm.sector.length <= 1) {
          this.sizeForm.sector = response.data.data.dept
        }
      })
    },
    changeStatus (val, state) {
      console.log(val, state)
    },
    resetForm (formName) {
      this.query = {
        current: 1,
        size: 7,
        username: '',
        nickname: '',
        email: '',
        sex: '',
        departmentId: ''
      }
      this.getUser()
    },
    handleChange (file) {
      // 取出上传文件的对象，在其它地方也可以使用
      this.file = file.raw
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 15px;
}

</style>
