<template>
<!-- 新增用户 -->
  <div style="width:50%">
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称" prop="age">
    <el-input v-model="ruleForm2.age"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  </el-form-item>
   <el-form-item label="状态">
            <el-radio-group v-model="ruleForm2.resource">
            <el-radio label="0">禁用</el-radio>
            <el-radio label="1">启用</el-radio>
            </el-radio-group>
        </el-form-item>

  <el-form-item label="分组：">
    <el-select v-model="ruleForm2.group" placeholder="请选择分组">
       <div v-for="(item, index) in lists" :key="index">
      <el-option  :value="item.id">{{item.title}}</el-option>
       </div>
    </el-select>
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
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
      };
      return {
        lists:[],
        ruleForm2: {
            pass: '',
            checkPass: '',
            age: '',
            resource:'1',
            group:''
        },
        rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
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
              path:'/user',
          });
         },
      show(){
         this.$axios
          .post(process.env.HOST+`master/admin/group/usable`)
          .then(res => {  
               var list=res.data;
               for(var i=0;i<list.length;i++){
                   this.lists.push({title:list[i].title,id:list[i].id})
               }
               console.log(this.lists)
            })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let data={
                  username:this.ruleForm2.age,
                  password:this.ruleForm2.checkPass,
                  group_id:this.ruleForm2.group,
                  status:this.ruleForm2.resource,
              }
              console.log(data)
            axios
              .post(process.env.HOST+`master/set`,data)
              .then(res => {
                  console.log(res);
                  if(res.data.result){
                    this.$message({
                          message: res.data.msg,
                          type: 'success'
                        });
                    this.$router.push({
                          path:'/user',
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
    }, 
    created(){
       this.show();
    },
  }
    
</script>

<style scoped>
   .demo-ruleForm{
       margin-top: 50px
   }
</style>
