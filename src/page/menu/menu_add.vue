<template>
<!-- 菜单新增 -->
  <div style="width:50%">
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称：" prop="title">
    <el-input v-model="ruleForm2.title"></el-input>
  </el-form-item>
    <el-form-item label="方法：" prop="name">
    <el-input v-model="ruleForm2.name"></el-input>
  </el-form-item>
   <el-form-item label="状态：">
            <el-radio-group v-model="ruleForm2.resource">
            <el-radio label="0">禁用</el-radio>
            <el-radio label="1">启用</el-radio>
            </el-radio-group>
        </el-form-item>
  <el-form-item label="父级id：">
    <el-select v-model="ruleForm2.pid" placeholder="请选择父级id">
      <el-option  value="0">一级菜单</el-option>
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
          return callback(new Error('不能为空'));
        }else{
             callback();
        }
      };
      return {
        lists:[],
        ruleForm2: {
            title: '',
            resource:'1',
            name:"",
            pid:"",
        },
        rules2: {
            title: [
              { validator: checkAge, trigger: 'blur' }
            ],
            name: [
              { validator: checkAge, trigger: 'blur' }
            ]
         }
      };
    },
    methods: {
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
      },
//返回
      ret(){
          this.$router.push({
              path:'/menu',
          });
       },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let data={
                  title:this.ruleForm2.title,
                  name:this.ruleForm2.name,
                  pid:this.ruleForm2.pid,
                  status:this.ruleForm2.resource,
              }
              console.log(data)
          axios
            .post(process.env.HOST+`master/controller/set`,data)
            .then(res => {
                console.log(res);
                if(res.data.result){
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    });
                    this.$router.push({
                          path:'/menu',
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
