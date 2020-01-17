<template>
<!-- 用户详情 -->
  <div style="width:100%">
  <el-button @click="ret" class="head">返回列表</el-button>
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
        label="用户ID"
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
  data(){
    return {
        id:"",
        list:[]
      }
  },
  methods: {
      show(){
         this.id=this.$route.query.uid;
        axios
          .get(process.env.HOST+`master/get?uid=`+this.id)
          .then(res => {
              console.log(res);
              this.list=[res.data]
          })
          .catch(error => {
              console.log(error);
          });
      },
//返回
      ret(){
         this.$router.push({
            path:'/user',
         });
      },
  }, 
   created(){
        this.show()
    }
 }
</script>

<style scoped>
.head{
    background-color:#009688;
    margin: 10px;
    height: 50px;
    color: aliceblue
}

</style>
