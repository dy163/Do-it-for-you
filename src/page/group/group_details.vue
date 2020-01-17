<template>
<!-- 权限组详情 -->
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
                {{scope.row.title}}
            </div>
          </template>
        </el-table-column>

        <el-table-column
        align="center"
        prop="id"
        label="ID"
        width="300"
        >
        </el-table-column>

        <el-table-column
        align="center"
        label="状态"
        width="248"
        >
        <template slot-scope="scope" >
          <div v-if="scope.row.status==0">禁用</div>
          <div v-else-if="scope.row.status==1">启用</div>
          </template>
        </el-table-column>
    </el-table>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>已授权组数</span>
        </div>
        <div v-for="(lists,key) in lists" :key="key" class="text item">
          {{lists}}
        </div>
      </el-card>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  data(){
    return {
        id:"",
        list:[],
        lists:[]
      }
  },
  methods: {
      show(){
          this.id=this.$route.query.row.id;
          axios
            .post(process.env.HOST+`master/admin/group/get?id=`+this.id)
            .then(res => {
                console.log(res);
                this.list=[this.$route.query.row];
                this.lists=res.data.pojo;               
            })
            .catch(error => {
                console.log(error);
            });
      },
      //返回
      ret(){
         this.$router.push({
            path:'/group',
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
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    height: 600px;
    overflow: auto;
    position: absolute;
    left: 250px;
    top: 250px
  }
</style>
