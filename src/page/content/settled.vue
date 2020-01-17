<template>
<!-- 入驻 -->
  <div style="width:100%">
    <br>
    <el-form ref="form" :model="form" class="search">
  <el-input v-model="form.name" style="width:40%" placeholder="请输入搜索姓名"></el-input>&nbsp;&nbsp;&nbsp;
  <el-form-item style="width:30%">
    <el-select v-model="form.region" placeholder="请选择审核状态">
      <el-option label="未审核" value="1"></el-option>
      <el-option label="审核通过" value="2"></el-option>
      <el-option label="审核不通过" value="3"></el-option>
    </el-select>
  </el-form-item>&nbsp;&nbsp;&nbsp;
  <el-button class="but" @click="search()">搜索</el-button>
  </el-form>
        <el-table
            :data="list"
             ref="multipleTable"
            tooltip-effect="dark"
            border
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            style="width: 100%">
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="100px">
          </el-table-column>
        <el-table-column
            align="center"
            label="运营者名称">
                <template slot-scope="scope">
              <div
                @click="details(scope.row.uid)"
                style="cursor:pointer;"                   
                >{{scope.row.name}}</div>
                </template>
            </el-table-column>
       <el-table-column
            prop="document_number"
            align="center"
            label="运营者证件号码">
            </el-table-column>
       <el-table-column
            prop="phone"
            align="center"
            label="运营者手机号">
            </el-table-column>
       <el-table-column
            prop="account_title"
            align="center"
            label="媒体账户名称">
            </el-table-column>
       <el-table-column
            prop="account_introduction"
            align="center"
            label="媒体账户介绍">
            </el-table-column>
        <el-table-column
            align="center"
            label="主体类型">

            <template slot-scope="scope" >
              <div v-if="scope.row.subject_type==1">个人</div>
              <div v-else-if="scope.row.subject_type==2">媒体</div>
              <div v-else-if="scope.row.subject_type==3">群媒体</div>
              <div v-else-if="scope.row.subject_type==4">企业</div>
              <div v-else-if="scope.row.subject_type==5">机构</div>
              <div v-else-if="scope.row.subject_type==6">其他组织</div>
              <div v-else-if="scope.row.subject_type==7">政府</div>
              </template>

            </el-table-column>
        <el-table-column
            prop="field"
            align="center"
            label="栏目">
            </el-table-column>
        <el-table-column
            prop="time"
            align="center"
            label="入驻时间">
            </el-table-column>
        <el-table-column
            label="审核状态"
            align="center"            
            >

            <template slot-scope="scope" >
               <div v-if="scope.row.status==1">审核</div>
               <div v-else-if="scope.row.status==2">通过</div>
               <div v-else-if="scope.row.status==3">不通过</div>
              </template>

            </el-table-column>
         <el-table-column
            align="center"              
            label="操作">
              <template slot-scope="scope">
                <el-button size="medium" @click="modify(scope.row.id)">审核</el-button>
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
        userList: [],
        form: {
            name: '',
            region: '',
        },
        loading:false
    } 
  },
  methods: {
         handleSizeChange: function (size) {
                  console.log(size)
                this.pagesize = size;
         axios({
              url: process.env.HOST+`master/settled/getpage`,
              method: 'post',
              data: {
                  page:this.currentPage,
                  size:size,
              },
              transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
          .then(res => {
                    console.log(res);
                    this.list=res.data.list
                })
          .catch(error => {
                    console.log(error);
                });            
        },
        handleCurrentChange: function(currentPage){
                  console.log(currentPage)
                this.currentPage = currentPage;
         axios({
              url: process.env.HOST+`master/settled/getpage`,
              method: 'post',
              data: {
                  page:currentPage,
                  size:this.pagesize,
              },
              transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
          .then(res => {
                    console.log(res);
                    this.list=res.data.list
                })
          .catch(error => {
                    console.log(error);
                });
        },     
         //展示分页
        handleUserList() {
        axios({
              url: process.env.HOST+`master/settled/getpage`,
              method: 'post',
              data: {
                  page:this.currentPage,
                  size:this.pagesize,
              },
              transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
        .then(res => {
                  console.log(res);
                  this.totals=res.data.total
                  this.list=res.data.list
              })
        .catch(error => {
                  console.log(error);
              });
          },
	 handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      val(){
           this.value2=false
            console.log(this.value2)
      },
           //个人帖子详情
     details(id){
         console.log(id)
         this.$router.push({
            path:'/settled_details',
            query: {id: id }
         });
       },
       //搜索
    search(){
       this.loading=true;
       let data={
              name:this.form.name,
              status:this.form.region
        }
       this.$axios
           .post(process.env.HOST+`master/settled/getByKey`,data)
           .then(res => {  
                this.loading=false;
                console.log(res)
                if(res.data.result){
                   this.list=res.data.pojo
                }else{
                    this.$message.error(res.data.msg); 
                }
             })
       },
      //修改
      modify(id){
         console.log(id)
         this.$router.push({
            path:'/settled_examine',
            query: {id: id }
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
.search{
  margin-left: 10%;
  width: 30%;
  display: flex
}
.paning{
    margin-left: 50%;
    transform: translate(-30%,0);
    margin-top: 100px
}
.paging{
    text-align: center;
    margin-top: 50px
}
.but{
  height: 40px;
}
</style>
