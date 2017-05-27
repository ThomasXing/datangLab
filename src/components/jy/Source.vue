

<template>
    <div id="source" class="clearfix">
        <div class="source-head clearfix">
            <div class="source-head-incre">
                <el-button class="btn" type="primary" @click="RootVisible = true">新增课程</el-button>
            </div>
            <div class="source-head-title">
                任务
            </div>
            <div class="source-head-editor">
                <el-button class="btn" type="primary" @click="IcredialogFormVisible=true">编辑</el-button>
            </div>
        </div>
        <div class="source-tree" id="tree">
            <div class="filter" v-show="showDire">
                <el-input type="text" placeholder="请输入内容" @keyup.native="newName($event)" v-show="showDire" @blur="newName($event)" id="direNewName"></el-input>
            </div>
            <div class="filter" v-show="renameShow">
                <el-input placeholder="请输入内容" @keyup.native="renameV($event)" @blur="renameV($event)" v-show="renameShow" id="rename"></el-input>
            </div>
            <el-tree :data="data" :props="defaultProps" node-key="catalogId" ref="tree" highlight-current default-expand-all @node-click="handleNodeClick" :expand-on-click-node="false" :render-content="renderContent">
            </el-tree>
    
        </div>
        <div id="treemenu" v-show="menuShow">
            <ul class="treemenu">
                <li @click='newDirectory' v-show="newDire">新建目录</li>
                <li @click='createSource' v-show="creShow">创建资源</li>
                <li @click='delDirectory'>删除课程</li>
                <li @click='rename'>重命名</li>
            </ul>
        </div>
        <el-dialog title="提示" :visible.sync="RootVisible" size="tiny">
            <el-input id="rootNode" placeholder="请输入内容" autofocus value=""></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="RootVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="sureIcre">确 定</el-button>
            </span>
        </el-dialog>
        <div class="source-con">
            <table cellspacing="10px">
                <tr class="source-con-row">
                    <td class="source-con-row-t">任务名称：</td>
                    <td>大唐官网</td>
                </tr>
                <tr class="source-con-row">
                    <td>任务说明：</td>
                    <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse aut eius quidem reprehenderit obcaecati blanditiis dicta quam perferendis natus eligendi vitae quis libero nesciunt nostrum tenetur, dolorum accusantium impedit hic?</td>
                </tr>
                <tr class="source-con-row">
                    <td>测评内容：</td>
                    <td>大唐官网</td>
                </tr>
                <tr class="source-con-row">
                    <td>测评标准：</td>
                    <td>大唐官网</td>
                </tr>
            </table>
            <div class="source-con-file">
                <div class="item">
                    <img src="" alt="" width="220" height="140">
                    <h3>大唐网络解说视屏</h3>
                </div>
                <div class="item">
                    <img src="" alt="" width="220" height="140">
                    <h3>大唐网络解说视屏</h3>
                </div>
                <div class="item">
                    <img src="" alt="" width="220" height="140">
                    <h3>大唐网络解说视屏</h3>
                </div>
                <div class="item">
                    <img src="" alt="" width="220" height="140">
                    <h3>大唐网络解说视屏</h3>
                </div>
            </div>
        </div>
        <el-dialog title="任务" :visible.sync="IcredialogFormVisible">
            <el-form :model="icreTask" label-width="80px">
                <el-form-item label="任务名称">
                    <el-input v-model="icreTask.taskName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务说明">
                    <el-input type="textarea" :rows="5" placeholder="最多输入1000个汉字" v-model="icreTask.taskIntro"></el-input>
                </el-form-item>
                <el-form-item label="测评内容">
                    <el-input type="textarea" :rows="6" placeholder="最多输入1000个汉字" v-model="icreTask.testContent"></el-input>
                </el-form-item>
                <el-form-item label="测评标准">
                    <el-input type="textarea" :rows="6" placeholder="最多输入1000个汉字" v-model="icreTask.testStandard"></el-input>
                </el-form-item>
                <el-form-item label="上传文件">
                    <el-upload class="upload-demo" drag action="/api/369education/yzh/education/inter/uploadFile" multiple name="" :data="upload" accept="" :on-preview="handlePreview" :on-remove="handleRemove">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="IcredialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="icreTaskSource">确 定</el-button>
            </div>
        </el-dialog>
    
    </div>
</template>
<script>
import qs from 'qs'
// import { mapActions } from 'vuex'
let vm = this;
const jy_url = "http://www.369college.com/369education"
export default {
    data() {
        return {
            menuShow: false,
            RootVisible: false,
            IcredialogFormVisible: false,
            creShow: true,
            newDire: true,
            showDire: false,
            renameShow: false,
            data: [

            ],
            defaultProps: {
                children: 'catalogList',
                label: 'catalogName'
            },
            icreTask: {
                taskName: '',
                taskIntro: '',
                testContent: '',
                testStandard: ''
            },
            upload: {
                title: '',

            },
            treeObj: {
                data: {},
                node: '',
                obj: ''
            },


        }
    },
    created() {
        this.getAllCatalog()
    },
    mounted() {

        this.$nextTick(() => {
            let vm = this;
            let tree = document.getElementById("tree");
            let treemenu = document.getElementById('treemenu')
            tree.oncontextmenu = function () {
                return false;
            }
            function bindEvent(elem, eventType, callback) {
                var ieType = ["on" + eventType];
                if (ieType in elem) {
                    elem[ieType] = callback;
                } else if ("attachEvent" in elem) {
                    elem.attachEvent(ieType, callback);
                } else {
                    elem.addEventListener(eventType, callback, false);
                }
            }
            function closeContextMenu() {
                return false;
            }
            function closeNewContextMenu(ev) {
                if (ev.target !== treemenu) {
                    vm.menuShow = false;
                }
            }
            bindEvent(tree, 'mouseup', function (ev) {
                if (ev.target !== tree) {
                    ev = ev || window.event;
                    var btn = ev.button;
                    if (btn == 2) {
                        treemenu.style.left = ev.clientX + "px";
                        treemenu.style.top = ev.clientY + "px";
                        vm.menuShow = true;
                        vm.nodeTarget = ev.target;
                        ev.target.click()

                    }
                }
            })
            bindEvent(document, 'click', closeNewContextMenu)
            bindEvent(treemenu, 'click', closeNewContextMenu)
            bindEvent(treemenu, 'contextmenu', closeContextMenu);
            
        })

    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file.response);
        },
        // ...mapActions(['SureIcre']),
        getAllCatalog() {
            this.$http.get(jy_url + "/yzh/education/inter/getAllCatalog?userid=" + sessionStorage.getItem("jykeyId") + "&accesstoken=" + sessionStorage.getItem("jykeyToken")).then(res => {
                this.data = res.data.catalogList;
            })
        },
        sureIcre() {
            let rootNode = document.getElementById("rootNode").getElementsByTagName('input')[0].value;
            if (rootNode !== "") {
                this.$http.post(jy_url + "/yzh/education/inter/addPXCatalog", qs.stringify({
                    userid: sessionStorage.getItem("jykeyId"),
                    accesstoken: sessionStorage.getItem("jykeyToken"),
                    catalogName: rootNode,
                })).then(res => {
                    if (res.data.addCatalogFlag === "success") {
                        let obj = {
                            id: '',
                            label: rootNode,
                            children: []
                        }
                        this.data.push(obj)
                        this.getAllCatalog()
                    }
                })

            }
            this.RootVisible = false;
        },
        newDirectory() {

            let direNewName = document.getElementById('direNewName')
            let currentNode = document.getElementsByClassName('is-current')[0];
            let direInput = document.getElementById('direNewName').getElementsByTagName('input')[0];
            setTimeout(function(){
                direInput.focus();
            }, 10);
            currentNode.appendChild(direNewName)
            this.showDire = true;
            
        },
        newName(ev) {
            let direInput = document.getElementById('direNewName').getElementsByTagName('input')[0].value;
            if (ev.keyCode === 13||ev.type==="blur") {
                if (direInput !== "") {
                    let nodeData = { catalogId: '', catalogName: direInput, catalogList: [] };
                    this.$http.post(jy_url + "/yzh/education/inter/addPXCatalog", qs.stringify({
                        userid: sessionStorage.getItem("jykeyId"),
                        accesstoken: sessionStorage.getItem("jykeyToken"),
                        catalogName: direInput,
                        catalogPid: this.treeObj.data.catalogId
                    })).then(res => {
                        if (res.data.addCatalogFlag === "success") {
                            this.$refs.tree.store.append(nodeData, this.treeObj.data);
                            this.getAllCatalog();
                        }
                    })
                }
                this.showDire = false;
              
            }
        },
        delDirectory() {
            this.$http.post(jy_url + "/yzh/education/inter/deletePXCatalog", qs.stringify({
                userid: sessionStorage.getItem("jykeyId"),
                accesstoken: sessionStorage.getItem("jykeyToken"),
                catalogId: this.treeObj.data.catalogId,
            })).then(res => {
                if (res.data.deleteCatalogFlag === "success") {
                    this.$refs.tree.store.remove(this.treeObj.data)
                    this.getAllCatalog()
                }
            })
        },
      
        rename() {
            let rename = document.getElementById('rename')
            let currentNode = document.getElementsByClassName('is-current')[0];
            let renameVal = rename.getElementsByTagName('input')[0];
            renameVal.value = this.treeObj.node.label;
             setTimeout(function() {
                renameVal.focus();
                renameVal.select();
            }, 10);
            this.preappend(rename, currentNode);
 
            this.renameShow = true;
        },
        preappend(node, scope) {
            if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
                scope.insertBefore(node, scope.firstChild);
            }

        },
        renameV(ev) {
            let renameVal = document.getElementById('rename').getElementsByTagName('input')[0].value;
            if (ev.keyCode === 13||ev.type==="blur") {
                if (renameVal !== "") {
                    this.$http.post(jy_url + "/yzh/education/inter/updatePXCatalogName", qs.stringify({
                        userid: sessionStorage.getItem("jykeyId"),
                        accesstoken: sessionStorage.getItem("jykeyToken"),
                        catalogName: renameVal,
                        catalogId: this.treeObj.data.catalogId
                    })).then(res => {
                        if (res.data.updateCatalogFlag === "success") {
                            this.getAllCatalog();
                        }
                    })
                }
                this.renameShow = false;
               
            }
        },
        createSource() {
            this.IcredialogFormVisible = true;
        },
        icreTaskSource() {
            this.$http.post("/api/369education/yzh/eudcation/inter/addTask", qs.stringify({
                userid: sessionStorage.getItem("jykeyId"),
                accesstoken: sessionStorage.getItem("jykeyToken"),
                catalogId: this.treeObj.data.catalogId,
                taskName: this.icreTask.taskName,
                taskIntro: this.icreTask.taskIntro,
                testContent: this.icreTask.testContent,
                testStandard: this.icreTask.testStandard,
                taskFileStr: '',
            })).then(res => {
                if (res.data.updateCatalogFlag === "success") {
                    this.getAllCatalog();
                }
            })
        },
        handleNodeClick(data, node, obj) {
            this.treeObj.data = data;
            this.treeObj.node = node;
            this.treeObj.obj = obj;
            if (this.treeObj.node.level > 3) {
                this.creShow = false;
                this.newDire = false;
            } else {
                this.creShow = true;
                this.newDire = true;
            }
        },
        renderContent: function (createElement, { node, data, store }) {
            var self = this;
            return createElement('el-tooltip', {
                attrs: {
                    effect: "dark",
                    content: node.label,
                    placement: "bottom-end"
                }
            }, [
                    createElement('span', node.label)
                ])
        }

    }

};
</script>
<style lang='less' scoped>
#source {
    .source-head {
        height: 74px;
        float: left;
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        &-incre {
            width: 20%;
            padding: 17px 0 17px 14px;
            background-color: #f6f6f6;
            border-bottom: 1px solid #e8e8e8;
            float: left;
        }
        &-title {
            float: left;
            font-size: 18px;
            color: #44aee0;
            padding-left: 25px;
            line-height: 74px;
        }
        &-editor {
            float: right;
            margin-right: 91px;
            margin-top: 17px;
        }
    }
    .source-tree {
        float: left;
        min-height: 761px;
        height: inherit;
        position: relative;
        .el-tree {
            border: none;
            background-color: #f6f6f6;
        //    .el-tree-node.el-tree-node__content {
        //         text-overflow: ellipsis;
        //         overflow: hidden;
        //         white-space: nowrap;
        //     }
        }
        
        width: 20%;
        padding-left: 14px;
        background-color: #f6f6f6;
        #rename {
            position: absolute;
            z-index: 9999;
        }
        .filter {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0; // z-index: 1000;
            background-color: rgba(209, 219, 229, .5);
            #direNewName {
                position: relative;
                z-index: 9999;
            }
        }
    }
    #treemenu {
        width: 144px;
        line-height: 34px;
        background-color: #ffffff;
        position: absolute;
        border: 1px solid #8ecde7;
        box-shadow: 2px 2px 3px #aaaaaa;
        z-index: 1000;
    }

    #treemenu li {
        height: 34px;
        padding-left: 15px;
        cursor: pointer;
    }
    #treemenu li:hover {
        background-color: #edf7ff;
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
