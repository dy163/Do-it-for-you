<template>
<!-- 用户登录 -->
  <div>
       <el-table
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
          <el-table-column
          type="selection"
          align="center"
          width="100">
          </el-table-column>
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="130px">
        </el-table-column>

          <el-table-column
          prop="title"
          label="用户名称"
          >
              <template slot-scope="scope">
                <div 
                  style="cursor:pointer;"
                  >
                    {{scope.row.username}}
                  </div>
                </template>
          </el-table-column>

          <el-table-column
          align="center"
          prop="create_time"
          label="创建时间"
          width="200"
          >
          </el-table-column>
            <el-table-column
          align="center"
          prop="groupname"
          label="权限名称"
          width="200"
          >
          </el-table-column>
          <el-table-column
          align="center"
          prop="group_id"
          label="权限ID"
          width="200"
          >
          </el-table-column>
          <el-table-column
          prop="last_login_ip"
          align="center"
          label="IP"
          width="200"
          >
          </el-table-column>
        <el-table-column
          prop="last_login_time"
          align="center"
          label="最后登录时间"
          width="200"
          >
          </el-table-column>
          <el-table-column
          align="center"
          label="状态"
          width="200"
          >
          <template slot-scope="scope" >
            <div v-if="scope.row.status==0">禁用</div>
            <div v-else-if="scope.row.status==1">启用</div>
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
        this.$axios
          .post(process.env.HOST+`master/connect`)
          .then(res => {  
              var id=res.data.msg
              console.log(res)
              if(res.data.result){
                  this.$axios
                    .get(process.env.HOST+`master/get?uid=`+id)
                    .then(res => {
                        console.log(res);
                        this.list=[res.data]
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }else{
                  this.$message("请重新登录");
                }   
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
