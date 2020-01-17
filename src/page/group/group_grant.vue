<template>
<!-- 权限组授权 -->
  <div style="width:100%;">
      <br><br><br><br>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>已授权组数</span>
  </div>
  <div v-for="(list,key) in list" :key="key" class="text item">
    {{list}}
  </div>
</el-card>
      <div style="margin-left:50px">
       菜单权限数组: <br><br>
  <el-select v-model="ruleForm2.pid" multiple placeholder="请选择" style="width:500px">
    <el-option
      v-for="(item , index) in lists"
      :key="index"
      :label="item.title"
      :value="item.id">
    </el-option>
  </el-select>
     <br><br>
    <el-button type="primary" @click="add()">确认授权</el-button>
    <el-button @click="ret">返回</el-button>
      </div>
  </div>
</template>

<script>
  import axios from "axios";
export default {
     data() {
      return {
          list:[],
          lists:[],
          ruleForm2:{
                 pid:[]
          }
        }
    },
    methods: {
//返回
    ret(){
        this.$router.push({
            path:'/group',
        });
      },
    show(){
      this.$axios
        .post(process.env.HOST+`master/controller/list`)
        .then(res => {  
            var list=res.data;
            for(var i=0;i<list.length;i++){
              for(var j=0;j<list[i].list.length;j++){
                this.lists.push({title:list[i].list[j].title,id:list[i].list[j].id})            
              }        
                this.lists.push({title:list[i].title,id:list[i].id}) 
            }
        })
      this.$axios
        .post(process.env.HOST+`master/admin/group/get?id=`+this.$route.query.id)
        .then(res => {
            console.log(res);
            this.list=res.data.pojo
        })
        .catch(error => {
            console.log(error);
        });
    },
//授权
    add(){
       axios({
          url: process.env.HOST+`master/admin/group/grant`,
          method: 'post',
          data: {
                id:this.$route.query.id,
                rules: this.ruleForm2.pid
          }, 
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
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
            if(res.data.result){
              this.$message({
                  message: res.data.msg,
                  type: 'success'
              }); 
              this.$router.push({
                  path:'/group',
              });
            }else{
              this.$message.error(res.data.msg);
            }  
        })
        .catch(error => {
               console.log(error);
          });
      }
  },
  created(){
      this.show();
    },
}
</script>

<style scoped>
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
    height: 700px;
    overflow: auto;
    position: absolute;
    left: 1000px;
    top: 150px
  }
</style>
