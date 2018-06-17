<template>
<div>
      <b-table
             stacked="md"
             :items="Customer"
             :fields="fields"
        >
      <template slot="name" slot-scope="row">{{row.value}}</template>
      <template slot="phone" slot-scope="row">{{row.value}}</template>
      <template slot="address" slot-scope="row">{{row.value}}</template>
      <template slot="description" slot-scope="row">{{row.value}}</template>
      <template slot="actions" slot-scope="row">
        <b-button v-b-modal="'deleteModal'" size="sm"  variant="danger"  @click.stop="row.toggleDetails">Sản phẩm đặt mua</b-button>
        <b-button size="sm" @click.stop="deleteCustomer(row.item['.key'])" class="mr-1" variant="success">
          Đã xử lý xong
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-table
             stacked="md"
             :items="row.item.product"
             :fields="fields1"
        >
          <template slot="image" slot-scope="row"><b-img rounded :src="row.value" width="75" height="75"  alt="img"/></template>
          <template slot="name" slot-scope="row">{{row.value}}</template>
          <template slot="price" slot-scope="row">{{row.value}}</template>
          <template slot="type" slot-scope="row">{{row.value}}</template>
        </b-table>
      </template>
    </b-table>
</div>
</template>
<script>
import {db} from '../../firebase'
export default {
  firebase: {
    Customer: db.ref('infoCustomer/'),
  },
  data() {
      return {
      // Thông tin khách hàng
      infoCustomer: {name:'', phone: '', address: '', description: ''},
      fields: [
          { key: 'name', label: 'Tên khách'},
          { key: 'phone', label: 'Số điện thoại',  sortable: true, 'class': 'text-center'},
          { key: 'address', label: 'Địa chỉ', sortable: true, 'class': 'text-center' },
          { key: 'description', label: 'Lời nhắn'},
          { key: 'actions', label: 'Xem thông tin' }
      ],
      fields1: [
        { key: 'image', label: 'Hình ảnh'},
        { key: 'name', label: 'Tên sản phẩm', sortable: true },
        { key: 'price', label: 'Giá', sortable: true, 'class': 'text-center' },
        { key: 'type', label: 'Loại sản phẩm' },
      ]
      }
  },
  methods: {
    deleteCustomer(item) {
      console.log(item);
      this.$firebaseRefs.Customer.child(item).remove()
      
    }
  }
}
</script>
<style scoped>
</style>