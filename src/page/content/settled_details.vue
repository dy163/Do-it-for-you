<template>
<!-- 入驻详情 -->
  <div style="width:100%">
      <el-button type="success" class="delete"  @click="back()">返回列表</el-button>
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
        prop="title"
        label="帖子标题"
        >
            <template slot-scope="scope">
              <div 
              @click="details(scope.row.id)"
                style="cursor:pointer;"                  
              >{{scope.row.title}}</div>
                </template>
        </el-table-column>

        <el-table-column
        align="center"
        prop="username"
        label="作者"
        width="200"
        >
        </el-table-column>
        <el-table-column
        prop="field"
        align="center"
        label="栏目"
        width="200"
        >
        </el-table-column>
      <el-table-column
        prop="tname"
        align="center"
        label="所属地区"
        width="200"
        >
        </el-table-column>
        <el-table-column
        align="center"
        prop="time"
        label="更新时间"
        width="200"
        >
        </el-table-column>
        <el-table-column
        align="center"
        label="状态"
        width="200"
        >

        <template slot-scope="scope" >
          <div v-if="scope.row.audit==0">未审核</div>
          <div v-else-if="scope.row.audit==1">审核通过</div>
          <div v-else-if="scope.row.audit==2">审核不通过</div>
          </template>

        </el-table-column>
        <el-table-column
        label="操作"
        align="center"
          width="300"
        >  
        <template slot-scope="scope">
            <el-button  @click="examine(scope.row.id)">审核</el-button>
            <el-button  @click="del(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
        <!-- 分页 -->
         <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"         
                 layout="total,  prev, pager, next, jumper"
                :total="+totals" class="paging"
                >    
           </el-pagination>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  data(){
    return {
          value2: false,
          currentPage:1, //初始页
          pagesize:8,    //    每页的数据
          list:[],
          totals:"",
          multipleSelection: [],
        } 
  },
  methods: {
    handleSizeChange: function (size) {
              console.log(size)
             let data={
                  page:size,
                  size:this.pagesize,
                uid:this.$route.query.id
              }
            this.$axios
                  .post(process.env.HOST+`master/forum/findmy`,data)
                  .then(res => {  
                      this.list=res.data.list
                    console.log(res)
                  })    
    },
    handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
                  console.log(currentPage)
             let data={
                    page:currentPage,
                    size:this.pagesize,
                    uid:this.$route.query.id
              }
            this.$axios
                  .post(process.env.HOST+`master/forum/findmy`,data)
                  .then(res => {  
                      this.list=res.data.list
                      console.log(res)
                  })
    },
//展示分页  
    handleUserList() {
       let data={
              page:this.currentPage,
              size:this.pagesize,
              uid:this.$route.query.id
        }
            this.$axios
                  .post(process.env.HOST+`master/forum/findmy`,data)
                  .then(res => {  
                      this.totals=res.data.total
                      this.list=res.data.list
                  console.log(res)
                 })
                     
     },
	 handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      val(){
           this.value2=false
            console.log(this.value2)
      },
     //删除
     del(id){
       console.log(id)
      let ids=[id]
       axios
        .post(process.env.HOST+`master/forum/delete`,ids)
        .then(res => {
             console.log(res);
                this.$message({
                  message: res.data.msg,
                  type: 'success'
              });          
            this.handleUserList()
        })
        .catch(error => {
          this.$message.error(res.data.msg);
             console.log(error);
        });
     },
     //详情
     details(id){
         console.log(id)
         this.$router.push({
            path:'/postss_details',
            query: {id: id }
         });
          },
     //审核
     examine(id){
         console.log(id)
         this.$router.push({
            path:'/postss_examine',
            query: {id: id }
         });
     },
     //返回列表
     back(){
       this.$router.push({
            path:'/settled', 
         });
     }
},
    created(){
       this.handleUserList();
}
}
</script>

<style scoped>
.delete{
    background-color:#009688;
    margin: 10px;
}
.butt{
    width: 50px;
}
.paning{
    margin-left: 50%;
    transform: translate(-30%,0);
    margin-top: 100px
}
.paging{
    position: absolute;
    left: 45%;
    top: 800px
    /* margin-left: 200px */
}
</style>
