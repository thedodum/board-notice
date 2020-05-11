<template>
  <div class="todoApp">
    <div class="form-group">
      <h1>write</h1>

      <form role="form">
        <table class="table text-left">
          <caption></caption>
          <colgroup>
            <col width="150">
            <col>
          </colgroup>
          <tbody>
          <tr>
            <th>제목</th>
            <td>
              <validation-provider rules="minmax:3,8" v-slot="{ errors }">
                <input type="text" class="form-control" placeholder="" v-model="title">
                <span class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
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
              <input type="file" id="file-upload" class="form-control" v-on:change="fileSelect()" ref="listUploadFile">
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
  import { ValidationProvider, extend } from 'vee-validate';
  import { required } from 'vee-validate/dist/rules';

  export default {
    name: 'boardWrite',
    data(){
      return {
        title: '',
        desc: '',
        date: '',
        arr_list: [],
        listUploadFile: null,
        value: ''
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
            filename: this.listUploadFile.name,
            fileurl: "http://www.neoforth.com"
          }).then((res) => {
            // console.log(res);
            this.arr_list.push(res.data);
            this.title = '';
            this.desc = '';
            this.$router.push('/');
          })
        }

        // this.submit();
      },
      fileSelect(){
        this.listUploadFile = this.$refs.listUploadFile.files[0];
      },
      submit(){
        const formData = new FormData();
        formData.append('listTitle', this.title);
        formData.append('listContents', this.desc);
        formData.append('listUploadFile', this.listUploadFile);

        for (let key of formData.entries()) {
          console.log(key);
        }

        this.$http.post('http://localhost:3000/boardListData', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res);

        }).catch((err) => {
          console.log(err);
        })
      }
    },
    components: {
      ValidationProvider
    },
  }

  extend('positive', value => {
    return value >= 0;
  });

  extend('odd', value => {
    return value % 2 !== 0;
  });

  extend('min', {
    validate(value, args){
      return value.length >= args.length;
    },
    params: ['length']
  });

  extend('minmax', {
    validate(value, args){
      // const length = value.length;
      return value.length >= args.min && value.length <= args.max;
    },
    params: ['min', 'max']
  });
</script>

<style scoped>
  form{width:800px; margin:0 auto;}
</style>
