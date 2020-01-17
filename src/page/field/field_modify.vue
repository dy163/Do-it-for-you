<template>
<!-- 领域修改 -->
  <div style="width:50%">
      <br><br><br>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="领域名称">
            <el-input v-model="form.name" placeholder="请填写领域名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="add">修改</el-button>
            <el-button @click="ret">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  data(){
    return {
        id:"",
        form:{
              name:""
        }
      }
  },
  methods: {
      set(){
         this.id=this.$route.query.id;
         this.form.name=this.$route.query.name;
         console.log(this.$route.query.name)
      },
//修改        
    add() {
      this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确认修改',
          cancelButtonText: '取消修改',
          type: 'warning'
        }).then(() => {
            console.log(this.form.name);
        axios({
            url: process.env.HOST+`master/field/edit`,
            method: 'post',
            data: {
                id:this.id,
                name:this.form.name
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
              if(res.data.result){
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                }); 
                this.$router.push({
                        path:'/field',
                    });
              }else{
                this.$message.error(res.data.msg);
              }
            })
          .catch(error => {
                    console.log(error);
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });          
      });
    },
//返回
    ret(){
        this.$router.push({
          path:'/field',
        });
    },
  },
created() {
     this.set();
  },
    }
</script>

<style scoped>
   .demo-ruleForm{
       margin-top: 50px
   }
</style>
