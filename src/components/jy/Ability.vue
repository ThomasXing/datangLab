<template>
  <div id="ability" class="clearfix">
  
    <div class="ability-tree">
      <el-tree :data="data" :props="defaultProps" node-key="id" highlight-current default-expand-all @node-click="handleNodeClick" :expand-on-click-node="false">
      </el-tree>
    </div>
    <div class="ability-query">
      <el-form :inline="true" :model="test" class="demo-form-inline">
        <el-form-item label="测评名称">
          <el-input v-model="test.name"></el-input>
        </el-form-item>
        <el-form-item label="测评状态">
          <el-input v-model="test.status"></el-input>
        </el-form-item>
        <el-form-item label='发布时间' class="datePicker">
          <el-date-picker v-model="test.startTime" type="date" placeholder="选择日期" @change="creDate(test.startTime)">
          </el-date-picker>
          <label class="el-form-item__label">至</label>
          <el-date-picker v-model="test.endTime" type="date" placeholder="选择日期" @change="endDate(test.endTime)">
          </el-date-picker>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button class="btn" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="source-list">
        <el-button class="btn" type="primary" @click="newTest">新建测评</el-button>
        <el-table :data="testQBList" border style="width: 100%" class='course-list' row-key='testQBList.testid' current-row-key v-show="testQBList.length!==0">
          <el-table-column fixed prop="index" label="序号" width="52" class="course-index">
          </el-table-column>
          <el-table-column prop="testname" label="测评名称" width="152" class="course-index">
          </el-table-column>
          <el-table-column  label="测评状态" width="152" class="course-index">
            <template scope="scope">
              {{scope.row.teststate|testState}}
            </template>
          </el-table-column>
          <el-table-column prop="publishdate" label="发布时间" width="152" class="course-index">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template scope="scope">
              <el-button class="my-btn"> 发布</el-button>
              <el-button class="my-btn">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  
  </div>
</template>
<script>
const jy_url = "http://www.369college.com/369education";
import {testState} from '../../filters'
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'courseList',
        label: 'text'
      },
      test: {
        name: '',
        status: '',
        startTime: '',
        endTime: ''
      },
      courseid: '',
      classList:[],
      testQBList: []
    }
  },
  created() {

    this.getAllCourse()
  },
  filters:{
    testState
  },
  methods: {
    getAllCourse() {
      this.$http.get(jy_url + "/yzh/education/inter/getAllCourse?userid=" + sessionStorage.getItem("jykeyId") + "&accesstoken=" + sessionStorage.getItem("jykeyToken")).then(res => {
        this.data = res.data.courseList;
      })
    },
    getAllTest() {
      this.$http.get(jy_url + "/yzh/education/inter/getAllTest?userid=" + sessionStorage.getItem("jykeyId") + "&accesstoken=" + sessionStorage.getItem("jykeyToken") + "&courseId=" + this.courseid).then(res => {
        this.testQBList = res.data.testQBList;
        console.log(res)

      })
    },
    onSubmit() {

    },
    creDate(time) {
      if (time) {
        let d = new Date(time);
        this.test.startTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      }
    },
    endDate(time) {
      if (time) {
        let d = new Date(time);
        this.test.endTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      }
    },
    newTest() {
      if (this.courseid !== "") {
        this.$router.push({ path: 'source', query: { source: 'test', classList: JSON.stringify(this.classList), courseid: this.courseid } })
      } else {
        this.$alert('请选择课程', '提示信息', {
          confirmButtonText: '确定',
        });
      }
    },

    handleNodeClick(data, node, obj) {
      this.courseid = data.courseid;
        this.$http.get(jy_url + "/yzh/education/inter/getAllClassByCourseId?userid=" + sessionStorage.getItem("jykeyId") + "&accesstoken=" + sessionStorage.getItem("jykeyToken") + "&courseId=" + this.courseid).then(res => {
          this.classList = res.data.classList;
        })
        if (this.testQBList !== []) {
          this.getAllTest()
        } else {
          this.$alert('请添加测评', '提示信息', {
            confirmButtonText: '确定',
          });
        }
      console.log(data, node, obj)
    }
  }
}
</script>
<style lang="less" scoped>
.ability-tree {
  float: left;

  min-height: 761px;
  height: inherit;
  position: relative;
  .el-tree {
    border: none;
    background-color: #f6f6f6;
  }

  width: 20%;
  padding-left: 14px;
  background-color: #f6f6f6;
  #rename {
    position: absolute;
    z-index: 9999;
  }
}

.ability-query {
  float: left;
  width: 68%;
  margin-top: 22px;
  margin-left: 20px;
  .demo-form-inline {
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 17px;
  }
  input {
    width: 172px;
    height: 32px;
  }
  .demo-form-inline {
    color: rgb(51, 51, 51);
  }
  .el-form-item__label {
    border-radius: none;
    color: rgb(51, 51, 51);
    font-size: 16px;
  }
}
</style>


