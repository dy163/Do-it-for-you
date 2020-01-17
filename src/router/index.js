import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import postss from '../page/content/postss' //帖子管理
import posts from '../page/content/posts' //待审核帖子管理
import user_list from '../page/content/user_list' //待审核帖子管理
import sign from '../page/sign'//登录
import settled_examine from '../page/content/settled_examine' //入驻审核
import settled from '../page/content/settled' //入驻管理
import postss_details from '../page/content/postss_details' //帖子详情
import posts_details from '../page/content/posts_details' //待审核帖子详情
import settled_details from '../page/content/settled_details' //入驻帖子详情
import field from '../page/field/field' //领域
import field_add from '../page/field/field_add' //领域新增  
import field_modify from '../page/field/field_modify' //领域修改 
import user from '../page/user/user' //用户列表 
import user_details from '../page/user/user_details' //用户详情
import user_add from '../page/user/user_add' //用户新增  
import user_edit from '../page/user/user_edit' //用户修改  
import user_sign from '../page/user/user_sign' //用户登录  
import user_diction from '../page/user/user_diction' //用户权限  
import group from '../page/group/group' //权限组 
import group_details from '../page/group/group_details' //权限组详情
import group_add from '../page/group/group_add' //权限组新增 
import group_edit from '../page/group/group_edit' //权限组修改 
import group_grant from '../page/group/group_grant' //权限组授权 
import cash from '../page/cash/cash' //提现列表 
import cash_examine from '../page/cash/cash_examine' //提现审核 
import menu from '../page/menu/menu' //菜单列表  
import menu_add from '../page/menu/menu_add' //菜单新增 
import  menu_details from '../page/menu/menu_details' //菜单子列表 
import  menu_edit from '../page/menu/menu_edit' //菜单修改
import  fictitious_user from '../page/fictitious/fictitious_user' //虚拟用户
import  fictitious_txt from '../page/fictitious/fictitious_txt' //虚拟帖子
import  fictitious_det from '../page/fictitious/fictitious_det' //虚拟修改
import  fictitious from '../page/fictitious/fictitious' //虚拟帖子列表
import  fictitious_addtxt from '../page/fictitious/fictitious_addtxt' //虚拟帖子





Vue.use(Router)

export default new Router({
  routes: [
    //登录 
    {
      path: '/',
      name: 'sign',
      component: sign
    },
    //主页面
    {
      path: 'home',
      name: 'home',
      children:[
        //帖子
        {
          path: '/postss',
          name: 'postss',
          component: postss,
           meta:{isLogin:true}
        },
        //待审核帖子
        {
          path: '/posts',
          name: 'posts',
          component: posts,
            meta:{isLogin:true}
        },
        //帖子详情
        {
          path: '/postss_details',
          name: 'postss_details',
          component: postss_details,
          meta:{isLogin:true},
        },
        //帖子详情
        {
          path: '/posts_details',
          name: 'posts_details',
          component: posts_details,
          meta:{isLogin:true},
        },
        //注册用户
        {
          path: '/user_list',
          name: 'user_list',
          component: user_list,
          meta:{isLogin:true},
        },

        //入驻审核
        {
          path: '/settled_examine',
          name: 'settled_examine',
          meta:{isLogin:true},
          component: settled_examine
        },
        //入驻帖子详情
        {
          path: '/settled_details',
          name: 'settled_details',
          meta:{isLogin:true},
          component: settled_details
        },
        //入驻        
        {
          path: '/settled',
          name: 'settled',
          meta:{isLogin:true},
          component: settled
        },
        //领域      
        {
          path: '/field',
          name: 'field',
          meta:{isLogin:true},
          component: field
        },
        //领域修改     
        {
          path: '/field_modify',
          name: 'field_modify',
          meta:{isLogin:true},
          component: field_modify
        },
        //领域新增 
        {
          path: '/field_add',
          name: 'field_add',
          meta:{isLogin:true},
          component: field_add
        },
        //用户列表 
        {
          path: '/user',
          name: 'user',
          meta:{isLogin:true},
          component: user
        },
          //用户详情  
        {
          path: '/user_details',
          name: 'user_details',
          meta:{isLogin:true},
          component: user_details
        },
        //用户权限 
        {
          path: '/user_diction',
          name: 'user_diction',
          meta:{isLogin:true},
          component: user_diction
        },
        //用户登录
        {
          path: '/user_sign',
          name: 'user_sign',
          meta:{isLogin:true},
          component: user_sign
        },
          //用户新增
          {
            path: '/user_add',
            name: 'user_add',
            meta:{isLogin:true},
            component: user_add
          },
          //用户修改 
          {
            path: '/user_edit',
            name: 'user_edit',
            meta:{isLogin:true},
            component: user_edit
          },
        //权限组  
        {
          path: '/group',
          name: 'group',
          meta:{isLogin:true},
          component: group
        },
        //权限组详情 
        {
          path: '/group_details',
          name: 'group_details',
          meta:{isLogin:true},
          component: group_details
        },
        //权限组新增  
        {
          path: '/group_add',
          name: 'group_add',
          meta:{isLogin:true},
          component: group_add
        },
        //权限组修改  
        {
          path: '/group_edit',
          name: 'group_edit',
          meta:{isLogin:true},
          component: group_edit
        },
        //权限组授权
        {
          path: '/group_grant',
          name: 'group_grant',
          meta:{isLogin:true},
          component: group_grant
        },
        //提现列表  
        {
          path: '/cash',
          name: 'cash',
          meta:{isLogin:true},
          component: cash
        },
        //提现审核  
        {
          path: '/cash_examine',
          name: 'cash_examine',
          meta:{isLogin:true},
          component: cash_examine
        },
        //菜单列表 
        {
          path: '/menu',
          name: 'menu',
          meta:{isLogin:true},
          component: menu
        },
        //菜单新增 
        {
          path: '/menu_add',
          name: 'menu_add',
          meta:{isLogin:true},
          component: menu_add
        },
        //菜单字列表  
        {
          path: '/menu_details',
          name: 'menu_details',
          meta:{isLogin:true},
          component:menu_details
        },
        //菜单修改  
        {
          path: '/menu_edit',
          name: 'menu_edit',
          meta:{isLogin:true},
          component:menu_edit
        },
        //虚拟帖子 
        {
          path: '/fictitious_txt',
          name: 'fictitious_txt',
          meta:{isLogin:true},
          component:fictitious_txt
        },
        //虚拟用户 
        {
          path: '/fictitious_user',
          name: 'fictitious_user',
          meta:{isLogin:true},
          component:fictitious_user
        },
        //虚拟用户修改 
        {
          path: '/fictitious_det',
          name: 'fictitious_det',
          meta:{isLogin:true},
          component:fictitious_det
        },
        //虚拟帖子列表
        {
          path: '/fictitious',
          name: 'fictitious',
          meta:{isLogin:true},
          component:fictitious
        },
        //发布虚拟帖子
        {
          path: '/fictitious_addtxt',
          name: 'fictitious_addtxt',
          meta:{isLogin:true},
          component:fictitious_addtxt
        },
      ],
      component: home
    },

    
  ]
})
