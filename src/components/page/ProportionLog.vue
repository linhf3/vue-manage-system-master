<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="proportionLog.code" placeholder="代码" class="handle-input mr10" style="width: 80px;"></el-input>
                <el-input v-model="proportionLog.name" placeholder="名称" class="handle-input mr10" style="width: 90px;"></el-input>
                <el-date-picker value-format="yyyy-MM-dd" v-model="proportionLog.addDate" type="date" placeholder="选择日期" style="width: 130px;"></el-date-picker>
                <el-button type="success" @click = "refreshDate">查询</el-button>
            </div>
            <el-table
                :data="list"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header">
              <el-table-column label="代码">
                <template slot-scope="scope">{{scope.row.code}}</template>
              </el-table-column>
                <el-table-column label="名称">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="偏离">
                    <template slot-scope="scope">{{scope.row.proportion}}</template>
                </el-table-column>
                <el-table-column label="价格">
                    <template slot-scope="scope">{{scope.row.price}}</template>
                </el-table-column>
              <el-table-column label="日期">
                <template slot-scope="scope">{{scope.row.addDate}}</template>
              </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'proportionlog',
    data() {
        return {
            list: [],
            editVisible: false,
            dynamicTags: [],
            inputVisible: false,
            millisecond:5,
            proportionLog:{code:"",name:"",addDate:""}


        };
    },
    created() {
        //this.getData();
    },
    methods: {
        refreshDate() { // 从服务端加载数据的函数
          console.log(this.proportionLog.code);
          console.log(this.proportionLog.name);
          console.log(this.proportionLog.addDate);
            if(this.list.length <= 0){
                this.getData();
            }
            this.getData();
            // 实现轮询
            //this.clearTimeSet = setInterval(()=>{this.getData(),this.time}, this.millisecond*1000);
        },
        stopInterval(){
            clearInterval(this.clearTimeSet);
        },
        getData() { // 从服务端加载数据的函数
          this.$http.post('/godwealth/api/proportionLog/getStockDeviationLogs',this.proportionLog).then((response)=> {
            if (response.data.status != 200){
              alert(response.data.response.data.message);
              this.$options.methods.stopInterval()
            }
            this.list =  response.data.data;
            console.log("返回结果集：",this.list);
          })
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
