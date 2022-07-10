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
                <el-input v-model="millisecond" placeholder="时间(秒)" class="handle-input mr10" style="width: 160px;"></el-input>
                <el-button type="success" @click = "refreshDate">开始</el-button>
<!--                <el-button type="success" id = "speak" @click = "speak">语音</el-button>-->
                <el-button type="danger" @click = "stopInterval">停止</el-button>
            </div>
            <el-table
                :data="list"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header">
                <el-table-column label="设计模式">
                    <template slot-scope="scope">设计模式</template>
                </el-table-column>
              <el-table-column label="人数">
                <template slot-scope="scope">{{scope.row.price}}</template>
              </el-table-column>
                <el-table-column label="使用率(1)">
                    <template slot-scope="scope">{{scope.row.proportion}}</template>
                </el-table-column>
              <el-table-column label="使用率(5)">
                <template slot-scope="scope">{{scope.row.fProportion}}</template>
              </el-table-column>


            </el-table>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'futuresData',
    data() {
        return {
            list: [],
            editVisible: false,
            dynamicTags: [],
            inputVisible: false,
            millisecond:5


        };
    },
    created() {
        //this.getData();
    },
    methods: {
        refreshDate() { // 从服务端加载数据的函数
            if(this.list.length <= 0){
                this.getData();
            }
            // 实现轮询
            this.clearTimeSet = setInterval(()=>{this.getData(),this.time}, this.millisecond*1000);
        },
        stopInterval(){
            clearInterval(this.clearTimeSet);
        },
        getData() { // 从服务端加载数据的函数
            this.$http.get('/godwealth/api/futures/futuresData/').then((response)=> {
              if (response.data.status != 200){
                alert(response.data.response.data.message);
                this.$options.methods.stopInterval()
              }

              this.list =  response.data.data;
                //alert(list);
                // if(this.list.length <=0){
                //     this.$options.methods.stopInterval()
                // }
                 //debugger
              // var utterThis = new SpeechSynthesisUtterance("你好");
              // utterThis .rate = 0.8
              // this.synth = window.speechSynthesis;
              // this.synth.speak(utterThis);
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
