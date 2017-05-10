<template>
    <div>
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">基本信息</thead>
                <tr>
                    <td class='tr'>选择学校：</td>
                    <td>青岛动漫基地校区</td>
                </tr>
                <tr>
                    <td class='tr'>选择专业：</td>
                    <td>移动互联产品研发</td>
                </tr>
                <tr>
                    <td class='tr'>学员编号：</td>
                    <td>QD012016100001</td>
                </tr>
                <tr>
                    <td class='tr'>姓名：</td>
                    <td>张豆豆</td>
                </tr>
                <tr>
                    <td class='tr'>身份证：</td>
                    <td>6107291987****5275</td>
                </tr>
                <tr>
                    <td class='tr'>性别：</td>
                    <td>男</td>
                </tr>
                <tr>
                    <td class='tr'>学历：</td>
                    <td>本科</td>
                </tr>
                <tr>
                    <td class='tr'>学校：</td>
                    <td>北京邮电大学</td>
                </tr>
                <tr>
                    <td class='tr'>专业：</td>
                    <td>物理</td>
                </tr>
                <tr>
                    <td class='tr'>手机：</td>
                    <td>13800138000</td>
                </tr>
                <tr>
                    <td class='tr'>邮箱：</td>
                    <td>13800138000@qq.com</td>
                </tr>
            </table>
        </div>
    <div class='base-news'>
        <table class='baseNews'>
            <thead class="base-head">班级信息</thead>
            <tr>
                <td class='tr'>选择学校：</td>
                <td>青岛动漫基地校区</td>
            </tr>
            <tr>
                <td class='tr'>选择专业：</td>
                <td>移动互联产品研发</td>
            </tr>
            <tr>
                <td class='tr'>学员编号：</td>
                <td>QD012016100001</td>
            </tr>
            <tr>
                <td class='tr'>姓名：</td>
                <td>张豆豆</td>
            </tr>
            <tr>
                <td class='tr'>身份证：</td>
                <td>6107291987****5275</td>
            </tr>
            <tr>
                <td class='tr'>性别：</td>
                <td>男</td>
            </tr>
            <tr>
                <td class='tr'>学历：</td>
                <td>本科</td>
            </tr>
            <tr>
                <td class='tr'>学校：</td>
                <td>北京邮电大学</td>
            </tr>
            <tr>
                <td class='tr'>专业：</td>
                <td>物理</td>
            </tr>
            <tr>
                <td class='tr'>手机：</td>
                <td>13800138000</td>
            </tr>
            <tr>
                <td class='tr'>邮箱：</td>
                <td>13800138000@qq.com</td>
            </tr>
        </table>
    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData6: [{
                id: '12987122',
                name: '王小虎',
                amount1: '234',
                amount2: '3.2',
                amount3: 10
            }, {
                id: '12987123',
                name: '王小虎',
                amount1: '165',
                amount2: '4.43',
                amount3: 12
            }, {
                id: '12987124',
                name: '王小虎',
                amount1: '324',
                amount2: '1.9',
                amount3: 9
            }, {
                id: '12987125',
                name: '王小虎',
                amount1: '621',
                amount2: '2.2',
                amount3: 17
            }, {
                id: '12987126',
                name: '王小虎',
                amount1: '539',
                amount2: '4.1',
                amount3: 15
            }]
        }
    }
}

</script>
<style lang='less' scoped>
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
    .tl {
        text-align: left;
    }
    .tr {
        text-align: right;
        width: 160px;
    }
}

.base-news {
    margin: 34px;
    width: 908px;
    border-bottom: 1px solid #ddd;
}
</style>