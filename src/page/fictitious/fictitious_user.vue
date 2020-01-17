<template>
<!-- 虚拟用户 -->
  <div style="width:100%">
      <el-table
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="130px">
        </el-table-column>

          <!-- <el-table-column
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
          </el-table-column> -->

          <el-table-column
          align="center"
          prop="name"
          label="用户名"
          >
          </el-table-column>

         <el-table-column
          align="center"
          prop="username"
          label="账号"
          >
          </el-table-column>

         <el-table-column
          align="center"
          prop="mobile"
          label="手机号"
          >
          </el-table-column>

         <el-table-column
          align="center"
          prop="regtime"
          label="注册时间"
          width="110"
          >
          </el-table-column>

         <el-table-column
          align="center"
          prop="last_login_time"
          label="最后登录时间"
          width="110"
          >
          </el-table-column>

          <el-table-column
          align="center"
          prop="last_login_time"
          label="是否微信登录"
          width="110"
          >
          <template slot-scope="scope" >
          <div v-if="scope.row.openid==null">否</div>
          <div v-else-if="scope.row.openid">微信登录</div>
          </template>
          </el-table-column>

          <el-table-column
          label="操作"
          align="center"
            width="200"
          >  
          <template slot-scope="scope">
              <el-button  @click="examine(scope.row)">修改</el-button>
              </template>
          </el-table-column>
      </el-table>
        <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[  8, 10, 20, 50]"
      :page-size="10"
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
          pagesize:10,    //    每页的数据
          list:[],
          totals:"",
        } 
  },
  methods: {
         handleSizeChange: function (size) {
                  console.log(size)
                this.pagesize = size;
         axios({
              url: process.env.HOST+`master/user/list`,
              method: 'post',
              data: {
                  page:this.currentPage,
                  size:size,
                  grades:1
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
                      this.list=res.data.pojo.list

                })
          .catch(error => {
                    console.log(error);
                });            
        },
        handleCurrentChange: function(currentPage){
                  console.log(currentPage)
                this.currentPage = currentPage;
         axios({
              url:process.env.HOST+`master/user/list`,
              method: 'post',
              data: {
                   grades:1,
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
                      this.list=res.data.pojo.list

                })
          .catch(error => {
                    console.log(error);
                });
        }, 
//展示分页
    handleUserList() {
         axios({
              url:process.env.HOST+`master/user/list`,
              method: 'post',
              data: {
                page:this.currentPage,
                size:this.pagesize,
                 grades:1
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
                      this.totals=res.data.pojo.total
                      this.list=res.data.pojo.list
                    console.log(res);

                })
          .catch(error => {
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
     examine(row){
         this.$router.push({
            path:'/fictitious_det',
            query: {row:row}
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
