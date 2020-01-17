// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VDistpicker from 'v-distpicker'    // 省市区三联插件
import Axios from 'axios' 


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('v-distpicker', VDistpicker);
Vue.prototype.$axios = Axios;

router.beforeEach((to,from,next)=>{     // 路由导航
    //console.log('to:',to.meta.isLogin);
  if(to.meta.isLogin){
     //console.log('sessionStorage.token:',sessionStorage.token);
      if(sessionStorage.token){
         next();
         Axios.interceptors.request.use(function (config) {
          let token = sessionStorage.token
          if (token) {
              config.headers.token = token;  
              return config;
          }else{
            ElementUI.$message("请刷新");
          }
        });
       }else{
            setTimeout(()=>{
              next('/')
            },1100)
        }
  }else{
    next();
  }
})


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

