<template>
  <div style="text-align: center;">
    <div  class="login">
        <p><input type="text" v-model="email" name="login" value="" placeholder="Nhập email"></p>
        <p><input type="password" v-model="password" name="password" value="" placeholder="Nhập mật khẩu"></p>
        <p class="submit"><button @click="myLogin">Đăng nhập</button></p>
      </div>
  </div>
</template>

<script>
import {auth} from '../firebase'
  export default {
    name: 'FormValidation',
    data: () => ({
      email: '',
      password: ''
      
    }),
    methods: {
        myLogin() {
            console.log(this.email, this.password);
            
            if(auth.signInWithEmailAndPassword(this.email, this.password)) {
                this.$router.push('/hoanghuan')    
            }
               
        }
    }
  }
</script>

<style lang="scss" scoped>
.login {
    background: #fff;
    display: inline-block;
    padding: 40px;
    margin: 50px auto;
}
input {
    width: 277px;
}
button {
    background: #1ab;
}
</style>