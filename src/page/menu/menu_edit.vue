<template>
<!-- 修改菜单 -->
  <div style="width:50%">
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称:" prop="age">
    <el-input v-model="ruleForm2.age"></el-input>
  </el-form-item>
   <el-form-item label="状态:">
            <el-radio-group v-model="ruleForm2.resource">
            <el-radio label="0">禁用</el-radio>
            <el-radio label="1">启用</el-radio>
            </el-radio-group>
        </el-form-item>
   <el-form-item label="方法:" prop="group">
    <el-input v-model="ruleForm2.group"></el-input>
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
    <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
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
        lists:[],
        ruleForm2: {
            age: '',
            resource:'',
            group:'',
            pid:""
        },
        rules2: {
            age: [
              { validator: checkAge, trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let data={
                  id:this.$route.query.row.id,
                  title:this.ruleForm2.age,
                  name:this.ruleForm2.group,
                  status:this.ruleForm2.resource,
                  pid:this.ruleForm2.pid,
              }
              console.log(data)
         axios
          .post(process.env.HOST+`master/controller/edit`,data)
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
             this.ruleForm2.age="";
            this.ruleForm2.group="";
            this.ruleForm2.resource="";
            this.ruleForm2.pid="";
      },
//返回
      ret(){
          this.$router.push({
              path:'/menu',
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
        console.log(this.$route.query.row) ;
        let data=this.$route.query.row;
        this.ruleForm2.age=data.title;
        this.ruleForm2.resource=data.status.toString();
        this.ruleForm2.group=data.name;
        this.ruleForm2.pid=data.pid;
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
