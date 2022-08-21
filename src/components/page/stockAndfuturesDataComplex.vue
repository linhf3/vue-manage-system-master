<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
          <!--      第一部分-->
          <div class="box1">
            <div class="handle-box">
              <el-input v-model="stockMillisecond" placeholder="时间(秒)" class="handle-input mr10" style="width: 160px;"></el-input>
              <el-button type="success" @click = "refreshStockDate">开始</el-button>
              <el-button type="danger" @click = "stopStockInterval">停止</el-button>
            </div>
            <el-table
                :data="stockList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header">
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.name}}</div>
                  <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.name}}</div>
                  <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="数值">
                <template slot-scope="scope">
                  <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.price}}</div>
                  <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.price}}</div>
                  <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.price}}</div>
                </template>
              </el-table-column>
              <el-table-column label="五日">
                <template slot-scope="scope">
                <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.proportion}}</div>
                <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.proportion}}</div>
                <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.proportion}}</div>
                </template>
              </el-table-column>
<!--              <el-table-column label="五日偏离">-->
<!--                <template slot-scope="scope">{{scope.row.fProportion}}</template>-->
<!--              </el-table-column>-->


            </el-table>
          </div>



<!--      第二部分-->
          <div class="box2">
              <div class="handle-box">
                <el-input v-model="futuresMillisecond" placeholder="时间(秒)" class="handle-input mr10" style="width: 160px;"></el-input>
                <el-button type="success" @click = "refreshFuturesDate">开始</el-button>
                <!--                <el-button type="success" id = "speak" @click = "speak">语音</el-button>-->
                <el-button type="danger" @click = "stopFuturesInterval">停止</el-button>
                <el-button type="success" @click = "startWarning">播放</el-button>
                <el-button type="danger" @click = "stopWarning">停播</el-button>
              </div>
              <el-table
                  :data="futuresList"
                  border
                  class="table"
                  ref="multipleTable"
                  header-cell-class-name="table-header">
                <el-table-column label="名称">
                  <template slot-scope="scope">
                    <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.name}}</div>
                    <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.name}}</div>
                    <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.name}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="数值">
                  <template slot-scope="scope">
                  <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.price}}</div>
                  <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.price}}</div>
                  <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.price}}</div>
                </template>
                </el-table-column>
                <el-table-column label="一差">
                  <template slot-scope="scope">
                    <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.proportion}}</div>
                    <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.proportion}}</div>
                    <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.proportion}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="五差">
                  <template slot-scope="scope">
                  <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.fProportion}}</div>
                  <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.fProportion}}</div>
                  <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.fProportion}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="一均">
                  <template slot-scope="scope">
                    <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.dailySpread}}</div>
                    <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.dailySpread}}</div>
                    <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.dailySpread}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="五均">
                  <template slot-scope="scope">
                    <div v-if="scope.row.positiveNegativeFlag == -1" style="color:red;font-weight:bold;">{{scope.row.fiveDailySpread}}</div>
                    <div v-if="scope.row.positiveNegativeFlag == 0" >{{scope.row.fiveDailySpread}}</div>
                    <div v-if="scope.row.positiveNegativeFlag == 1" style="color:green;font-weight:bold;">{{scope.row.fiveDailySpread}}</div>
                  </template>
                </el-table-column>



              </el-table>
            </div>
    </div>




</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'stockAndfuturesDataComplex',
    data() {
        return {
          stockList: [],
          futuresList: [],
            editVisible: false,
            dynamicTags: [],
            inputVisible: false,
          stockMillisecond:5,
          futuresMillisecond:3,
          warningFlag: false  //期货预警开启标识，默认不开启


        };
    },
    created() {
        //this.getData();
    },
    methods: {
      refreshStockDate() { // 从服务端加载数据的函数
        if(this.stockList.length <= 0){
          this.getStockData();
        }
        // 实现轮询
        this.clearTimeSet1 = setInterval(()=>{this.getStockData(),this.time}, this.stockMillisecond*1000);
      },
      refreshFuturesDate() { // 从服务端加载数据的函数
            if(this.futuresList.length <= 0){
                this.getFuturesData();
            }
            // 实现轮询
            this.clearTimeSet2 = setInterval(()=>{this.getFuturesData(),this.time}, this.futuresMillisecond*1000);
        },
      stopStockInterval(){
        clearInterval(this.clearTimeSet1);
      },
      stopFuturesInterval(){
            clearInterval(this.clearTimeSet2);
        },
      startWarning(){
        this.warningFlag = true;
      },
      stopWarning(){
        this.warningFlag = false;
      },
      getStockData() { // 从服务端加载数据的函数
        this.$http.get('/godwealth/api/stock/stockData/').then((response)=> {
          if (response.data.status != 200){
            alert(response.data.response.data.message);
            this.$options.methods.stopInterval()
          }

          this.stockList =  response.data.resultMap.resultList;
          debugger
          //alert(list);
          // if(this.list.length <=0){
          //     this.$options.methods.stopInterval()
          // }
          //debugger
          // var utterThis = new SpeechSynthesisUtterance("你好");
          // utterThis .rate = 0.8
          // this.synth = window.speechSynthesis;
          // this.synth.speak(utterThis);
          console.log("返回结果集：",this.stockList);
        })
      },
        getFuturesData() { // 从服务端加载数据的函数
            this.$http.get('/godwealth/api/futures/futuresData/').then((response)=> {
              if (response.data.status != 200){
                alert(response.data.response.data.message);
                this.$options.methods.stopInterval()
              }

              this.futuresList =  response.data.resultMap.resultList;

              var i;
              if(this.warningFlag){
                for (i=0; i<this.futuresList.length; i++) {
                  if(this.futuresList[i].positiveNegativeFlag == 1 || this.futuresList[i].positiveNegativeFlag == 1){
                    var utterThis = new SpeechSynthesisUtterance("hello");
                    utterThis .rate = 1.0
                    this.synth = window.speechSynthesis;
                    this.synth.speak(utterThis);
                    break;
                  }
                }
              }
                console.log("返回结果集：",this.futuresList);
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
.box1 {width:50%; float:left; display:inline;}
.box2 {width:50%; float:right; display:inline;}

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
