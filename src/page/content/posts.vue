<template>
<!-- 未审核帖子 -->
  <div style="width:100%">
    <div style="display:flex">
            <el-form ref="form" :model="form" class="search">
          <el-form-item style="width:30%">
            <el-select v-model="form.region" placeholder="请选择审核状态">
              <el-option label="未审核" value="0"></el-option>
              <!-- <el-option label="审核通过" value="1"></el-option> -->
              <el-option label="审核不通过" value="2"></el-option>
              <!-- <el-option label="强制下线" value="4"></el-option> -->
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;
          <el-button class="but" @click="search()">搜索</el-button>
       </el-form>
       </div>
       <div v-if="show">
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         审核情况：
         帖子提交数：<span class="sp">{{lists.submit}}</span> 篇
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         待审核帖子：<span class="sp">{{lists.await}}</span> 篇
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         审核通过：<span class="sp">{{lists.pass}}</span> 篇
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         审核驳回：<span class="sp">{{lists.reject}}</span> 篇
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         删除：<span class="sp">{{lists.delet}}</span> 篇
       </div>
       <br>
    <el-table
        ref="multipleTable"
        :data="list"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
      <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="100px">
      </el-table-column>

        <el-table-column
        prop="title"
        label="帖子标题"
        >
        <template slot-scope="scope">
          <div >
              {{scope.row.title}}
            </div>
            </template>
        </el-table-column>

        <el-table-column
        align="center"
        prop="username"
        width="120px"
        label="作者"
        >
        </el-table-column>

        <el-table-column
        prop="field"
        align="center"
        width="120px"
        label="栏目"
        >
        </el-table-column>
      <el-table-column
        prop="tname"
        align="center"
        width="120px"
        label="所属地区"
        >
        </el-table-column>

        <el-table-column
        align="center"
        prop="time"
        width="100px"
        label="提交时间"
        >
        </el-table-column>
          <el-table-column
        align="center"
        prop="add_time"
        width="120px"
        label="更新时间"
        >
        </el-table-column>
        <el-table-column
        align="center"
        width="150px"
        label="状态"
        >

        <template slot-scope="scope" >
          <div v-if="scope.row.audit==0">未审核</div>
          <div v-else-if="scope.row.audit==1">审核通过</div>
          <div v-else-if="scope.row.audit==2">审核不通过</div>
          <div v-else-if="scope.row.audit==3">强制下线</div>
          </template>

        </el-table-column>
        <el-table-column
        label="操作"
        align="center"
        width="200"
        >  
        <template slot-scope="scope">
          <div v-if="scope.row.audit==0">
            <el-button  @click="examine(scope.row.id)">审核</el-button>
            <el-button  @click="del(scope.row.id)">删除</el-button>
         </div>
          <div v-else-if="scope.row.audit==2">
            <el-button  @click="del(scope.row.id)">删除</el-button>
         </div>
            </template>
        </el-table-column>
    </el-table>
        <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[  8, 10, 20, 50]"
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
      show:false,
      currentPage:1, //初始页
      pagesize:8,    //    每页的数据
      list:[],
      lists:[],
      totals:"",
      multipleSelection: [],
      form: {
          region:"",
        },
      loading:false
    } 
  },
  methods: {
    handleSizeChange: function (size) {
          this.loading=true;
            //console.log(size)
          this.pagesize = size;
          let data={
            audit:0,
            page:this.currentPage,
            size:size,
            category:0
           }
            if(this.form.region==""){
              this.$axios
                .post(process.env.HOST+`master/forum/byList`,data)
                .then(res => {  
                  this.loading=false;
                  this.list=res.data.pojo.list;
                  //console.log(res)
                })  
        }else{
            let data={
                audit:0,
                page:this.currentPage,
                size:size,
              }
              //console.log(data)
          this.$axios
            .post(process.env.HOST+`master/forum/getByKey`,data)
            .then(res => {  
                this.loading=false;
                  //console.log(res)
                  if(res.data.result){
                      this.list=res.data.pojo.list;
                      this.totals=res.data.pojo.total;
                      //console.log(this.totals)
                  }else{
                      this.$message.error(res.data.msg); 
                  }
             })
        }
    },
    handleCurrentChange: function(currentPage){
            //console.log(currentPage)
                  this.loading=true;
          this.currentPage = currentPage;
            let data={
                  audit:0,
                  page:currentPage,
                  size:this.pagesize,
                  category:0
            }
      if(this.form.region==''){
           this.$axios
              .post(process.env.HOST+`master/forum/byList`,data)
              .then(res => {  
                  this.loading=false;
                   this.list=res.data.pojo.list;
                   //console.log(res)
                  
            })
      }else{
          let data={
                  audit:0,
                  page:currentPage,
                  size:this.pagesize,
            }
            //console.log(data)
        this.$axios
          .post(process.env.HOST+`master/forum/getByKey`,data)
          .then(res => {  
              this.loading=false;
                //console.log(res)
                if(res.data.result){
                    this.list=res.data.pojo.list;
                    this.totals=res.data.pojo.total;
                    //console.log(this.totals)
                }else{
                    this.$message.error(res.data.msg); 
                }
            })
        }
    },
//展示分页
   handleUserList() {
       this.loading=true;
       if(this.$route.query.page||this.$route.query.size){
            this.currentPage=this.$route.query.page;
            this.pagesize=this.$route.query.size;
       }
      let data={
              audit:0,
              page:this.currentPage,
              size:this.pagesize,
              category:0
            }
      this.$axios
          .post(process.env.HOST+`master/forum/byList`,data)//process.env.HOST+`master/forum/getByKey`
          .then(res => {  
                  this.loading=false;
                this.list=res.data.pojo.list;
                this.totals=res.data.pojo.total;
                  console.log(res)
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
          //console.log(this.multipleSelection )
        },
      val(){
          this.value2=false
          //console.log(this.value2)
      },
//删除
     del(id){
        this.$confirm('此操作将永久删除该帖, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.loading=true;
              //console.log(id)
            let ids=[id]
            axios
              .post(process.env.HOST+`master/forum/delete`,ids)//
              .then(res => {
            this.loading=false;
                  //console.log(res);
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
     //审核情况
     audit(){
        this.$axios
          .post(process.env.HOST+`master/audit/list`)//
          .then(res => {  
            console.log("213",res)
              this.lists=res.data.pojo;
              this.show=true
            })
     },
     //搜索
     search(){
       this.loading=true;
       let data={
              audit:this.form.region,
              page:this.currentPage,
              size:this.pagesize,
        }
        //console.log(data)
         this.$axios
           .post(process.env.HOST+`master/forum/getByKey1`,data)//
           .then(res => {  
               this.loading=false;
                console.log(res)
                if(res.data.result){
                    this.list=res.data.pojo.list;
                    this.totals=res.data.pojo.total;
                    //console.log(this.totals)
                }else{
                    this.$message.error(res.data.msg); 
                }
              })
       },
//审核详情
     examine(id){
        var page=this.currentPage;
         var size=this.pagesize ;
         console.log(page,size)
         this.$router.push({
            path:'/posts_details',
            query: {
              id: id,
              page:page,
              size:size
             }
         });
     },
     
},
    created(){
      this.handleUserList();
      this.audit();
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
  margin-left: 5%;
  width: 40%;
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
.sp{
  color: red;
}
</style>
