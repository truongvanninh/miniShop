<template>
<div class="page-container">
  <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="/" style="color:#fff; font-size:20px;" class="mr-5">Hoàng Huấn</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">Hoàng Huấn
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item @click="mySignout">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

<!-- navbar-1.vue -->
    <md-app>
      <md-app-drawer md-permanent="clipped">
        <md-list>
          <router-link :to="{ path: '/hoanghuan'}">
            <md-list-item>
              <md-icon><i class="material-icons">assignment_ind</i></md-icon>
              <span class="md-list-item-text">Khách hàng</span>
            </md-list-item>
          </router-link>
          <router-link :to="{ path: '/hoanghuan/khach-mua'}">
            <md-list-item>
              <md-icon><i class="material-icons">shopping_cart</i></md-icon>
              <span class="md-list-item-text">Khach mua</span>
            </md-list-item>
          </router-link>
          <router-link :to="{ path: '/hoanghuan/san-pham'}">
            <md-list-item>
              <md-icon><i class="material-icons">account_balance_wallet</i></md-icon>
              <span class="md-list-item-text">Sản phẩm</span>
            </md-list-item>
          </router-link>
          <router-link :to="{ path: '/hoanghuan/vai'}">
            <md-list-item>
              <md-icon><i class="material-icons">turned_in</i></md-icon>
              <span class="md-list-item-text">Vải</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content style="padding:0px;padding-bottom: 450px;">
        <router-view></router-view>  
      </md-app-content>
    </md-app>
</div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    mySignout() {
      firebase.auth().signOut()
      this.$router.push('/dang-nhap')
    }
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

</style>
