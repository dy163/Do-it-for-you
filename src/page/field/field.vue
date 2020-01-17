<template>
<!-- 领域管理 -->
  <div style="width:100%">
       <el-button class="head">
            <RouterLink to="/field_add" tag="div" class="div">领域新增</RouterLink>
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
          label="ID"
          >
            <template slot-scope="scope">
              <div 
              @click="details(scope.row.id)"
                style="cursor:pointer;"
                >
                  {{scope.row.id}}
                </div>
              </template>
          </el-table-column>

          <el-table-column
          align="center"
          prop="name"
          label="领域"
          width="200"
          >
          </el-table-column>

          <el-table-column
          label="操作"
          align="center"
            width="300"
          >  
          <template slot-scope="scope">
              <el-button  @click="examine(scope.row.id,scope.row.name)">修改</el-button>
              <el-button  @click="del(scope.row.id)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
        <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[ 8, 10, 20, 50]"
      :page-size="8"
      layout="total, sizes, prev, pager, next, jumper"
      :total="+totals" class="paging">
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
            this.pagesize = size;
            let data={
                  page:this.currentPage,
                  size:size,
                }
            this.$axios
                  .post(process.env.HOST+`master/field/getpage`,data)
                  .then(res => {  
                      this.list=res.data.list
                    console.log(res)
                })  
          },
    handleCurrentChange: function(currentPage){
              console.log(currentPage)
            this.currentPage = currentPage;
              let data={
                    page:currentPage,
                    size:this.pagesize,
              }
            this.$axios
                  .post(process.env.HOST+`master/field/getpage`,data)
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
            }
            this.$axios
                  .post(process.env.HOST+`master/field/getpage`,data)
                  .then(res => {  
                      this.totals=res.data.total
                      this.list=res.data.list
                                console.log(res)
                   })
     },
//多选
	 handleSelectionChange(val) {
            this.multipleSelection=[];
          for(var i=0;i<val.length;i++){
              this.multipleSelection.push(val[i].id);
          }
              console.log(this.multipleSelection )
      },
   val(){
          this.value2=false
          console.log(this.value2)
      },
//删除
   del(id){
       console.log(id)
      axios
        .get(process.env.HOST+`master/field/del?id=`+id)
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
        //  this.$router.push({
        //     path:'/postss_details',
        //     query: {id: id }
        //  });
      },
     //修改
     examine(id,name){
         console.log(id)
         this.$router.push({
            path:'/field_modify',
            query: {id: id,name:name }
         });
     },
     
},
 created(){
       this.handleUserList();
    },
}
</script>

<style scoped>
.head{
    background-color:#009688;
    margin: 10px;
    height: 50px;
    color: aliceblue
}
.butt{
    width: 50px;
}
.search{
  margin-left: 10%;
  width: 30%;
  display: flex;
  margin-top: 20px
}
.but{
  height: 40px;
}
.paning{
    margin-left: 50%;
    transform: translate(-30%,0);
    margin-top: 100px
}
.paging{
    text-align: center;
    margin-top: 100px
}
</style>
