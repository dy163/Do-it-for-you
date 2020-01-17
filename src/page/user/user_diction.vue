<template>
<!-- 用户权限 -->
  <div>
      <el-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          style="width: 100%;"
          border
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
          <el-table-column
          type="selection"
          align="center"
          width="100">
          </el-table-column>
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="130px">
        </el-table-column>

          <el-table-column
          prop="title"
          label="权限名称"
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
          prop="pid"
          label="权限id"
          >
          </el-table-column>

        <el-table-column
          prop="name"
          align="center"
          label="权限方法"
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
      </el-table>
        <el-pagination @size-change="handleSizeChange" 
              @current-change="handleCurrentChange" 
              :current-page="currentPage" 
              :page-sizes="pageSizes" 
              :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
              :total="totalCount"
              class="paging">
        </el-pagination>
  </div>
</template>

<script>
    import axios from "axios";
export default {
  data () {
    return {
      list:[],
                // 总数据
          tableData:[],
          // 默认显示第几页
          currentPage:1,
          // 总条数，根据接口获取数据长度(注意：这里不能为空)
          totalCount:1,
          // 个数选择器（可修改）
          pageSizes:[10,20,50,100],
          // 默认每页显示的条数（可修改）
          PageSize:10,
     }
  },
  methods: {
    show() {
        this.$axios
            .post(process.env.HOST+`master/auth`)//`http://192.168.3.160:8080/bbs_war/master/auth`
            .then(res => {  
                this.list=res.data;
                   // 将数据赋值给tableData
                   this.tableData=res.data
                   // 将数据的长度赋值给totalCount
                   this.totalCount=res.data.length
                console.log(res)   
          })
    },
     // 分页
        // 每页显示的条数
       handleSizeChange(val) {
           // 改变每页显示的条数 
           this.PageSize=val
           // 注意：在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage=1
       },
         // 显示第几页
       handleCurrentChange(val) {
           // 改变默认的页数
           this.currentPage=val
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
//详情
     details(id){
         console.log(id)
      },
  },
    created(){
       this.show();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paging{
    text-align: center;
    margin-top: 100px
}
</style>
