<template>
<!-- 入住审核 -->
  <div style="width:50%">
      <br><br><br>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="审核：">
            <el-radio-group v-model="form.resource">
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核不通过</el-radio>
            <el-radio label="4">强制下线</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="理由：">
            <el-input type="textarea" v-model="form.desc" placeholder="未通过时请必须给出理由"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
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
       form: {
          resource: '',
          desc: ''
        }
      }
  },
  methods: {
      examine(){
         this.id=this.$route.query.id;
         console.log(this.id)
      },
      //返回
      ret(){
         this.$router.push({
            path:'/settled',
         });
      },
//审核
 onSubmit() {
        let data={
          id:this.$route.query.id,
          status:this.form.resource,
           message:this.form.desc
        }
       axios
        .post(process.env.HOST+`master/settled/examine`,data)
        .then(res => {
             console.log(res);
              if(res.data.result){
                 this.$message({
                     message: res.data.msg,
                     type: 'success'
                  });
                  this.$router.push({
                        path:'/settled',
                  });
              }else{
                 this.$message(res.data.msg);
              }         
        })
        .catch(error => {
             console.log(error);
        });
      },
    created(){
        this.examine()
    }
  }
    }
</script>

<style scoped>
   .demo-ruleForm{
       margin-top: 50px
   }
</style>
