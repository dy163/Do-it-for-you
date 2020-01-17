<template>
<!-- 提现审核 -->
  <div style="width:50%;">
      <br><br><br>
      <div class="div">
      <p>姓名：<span>{{name}}</span></p>
      <br>
      <p>金额：<span>{{amount}}</span> 元</p>
      <br>
      <el-form ref="form" :model="form" label-width="100px;"> 
        <el-form-item label="提现结果：">
            <el-radio-group v-model="form.resource">
            <el-radio label="1">审核通过</el-radio>
            <el-radio label="2">审核不通过</el-radio>
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
  </div>
</template>

<script>
  import axios from "axios";
export default {
  data(){
    return {
        name:"",
        amount:"",
        form: {
          resource: '1',
          desc:""
        }
      }
  },
  methods: {
      examines(){
          let data=this.$route.query.row;
          this.name=data.realName;
          this.amount=data.amount;
      },
      //返回
      ret(){
         this.$router.push({
            path:'/cash',
         });
      },
//审核
 onSubmit() {
    axios({
        url: process.env.HOST+`master/transfer/audit`,
        method: 'post',
        data: {
            id:this.$route.query.row.id,
            audit:this.form.resource,
            messages:this.form.desc
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
        'Content-Type': 'application/x-www-form-urlencoded'  // 指定请求方式的格式（普通表单的键值对形式）
        }
    })
        .then(res => {
            if(res.data.result){
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                });
                console.log("提现",res);
            if(this.form.resource==1){
                        console.log("通过",this.$route.query.row.id);
            axios({
                url: process.env.HOST+`master/transfer/transfer`,
                method: 'post',
                data: {
                    id:this.$route.query.row.id
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
                        path:'/cash',
                    });
                    }else{
                        this.$message(res.data.msg);
                    } 
                })
                .catch(error => {
                            console.log(error);
                        });
                }else{
                console.log("不通过");
                    this.$router.push({
                        path:'/cash',
                    });
                }  
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
        this.examines()
    }
    }
</script>

<style scoped>
   .demo-ruleForm{
       margin-top: 50px
   }
   .div{
       margin-left: 50px;
   }

</style>
