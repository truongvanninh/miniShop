<template>
<div class="page-container">
  <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="/" style="color:#fff; font-size:20px;" class="mr-5">Hoàng Huấn</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav style="width: 400px;">
      <b-nav-form>
        <b-form-input style="width: 270px;" size="sm" class="mr-sm-1" type="text" placeholder="Tìm kiếm sản phẩm ..."/>
        <b-button size="sm" class="my-2 my-sm-0" @click="myRef()">Tìm kiếm</b-button>
      </b-nav-form>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <router-link :to="{ path: '/mua-sam/gio-hang'}">
        <b-button variant="primary">
          <md-icon>shopping_cart</md-icon>Giỏ hàng <b-badge variant="light">{{NCart}}</b-badge>
        </b-button>
      </router-link>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

<!-- navbar-1.vue -->
    <md-app>
      <md-app-drawer md-permanent="clipped">
        <md-list>
          <a href="/#/">
          <md-list-item v-on:click="chuyen('veston-nam')">
            <md-icon><img src="@/assets/icon/vesnam.jpg"></md-icon>
            <span class="md-list-item-text">Veston nam</span>
          </md-list-item>
          </a>
          <!-- <router-link :to="{ path: '/veston-nu'}"> -->
           <a href="/#/">
          <md-list-item v-on:click="chuyen('veston-nu')">
            <md-icon><img src="@/assets/icon/vesnu.jpg"></md-icon>
            <span class="md-list-item-text">Veston nữ</span>
          </md-list-item>
          </a>
          <a href="/#/">
          <md-list-item v-on:click="chuyen('quan')">
            <md-icon><img src="@/assets/icon/quan.png" ></md-icon>
            <span class="md-list-item-text">Quần</span>
          </md-list-item>
          </a>
          <a href="/#/">
          <md-list-item v-on:click="chuyen('ao-so-mi')">
            <md-icon><img src="@/assets/icon/aosomi.jpg"></md-icon>
            <span class="md-list-item-text">Áo sơ mi</span>
          </md-list-item>
          </a>
        </md-list>
      </md-app-drawer>

      <md-app-content  style="padding-bottom: 280px;">
      <router-view v-bind:type="val" v-on:outCart="Cart($event)"></router-view>  
      </md-app-content>
    </md-app>
</div>
</template>

<script>
import Router from 'vue-router'
export default {
  data() {
    return {
      NCart: 0,
      val: 'veston-nam',
    }
  },
  created: function(){
    if(JSON.parse(localStorage.getItem("cart"))!=null) {
      this.NCart=JSON.parse(localStorage.getItem("cart")).length
    }
  },
  methods: {
    Cart(event) {
      console.log(event);
      this.NCart = event;
    },
    chuyen(item) {
      this.val = item
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-card {
    width: 260px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    padding: 5px;
  }
  md-app-content {
    padding-bottom: 100px;
  }
</style>
