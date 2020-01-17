<template>
<!-- 子级菜单列表 -->
  <div>
  <el-button @click="ret" class="head">返回列表</el-button>
        <el-table
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
          <el-table-column
          type="selection"
          width="50">
          </el-table-column>
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="100px">
        </el-table-column>

          <el-table-column
          prop="title"
          label="子级名称"
          >
              <template slot-scope="scope">
                <div 
                @click="details(scope.row.id)"
                  style="cursor:pointer;"
                  >
                    {{scope.row.title}}
                 </div>
               </template>
          </el-table-column>

          <el-table-column
          align="center"
          prop="id"
          label="id"
          >
          </el-table-column>

          <el-table-column
          align="center"
          prop="name"
          label="方法"
          width="200"
          >
          </el-table-column>

          <el-table-column
          align="center"
          label="状态"
          width="200"
          >

          <template slot-scope="scope" >
            <div v-if="scope.row.status==0">禁用</div>
            <div v-else-if="scope.row.status==1">启用</div>
            </template>

          </el-table-column>
          <el-table-column
          label="操作"
          align="center"
            width="300"
          >  
          <template slot-scope="scope">
              <el-button  @click="edit(scope.row)">修改</el-button>
              <el-button  @click="del(scope.row.id)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
    import axios from "axios";
export default {
  data () {
    return {
      list:[]
    }
  },
  methods: {
    show() {
      axios({
          url: process.env.HOST+`master/controller/this`,
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
                  this.list=res.data
                  console.log(this.list);
              })
        .catch(error => {
                  console.log(error);
          });
    },
//多选
	 handleSelectionChange(val) {
          this.multipleSelection=[];
          for(var i=0;i<val.length;i++){
              this.multipleSelection.push(val[i].id);
          }
              console.log(this.multipleSelection )
      },
      val(){
           this.value2=false
            console.log(this.value2)
      },
//返回
      ret(){
         this.$router.push({
            path:'/menu',
         });
      },
//详情
     details(id){
         console.log(id)
          axios({
              url: process.env.HOST+`master/controller/this`,
              method: 'post',
              data: {
                id:id
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
                      this.list=res.data
                      console.log(this.list);
                  })
            .catch(error => {
                      console.log(error);
              });
      },
//修改
      edit(row){
         console.log(row)
         this.$router.push({
            path:'/menu_edit',
            query: {row: row }
         });
      },
           //删除
     del(id){
       console.log(id)
       axios
        .get(process.env.HOST+`master/controller/delete?id=`+id)
        .then(res => {
            console.log(res);
            if(res.data.result){
              this.$message({
                  message: res.data.msg,
                  type: 'success'
              }); 
            }else{
              this.$message.error(res.data.msg);
            }         
            this.show()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
    background-color:#009688;
    margin: 10px;
    height: 50px;
    color: aliceblue
}
</style>
