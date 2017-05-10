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
                <br>
                <el-form-item label="学员学号">
                    <el-input v-model="formInline.id"></el-input>
                </el-form-item>
                <el-form-item label="学员姓名">
                    <el-input v-model="formInline.firstname"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="学籍状态">
                    <el-radio-group v-model="formInline.xujiStatus">
                        <el-radio :label="key" v-for='(val,key) in xujiStatus' :key="val">{{key}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <br>
                <el-form-item label="学籍记录">
                    <el-radio-group v-model="formInline.xujiRecord">
                        <el-radio :label="key" v-for="(val,key) in xujiRecord" :key="val">{{key}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <br>
                <el-form-item label='入学日期' class="datePicker">
                    <el-date-picker v-model="formInline.startTime" type="date" format="yyyy-MM-dd" placeholder="选择日期" @change="creDate(formInline.startTime)">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label='至' class="datePicker">
                    <el-date-picker v-model="formInline.endTime" type="date" placeholder="选择日期"  @change="creDate(formInline.endTime)">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
    
        </div>
        <div class="class-list">
            <el-button class="btn" type="primary" @click="addXuJi">新建学籍</el-button>
            <el-table :data="stuManagementList" border style="width: 100%" class='course-list' v-show='stuManagementList.length!==0'>
                <el-table-column fixed type='index' label="序号" width="80">
                </el-table-column>
                <el-table-column prop="stuCode" label="学员学号" width="140">
                </el-table-column>
                <el-table-column prop="stuTrueName" label="学员姓名" width="180">
                </el-table-column>
                <el-table-column prop="stuSex" label="性别" width="180">
                </el-table-column>
                <el-table-column prop="className" label="班级名称" width="180">
                </el-table-column>
                <el-table-column prop="professionName" label="专业名称" width="180">
                </el-table-column>
                <el-table-column prop="schoolName" label="学校名称" width="180">
                </el-table-column>
                <el-table-column prop="stuPhone" label="联系电话" width="120">
                </el-table-column>
                <el-table-column prop="managementState" label="学籍状态" width="120">
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
import { normalTime } from '../filters'
export default {
    data() {
        return {
            formInline: {
                name: '',
                bianma: '',
                school: '',
                professional: '',
                id: '',
                firstname: '',
                xujiStatus: '',
                xujiRecord: '',
                startTime: '',
                endTime: ''
            },
            xujiStatus: {
                "在读": "A",
                "旁听": "B",
                "休学": "C",
                "退学": "D",
                "已毕业": "E",
                "已结业": "F"
            },
            xujiRecord: {
                "曾休学": 4,
                "曾留级": 6,
                "曾重读": 9
            },
            username: '',
            password: '',
            schoolList: '',
            schoolCode: '',
            professionList: '',
            professionCode: '',
            stuManagementList: []
        }
    },
    created() {
        this.username = sessionStorage.getItem("keyId");
        this.password = sessionStorage.getItem("keyToken")
        this.getSchoolList()
        this.getAllProfession()
        this.getAllStuManagement()
    },
    filters: {
        normalTime
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
        //获取所有学籍
        getAllStuManagement() {
            this.$http.get("/api/yzh/research/inter/getAllStuManagement?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.stuManagementList = res.data.stuManagementList
            })
        },
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        creDate(time) {  
                let d = new Date(time);
                let nowTime =  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                console.log(nowTime)
        },
        handleClick() {

        },
        onSubmit() {
            console.log(this.formInline.startTime,this.formInline.endTime)
            this.$http.get("/api/yzh/research/inter/getStuManagementByCondition?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&schoolCode=" + this.schoolCode + "&professionCode=" + this.professionCode + "&className=" + encodeURIComponent(this.formInline.name) + "&classCode=" + this.formInline.bianma + "&stuCode=" + this.formInline.id + "&stuName=" + encodeURIComponent(this.formInline.firstname) + "&creDate=" + (this.formInline.startTime | normalTime) + "&endDate=" + (this.formInline.endTime | normalTime) + "&stateListStr=" + this.xujiStatus[this.formInline.xujiStatus] + "&eventListStr=" + this.xujiRecord[this.formInline.xujiRecord]).then(res => {
                console.log(res)
            })
        },
        addXuJi() {

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
    .datePicker .el-input__icon {
        right: 20px;
    }
    .class-list {
        margin-top: 20px;
    }
}
</style>
