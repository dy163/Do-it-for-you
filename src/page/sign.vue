<template>
<!-- 登录 -->
  <div class="sign">
    <div class="div1">
        <h2>帮你办后台管理</h2>
        <br><br>
         <input type="text" v-model="phone" placeholder=" 请输入账号" class="inp1"/>
        <br><br>
        <input type="password" v-model="pwd" placeholder=" 请输入密码"  class="inp1"/>
        <br><br>
        <input type="text" v-model="yzm" placeholder=" 验证码" class="inp2">
<!--  -->
         <yzm id="one" @code="comeCode"></yzm>
<!--  -->
        <br> <br>
        <div @click="login" class="div">立即登录</div>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
import yzm from "../page/identifying/yzm";
export default {
  data () {
    return {
        phone:"",
        pwd:"",
        yzm: "",
        code1: "",
    }
  },
   components: { yzm },
  methods: {
    login(){
      const tt = this;
      tt.code1 = tt.code1.toLowerCase();
      //console.log( tt.code1)
      tt.yzm = tt.yzm.toLowerCase();
      //console.log( tt.yzm)
    if(tt.phone=="" || tt.pwd=="" || tt.yzm==""){
           tt.$message.error("请填写完整");      
    }else{
     if (tt.code1 === tt.yzm){
         //`http://shequ.yidonghuayuan.com/manage/master/land`
         axios.post(process.env.HOST+"master/landin",{username:this.phone,password:this.pwd})
         .then(res=>{
          //console.log('登录 res:',res);
         if(res.data.result){
           sessionStorage.token=res.data.pojo.sessionid;
          //  sessionStorage.token=true;
           //console.log(sessionStorage.token);
           tt.$message({
              message: res.data.msg,
              type: 'success'
             });
            this.$router.push('/posts');
         }else{
           tt.$message.error(res.data.msg);
         }
      }).catch(err=>{
        console.log("err:",1);
           this.$message("请刷新后登录");      
      })
     }else{
          tt.$message.error("验证码错误");
     }
  }
    },
    comeCode(code) {
      this.code1 = code;
      //console.log(this.code1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sign{
    width: 100%;
    height: 100vh;
    background-color: #179898
}
.div1{
    width: 420px;
    height: 420px;
    background-color: #fff;
    text-align: center;
    position: absolute;
        top:50%;
        left:50%;
    margin:-250px 0 0 -220px;
}
h2{
    margin-top: 50px
}
.inp1{
    height: 35px;
    width: 250px;
}
.inp2{
    height: 35px;
    width: 100px;
    margin-left: -150px
}
.div{
    width: 250px;
    height: 35px;
    background-color:#009688;
    margin-left: 80px;
    text-align: center;
    line-height: 35px;
    color: #fff;
    cursor:pointer;
}
</style>
