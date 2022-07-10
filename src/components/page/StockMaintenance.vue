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
        <el-input v-model="code" placeholder="代码" class="handle-input mr10" style="width: 160px;"></el-input>
        <el-button type="success" @click = "addOne">新增</el-button>
      </div>
      <el-table
          :data="list"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header">
        <el-table-column label="名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="代码">
            <template slot-scope="scope">{{scope.row.stockCode}}</template>
<!--            <el-input v-model="scope.row.stockCode" @blur="onInputBlur(scope.row)"  placeholder="请输入内容">{{scope.row.stockCode}}</el-input>-->
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="showEditDialog(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteCode(scope.row.stockCode)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


      <div>
        <el-dialog title="代码修改" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="新代码">
              <el-input v-model="form.code"></el-input>
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
      editVisible: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      code:'',
      dialogVisible:false,
      row:'',
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
      this.$http.get('/godwealth/api/stock/querySockCodeList/').then((response)=> {
        if (response.data.status != 200){
          alert(response.data.response.data.message);
          this.$options.methods.stopInterval()
        }
        debugger
        this.list =  response.data.data;
        console.log("返回结果集：",this.list);
      })
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    async showEditDialog(row) {
      this.dialogVisible = true
      this.row =row;
    },
    submit() {
      this.dialogVisible = false;
      this.row.stockCode = this.form.code;
      this.$http.post('/godwealth/api/stock/updateStockCode',this.row).then((response)=> {
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