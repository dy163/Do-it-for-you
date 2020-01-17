<template>
 <!-- 帖子详情 -->
  <div style="width:100%;">
        <el-button type="success" class="delete" @click="back()">返回列表</el-button>
     <div class="total">
          <h2 style="text-align: center">{{list.title}}</h2>
          <br>
          <h3 style="text-align: center">{{list.add_time}}</h3>
          <h3 style="text-align: left">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            阅读数：{{list.view}}</h3><br>
          <h3 style="text-align: left"> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            点赞数：{{list.zan}}</h3><br>
          <h3 style="text-align: left">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            转发数：{{list.share_num}}</h3>
          <div v-html="list.content" class="div">
          </div>
     </div>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  data(){
    return {
           list:[]
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
                console.log(res);
                this.list=res.data.pojo;
                console.log(this.list);
          })
        .catch(error => {
                console.log(error);
          });
     },
//返回
    back(){
        this.$router.push({
            path:'/postss',
            query: {
                page:this.$route.query.page,
                size:this.$route.query.size
             }
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

</style>
<style>
img{
  width: 500px;
  height: 350px
}
</style>
