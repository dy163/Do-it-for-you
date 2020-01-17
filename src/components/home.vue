<template>
  <div >
    <!-- 头部 -->
       <div class="head">
           <h2>帮你办</h2> 
                <div class="head_portrait">
                    <img src="//img11.360buyimg.com/img/s100x100_jfs/t1/61703/24/2801/1010910/5d11e54fE45c9a86e/cb6029f2a1924b6f.jpg!cc_100x100.webp">
                    &nbsp;&nbsp;
                    <span class="span1">{{username}}</span>
                    <div class="head_portraits">
                        <ul>
                          <li class="li1" @click="dialogFormVisible = true">修改密码</li>
                          <li class="li1" @click="exit">注销</li>
                        </ul>
                    </div>
                </div>
       </div>


       <el-dialog title="密码修改" :visible.sync="dialogFormVisible"  >
  <el-form :model="form">
    <el-form-item label="原密码:" :label-width="formLabelWidth">
      <el-input v-model="form.oldpsd" autocomplete="off"  style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="新密码:" :label-width="formLabelWidth">
      <el-input v-model="form.newpsd" autocomplete="off" style="width:300px"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="asd()">确 定</el-button>
  </div>
</el-dialog>


       <div class="content">
    <el-collapse accordion class="a">
  <el-collapse-item>
    <template slot="title">
       &nbsp;&nbsp;<i class=" el-icon-s-grid"></i>菜单管理
    </template>
          <ul  class="ul2">
            	<RouterLink to="/menu" tag="li" class="li3">菜单列表</RouterLink>
          </ul>
  </el-collapse-item>

  <el-collapse-item>
    <template slot="title">
       &nbsp;&nbsp;<i class=" el-icon-user"></i> 用户管理
    </template>
          <ul  class="ul2">
          	<RouterLink to="/user" tag="li" class="li3">用户列表</RouterLink>
          	<RouterLink to="/user_diction" tag="li" class="li3">用户权限</RouterLink>
          	<RouterLink to="/user_sign" tag="li" class="li3">用户登录</RouterLink>
          </ul>
  </el-collapse-item>

    <el-collapse-item>
    <template slot="title">
       &nbsp;&nbsp;<i class=" el-icon-setting"></i> 权限管理
    </template>
          <ul  class="ul2">
            <RouterLink to="/group" tag="li" class="li3">权限组</RouterLink>

          </ul>
  </el-collapse-item>

    <el-collapse-item>
    <template slot="title">
       &nbsp;&nbsp;<i class=" el-icon-document"></i> 内容管理
    </template>
          <ul  class="ul2">
              <RouterLink to="/posts" tag="li" class="li3">待审核帖子</RouterLink>
              <RouterLink to="/postss" tag="li" class="li3">帖子管理</RouterLink>
             	<RouterLink to="/settled" tag="li" class="li3">入驻管理</RouterLink>
             	<RouterLink to="/user_list" tag="li" class="li3">注册用户</RouterLink>
          </ul>
  </el-collapse-item>

    <el-collapse-item>
    <template slot="title">
       &nbsp;&nbsp;<i class=" el-icon-office-building"></i> 抓取数据管理
    </template>
          <ul  class="ul2">
            	<RouterLink to="/fictitious" tag="li" class="li3">虚拟用户帖子</RouterLink>
            	<RouterLink to="/fictitious_user" tag="li" class="li3">虚拟用户管理</RouterLink>
          </ul>
  </el-collapse-item>

    <el-collapse-item>
    <template slot="title">
       &nbsp;&nbsp;<i class=" el-icon-office-building"></i> 领域管理
    </template>
          <ul  class="ul2">
            	<RouterLink to="/field" tag="li" class="li3">领域管理</RouterLink>
          </ul>
  </el-collapse-item>

      <el-collapse-item>
    <template slot="title">
       &nbsp;&nbsp;<i class=" el-icon-money"></i> 提现管理
    </template>
          <ul  class="ul2">
              <RouterLink to="/cash" tag="li" class="li3">提现列表</RouterLink>
          </ul>
  </el-collapse-item>

</el-collapse>

<div style="height: 92vh;overflow: auto;width:100%;background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571394902195&di=9157d412693cd77179a6a07d09caa90e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1b4de9c072b6a7fba46f136137e189fadc8bc751d5dc-Cxf9Xi_fw658);background-size:100% 100%;">
  <router-view style="opacity:0.8"></router-view>
</div>
            
      </div>
  </div>
</template>

<script>
	import axios from "axios";
export default {
  data () {
    return {
      show:false,
      shows:false,
      username:"",
      top:{
        'tops':false
      },
        dialogFormVisible: false,
        form: {
           oldpsd:"",
           newpsd:""
        },
        formLabelWidth: '320px'
    }
  },
    created(){
    this.reveal();
    },
  methods: {
         reveal() {
            this.$axios
                    .post(process.env.HOST+`master/connect`)
                    .then(res => {  
                        var id=res.data.msg
                       //console.log(res)

             if(res.data.result){
                   this.$axios
                      .get(process.env.HOST+`master/get?uid=`+id)
                      .then(res => {
                          //console.log(res);
                           this.username=res.data.username
                      })
                      .catch(error => {
                          console.log(error);
                      });
              }else{
                 this.$message("请重新登录");
              }   

             });
    },
    //注销
    exit(){
       axios
        .post(process.env.HOST+`/master/exit`)
        .then(res => {
              //console.log(res);
              if(res.data.result){
                 this.$message({
                     message: res.data.msg,
                     type: 'success'
                  });
              sessionStorage.token="";
                 this.$router.push({
                     path:'/',
                  });
              }else{
                tt.$message.error(res.data.msg);
              }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //修改密码
    asd(){
            axios({
          url: process.env.HOST+"/master/repsd",
          method: 'post',
          data: {
            oldpsd:this.form.oldpsd,
            newpsd:this.form.newpsd
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
                    //console.log(res);
                     if(res.data.result){
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        }); 
                            this.dialogFormVisible=false
                     }else{
                        this.$message.error(res.data.msg);
                     }  
                })
          .catch(error => {
                    console.log(error);
                });
    },
    menu(){
      if(this.show){
        this.show=false
        this.top.tops=false
      }else{
        this.show=true
        this.top.tops=true

      }
    },
        menus(){
      if(this.shows){
        this.shows=false
      }else{
        this.shows=true
      }
    },

  },

}
</script>


<style scoped>
.a /deep/ .el-collapse-item__header {
     background-color: rgb(73, 72, 72);
    color:rgb(167, 170, 170);
}
.a{
     width: 13%;
     background-color: rgb(73, 72, 72);
}
.a /deep/ .el-collapse-item__content{
    background-color: black;
     color: rgb(164, 166, 170);
     padding-bottom: 0px; 
}
.li3{
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
    cursor:pointer;
   background-color: black;
}
.a /deep/ .el-collapse-item__header{
  font-size: 17px;
  
}
   .head{
      width: 100%;
      height: 7.5vh;
      line-height: 7.5vh;
      border-bottom:solid green 5px;
      display: flex;
   }
   .content{
     display: flex;
   }
   h2{
     margin-left: 20px;
   }
   img{
     width: 40px;
     height: 40px;
     margin-top: 15px;
     cursor:pointer;
   }
   .span1{
     color:rgb(181, 184, 184);
     position: relative;
     top: -15px;
     cursor:pointer;
   }
   .head_portrait{
        margin-left: 85%;
   }
   .head_portrait:hover .span1{
     color: black
   }
   .head_portrait:hover .head_portraits{
      display: block;
      animation: my 0.5s;
   }
   .head_portraits{
     width: 150px;
     border: solid  rgb(181, 184, 184) 2px;
     margin-left: -20px;
     margin-top: -10px;
     display: none;
     text-align: center;
     cursor:pointer;
     position: relative;
     z-index: 999;
     background-color:#fff
   }
   @keyframes my{
     from {transform: translate(0,20px)}
     to {transform: translate(0,0)}
   }
   .li1{
     height: 50px;
     line-height: 50px
   }
   .li1:hover{
       background-color:rgb(236, 236, 236);
   }
   ul{
     list-style:none;
   }
   .li3:hover{
     color: rgb(243, 234, 234);
   }
   .router-link-exact-active{
      background-color: #009688;
      color: aliceblue
   }
   .ul2{
     background-color: rgb(27, 26, 26)
   }
</style>
