<template>
  <div class="todoApp">
    <div class="form-group">
      <h1>write</h1>

      <form role="form">
        <table class="table">
          <caption></caption>
          <colgroup>
            <col width="150">
            <col>
          </colgroup>
          <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input type="text" class="form-control" placeholder="" v-model="title">
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea class="form-control" style="height: 200px;" v-model="desc"></textarea>
            </td>
          </tr>
          <tr>
            <th>첨부파일</th>
            <td>
              <input type="file" class="form-control" v-on:change="fileSelect()" ref="uploadfile">
            </td>
          </tr>
          </tbody>
        </table>

        <div class="clearfix">
          <router-link to="/" tag="button" class="btn btn-default pull-left">list</router-link>
          <button type="button" v-on:click="addList(title, desc)" class="btn btn btn-primary pull-right">write</button>
        </div>
      </form>

    </div>

  </div>
</template>

<script>
  // todoList 컴포넌트 import
  export default {
    name: 'boardWrite',
    data(){
      return {
        title: '',
        desc: '',
        date: '',
        arr_list: [],
        uploadfile: null
      }
    },
    mounted(){

    },
    methods:{
      addList (title, desc){
        if(title){
          this.$http.post('http://localhost:3000/boardListData', {
            title: title,
            desc: desc,
            date: new Date().toISOString().substr(0, 10).replace('T', ' '),
            filename: this.uploadfile.name,
            fileurl: "http://www.neoforth.com"
          }).then((res) => {
            // console.log(res);
            this.arr_list.push(res.data);
            this.title = '';
            this.desc = '';
            this.$router.push('/');
          })
        }
      },
      fileSelect(){
        this.uploadfile = this.$refs.uploadfile.files[0];

      }
    }
  }
</script>

<style scoped>
  form{width:800px; margin:0 auto;}
</style>
