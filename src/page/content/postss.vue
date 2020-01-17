<template>
<!-- 所有帖子 -->
  <div style="width:100%">
         <el-form ref="form" :model="form" class="search">
          <el-input v-model="form.title" style="width:30%" placeholder="请输入标题关键字"></el-input>&nbsp;&nbsp;&nbsp;
          <el-button class="but" @click="search()">搜索</el-button>
       </el-form>

    <div style="display:flex">
     <el-form ref="form" :model="form" class="search">
          <el-input v-model="form.name" style="width:30%" placeholder="请输入搜索姓名"></el-input>&nbsp;&nbsp;&nbsp;
          <el-form-item style="width:30%">
            <el-select v-model="form.field" placeholder="请选择搜索栏目" >
                <div v-for="(field, index) in field" :key="index">
                <el-option  :value="field.id" @click.native="asd()" :label="field.name"></el-option>
                </div>
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;
          <el-form-item style="width:30%">
            <el-select v-model="form.tid" placeholder="请选择搜索地区">
                <div v-for="(tid, index) in tid" :key="index">
                <el-option  :value="tid.id" :label="tid.name"></el-option>
                </div>
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;
                    <el-form-item style="width:30%">
            <el-select v-model="form.category" placeholder="请选择帖子">
              <el-option label="抓取" value="1"></el-option>
              <el-option label="自由撰写" value="0"></el-option>
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;
                    <el-form-item style="width:30%">
            <el-select v-model="form.audit" placeholder="请选择审核状态">
              <el-option label="在线" value="1"></el-option>
              <el-option label="强制下线" value="4"></el-option>
            </el-select>
          </el-form-item>&nbsp;&nbsp;&nbsp;

  <div class="block">
    <el-date-picker
      v-model="value"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
          <el-button class="but" @click="search()">搜索</el-button>
       </el-form>
       <p style="margin-top:7vh">
           今日新增： <span style="color:red">{{augment}}</span>  篇
       </p>
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
          <div 
          @click="details(scope.row.id)"
            style="cursor:pointer;"
            >
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
        prop="view"
        align="center"
        width="100px"
        label="阅读数"
        >
        </el-table-column>

        <el-table-column
        prop="zan"
        align="center"
        width="100px"
        label="点赞数"
        >
        </el-table-column>

        <el-table-column
        prop="share_num"
        align="center"
        width="100px"
        label="转发数"
        >
        </el-table-column>

       <el-table-column
        prop="comment"
        align="center"
        width="100px"
        label="评论数"
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
        prop="audit_time"
        width="100px"
        label="审核时间"
        >
        </el-table-column>

        <el-table-column
        align="center"
        width="120px"
        label="状态"
        >

        <template slot-scope="scope" >
          <div v-if="scope.row.audit==0">未审核</div>
          <div v-else-if="scope.row.audit==1">在线</div>
          <div v-else-if="scope.row.audit==2">审核不通过</div>
          <div v-else-if="scope.row.audit==4">已下线</div>
          </template>

        </el-table-column>
        <el-table-column
        label="操作"
        align="center"
        width="150"
        >  
        <template slot-scope="scope">
          <div v-if="scope.row.audit==1">
              <el-button  @click="del(scope.row.id)">强制下线</el-button>
         </div>
          <div v-else-if="scope.row.audit==4">
              <el-button  @click="examine(scope.row.id)">上线</el-button>
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
      value:"",
      value2: false,
      currentPage:1, //初始页
      pagesize:8,    //    每页的数据
      list:[],
      totals:"",
      augment:"",
      field:[],
      tid:[],
      multipleSelection: [],
      form: {
          name: '',
          audit: "",
          date1:"",
          field:"",
          tid:"",
          title:"",
          time:"",
          category:""
        },
      loading:false
    } 
  },
  methods: {
    handleSizeChange: function (size) {
            //console.log(size)
          this.pagesize = size;
          this.loading=true;
            if(this.form.name=="" && this.form.audit=="" && this.form.date1==""  && this.form.field==""&& this.form.tid==""&& this.form.title==""){
                let data={
                   audit:1,
                  page:this.currentPage,
                    size:size,
                }
              this.$axios
                .post(process.env.HOST+`master/forum/byList`,data)
                .then(res => {  
                this.loading=false;
                    this.list=res.data.pojo.list;
                })  
        }else{
          if(this.form.date1){
            var getMonth=(this.form.date1.getMonth() + 1);
            if(getMonth<10){
                  getMonth="0"+getMonth
            }
            var getDate=this.form.date1.getDate();
            if(getDate<10){
                  getDate="0"+getDate
            }
            var datetime=this.form.date1.getFullYear() + '-' + getMonth + '-' +  getDate;
       }
      if(this.form.audit){
            var audit=this.form.audit
      }else{
            audit=1
      }

         let data={
              username:this.form.name,
              audit:audit,
              page:this.currentPage,
              size:size,
              audit_time:datetime,
              field:this.form.field,
              tid:this.form.tid,
              title:this.form.title,
              category:this.form.category
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
          this.currentPage = currentPage;
          this.loading=true;
            if(this.form.name=="" && this.form.audit=="" && this.form.date1==""  && this.form.field==""&& this.form.tid==""&& this.form.title==""){
            let data={
                  audit:1,
                  page:currentPage,
                  size:this.pagesize,
            }
           this.$axios
              .post(process.env.HOST+`master/forum/byList`,data)
              .then(res => {  
              this.loading=false;
                  this.list=res.data.pojo.list;
                  //console.log(res)
            })
      }else{
           if(this.form.date1){
            var getMonth=(this.form.date1.getMonth() + 1);
            if(getMonth<10){
                  getMonth="0"+getMonth
            }
            var getDate=this.form.date1.getDate();
            if(getDate<10){
                  getDate="0"+getDate
            }
            var datetime=this.form.date1.getFullYear() + '-' + getMonth + '-' +  getDate;
       }
       if(this.form.audit){
            var audit=this.form.audit
      }else{
            audit=1
      }
        let data={
              username:this.form.name,
              audit:audit,
              page:currentPage,
              size:this.pagesize,
              audit_time:datetime,
              field:this.form.field,
              tid:this.form.tid,
              title:this.form.title,
              category:this.form.category

        }
            //console.log(data)
        this.$axios
          .post(process.env.HOST+`master/forum/getByKey`,data)
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
        }
    },
    asd(){
         console.log( this.form.field)
    },
//展示分页
   handleUserList() {
       this.loading=true;
       if(this.$route.query.page||this.$route.query.size){
            this.currentPage=this.$route.query.page;
            this.pagesize=this.$route.query.size;
       }

      let data={
              audit:1,
              page:this.currentPage,
              size:this.pagesize,
            }
      this.$axios
          .post(process.env.HOST+`master/forum/byList`,data)//
          .then(res => {  
                  this.loading=false;
                this.list=res.data.pojo.list;
                this.totals=res.data.pojo.total;
                  console.log(res)
           }) 
          .catch(error => {
                console.log(error);
          });
//栏目
      this.$axios
          .post(process.env.HOST+`master/field/getList`,data)//
          .then(res => {  
              this.field=res.data.pojo
                 // console.log(  this.field)
           }) 
          .catch(error => {
                console.log(error);
          });
//地区
      this.$axios
          .post(process.env.HOST+`master/fcate/list`,data)//
          .then(res => {  
              this.tid=res.data
                  //console.log(res)
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
 //数据统计
     audit(){
        this.$axios
          .post(process.env.HOST+`master/audit/list`)//
          .then(res => {  
               this.augment=res.data.pojo.augment;
              // console.log("3213132",res)
            })
     },
//下架
     del(id){
 this.$confirm('此操作将下架该帖, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
               this.loading=true;
        let data={
              id:id,
              audit:4,
              messages:4
        }
        axios
        .post(process.env.HOST+`master/forum/audit`,data)
        .then(res => {
             console.log(res);
              this.loading=false;
              if(res.data.result){
                  this.$message({
                     message: res.data.msg,
                     type: 'success'
                  });
              }else{
                 this.$message(res.data.msg);
              } 
              this.handleUserList()        
        })
        .catch(error => {
             console.log(error);
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
     },
     
//多选删除
     deletes(){
       axios
          .post(process.env.HOST+`master/forum/delete`, this.multipleSelection)
          .then(res => {
              //console.log(res);
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
         var page=this.currentPage;
         var size=this.pagesize ;
         this.$router.push({
              path:'/postss_details',
              query: {
                id: id,
                page:page,
                size:size
              }
         });
      },
//搜索
     search(){
       if(this.value){
            var getMonth=(this.value[0].getMonth() + 1);
            if(getMonth<10){
                  getMonth="0"+getMonth
            }
            var getDate=this.value[0].getDate();
            if(getDate<10){
                  getDate="0"+getDate
            }
            var datetime=this.value[0].getFullYear() + '-' + getMonth + '-' +  getDate;
       
 
            var getMonths=(this.value[1].getMonth() + 1);
            if(getMonths<10){
                  getMonths="0"+getMonths
            }
            var getDates=this.value[1].getDate();
            if(getDates<10){
                  getDates="0"+getDates
            }
            var datetimes=this.value[1].getFullYear() + '-' + getMonths + '-' +  getDates;
       
    }
      if(this.form.audit){
            var audit=this.form.audit
      }else{
            audit=1
      }


       this.loading=true;
       let data={
              username:this.form.name,
              audit: audit,
              page:this.currentPage,
              size:this.pagesize,
              audit_time:datetime,
              field:this.form.field,
              tid:this.form.tid,
              title:this.form.title,
              time:datetimes,
              category:this.form.category

        }
        console.log(data)
         this.$axios
           .post(process.env.HOST+`master/forum/getByKey`,data)//process.env.HOST+`master/forum/getByKey`
           .then(res => {  
               this.loading=false;
                if(res.data.result){
                    this.list=res.data.pojo.list;
                    this.totals=res.data.pojo.total;
                    //console.log(res)
                }else{
                    this.$message.error(res.data.msg); 
                }
              })
           .catch(error => {
                this.$message.error(res.data.msg);
                console.log(error);
          });
       },
//审核
     examine(id){
           let data={
              id:id,
              audit:1,
               message:""
        }
        console.log(data);
        axios
        .post(process.env.HOST+`master/forum/audit`,data)
        .then(res => {
             console.log(res);
               this.handleUserList()
              if(res.data.result){
                  this.$message({
                     message: res.data.msg,
                     type: 'success'
                  });
              }else{
                 this.$message(res.data.msg);
              }         
        })
        .catch(error => {
             console.log(error);
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
  width: 75%;
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
