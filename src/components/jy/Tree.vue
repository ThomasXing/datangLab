<template>
    <div id="tree">
        <el-tree :data="data2" :props="defaultProps" node-key="id" default-expand-all @node-click="nodeClick">
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
            EventTarget: '',
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

        remove(store, data) {
            store.remove(data);
        },
        nodeClick(node) {
            console.log(node.$treeNodeId,this.$parent)
            // let obj = {
            //     id: id++,
            //     label: rootNode,
            //     children: []
            // }
            // this.$parent.appendChild(obj)

        },
        newDirectory() {

        },
        renderContent(h, { node, data, store }) {
            console.log(h, { node, data, store })
            //     return (
            //         `<span>
            //             <span>
            //                 <span>${node.label}</span>
            //             </span>
            //             <span style="float: right; margin-right: 20px">
            //                 <el-button size="mini" @click={() => this.append(store, data)}>Append</el-button>
            //                 <el-button size="mini" @click={() => this.remove(store, data)}>Delete</el-button>
            //             </span>
            //         </span>`);
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

