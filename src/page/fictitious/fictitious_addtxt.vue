<template>
<div>
      <el-button type="success" class="delete"  @click="ret()">返回列表</el-button><br><br>
      <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="作者:">
    <el-select v-model="ruleForm2.uid" placeholder="请选择作者">
       <div v-for="(item, index) in list" :key="index">
      <el-option  :value="item.id" :label="item.name"></el-option>
       </div>
    </el-select> 
  </el-form-item>
            <el-form-item style="width:30%" label="栏目:">
            <el-select v-model="ruleForm2.field" placeholder="请选择搜索栏目" >
                <div v-for="(field, index) in field" :key="index">
                <el-option  :value="field.id" :label="field.name"></el-option>
                </div>
            </el-select>
          </el-form-item>
          <el-form-item style="width:30%" label="地区:">
            <el-select v-model="ruleForm2.tid" placeholder="请选择搜索地区">
                <div v-for="(tid, index) in tid" :key="index">
                <el-option  :value="tid.id" :label="tid.name"></el-option>
                </div>
            </el-select>
          </el-form-item>
  </el-form>


  <div class="div">
    标题 <br><br>
    <el-input v-model="form.title" placeholder="请输入标题" class="inp"></el-input>
    <br><br>
    摘要 <br><br>
    <el-input v-model="form.description" class="inp"></el-input>
    <el-card style="height: 550px;">
      <quill-editor v-model="form.content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
        <!-- 自定义toolar -->
        <div id="toolbar" slot="toolbar">
          <!-- Add a bold button -->
          <button class="ql-bold" title="加粗">Bold</button>
          <button class="ql-italic" title="斜体">Italic</button>
          <button class="ql-underline" title="下划线">underline</button>
          <button class="ql-strike" title="删除线">strike</button>
          <button class="ql-blockquote" title="引用"></button>
          <button class="ql-code-block" title="代码"></button>
          <button class="ql-header" value="1" title="标题1"></button>
          <button class="ql-header" value="2" title="标题2"></button>
          <!--Add list -->
          <button class="ql-list" value="ordered" title="有序列表"></button>
          <button class="ql-list" value="bullet" title="无序列表"></button>
          <!-- Add font size dropdown -->
          <select class="ql-header" title="段落格式">
            <option selected>段落</option>
            <option value="1">标题1</option>
            <option value="2">标题2</option>
            <option value="3">标题3</option>
            <option value="4">标题4</option>
            <option value="5">标题5</option>
            <option value="6">标题6</option>
          </select>
          <select class="ql-size" title="字体大小">
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px" selected>16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
          <select class="ql-font" title="字体">
            <option value="SimSun">宋体</option>
            <option value="SimHei">黑体</option>
            <option value="Microsoft-YaHei">微软雅黑</option>
            <option value="KaiTi">楷体</option>
            <option value="FangSong">仿宋</option>
            <option value="Arial">Arial</option>
          </select>
          <!-- Add subscript and superscript buttons -->
          <select class="ql-color" value="color" title="字体颜色"></select>
          <select class="ql-background" value="background" title="背景颜色"></select>
          <select class="ql-align" value="align" title="对齐"></select>
          <button class="ql-clean" title="还原"></button>

          <!-- You can also add your own -->
        </div>
      </quill-editor>
    </el-card>
<br><br>
    <!-- 上传 -->
    <el-upload
  action="http://47.94.215.133/master/file/uploadpic"
  list-type="picture-card"
  :on-success="handleAvatarSuccess"
  :file-list="files"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">

</el-dialog>
<br>
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
  import {
    Quill,
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  
  //引入font.css 
  import '../../assets/css/font.css'
  
  // 自定义字体大小
  let Size = Quill.import('attributors/style/size')
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
  Quill.register(Size, true)

  // 自定义字体类型
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ]
  var Font = Quill.import('formats/font')
  Font.whitelist = fonts
  Quill.register(Font, true)

import axios from "axios";
  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    data() {
      return {
          ruleForm2:{
                uid:"",//作者id
                field:"",
                tid:"",
          },
       list:[],
       field:[],
        tid:[],
        files:[],
        img:[],
        img_id:[],
        uploadPics:[],
        form:{
          title:"",
          description:"",
          resource: '',
          desc: '',
          content: null,
          uploadPic:[]
        },
         dialogImageUrl: '',
        dialogVisible: false,
        editorOption: {
            placeholder: "请输入",
            theme: "snow", // or 'bubble' 
            modules: {
                toolbar: {
                container: '#toolbar'
                }
            }
        }
      }
    },
     methods:{
          handleRemove(file, fileList) {
              console.log(file, fileList);
               axios({
            url: process.env.HOST+`master/file/del`,//process.env.HOST+`master/forum/get`
            method: 'post',
            data: {
              id:file.id
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
                if(res.data.result){
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    });
                }else{
                  this.$message(res.data.msg);
                } 
            
          })
        .catch(error => {
                console.log(error);
          });
          },
          show(){
        let data={
              audit:1,
            }
              //栏目
      this.$axios
          .post(process.env.HOST+`master/field/getList`,data)//
          .then(res => {  
              this.field=res.data.pojo
                 // console.log(  this.field)
           }) 
          .catch(error => {
                console.log(error);
          });
//地区
      this.$axios
          .post(process.env.HOST+`master/fcate/list`,data)//
          .then(res => {  
              this.tid=res.data
                  //console.log(res)
           }) 
          .catch(error => {
                console.log(error);
          });

              //虚拟用户作者id
             axios({
              url:process.env.HOST+`master/user/list`,
              method: 'post',
              data: {
                 grades:1
              },
              transformRequest: [function (data) {
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
                 var list=res.data.pojo.list;
                  for(var i=0;i<list.length;i++){
                      this.list.push({name:list[i].name,id:list[i].id})
                  }
                    console.log("00000",this.list);

                })
          .catch(error => {
                    console.log(error);
                });
          },
          handlePictureCardPreview(file) {
             this.dialogImageUrl = file.url;
              this.dialogVisible = true;
              console.log(file.url);
          },
          //上传图片
            handleAvatarSuccess(res, file) {//图片上传成功
                  console.log(res,this.form.uploadPic.length);
                  if(this.form.uploadPic.length>2){
                      this.$message("最多上传三张");
                      return
                  }else{
                     this.form.uploadPic.push(res.pojo.id)
                  }
            },

                //添加
          onSubmit() {
              var data={
                    uid:this.ruleForm2.uid,
                    title:this.form.title,
                    description  :this.form.description,
                    content:this.form.content,
                    audit:this.form.resource,
                    messages:this.form.desc,
                    uploadPic : this.form.uploadPic,
                    tid:this.ruleForm2.tid,
                    field:this.ruleForm2.field
              }
              console.log("data",data);
      this.$axios
          .post(process.env.HOST+`master/forum/add`,data)//process.env.HOST+`master/forum/edit`
          .then(res => {  
                  console.log(res)
              if(res.data.result){
                  this.$message({
                     message: res.data.msg,
                     type: 'success'
                  });
            this.$router.push({
                  path:'/fictitious',
            });
              }else{
                 this.$message(res.data.msg);
              } 
           }) 
          .catch(error => {
                console.log(error);
          });
            },
              //返回  
            ret(){
              this.$router.push({
                  path:'/fictitious',
                  // query: {
                  //     page:this.$route.query.page,
                  //     size:this.$route.query.size
                  // }
              });
            },
      },
    created(){
          this.show()
    },
  }
</script>
<style scoped>
.inp{
  width: 50%;
}
.delete{
    background-color:#009688;
    margin: 10px;
}
.div{
  text-align: center
}
.img{
   display: flex;
   justify-content:space-around;
}
.img :hover .div_img{
      display: block;    
      
}
.div_img{
    width: 500px;
    height: 50px;
    display: none;
    cursor:pointer;
    line-height: 50px
}
</style>

