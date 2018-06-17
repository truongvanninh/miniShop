<template>
<div>
    <!-- Danh sách sản phẩm -->
    <div v-for="i in Product" style="display:inline-block" v-if="i.type==type">
      <router-link :to="{ path: '/san-pham/'+ i.name}">
        <md-card>
          <b-card-group>
        <b-card :title="i.name"
                :img-src="i.image"
                img-alt="Img"
                img-top>
            
            <div slot="footer">
              Khoảng giá: {{i.price}} Đ
            </div>
        </b-card>
      </b-card-group>
        </md-card>
      </router-link>
      
      
    </div>

</div>
</template>

<script>
import {db} from '../../firebase'
export default {
  props: ['type', 'cart'],
  firebase: {
      Product: db.ref('infoProduct')
  },
  data() {
    return {
    }
  },
  created() {
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
