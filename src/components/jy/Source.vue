

<template>
    <div id="source" class="clearfix">
        <div class="source-head clearfix">
            <div class="source-head-incre">
                <el-button class="btn" type="primary" @click.native="incre">新增课程</el-button>
            </div>
            <div class="source-head-title">
                任务
            </div>
            <div class="source-head-editor">
                <el-button class="btn" type="primary" @click="">编辑</el-button>
            </div>
        </div>
        <div class="source-tree" id="tree">
            <el-tree :data="data" :props="defaultProps" node-key="id" ref="tree" default-expand-all @node-click="handleNodeClick" @mouseDown.self="titleMousedown(app,$event)">
            </el-tree>
            <div id="contextmenu" v-show="sourceMenu">
    
            </div>
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
let id = 1000;

export default {
    data() {
        return {
            sourceMenu: false,
            RootVisible: false,
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
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
            tree.oncontextmenu = function () {
                return false;
            }

            
            var menu = document.getElementById("contextmenu");
            let tree_node = document.querySelectorAll('.el-tree-node');
            for (let item of tree_node) {
                item.onmouseup = function () {
                    let that = this;
                    bindEvent(this, "contextmenu", closeContextMenu);
                    bindEvent(this, "mouseup", openNewContextMenu);
                    bindEvent(this, "mousedown", closeNewContextMenu);
                    bindEvent(menu, "mouseup", openNewContextMenu);
                }
            }
            //  bindEvent(document, "mousedown", closeNewContextMenu);
            tree.appendChild(menu);

            function closeContextMenu() {
                return false;
            }

            function openNewContextMenu(ev) {
                ev = ev || window.event;
                var btn = ev.button;
                if (btn == 2) {
                    menu.style.left = ev.clientX + "px";
                    menu.style.top = ev.clientY + "px";
                    vm.sourceMenu = true;
                }
            }

            function closeNewContextMenu(ev) {
                vm.sourceMenu = false;
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

        })
        
        //   this.contextMenu()
    },
    methods: {
        // contextMenu(){
        //       for(let item of this.data){
        //         bindEvent(item,'contextmenu',openNewContextMenu)
        //       }
        //        function bindEvent(elem, eventType, callback) {
        //         var ieType = ["on" + eventType];
        //         if (ieType in elem) {
        //             elem[ieType] = callback;
        //         } else if ("attachEvent" in elem) {
        //             elem.attachEvent(ieType, callback);
        //         } else {
        //             elem.addEventListener(eventType, callback, false);
        //         }
        //     }
        //      function openNewContextMenu(ev) {
        //         ev = ev || window.event;
        //         var btn = ev.button;
        //         if (btn == 2) {
        //             menu.style.left = ev.clientX + "px";
        //             menu.style.top = ev.clientY + "px";
        //             vm.sourceMenu = true;
        //         }
        //     }

        
        // },
        handleNodeClick(data, node, obj) {
            console.log(data, node, obj, this.$refs.tree);
        },
        titleMousedown(app, event) {
            // console.log(event)
        },
        append(store, data) {
            store.append({ id: id++, label: 'testtest', children: [] }, data);
        },
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
