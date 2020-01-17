<template>
<!-- 权限组新增 -->
  <div style="width:50%">
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称：" prop="age">
    <el-input v-model="ruleForm2.age"></el-input>
  </el-form-item>
   <el-form-item label="状态：">
            <el-radio-group v-model="ruleForm2.resource">
            <el-radio label="0">禁用</el-radio>
            <el-radio label="1">启用</el-radio>
            </el-radio-group>
        </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="ret">返回</el-button>
  </el-form-item>
</el-form>
  </div>
  
</template>

<script>
  import axios from "axios";
export default {
     data() {
          var checkAge = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('名称不能为空'));
            }else{
                callback();
            }
          };
          return {
            ruleForm2: {
                  age: '',
                  resource:'1',
            },
            rules2: {
                age: [
                  { validator: checkAge, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
            //返回
      ret(){
          this.$router.push({
              path:'/group',
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let data={
                  title:this.ruleForm2.age,
                  status:this.ruleForm2.resource,
              }
              console.log(data)
          axios
            .post(process.env.HOST+`master/admin/group/set`,data)
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
                    this.resetForm('ruleForm2')
                  }else{
                    this.$message(res.data.msg);
                  }        
            })
            .catch(error => {
                console.log(error);
            });
          } else {
              this.$message('错误提交!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
    
</script>

<style scoped>
   .demo-ruleForm{
       margin-top: 50px
   }
</style>
