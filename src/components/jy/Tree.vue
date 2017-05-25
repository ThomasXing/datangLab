<template>
    <div id="tree">
        <el-button class="btn" type="primary" @click="RootVisible = true">新增课程</el-button>
        <el-dialog title="提示" :visible.sync="RootVisible" size="tiny">
            <el-input id="rootNode" placeholder="请输入内容" autofocus value="" v-model="nodeVal"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="RootVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureIcre">确 定</el-button>
            </span>
        </el-dialog>
        <el-tree :data="data2" :props="defaultProps" node-key="id" default-expand-all @node-click="nodeClick" :render-content="renderContent">
        </el-tree>
        <div id="treemenu" v-show="menuShow">
            <ul class="treemenu">
                <li @click="newDirectory">新建目录</li>
                <li>删除课程</li>
                <li>重命名</li>
            </ul>
        </div>
    </div>
</template>


<script>
import TreeMenu from './treemenu'
let id = 1000;
export default {
    data() {

        return {
            menuShow: false,
            RootVisible:false,
            EventTarget: '',
            nodeVal:"",
            data2: [{
                id: 1,
                label: 'Level one 1',
                children: [{
                    id: 4,
                    label: 'Level two 1-1',
                    children: [{
                        id: 9,
                        label: 'Level three 1-1-1'
                    }, {
                        id: 10,
                        label: 'Level three 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: 'Level one 2',
                children: [{
                    id: 5,
                    label: 'Level two 2-1'
                }, {
                    id: 6,
                    label: 'Level two 2-2'
                }]
            }, {
                id: 3,
                label: 'Level one 3',
                children: [{
                    id: 7,
                    label: 'Level two 3-1'
                }, {
                    id: 8,
                    label: 'Level two 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            obj:{
                id:'',
                  children: [],
                label: ''
            }
        }
    },
    mounted() {
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
        // function openNewContextMenu(ev){
        //     ev = ev || window.event;
        //     var btn = ev.button;
        //     if (btn == 2) {
        //         treemenu.style.left = ev.clientX + "px";
        //         treemenu.style.top = ev.clientY + "px";
        //         vm.menuShow = true;
        //     }
        // }
        // function closeContextMenu() {
        //     return false;
        // }
        function closeNewContextMenu(ev) {
            vm.menuShow = false;
        }
        bindEvent(tree, 'mouseup', function (ev) {
            ev = ev || window.event;
            var btn = ev.button;
            if (btn == 2) {
                treemenu.style.left = ev.clientX + "px";
                treemenu.style.top = ev.clientY + "px";
                vm.menuShow = true;
            }
            this.EventTarget = ev.target;
            console.log(this.EventTarget)
        }.bind(this))
        bindEvent(document, 'mousedown', closeNewContextMenu)
    },
    props: [],

    methods: {

        // append(data) {
        //     this.$parent.append({ id: id++, label: 'testtest', children: [] }, data);
        // },
        sureIcre(){
            this.obj.label=this.nodeVal;
            this.data2.push(this.obj)
        },
        remove(store, data) {
            store.remove(data);
        },
        nodeClick(node) {
            console.log(this.data2)
            // let obj = {
            //     id: id++,
            //     label: rootNode,
            //     children: []
            // }
            // this.$parent.appendChild(obj)

        },
        newDirectory() {

        },
        append(store, data) {
            store.append({ id: id++, label: "nodeVal", children: [] }, data);
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
                                    self.append(store, data)
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
<style>
#treemenu {
    width: 180px;
    height: 240px;
    background-color: #f2f2f2;
    position: absolute;
    border: 1px solid #BFBFBF;
    box-shadow: 2px 2px 3px #aaaaaa;
    z-index: 1000;
}

.treemenu li {
    height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>

