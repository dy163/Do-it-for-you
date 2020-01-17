<template>
 <!-- 帖子详情 -->
  <div style="width:100%;">
      <el-button type="success" class="delete"  @click="ret()">返回列表</el-button>
     <div class="total">
       <div class="src">
            <div v-for="(item,index) in imgs" :key="index" >
                  <img :src="item" class="srcs">
            </div>
       </div>
<br>
          <h2 style="text-align: center">{{list.title}}</h2>
          <br>
          <h3 style="text-align: center">{{list.add_time}}</h3>
          <div v-html="list.content" class="div">
          </div>

  <div style="width:50%">
           <br><br><br>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="帖子审核：">
            <el-radio-group v-model="form.resource">
            <el-radio label="1">审核通过</el-radio>
            <el-radio label="2">审核不通过</el-radio>
            <!-- <el-radio label="4">强制下线</el-radio> -->
            </el-radio-group>
        </el-form-item>
        <el-form-item label="理由：">
            <el-input type="textarea" v-model="form.desc" placeholder="未通过时请必须给出理由"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认审核</el-button>
            <el-button @click="ret">返回</el-button>
        </el-form-item>
        </el-form>
        </div>
     </div>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  data(){
    return {
           list:[],
           img:[],
           imgs:[],
        form: {
          resource: '',
          desc: ''
        }
        } 
  },
  methods: {
//详情
   details(){
        axios({
            url: process.env.HOST+`master/forum/get`,
            method: 'post',
            data: {
              id:this.$route.query.id
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
                this.list=res.data.pojo;
                console.log("00000",this.list)
                this.img=this.list.imageList;
                for(var i=0;i<this.list.imageList.length;i++){
                     this.imgs.push(process.env.HOST+this.list.imageList[i].savepath) 
                }

          })
        .catch(error => {
                console.log(error);
          });
     },
           //返回  
      ret(){
         this.$router.push({
            path:'/posts',
             query: {
                 page:this.$route.query.page,
                 size:this.$route.query.size
             }
         });
      },
      //审核
     onSubmit() {
        let data={
              id:this.$route.query.id,
              audit:this.form.resource,
              messages:this.form.desc
        }
        console.log(data);
        axios
        .post(process.env.HOST+`master/forum/audit`,data)
        .then(res => {
             console.log(res);
              if(res.data.result){
                  this.$message({
                     message: res.data.msg,
                     type: 'success'
                  });
            this.$router.push({
                  path:'/posts',
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
     this.details();
 }
}
</script>

<style scoped>
.delete{
    background-color:#009688;
    margin: 10px;
}
.total{
  width: 100%;
  margin-top: 20px
}
.div{
  margin: 50px;
 text-indent:2em;
line-height:30px;
text-align: center
}
.src{
    display: flex;
    justify-content: space-around
    
}

</style>
<style>
img{
  width: 500px;
  height: 350px
}
</style>
