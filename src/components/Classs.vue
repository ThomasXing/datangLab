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
                <el-form-item label="班级名称">
                    <el-input v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item label="班级编码">
                    <el-input v-model="formInline.bianma"></el-input>
                </el-form-item>
                <el-form-item label="班级状态">
                    <el-select v-model="formInline.status" placeholder="全部状态">
                        <el-option label="等待开课" value="等待开课"></el-option>
                        <el-option label="开课" value="开课"></el-option>
                        <el-option label="结课" value="结课"></el-option>
                        <el-option label="失效" value="失效"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="架构师">
                    <el-select v-model="formInline.jiagoushi" placeholder="全部架构师" v-for="teacher in teacherList" :key="teacher.pxTeacherId" @change="get_teacherOne(teacher.pxTeacherId)">
                        <el-option :label="teacher.pxTeacherName" :value="teacher.pxTeacherName"></el-option>
    
                    </el-select>
                </el-form-item>
                <el-form-item label="项目经理">
                    <el-select v-model="formInline.PM" placeholder="全部项目经理" v-for="teacher in pmList" :key="teacher.pxTeacherId"  @change="get_teacherTwo(teacher.pxTeacherId)">
                        <el-option :label="teacher.pxTeacherName" :value="teacher.pxTeacherName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
    
        </div>
        <div class="class-list">
            <el-button class="btn" type="primary" @click="newClass">新建班级</el-button>
            <el-table :data="classList" border style="width: 100%" class='course-list' v-show='classList.length!==0'>
                <el-table-column fixed prop="index" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="classCode" label="课程编码" width="140">
                </el-table-column>
                <el-table-column prop="className" label="课程名称" width="180">
                </el-table-column>
                <el-table-column prop="professionName" label="所属专业" width="180">
                </el-table-column>
                <el-table-column prop="schoolName" label="所属学校" width="180">
                </el-table-column>
                 <el-table-column prop="teacherOne" label="架构师" width="180">
                </el-table-column>
                 <el-table-column prop="teacherTwo" label="项目经理" width="180">
                </el-table-column>
                 <el-table-column prop="classStuCount" label="班级人数" width="180">
                </el-table-column>
                <el-table-column prop="classState" label="状态" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="handleClick" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
      
        </div>
    </div>
</template>
<script>
export default {
    name: 'course',
    data() {
        return {
            formInline: {
                name: '',
                bianma: '',
                school: '',
                professional: '',
                status: '',
                jiagoushi: '',
                PM: ''
            },
            username: '',
            password: '',
            schoolList: '',
            schoolCode: '',
            professionList: '',
            professionCode: '',
            teacherList: '',
            teacherCode:'',
            pmList: '',
            pmCode:'',
            classList:[]
        }
    },
    created() {
        this.username = sessionStorage.getItem("keyId");
        this.password = sessionStorage.getItem("keyToken")
        this.getSchoolList()
        this.getAllProfession()
        this.getTeacherList()
        this.getpmList()
    },
    methods: {
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
        //查询教师
        getTeacherList() {
            this.$http.get("/api/yzh/research/inter/getTeacherList?userid=" + this.username + "&accesstoken=" + this.password + "&roleName=teacherJGRole").then(res => {
                this.teacherList = res.data.teacherList;
            })
        },
        //查询项目经理
        getpmList() {
            this.$http.get("/api/yzh/research/inter/getTeacherList?userid=" + this.username + "&accesstoken=" + this.password + "&roleName=teacherXMRole").then(res => {
                this.pmList = res.data.teacherList;
            })
        },
        // 按条件查询班级
        onSubmit() {
            this.$http.get("/api/yzh/research/inter/getClassByCondition?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&schoolCode=" + this.schoolCode + "&professionCode=" + this.professionCode + "&className=" + encodeURIComponent(this.formInline.name) + "&classState=" + this.formInline.status + "&classCode=" + this.formInline.bianma+ "&teacherOne=" + this.formInline.bianma+ "&teacherTwo=" + this.formInline.bianma).then(res => {
                this.classList = res.data.classList
            })
        },
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        get_teacherOne(c){
            this.teacherCode = c;
        },
        get_teacherTwo(d){
            this.pmCode = d;
        },
        newClass(){
            this.$router.push({ path: 'newclass' })
        },
        handleClick(){

        }
    }
}
</script>
<style lang="less">
.course {
    margin-left: 20px;
    width: 88%;
    .course-query {
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
}
</style>