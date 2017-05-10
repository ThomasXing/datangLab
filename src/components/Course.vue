<template>
    <div class="course">
        <div class="course-query">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="所属学校">
                    <el-select v-model="formInline.school" placeholder="全部学校" v-for='item in schoolList' :key='item.schoolCode' @change="get_schoolCode(item.schoolCode)">
                        <el-option :label="item.schoolName" value="青岛实训基地"></el-option>
    
                    </el-select>
                </el-form-item>
                <el-form-item label="所属专业">
                    <el-select v-model="formInline.professional" placeholder="全部专业" v-for='profession in professionList' :key='profession.professionName' @change="get_professionCode(profession.professionCode)">
                        <el-option :label="profession.professionName" value="移动互联产品研发"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程名称">
                    <el-input v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item label="课程编码">
                    <el-input v-model="formInline.bianma"></el-input>
                </el-form-item>
                <el-form-item label="课程状态">
                    <el-select v-model="formInline.status" placeholder="全部状态">
                        <el-option label="有效" value="有效"></el-option>
                        <el-option label="失效" value="失效"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
    
        </div>
           
      
        <div class="course-list">
            <el-button class="btn" type="primary" @click="newCourse">新建课程</el-button>
            <el-table :data="courseList" border style="width: 100%" class='course-list' v-show='courseList.length!==0' row-key='courseList.courseId' current-row-key>
                <el-table-column fixed prop="index" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="courseCode" label="课程编码" width="140">
                </el-table-column>
                <el-table-column prop="courseName" label="课程名称" width="180">
                </el-table-column>
                <el-table-column prop="professionName" label="所属专业" width="180">
                </el-table-column>
                <el-table-column prop="schoolName" label="所属学校" width="180">
                </el-table-column>
                <el-table-column prop="courseState" label="状态" width="120" >
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="handleClick" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click='modiCourse(scope.row.courseId)' >修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import {mapActions} from 'vuex'
// import courseStatus from "../filters/index.js"
export default {
    name: 'course',
    data() {
        return {
              formInline: {
                name: '',
                bianma: '',
                school: '',
                professional: '',
                status: ''
            },
            username: '',
            password: '',
            schoolList: '',
            schoolCode: '',
            professionList: '',
            professionCode: '',
            courseList: []
        }
    },
    created() {
        this.username = sessionStorage.getItem("keyId");
        this.password = sessionStorage.getItem("keyToken")
        this.getSchoolList()
        this.getAllProfession()
        this.getAllCourse()
    },
    methods: {
        // 按条件查询课程
        onSubmit() {
            this.$http.get("/api/yzh/research/inter/getCourseByCondition?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&schoolCode=" + this.schoolCode + "&professionCode=" + this.professionCode + "&courseName=" + encodeURIComponent(this.formInline.name) + "&courseState=" + this.formInline.status + "&courseCode=" + this.formInline.bianma).then(res => {
                this.courseList = res.data.courseList
            })
        },
        handleClick() {
            console.log(111)

        },
        modiCourse(courseId){
             this.$router.push({path:'newCourse'})

            //  this.$http.post("/api/yzh/research/inter/updateCourse",{
            //      userid:this.username,
            //      accesstoken:this.password,
            //      courseId:courseId,
            //      courseName:courseName
            //  }).then(res => {
            //     console.log(res)
            // })
        },
         //获取所有学校
        getSchoolList() {
            this.$http.get("/api/yzh/research/inter/getAllSchool?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.schoolList = res.data.schoolList;
            })
        },
        //获取所有专业
        getAllProfession() {
            this.$http.get("/api/yzh/research/inter/getAllProfession?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.professionList = res.data.professionList;
            })
        },
        //获取所有课程
        getAllCourse(){
             this.$http.get("/api/yzh/research/inter/getAllCourse?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.courseList = res.data.courseList;
            })
        },
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        newCourse() {
            this.$router.push({ path: 'newCourse' })
        }

    }
}
</script>
<style lang="less">
.course {
    margin-left: 20px;
    width: 88%;
   &-query {
        margin-top: 22px;
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
    .course-list {
        margin-top: 20px;
    }
}
</style>