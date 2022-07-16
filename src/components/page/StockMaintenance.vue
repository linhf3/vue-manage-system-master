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
        <el-input v-model="code" placeholder="股票代码" class="handle-input mr10" style="width: 160px;"></el-input>
        <el-button type="success" @click = "addOne">新增</el-button>
        <el-input v-model="vars" placeholder="代码/名称/是否有效(模糊查询)" class="handle-input mr10" style="width: 220px;"></el-input>
        <el-button type="success" @click = "query">查询</el-button>
      </div>
      <el-table
          :data="list"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header">
        <el-table-column label="序号(排序用)">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="代码">
            <template slot-scope="scope">{{scope.row.stockCode}}</template>
        </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">{{scope.row.swEffective}}</template>
        </el-table-column>
        <el-table-column label="下偏离(负数)">
          <template slot-scope="scope">{{scope.row.downwardDeviation}}</template>
        </el-table-column>
        <el-table-column label="上偏离(正数)">
          <template slot-scope="scope">{{scope.row.deviation}}</template>
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="showEditDialog(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteCode(scope.row.stockCode)" type="text" size="small">
              <p  v-if="scope.row.category==1">删除</p>
              </el-button>
          </template>
        </el-table-column>
      </el-table>


      <div>
        <el-dialog title="代码修改" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="序号">
              <el-input v-model="stock.id"></el-input>
            </el-form-item>
            <el-form-item label="代码">
              <el-input v-model="stock.stockCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="是否有效">
              <el-radio-group v-model="stock.swEffective">
                <el-radio label="有效"></el-radio>
                <el-radio label="无效"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="下偏离">
              <el-input-number v-model="stock.downwardDeviation" controls-position="right" :min="-100" :max="0"></el-input-number>
            </el-form-item>
            <el-form-item label="上偏离">
              <el-input-number v-model="stock.deviation" controls-position="right" :min="0" :max="100"></el-input-number>
            </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
  name: 'stockMaintenance',
  data() {
    return {
      list: [],
      vars:'',
      editVisible: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      code:'',
      dialogVisible:false,
      row:'',
      stock:{
        id:0,
        name:'',
        stockCode:'',
        category:'',
        swEffective:'',
        memo:'',
        exchangeCode:'',
        downwardDeviation:0,
        deviation:0
      },
      form: {
        code:''
      }



    };
  },
  created() {
    this.getData();
  },
  methods: {
    refreshDate() { // 从服务端加载数据的函数
      this.getData();
    },
    addOne(){
      if ('' == this.code){
          alert("请输入代码！")
      }
      this.$http.get('/godwealth/api/stock/insert/'+this.code).then((response)=> {
        if (response.data.status != 200){
          alert("新增失败");
        }
        this.code ='';
        this.getData();
      })
    },
    deleteCode(num){
      debugger
      this.$http.get('/godwealth/api/stock/delete/'+num).then((response)=> {
        debugger
        if (response.data.status != 200){
          alert("删除失败");
        }
        this.getData();
      })
    },
    getData() { // 从服务端加载数据的函数
      debugger
      var a = '' == this.vars?'#':this.vars;
      debugger
      this.$http.get('/godwealth/api/stock/querySockCodeList/'+('' == this.vars?'LLLL':this.vars)).then((response)=> {
        debugger
        if (response.data.status != 200){
          alert(response.data.response.data.message);
          this.$options.methods.stopInterval()
        }
        this.list =  response.data.resultMap.resultList;
        console.log("返回结果集：",this.list);
      })
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    async showEditDialog(row) {
      this.dialogVisible = true
      this.stock =row;
    },
    query() {
      this.getData();
    },
    submit() {
      this.dialogVisible = false;
      debugger
      this.$http.post('/godwealth/api/stock/updateStockCode',this.stock).then((response)=> {
        debugger
        if (response.data.status != 200){
          alert(response.data.response.data.message);
          this.$options.methods.stopInterval()
        }
        this.getData();
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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