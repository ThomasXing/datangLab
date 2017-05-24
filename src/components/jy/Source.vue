

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
                <el-button class="btn" type="primary" @click="">编辑</el-button>
            </div>
        </div>
        <div class="source-tree" id="tree">
            <el-tree :data="data" :props="defaultProps" node-key="id" ref="tree" default-expand-all @mouseup="handle(data,obj)" @node-click="handleNodeClick" :expand-on-click-node="false" :render-content="renderContent">
            </el-tree>
           
        </div>
         <div id="treemenu" v-show="menuShow">
                <ul class="treemenu">
                    <li @click='newDirectory'>新建目录</li>
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
    </div>
</template>
<script>
import qs from 'qs'
let id = 1000;
let vm = this;
const jy_url = "http://www.369college.com/369education"
export default {
    data() {
        return {
            menuShow: false,
            RootVisible: false,
            EventTarget: '',
            data: [

            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
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
            // function openNewContextMenu(ev) {
            //     ev = ev || window.event;
            //     var btn = ev.button;
            //     if (btn == 2) {
            //         treemenu.style.left = ev.clientX + "px";
            //         treemenu.style.top = ev.clientY + "px";
            //         vm.menuShow = true;
            //     }
            // }
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
                    }
                    this.EventTarget = ev.target;
                }
            })
            bindEvent(document, 'click', closeNewContextMenu)
            bindEvent(tree, 'click', closeNewContextMenu)
            bindEvent(treemenu, 'contextmenu', closeContextMenu)
        })

    },
    methods: {
        sureIcre() {
            // this.$http.post(jy_url + "/yzh/education/inter/addPXCatalog", qs.stringify({
            //     userid: sessionStorage.getItem("keyId"),
            //     accesstoken: sessionStorage.getItem("keyToken"),
            //     catalogName: "javascript",
            // })).then(res => {
            //     if (res.data.addCatalogFlag === "success") {
            //         console.log()

            //     }

            // })
            let rootNode = document.getElementById("rootNode").getElementsByTagName('input')[0].value;
            let tree_node = document.querySelectorAll('.el-tree-node');
            let obj = {
                id: id++,
                label: rootNode,
                children: []
            }
            if (rootNode !== "") {
                this.data.push(obj)
            }
            this.RootVisible = false;
        },
        newDirectory() {
            console.log(1)
            this.$emit("node-click")
        },
        delDirectory() {

        },
        rename() {

        },
        handle(data,obj){
            console.log(data)
        },
        handleNodeClick(data, node, obj) {
            console.log(data, node, obj);
        },
        append(store, data) {
            store.append({ id: id++, label: 'testtest', children: [] }, data);
        },
        renderContent: function (createElement, { node, data, store }) {
            var self = this;
            return createElement('span', [
                createElement('span', node.label),
                createElement('span', {
                    attrs: {
                        style: "float: right; margin-right: 20px"
                    }
                }, [
                        createElement('el-button', {
                            attrs: {
                                size: "mini"
                            }, on: {
                                click: function () {
                                    console.info("点击了节点" + data.id + "的添加按钮");

                                    store.append({ id:id++, label: 'testtest', children: [] }, data);
                                }
                            }
                        }, "添加"),
                        createElement('el-button', {
                            attrs: {
                                size: "mini"
                            }, on: {
                                click: function () {
                                    console.info("点击了节点" + data.id + "的删除按钮");
                                    store.remove(data);
                                }
                            }
                        }, "删除"),
                    ]),
            ]);
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
        .el-tree {
            border: none;
            background-color: #f6f6f6
        }
        width: 20%;
        padding-left: 14px;
        background-color: #f6f6f6;
        #contextmenu {
            width: 180px;
            height: 240px;
            background-color: #f2f2f2;
            position: absolute;
            border: 1px solid #BFBFBF;
            box-shadow: 2px 2px 3px #aaaaaa;
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
