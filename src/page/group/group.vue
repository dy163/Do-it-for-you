<template>
<!-- 用户列表 -->
  <div>
       <el-button class="head">
            <RouterLink to="/group_add" tag="div" >权限组新增</RouterLink>
       </el-button>
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
         align="center"
         width="100">
         </el-table-column>
         <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="130px">
         </el-table-column>

         <el-table-column
         prop="title"
         label="名称"
         >
            <template slot-scope="scope">
            <div 
            @click="details(scope.row)"
               style="cursor:pointer;"
               >
               {{scope.row.title}}
            </div>
            </template>
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
         
         <el-table-column
         label="操作"
         align="center"
            width="300"
         >  
         <template slot-scope="scope">
               <el-button  @click="edit(scope.row)">修改</el-button>
               <el-button  @click="del(scope.row.id)">删除</el-button>
               <el-button  @click="add(scope.row.id)">授权</el-button>
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
          list:[]
      }
  },
  methods: {
      show() {
        this.$axios
          .post(process.env.HOST+`master/admin/group/list`)
          .then(res => {  
              this.list=res.data;
              console.log(res)
          })
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
     details(row){
         console.log(row)
         this.$router.push({
            path:'/group_details',
            query: {row: row }
         });
      }, 
//修改
      edit(row){
         console.log(row)
         this.$router.push({
            path:'/group_edit',
            query: {row: row }
         });
      }, 
//授权
      add(id){
         console.log(id)
         this.$router.push({
            path:'/group_grant',
            query: {id: id }
         });
      },
//删除
     del(id){
         console.log(id)
       axios
         .get(process.env.HOST+`master/delete?uid=`+id)
         .then(res => {
            console.log(res);
            if(res.data.result){
               this.$message({
                  message: res.data.msg,
                  type: 'success'
               }); 
            }else{
               this.$message.error(res.data.msg);
            }         
           this.show()
         })
         .catch(error => {
               console.log(error);
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
.head{
    background-color:#009688;
    margin: 10px;
    height: 50px;
    color: aliceblue
}
</style>
