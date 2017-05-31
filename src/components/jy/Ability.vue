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
        <el-form-item label='入学日期' class="datePicker">
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
    </div>
    <!--<div class="course-list">
              <el-button class="btn" type="primary" @click="newCourse">新建课程</el-button>
              <el-table :data="courseList" border style="width: 100%" class='course-list' v-show='courseList.length!==0' row-key='courseList.courseId' current-row-key>
                  <el-table-column fixed prop="index" label="序号" width="52" c class="course-index">
                  </el-table-column>
                  <el-table-column prop="courseCode" label="课程编码" width="218">
                  </el-table-column>
                  <el-table-column prop="courseName" label="课程名称" width="180">
                  </el-table-column>
                  <el-table-column prop="professionName" label="所属专业" width="180">
                  </el-table-column>
                  <el-table-column prop="schoolName" label="所属学校" width="180">
                  </el-table-column>
                  <el-table-column label="状态" width="120">
                      <template scope="scope">
                          {{scope.row.courseState | courseStatus}}
                      </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="200">
                      <template scope="scope">
                          <el-button @click="handleClick(scope.row.courseId,scope.row.courseState)" class="my-btn"> {{scope.row.courseState |courseFilter}}</el-button>
                          <el-button @click='modiCourse(scope.row.courseId)' class="my-btn">修改</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>-->
  </div>
</template>
<script>
const jy_url = "http://www.369college.com/369education";
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
      courseid:'',
      classList:''
    }
  },
  created() {
    this.getAllCourse()
  },
  methods: {

    getAllCourse() {
      this.$http.get(jy_url + "/yzh/education/inter/getAllCourse?userid=" + sessionStorage.getItem("jykeyId") + "&accesstoken=" + sessionStorage.getItem("jykeyToken")).then(res => {
        this.data = res.data.courseList;
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
    newCourse() {

    },
    handleNodeClick(data, node, obj) {
      this.courseid=data.courseid;
      this.getAllClassByCourseId()  
      console.log(data, node, obj)
    },
    getAllClassByCourseId(){
       this.$http.get(jy_url + "/yzh/education/inter/getAllClassByCourseId?userid=" + sessionStorage.getItem("jykeyId") + "&accesstoken=" + sessionStorage.getItem("jykeyToken")+ "&courseId=" +this.courseid).then(res => {
        this.classList = res.data.classList;
        console.log(this.classList)
      })  
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
  border-bottom: 1px solid #e8e8e8;
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


