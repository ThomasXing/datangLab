<template>
    <div id="addTest">
        <div class="source-head ">
            <div class="source-head-incre">
                <el-button class="btn" type="primary" @click="">保存并发布</el-button>
                <el-button class="btn" type="primary" @click="">保存</el-button>
                <el-button class="btn" type="primary" @click="">取消</el-button>
            </div>
        </div>
        <div class="source-head">
            <el-form :inline="true" class="source-choice demo-form-inline">
                <el-form-item label="测评任务：">
                    <el-button class="btn" type="primary" @click="">从资源库中选择</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="source-con">
            <table cellspacing="10px">
                <tr class="source-con-row">
                    <td class="source-con-row-t">任务名称：</td>
                    <td>{{item.taskname}}</td>
                </tr>
                <tr class="source-con-row">
                    <td>任务说明：</td>
                    <td>{{item.taskintro}}</td>
                </tr>
                <tr class="source-con-row">
                    <td>测评内容：</td>
                    <td>{{item.taskcontent}}</td>
                </tr>
                <tr class="source-con-row">
                    <td>测评标准：</td>
                    <td>{{item.taskstandard}}</td>
                </tr>
            </table>
            <div class="source-con-file" v-for="list in item.taskFileList">
               
                <div class="item">
                    <a :href="list.fileurl">
                        <!--:download="list.fileattachname"-->
                        <img :src="list.filethumbnail" :alt="list.fileattachname" width="220" height="140">
                        <h3>{{list.filename}}</h3>
                    </a>
                </div>
            </div>
        </div>
        <div class="source-con clearfix">
            <table cellspacing="10px">
                <tr class="source-con-row">
                    <td class="source-con-row-f">测评时间：</td>
                    <td>
                        <el-date-picker v-model="test.startTime"  type="datetime" placeholder="选择日期" @change="creDate(test.startTime)">
                        </el-date-picker>
                        <label class="el-form-item__label">至</label>
                        <el-date-picker v-model="test.endTime"  type="datetime" placeholder="选择日期" @change="endDate(test.endTime)">
                        </el-date-picker>
                    </td>
                </tr>
                <tr class="source-con-row">
                    <td>测评班级：</td>
                    <td>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox v-model="Recheck" @change="handleCheckNotChange">反选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group @change="handleCheckedCitiesChange" fill="#0491cd" v-model="checkedCourse">
                            <el-checkbox v-for="course in courseList" :label="course.courseId" :key="course">{{course.courseName}}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                </tr>
    
            </table>
    
        </div>
    
    </div>
</template>
<script>
import HeadView from '../Head'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            test: {
                name: '',
                status: '',
                startTime: '',
                endTime: ''
            },
            checkAll: true,
            Recheck: false,
            checkedCourse: [],
            isIndeterminate: true,
            courseList: ''
        }
    },
    created() {
        this.item =JSON.parse(this.$route.query.taskinfo);
        this.getAllCourse();
    },
    computed: {
        //  ...mapGetters(['item']),
        //  item:function(){
        //     for(let key of item.taskFileList)
        //    console.log(key)
        // }
    },
    components: {
        HeadView
    },
    methods: {
        getAllCourse() {
            this.$http.get("/api/369research/yzh/research/inter/getAllCourse?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
                this.courseList = res.data.courseList
            })
        },
        creDate(time) {
            if (time) {
                let d = new Date(time);
                this.test.startTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+" "+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
            }
        },
        endDate(time) {
            if (time) {
                let d = new Date(time);
                this.test.endTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+" "+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
            }
        },
        handleCheckAllChange(event) {
            let courseArr = []
            this.courseList.forEach(function (val) {
                courseArr.push(val.courseId)
            })
            this.checkedCourse = event.target.checked ? courseArr : [];
            this.isIndeterminate = false;
        },
        handleCheckNotChange(event) {
            let courseArr = [];
            let that = this;
            this.courseList.forEach(function (val) {
                if (that.checkedCourse.indexOf(val.courseId) === -1) {
                    courseArr.push(val.courseId)
                }
            })
            this.checkedCourse = event.target.checked ? courseArr : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.courseList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.courseList.length;
        }

    }
}
</script>
<style lang="less" scoped>
#addTest {
    .source-head {
        height: 74px;
        float: left;
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        &-incre {
            width: 30%;
            padding: 17px 0 17px 14px;
            border-bottom: 1px solid #e8e8e8;
        }
        .source-choice {
            .el-form-item {
                margin: 17px 0 0 14px;
            }
        }
    }
    .source-con {
        width: 70%;
        float: left;
        padding: 15px;
        &-row {
            font-size: 16px;
            color: #111111;
            min-height: 70px;
            td:first-child {
                min-width: 80px;
                text-align: right;
            }
            &-t {
                padding-left: 6px;
                border-left: 5px solid #0491cd;
            }
            &-f {
                padding-left: 6px;
                border-left: 5px solid #fff;
            }
        }
        &-file {
            .item {
                margin: 20px;
                float: left;
                text-align: center;
                h3 {
                    line-height: 50px;
                    color: #4d4d4d;
                }
            }
        }
    }
}
</style>

