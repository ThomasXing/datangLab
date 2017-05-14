<template>
    <div class="newCourse">
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">基本信息</thead>
                <el-form :model="formInline" class="demo-form-inline">
                    <tr>
                        <td class='tr'>
                            所属学校：
                        </td>
                        <td>
                            <el-select v-model="formInline.school" placeholder="全部学校" v-for='item in schoolList' :key='item.schoolCode' @change="get_schoolCode(item.schoolCode)">
                                <el-option :label="item.schoolName" value="青岛实训基地"></el-option>
    
                            </el-select>
                        </td>
    
                    </tr>
                    <tr>
                        <td class='tr'>
                            所属专业：
                        </td>
                        <td>
                            <el-select v-model="formInline.professional" placeholder="全部专业" v-for='profession in professionList' :key='profession.professionName' @change="get_professionCode(profession.professionCode)">
                                <el-option :label="profession.professionName" value="移动互联产品研发"></el-option>
                            </el-select>
    
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>学员学号：</td>
                        <td>
                            <el-input :disabled="true" placeholder="系统生成学员学号，用户不可修改"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>姓名：</td>
                        <td>
                            <el-input placeholder="" v-model="formInline.stuName"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>身份证：</td>
                        <td>
                            <el-input placeholder="" v-model="formInline.stuIDCard"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>性别：</td>
                        <td>
                            <el-select v-model="formInline.stuSex" placeholder="请选择">
                                <el-option :label="key" :value="key" v-for="(val,key) in stuSex" :key="val"></el-option>
    
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>学历：</td>
                        <td>
                            <el-select v-model="formInline.stuQualification" placeholder="请选择">
                                <el-option :label="key" :value="key" v-for="(val,key) in stuQualification" :key="val"></el-option>
    
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>毕业学校：</td>
                        <td>
                            <el-input placeholder="" v-model="formInline.stuSelfSchoolName"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>专业：</td>
                        <td>
                            <el-input placeholder="" v-model="formInline.stuSelfProfessionName"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>手机：</td>
                        <td>
                            <el-input placeholder="" v-model="formInline.stuPhone"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class='tr'>邮箱：</td>
                        <td>
                            <el-input placeholder="" v-model="formInline.stuMail"></el-input>
                        </td>
                    </tr>
                    <tr v-show='productList.length>1'>
                        <td class='tr'>
                            所属产品：
                        </td>
                        <td>
                            <el-select v-model="formInline.product" placeholder="全部产品" v-for='list in productList' :key='list.productCode' @change="get_productCode(list.productCode)">
                                <el-option :label="list.productName" :value="list.productName"></el-option>
                            </el-select>
    
                        </td>
                    </tr>
                </el-form>
            </table>
        </div>
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">班级信息</thead>
                <tr>
                    <td class='tr'>
                        <el-popover ref="addxueji" placement="left" width="400" v-model="visible2">
                            <tr class="addxueji">
                                <td class='tr choClass'>选择班级：</td>
                                <td>
                                    <el-select v-model="formInline.className" placeholder="请选择">
                                        <el-option :label="item.className" :value="item.className" v-for="item in classList" :key="item"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <div style="text-align: center; margin: 0">
                                <el-button class="btn-q" type="primary" size="small" @click='addClassList'>确定</el-button>
    
                                <el-button class='btn-w' type="text" size="small" @click="visible2 = false">取消</el-button>
                            </div>
                        </el-popover>
                        <el-button class="btn" type="primary" v-popover:addxueji @click="getAllClass">添加班级</el-button>
                    </td>
    
                </tr>
                <tr v-for="(val,key) in myClassList">
                    <td class='tr'>班级：</td>
                    <td>
                        {{val}}
                    </td>
                    <td class="text-ddd">添加时间：</td>
                    <td class="text-ddd">{{key}}</td>
                </tr>
                <tr>
                    <td v-for="list in myClassList" class="tr">
                        <el-button type="primary" @click=""> {{list}}</el-button>
                    </td>
    
                </tr>
            </table>
        </div>
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">学籍信息</thead>
                <tr>
                    <td class='tr'>学籍状态：</td>
                    <td>
                        在读
                    </td>
                    <td>毕业资格：</td>
                    <td>有效</td>
                    <td>当前纪律分：</td>
                    <td>98分</td>
                </tr>
            </table>
        </div>
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">学籍记录</thead>
                <tr>
                    <td class='tr'>
                        <el-popover ref="addxueji" placement="left" v-model="visible3">
                            <tr class="addxueji">
                                <td class='choClass'>添加事件：</td>
                                <td>
                                    <el-select v-model="stuEventList.stuEventName" placeholder="请选择" @change="get_stuEvent">
                                        <el-option :label="key" :value="key" v-for="(val,key) in stuEventName" :key="val"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.ruxue">
                                <td class="choClass">说明：</td>
                                <td>
                                    <el-input type="textarea" v-model="stuEventList.instructions"></el-input>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.jilv">
                                <td class="choClass">说明：</td>
                                <td>
                                    <el-select v-model="stuEventList.jilv" placeholder="请选择">
                                        <el-option label="-1" value="-1"></el-option>
                                        <el-option label="-2" value="-2"></el-option>
                                        <el-option label="-5" value="-5"></el-option>
                                        <el-option label="-10" value="-10"></el-option>
                                    </el-select>
    
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写扣除纪律分的原因" v-model="stuEventList.instructions"></el-input>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.pangting">
                                <td class="choClass">说明：</td>
                                <td>
                                    <el-input type="textarea" v-model="stuEventList.pangtingInstructions"></el-input>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.xiuxue">
                                <td class="choClass">休学时段：</td>
                                <td>
                                    <el-form :inline="true" class="demo-form-inline" >
                                        <el-date-picker v-model="stuEventList.startTime" type="date" placeholder="选择日期" @change="creDate(stuEventList.startTime)">
                                        </el-date-picker>
                                        <label class="el-form-item__label">至</label>
                                        <el-date-picker v-model="stuEventList.endTime" type="date" placeholder="选择日期" @change="endDate(stuEventList.endTime)">
                                        </el-date-picker>
                                    </el-form>
                                    <!--<el-date-picker v-model="stuEventList.startTime" type="daterange" placeholder="选择日期范围">
                                        </el-date-picker>-->
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写休学原因" v-model="stuEventList.instructions"></el-input>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.fuxue" >
                                <td class="choClass">复学时间：</td>
                                <td>
                                    <el-date-picker  v-model="stuEventList.fuxueTime" type="date" placeholder="选择日期" @change="fuxueTime(stuEventList.fuxueTime)">
                                    </el-date-picker>
                                </td>
                            </tr>
    
                            <tr class="addxueji" v-show="stuEvent.fuxue">
                                <td class="choClass">选择班级：</td>
                                <td>
                                    <el-select v-model="stuEventList.fuxueClass"  placeholder="请选择">
                                        <el-option v-for="(val,key) in myClassList" :key="key" :label="val" :value="val">
                                        </el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写复学原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.liuji">
                                <td class="choClass">选择班级：</td>
                                <td>
                                   <el-select v-model="stuEventList.liuji"  placeholder="请选择">
                                        <el-option v-for="(val,key) in myClassList" :key="key" :label="val" :value="val">
                                        </el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写留级原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.biye">
                                <td class="choClass">就业方式：</td>
                                <td>
                                    <el-select v-model="stuEventList.biye" placeholder="请选择">
                                        <el-option :label="key" :value="key" v-for="(val,key) in stuEventName" :key="val"></el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写所选就业方式的原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.jieye">
                                <td class="choClass">结业原因：</td>
                                <td>
                                    <el-select v-model="stuEventList.jieye" placeholder="请选择">
                                        <el-option :label="key" :value="key" v-for="(val,key) in stuEventName" :key="val"></el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写结业的详细原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.chongdu">
                                <td class="choClass">选择班级：</td>
                                <td>
                                    <el-select v-model="stuEventList.chongdu" placeholder="请选择">
                                        <el-option :label="key" :value="key" v-for="(val,key) in stuEventName" :key="val"></el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写重读的详细原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.tuixue">
                                <td class="choClass">退学原因：</td>
                                <td>
                                    <el-select v-model="stuEventList.tuixue" placeholder="请选择">
                                        <el-option :label="key" :value="key" v-for="(val,key) in stuEventName" :key="val"></el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写退学的详细原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.zigeFail">
                                <td class="choClass">说明：</td>
                                <td>
                                    <el-input type="textarea" placeholder="" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <div style="text-align: center; margin: 0">
                                <el-button class="btn-q" type="primary" size="small" @click='addStuEvent()'>确定</el-button>
    
                                <el-button class='btn-w' type="text" size="small" @click="visible3 = false">取消</el-button>
                            </div>
                        </el-popover>
                        <el-button class="btn" type="primary" v-popover:addxueji @click="">添加事件</el-button>
                    </td>
    
                </tr>
                <tr v-for="(newEvent,keyTime) in newStuEvent">
                    <td class="tr">{{keyTime}}</td>
                    <td v-for="item in newEvent">{{item}}</td>
                </tr>
            </table>
        </div>
        <div class="sub">
            <el-button class="btn-q" type="primary" size="large" @click='addXueJi'>确定</el-button>
    
            <el-button class='btn-w' type="primary" size="large" @click="back">取消</el-button>
        </div>
    
    </div>
</template>
<script>
import qs from "qs"
import { normalTime } from "../filters"
export default {
    data() {
        return {
            formInline: {
                school: '',
                professional: '',
                stuName: '',
                stuIDCard: '',
                stuSex: '',
                stuQualification: '',
                stuSelfSchoolName: '',
                stuPhone: '',
                product: '',
                className: '',
                stuEventName: ''

            },

            stuEvent: {
                ruxue: false,
                jilv: false,
                pangting: false,
                xiuxue: false,
                fuxue: false,
                liuji: false,
                biye: false,
                jieye: false,
                chongdu: false,
                tuixue: false,
                zigeFail: false
            },
            stuEventList: {
                stuEventName: null,
                jilv: null,
                xiuxue: null,
                startTime: null,
                endTime: null,
                fuxueTime: null,
                fuxueClass:null,
                liuji:null,
                biye: null,
                jieye: null,
                chongdu: null,
                tuixue: null,
                instructions: null
                // ruxueInstructions:null,
                // jilvInstructions:null,
                // xiuxueInstructions:null,
                // pangtingInstructions:null,
                // fuxuIinstructions:null,
                // liujiInstructions:null,
                // biyeInstructions:null,
                // jieyeInstructions:null,
                // chongduInstructions:null,
                // tuixueInstructions:null,
                // zigeFailInstructions:null
            },
            newStuEvent: {

            },
            classState: {
                "等待开课": "W",
                "开课": "S",
                "结课": "E",
                "失效": "N"
            },
            stuSex: {
                "男": 'M',
                "女": 'F'
            },
            stuQualification: {
                "硕士及以上": "A",
                "本科": "B",
                "专科": "C"
            },
            stuEventName: {
                "入学进班": 1,
                "扣除纪律分": 2,
                "旁听": 3,
                "休学": 4,
                "复学": 5,
                "留级": 6,
                "毕业": 7,
                "结业": 8,
                "重读": 9,
                "退学": 10,
                "毕业资格无效": 11
            },
            schoolList: '',
            professionList: '',
            schoolCode: '',
            professionCode: '',
            productList: '',
            productCode: '',
            visible2: false,
            visible3: false,
            teacherList: '',
            classList: [],
            myClassList: {}

        }
    },
    created() {
        this.getSchoolList()
        this.getAllProfession()
        this.getTeacherList()
        this.getAllProduct()
        this.getpmList()
        this.getAllCourse()
    },
    filters: {
        normalTime
    },
    methods: {
        //获取所有学校
        getSchoolList() {
            this.$http.get("/api/yzh/research/inter/getAllSchool?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
                this.schoolList = res.data.schoolList;
            }).catch(err => console.log(err))
        },
        //获取所有专业
        getAllProfession() {
            this.$http.get("/api/yzh/research/inter/getAllProfession?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
                this.professionList = res.data.professionList
            })
        },
        //查询教师
        getTeacherList() {
            this.$http.get("/api/yzh/research/inter/getTeacherList?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&roleName=teacherJGRole").then(res => {
                this.teacherList = res.data.teacherList;
            })
        },
        //查询项目经理
        getpmList() {
            this.$http.get("/api/yzh/research/inter/getTeacherList?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&roleName=teacherXMRole").then(res => {
                this.pmList = res.data.teacherList;
            })
        },
        getAllProduct() {
            this.$http.get("/api/yzh/research/inter/getAllProduct?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
                this.productList = res.data.productList;
                this.productCode = res.data.productList[0].productCode
            }).catch(err => console.log(err))

        },
        //获取所有班级
        getAllClass() {
            this.$http.get("/api/yzh/research/inter/getAllClass?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
                this.classList = res.data.classList
            })
        },
        addClassList() {
            this.$set(this.myClassList, new Date().toLocaleString(), this.formInline.className)
            this.visible2 = false;
        },
        creDate(time) {
            if (time) {
                let d = new Date(time);
                this.stuEventList.startTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            }else{
                 this.stuEventList.startTime=null;
            }
        },
        endDate(time) {
            if (time) {
                let d = new Date(time);
                this.stuEventList.endTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            }else{
                 this.stuEventList.endTime=null;
            }
        },
        fuxueTime(time){
             if (time) {
                let d = new Date(time);
                this.stuEventList.fuxueTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            }else{
                this.stuEventList.fuxueTime=null;
            }

        },
        get_stuEvent() {

            let stuEv = this.stuEventName[this.stuEventList.stuEventName];
            for (let list of Object.keys(this.stuEvent)) {
                this.stuEvent[list] = false;
            }
            for (let key of Object.keys(this.stuEventList)) {
                if (key !== "stuEventName") {
                    this.stuEventList[key] = null;
                }
            }
            console.log(this.stuEventList)
            switch (stuEv) {
                case 1:
                    this.stuEvent.ruxue = true;
                    break
                case 2:
                    this.stuEvent.jilv = true;
                    break
                case 3:
                    this.stuEvent.pangting = true;
                    break
                case 4:
                    this.stuEvent.xiuxue = true;
                    break
                case 5:
                    this.stuEvent.fuxue = true;
                    break
                case 6:
                    this.stuEvent.liuji = true;
                    break
                case 7:
                    this.stuEvent.biye = true;
                    break
                case 8:
                    this.stuEvent.jieye = true;
                    break
                case 9:
                    this.stuEvent.chongdu = true;
                    break
                case 10:
                    this.stuEvent.tuixue = true;
                    break
                case 11:
                    this.stuEvent.zigeFail = true;
                    break
            }
        },
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        get_productCode(c) {
            this.productCode = c;
        },
        get_teacherOne(d) {
            this.teacherCode = d;
        },
        get_teacherTwo(e) {
            this.pmCode = e;
        },
        getAllCourse() {
            this.$http.get("/api/yzh/research/inter/getAllCourse?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
                this.courseList = res.data.courseList
            })
        },
        addStuEvent() {
            // console.log(this.stuEventList)
            let time = new Date().toLocaleString();
            this.$set(this.newStuEvent, time, this.stuEventList)
            let stuEventList = []

            for (let stuEvent of Object.keys(this.newStuEvent[time])) {
                if (this.newStuEvent[time][stuEvent] === null || this.newStuEvent[time][stuEvent] === undefined ||this.newStuEvent[time][stuEvent]==="") {
                    delete this.newStuEvent[time][stuEvent]
                } else {
                    console.log(this.newStuEvent[time])
                    stuEventList.push(this.newStuEvent[time][stuEvent])
                }
            }
            console.log(stuEventList)
            this.$set(this.newStuEvent, time, stuEventList)
            this.visible3 = false;
        },
        addXueJi() {
            this.$http.post("/api/yzh/research/inter/addStuManagement", qs.stringify({
                userid: sessionStorage.getItem("keyId"),
                accesstoken: sessionStorage.getItem("keyToken"),
                stuName: this.formInline.stuName,
                stuIDCard: this.formInline.stuIDCard,
                stuSex: '',
                stuQualification: '',
                stuSelfSchoolName: '',
                stuSelfProfessionName: '',
                stuPhone: '',
                stuMail: '',
                classId: this.formInline.className,
                eventListStr: this.classState[this.formInline.status],
                stuEventName: this.productCode,
                schoolCode: this.schoolCode,
                professionCode: this.professionCode,
                stuEvent1Intro: ""
            })).then(res => {
                console.log(res)
                if (res.data.addClassFlag === "success") {
                    this.$alert('班级添加成功', '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        back() {
            this.$router.go(-1)
        }


    }

}

</script>
<style lang="less">
.baseNews {
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 28px;
    color: #111;
    .base-head {
        font-size: 18px;
        color: #44aee0;
    }

    tr {
        height: 61px;
        td {
            padding-right: 10px;
        }

        input {
            width: 245px;
            height: 34px;
            border-radius: inherit;
        }
    }

    .tr {
        text-align: right;
        width: 160px;
    }
    .text-ddd {
        color: #BCBCBC;
    }
}

.base-news {
    margin: 34px;
    width: 908px;
    border-bottom: 1px solid #ddd;
}

.sub {
    text-align: center;
    .btn-w {
        background-color: #ffffff;
        width: 120px;
        height: 40px;
        border: 1px solid #0591ce;
        color: #008dce;
        border-radius: 20px;
    }
    .btn-q {
        background-color: #0591ce;
        width: 120px;
        height: 40px;
        color: #ffffff;
        border-radius: 20px;
    }
}

.addxueji {
    margin: 20px auto;
    display: block; // width: 253px;
    .choClass {
        width: 80px;
        font-size: 16px;
        text-align: right;
    }
    .instructions {
        display: block;
        resize: vertical;
        padding: 5px 7px;
        line-height: 1.5;
        width: 100%;
        color: #1f2d3d;
        background-color: #fff;
        background-image: none;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        font-size: 14px;
        box-sizing: border-box;
    }
}
</style>