<template>
<!-- 修改用户 -->
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
  <el-form-item label="分组:">
    <el-select v-model="ruleForm2.group" placeholder="请选择分组">
       <div v-for="(item, index) in list" :key="index">
      <el-option  :value="item.id">{{item.title}}</el-option>
       </div>
    </el-select> 
  </el-form-item>
    <el-form-item label="密码:" prop="password">
    <el-input v-model="ruleForm2.password"></el-input>
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
        list:[],
        ruleForm2: {
            age: '',
            resource:'',
            group:'',
            password:""
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
                  username:this.ruleForm2.age,
                  password:this.ruleForm2.password,
                  group_id:this.ruleForm2.group,
                  status:this.ruleForm2.resource,
              }
              console.log(data)
          axios
            .post(process.env.HOST+`master/edit`,data)
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
      },
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
                      this.list.push({title:list[i].title,id:list[i].id})
                  }
                  console.log(this.list)
              })
            console.log(this.$route.query.row) ;
        axios
          .get(process.env.HOST+`master/get?uid=`+this.$route.query.row.id)
          .then(res => {
              console.log("所有信息",res);
                this.ruleForm2.age=res.data.username;
                this.ruleForm2.resource=res.data.status.toString();
                this.ruleForm2.group=res.data.group_id;
                this.ruleForm2.password=res.data.password
          })
          .catch(error => {
              console.log(error);
          });
      },

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
