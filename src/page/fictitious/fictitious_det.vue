<template>
 <!-- 虚拟用户修改 -->
  <div style="width:50%;">
        <el-button type="success" class="delete" @click="back()">返回列表</el-button>
     <div class="total">

        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
               <!-- 上传 -->
               <img :src="form.userhead" alt="头像" class="tou">
      <div class="upload">
       <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           更换头像</p>
<el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      </div>
        <br>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
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
        imageUrl: '',
        param:"",
        form: {
            name: '',
            desc: '',
            userhead:""
        }
     } 
  },
  methods: {
//详情
   details(){
          this.form.name=this.$route.query.row.name;
          this.form.desc=this.$route.query.row.description;
          let index = this.$route.query.row.userhead.lastIndexOf('\/');
          let fileName  = process.env.HOST+"images/"+this.$route.query.row.userhead.substring(index + 1); //最后的文件名截取出来
          this.form.userhead=fileName;
          console.log(fileName)
     },
    onSubmit() {
          let data={
                 id:this.$route.query.row.id,
                 name:this.form.name,
                 description  :this.form.desc,
                 userhead:this.imageUrl
            }
            if(this.imageUrl){
                this.fle();
            }
          this.$axios
              .post(process.env.HOST+`master/user/edit`,data)//
              .then(res => {  
                  if(res.data.result){
                      this.$message({
                        message: res.data.msg,
                        type: 'success'
                      });
                      this.$router.push({
                            path:'/fictitious_user',
                      });
                  }else{
                    this.$message(res.data.msg);
                  } 
              })
      },
      //图片上传
      fle(){
          var names = this.form.name;
                //下面append的东西就会到form表单数据的fields中；
                this.param.append('message', names);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
          this.$axios
              .post(process.env.HOST+`file/uploadimg`,this.param,config)//
              .then(res => {  
                console.log(res)
                    this.$router.push({
                           path:'/fictitious_user',
                      });
              })
      },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.file=file;
        console.log(this.imageUrl)

      },
      beforeAvatarUpload(file) {
        this.param = new FormData();
        this.param.append('file', file, file.name);
      },
//返回
    back(){
        this.$router.push({
            path:'/fictitious_user',
            // query: {
            //     page:this.$route.query.page,
            //     size:this.$route.query.size
            //  }
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
.tou{
  height: 100px;
  width: 100px;
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
.avatar-uploader{
    border: 2px dashed  #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
    height: 180px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style>
img{
  width: 500px;
  height: 350px
}
</style>
