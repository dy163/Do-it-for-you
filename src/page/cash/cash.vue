<template>
<!-- 提现列表 -->
  <div>
       <el-table
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
          <el-table-column
          type="selection"
          width="50">
          </el-table-column>
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="100px">
        </el-table-column>

          <el-table-column
          prop="orderNo"
          label="订单号"
          >
            <template slot-scope="scope">
              <div 
              @click="details(scope.row.id)"
              style="cursor:pointer;"
              >
                {{scope.row.orderNo}}
              </div>
            </template>
          </el-table-column>

          <el-table-column
          align="center"
          prop="realName"
          label="真实姓名"
          width="200"
          >
          </el-table-column>
          <el-table-column
          prop="identity"
          align="center"
          label="转账账号"
          width="200"
          >
          </el-table-column>
        <el-table-column
          prop="addTime"
          align="center"
          label="申请转账时间"
          width="200"
          >
          </el-table-column>
        <el-table-column
          prop="amount"
          align="center"
          label="申请转账金额"
          width="200"
          >
          </el-table-column>

          <el-table-column
          align="center"
          label="审核状态"
          width="200"
          >
          <template slot-scope="scope" >
            <div v-if="scope.row.audit==2">审核不通过</div>
            <div v-else-if="scope.row.audit==1">审核通过</div>
            <div v-else-if="scope.row.audit==0">未审核</div>
            <div v-else-if="scope.row.audit==3">已转账</div>
            </template>

          </el-table-column>
          <el-table-column
          label="操作"
          align="center"
            width="300"
          >  
          <template slot-scope="scope">
              <el-button @click="examine(scope.row)">审核</el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
    import axios from "axios";
export default {
  data () {
    return {
      list:[],
    }
  },
  methods: {
    show() {
          this.$axios//`http://192.168.3.160:8080/bbs_war/master/transfer/getList`
          .post(process.env.HOST+`master/transfer/getList`)
          .then(res => {  
              if(res.data.result){
                this.list=res.data.pojo
                console.log(res)
              }else{
                  this.$message("请重新登录");
              }
          }) 
          .catch(error => {
                console.log(error);
           });
    },
        //多选
	 handleSelectionChange(val) {
     this.multipleSelection=[];
     for(var i=0;i<val.length;i++){
         this.multipleSelection.push(val[i].id);
     }
        console.log(this.multipleSelection)
      },
      val(){
           this.value2=false
            console.log(this.value2)
      },
           //详情
  details(id){
         console.log(id)
      },
            //审核
  examine(row){
         //console.log(row)
         this.$router.push({
            path:'/cash_examine',
            query: {row: row }
         });
      },
  },
    created(){
       this.show();
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
