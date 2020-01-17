<template>
<!-- 注册用户 -->
  <div style="width:100%">
     <el-form ref="form" :model="form" >
       <div class="search">
           <el-form-item style="width:25%">
            <el-select v-model="form.stauts" placeholder="用户">
              <el-option label="微信用户" value="7"></el-option>
              <el-option label="普通用户" value="6"></el-option>
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;
          <el-input v-model="form.name" style="width:30%" placeholder="请输入用户名"></el-input>&nbsp;&nbsp;&nbsp;
     
          <el-input v-model="form.username" style="width:30%" placeholder="请输入账号"></el-input>&nbsp;&nbsp;&nbsp;

          <el-input v-model="form.mobile" style="width:30%" placeholder="请输入手机号"></el-input>&nbsp;&nbsp;&nbsp;
          <el-button class="but" @click="search()">搜索</el-button>
        </div>

       <div class="search2">
        <el-form-item style="width:30%">
            <el-select v-model="form.grades" placeholder="状态">
              <el-option label="在线" value="0"></el-option>
              <el-option label="注销" value="2"></el-option>
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;
       
        <el-form-item style="width:30%">
            <el-select v-model="form.binding" placeholder="微信绑定">
              <el-option label="绑定" value="1"></el-option>
              <el-option label="未绑定" value="0"></el-option>
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;

         <el-form-item style="width:30%">
            <el-select v-model="form.resd" placeholder="是否入驻">
              <el-option label="入驻" value="true"></el-option>
              <el-option label="未入驻" value="false"></el-option>
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;

  <div class="block">
    <el-date-picker
      v-model="form.value"
      type="daterange"
      range-separator="至"
      start-placeholder="注册日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
    <div class="block">
    <el-date-picker
      v-model="form.value2"
      type="daterange"
      range-separator="至"
      start-placeholder="登录日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
     &nbsp;&nbsp;&nbsp;&nbsp;
          <el-button class="but" @click="search()">搜索</el-button>
   </div>
       </el-form>
  

      <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="130px">
        </el-table-column>

          <el-table-column
          align="center"
          label="用户名"
          >
          <template slot-scope="scope" >
          <div v-if="scope.row.openid==null">{{scope.row.name}}</div>
          <div v-else-if="scope.row.openid==''">{{scope.row.name}}</div>
          <div v-else-if="scope.row.openid">{{scope.row.nickname}}</div>
          </template>
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
          align="center"
          label="是否入驻"
          width="110"
          >
          <template slot-scope="scope" >
          <div v-if="scope.row.resd=='true'">入驻</div>
          <div v-else-if="scope.row.resd=='false'">未入驻</div>
          </template>
          </el-table-column>

          <el-table-column
          align="center"
          prop="userhome"
          label="地址"
          >
         <template slot-scope="scope" >
          <div v-if="scope.row.openid==null">{{scope.row.userhome}}</div>
          <div v-else-if="scope.row.openid">{{scope.row.country}}-{{scope.row.province }}-{{scope.row.city}}</div>
          </template>
          </el-table-column>


          <!-- <el-table-column
          label="操作"
          align="center"
            width="300"
          >  
          <template slot-scope="scope">
              <el-button  @click="examine(scope.row.id,scope.row.name)">修改</el-button>
              <el-button  @click="del(scope.row.id)">删除</el-button>
              </template>
          </el-table-column> -->
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
          loading:false,
          currentPage:1, //初始页
          pagesize:10,    //    每页的数据
          list:[],
          totals:"",
          tid:[],
         form: {
              name: '',
              username: "",
              mobile:"",
              binding:"",
              stauts:"",
              grades:"",
              value:"",
              value2:"",
              resd:""
          },
        } 
  },
  methods: {
         handleSizeChange: function (size) {
                this.loading=true;
                  console.log(size)
                this.pagesize = size;
                if(this.form.name==""&&this.form.username==""&&this.form.mobile==""&&this.form.binding==""&&this.form.stauts==""&&this.form.grades==""&&this.form.username==""&&this.form.resd==""&&this.form.value2==""&&this.form.value==""){
                  console.log('1')
          axios({
              url: process.env.HOST+`master/user/list`,
              method: 'post',
              data: {
                  page:this.currentPage,
                  size:size,
                 grades:0
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
                         this.loading==false;
                     
                })
          .catch(error => {
                    console.log(error);
                });
                  
                }else{
                  console.log('2')
                         if(this.form.value){
            let getMonth=(this.form.value[0].getMonth() + 1);
            if(getMonth<10){
                  getMonth="0"+getMonth
            }
            let getDate=this.form.value[0].getDate();
            if(getDate<10){
                  getDate="0"+getDate
            }
            var datetime=this.form.value[0].getFullYear() + '-' + getMonth + '-' +  getDate;
       
 
            let getMonths=(this.form.value[1].getMonth() + 1);
            if(getMonths<10){
                  getMonths="0"+getMonths
            }
            let getDates=this.form.value[1].getDate();
            if(getDates<10){
                  getDates="0"+getDates
            }
            var datetimes=this.form.value[1].getFullYear() + '-' + getMonths + '-' +  getDates;   
    }else{
      datetimes=""
      datetime=""
    }
      if(this.form.value2){
            let getMonth=(this.form.value2[0].getMonth() + 1);
            if(getMonth<10){
                  getMonth="0"+getMonth
            }
            let getDate=this.form.value2[0].getDate();
            if(getDate<10){
                  getDate="0"+getDate
            }
            var time=this.form.value2[0].getFullYear() + '-' + getMonth + '-' +  getDate;
       
 
            let getMonths=(this.form.value2[1].getMonth() + 1);
            if(getMonths<10){
                  getMonths="0"+getMonths
            }
            let getDates=this.form.value2[1].getDate();
            if(getDates<10){
                  getDates="0"+getDates
            }
            var times=this.form.value2[1].getFullYear() + '-' + getMonths + '-' +  getDates;   
    }else{
      time=""
      times=""
    }
      if(this.form.stauts==""){
          var stauts=6
      }else{
           stauts=this.form.stauts
      }
                    axios({//`http://192.168.3.160:8080/bbs_war/master/user/byKey`
                        url:process.env.HOST+`master/user/byKey`,
                        method: 'post',
                        data: {
                            name:this.form.name,
                            username:this.form.username,
                            mobile: this.form.mobile,
                            binding: this.form.binding,
                            grades: this.form.grades,
                            regtime: datetime,//注册开始
                            rEndTime: datetimes,//注册结束
                            last_login_time: time,//登录开始
                            lEndTime: times,//登录结束
                            stauts:stauts,
                            resd:this.form.resd,
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
                        this.loading=false;
                          if(res.data.result){
                              this.list=res.data.pojo.list;
                              this.totals=res.data.pojo.total;
                                this.loading=false;
                              console.log("搜索",res)
                          }else{
                              this.$message.error(res.data.msg); 
                          }
                          })
                    .catch(error => {
                              console.log(error);
                          });
           }            
        },
        handleCurrentChange: function(currentPage){
                  console.log("页",currentPage)
                this.loading=true;
                this.currentPage = currentPage;
           if(this.form.name==""&&this.form.username==""&&this.form.mobile==""&&this.form.binding==""&&this.form.stauts==""&&this.form.grades==""&&this.form.username==""&&this.form.resd==""&&this.form.value2==""&&this.form.value==""){
                  console.log('11')
           axios({
              url:process.env.HOST+`master/user/list`,
              method: 'post',
              data: {
                  page:currentPage,
                  size:this.pagesize,
                 grades:0
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
                        this.loading=false;

                })
          .catch(error => {
                    console.log(error);
                });
           }else{
                  console.log('22')
                         if(this.form.value){
            let getMonth=(this.form.value[0].getMonth() + 1);
            if(getMonth<10){
                  getMonth="0"+getMonth
            }
            let getDate=this.form.value[0].getDate();
            if(getDate<10){
                  getDate="0"+getDate
            }
            var datetime=this.form.value[0].getFullYear() + '-' + getMonth + '-' +  getDate;
       
 
            let getMonths=(this.form.value[1].getMonth() + 1);
            if(getMonths<10){
                  getMonths="0"+getMonths
            }
            let getDates=this.form.value[1].getDate();
            if(getDates<10){
                  getDates="0"+getDates
            }
            var datetimes=this.form.value[1].getFullYear() + '-' + getMonths + '-' +  getDates;   
    }else{
      datetimes=""
      datetime=""
    }
      if(this.form.value2){
            let getMonth=(this.form.value2[0].getMonth() + 1);
            if(getMonth<10){
                  getMonth="0"+getMonth
            }
            let getDate=this.form.value2[0].getDate();
            if(getDate<10){
                  getDate="0"+getDate
            }
            var time=this.form.value2[0].getFullYear() + '-' + getMonth + '-' +  getDate;
       
 
            let getMonths=(this.form.value2[1].getMonth() + 1);
            if(getMonths<10){
                  getMonths="0"+getMonths
            }
            let getDates=this.form.value2[1].getDate();
            if(getDates<10){
                  getDates="0"+getDates
            }
            var times=this.form.value2[1].getFullYear() + '-' + getMonths + '-' +  getDates;   
    }else{
      time=""
      times=""
    }
      if(this.form.stauts==""){
          var stauts=6
      }else{
           stauts=this.form.stauts
      }
                    axios({//`http://192.168.3.160:8080/bbs_war/master/user/byKey`
                        url:process.env.HOST+`master/user/byKey`,
                        method: 'post',
                        data: {
                            name:this.form.name,
                            username:this.form.username,
                            mobile: this.form.mobile,
                            binding: this.form.binding,
                            grades: this.form.grades,
                            regtime: datetime,//注册开始
                            rEndTime: datetimes,//注册结束
                            last_login_time: time,//登录开始
                            lEndTime: times,//登录结束
                            stauts:stauts,
                            resd:this.form.resd,
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
                        this.loading=false;
                          if(res.data.result){
                              this.list=res.data.pojo.list;
                              this.totals=res.data.pojo.total;
                              this.loading=false;
                              console.log("搜索",res)
                          }else{
                              this.$message.error(res.data.msg); 
                          }
                          })
                    .catch(error => {
                              console.log(error);
                          });
        
           }
        }, 
//展示分页  
    handleUserList() {
           axios({
              url:process.env.HOST+`master/user/list`,
              method: 'post',
              data: {
                page:this.currentPage,
                size:this.pagesize,
                 grades:0
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

                })
          .catch(error => {
                    console.log(error);
                });

     },
     //搜索
     search(){
        this.loading=true;
           if(this.form.value){
            let getMonth=(this.form.value[0].getMonth() + 1);
            if(getMonth<10){
                  getMonth="0"+getMonth
            }
            let getDate=this.form.value[0].getDate();
            if(getDate<10){
                  getDate="0"+getDate
            }
            var datetime=this.form.value[0].getFullYear() + '-' + getMonth + '-' +  getDate;
       
            let getMonths=(this.form.value[1].getMonth() + 1);
            if(getMonths<10){
                  getMonths="0"+getMonths
            }
            let getDates=this.form.value[1].getDate();
            if(getDates<10){
                  getDates="0"+getDates
            }
            var datetimes=this.form.value[1].getFullYear() + '-' + getMonths + '-' +  getDates;   
          }else{
            datetimes="";
            datetime=""
          }

          if(this.form.value2){
                        let getMonthas=(this.form.value2[0].getMonth() + 1);
            if(getMonthas<10){
                  getMonthas="0"+getMonthas
            }
            let getDateas=this.form.value2[0].getDate();
            if(getDateas<10){
                  getDateas="0"+getDateas
            }
            var time=this.form.value2[0].getFullYear() + '-' + getMonthas + '-' +  getDateas;
       
 
            let getMonthsas=(this.form.value2[1].getMonth() + 1);
            if(getMonthsas<10){
                  getMonthsas="0"+getMonthsas
            }
            let getDatesas=this.form.value2[1].getDate();
            if(getDatesas<10){
                  getDatesas="0"+getDatesas
            }
            var times=this.form.value2[1].getFullYear() + '-' + getMonthsas + '-' +  getDatesas; 
          }else{
            times="";
            time=""
          }

          if(this.form.stauts==""){
              var stauts=6
              }else{
                 stauts=this.form.stauts
             }
           axios({//`http://192.168.3.160:8080/bbs_war/master/user/byKey`
              url:process.env.HOST+`master/user/byKey`,
              method: 'post',
              data: {
                  name:this.form.name,
                  username:this.form.username,
                  mobile: this.form.mobile,
                  binding: this.form.binding,
                  grades: this.form.grades,
                  regtime: datetime,//注册开始
                  rEndTime: datetimes,//注册结束
                  last_login_time: time,//登录开始
                  lEndTime: times,//登录结束
                  status:stauts,
                  resd:this.form.resd
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
               this.loading=false;
                if(res.data.result){
                    this.list=res.data.pojo.list;
                    this.totals=res.data.pojo.total;
                     console.log("搜索",res)
                }else{
                    this.$message.error(res.data.msg); 
                }
                })
          .catch(error => {
                    console.log(error);
                });
      
// process.env.HOST+`master/user/byKey`


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
.search{
  margin-left: 2%;
  width: 60%;
  display: flex;
  margin-top: 20px
}
.search2{
  margin-left: 2%;
  width: 80%;
  display: flex;
}
</style>
