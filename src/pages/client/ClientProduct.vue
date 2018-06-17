<template>
<div>
    <div v-for="i in Product" v-if="i.name==id">
      <b-row>
          <b-col cols="4">
              <md-card>
              <md-card-media-cover md-solid>
                <md-card-media md-ratio="1:1">
                  <img :src="i.image" alt="Skyscraper">
                  <img :src="i.image" alt="Skyscraper">
                </md-card-media>
              </md-card-media-cover>
            </md-card>
          </b-col>
          <b-col cols="4">
              <h2>{{i.name}}</h2>
            <h5><span style="font-size: 17px">Khoảng giá: </span>{{i.price}}</h5>
            <h5>Mô tả: </h5>{{i.description}}
            <b-row>
              <router-link :to="{ path: '/mua-sam/gio-hang'}">
                <md-button class="md-primary md-raised "  v-on:click="themGioHang(i['.key'])">Mua sắm</md-button>
              </router-link>
              <md-button class="md-accent md-raised "  v-on:click="themGioHang(i['.key'])">Thêm vào giỏ hàng</md-button>
            </b-row>
            </b-col>
      </b-row>
      
    </div>
</div>
</template>

<script>
import {db} from '../../firebase'

export default {
  data() {
    return {
      id: this.$route.params.id,
      item: '',
      outCart: ''
    }
  },
  firebase: {
    Product: db.ref('infoProduct/'),
  },
  methods: {
    myEvent() {
      this.$emit('papa', this.aaa)
    },
    xemaq() {
       console.log(this.Product);
    },
    themGioHang(item) {
      var i
      for (i = 0; i < this.Product.length; i++) { 
        if(this.Product[i]['.key']==item) {
          this.pushStorage(this.Product[i]);
        }
      }

      // Hiển thị số lượng sản phẩm đặt hàng
      this.$emit('outCart', JSON.parse(localStorage.getItem("cart")).length);
      
    },
    pushStorage(item) {
      if(localStorage.getItem("cart") == null) {
        localStorage.setItem("cart", JSON.stringify([this.OBJ(item)]))
      } else {
        var array=[]
        array=JSON.parse(localStorage.getItem("cart"));       // Lấy giá trị mảng cũ
        array.push(this.OBJ(item));
        localStorage.setItem("cart", JSON.stringify(array))   // Thay thế lại giá trị
      }
    },
    OBJ(item) {
      item["key"] = item[".key"];
      delete item['.key'];
      return item;
    }
  }
}
</script>

<style lang="scss" scoped>
b-col {
    height: 40px;

    &:nth-child(1) {
      background: #1ABC9C;
    }

    &:nth-child(2) {
      background: #FFF;
    }
}
</style>