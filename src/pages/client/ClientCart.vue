<template>
<div>
      <b-table
             stacked="md"
             :items="items"
             :fields="fields"
        >
      <template slot="image" slot-scope="row"><b-img rounded :src="row.value" width="75" height="75"  alt="img"/></template>
      <template slot="name" slot-scope="row">{{row.value}}</template>
      <template slot="price" slot-scope="row">{{row.value}}</template>
      <template slot="type" slot-scope="row">{{row.value}}</template>
      <template slot="actions" slot-scope="row">
        <b-button v-b-modal="'deleteModal'" size="sm"  variant="danger" @click.stop="deleteProduct(row.item)">Xóa</b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <b-btn v-b-modal.modalPrevent variant="warning">Tiến hành đặt hàng</b-btn>
    <!-- Modal Component -->
    <b-modal id="modalPrevent"
             ref="modal"
             title="Nhập thông tin của bạn"
             @ok="sendInfoOk"
             @shown="clearName">
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text"
        placeholder="Tên của bạn"
        v-model="infoCustomer.name"></b-form-input> <br>
        <b-form-input type="text"
        placeholder="Số điện thoại"
        v-model="infoCustomer.phone"></b-form-input><br>
        <b-form-input type="text"
        placeholder="Địa chỉ"
        v-model="infoCustomer.address"></b-form-input><br>
        <b-form-input type="text"
          placeholder="Chú thích"
          v-model="infoCustomer.description"></b-form-input>
      </form>
    </b-modal>
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
      items: JSON.parse(localStorage.getItem("cart")),
      fields: [
          { key: 'image', label: 'Hình ảnh'},
          { key: 'name', label: 'Tên sản phẩm', sortable: true },
          { key: 'price', label: 'Khoảng giá', sortable: true, 'class': 'text-center' },
          { key: 'type', label: 'Loại sản phẩm' },
          { key: 'actions', label: 'Thiết lập' }
      ],

      // Thông tin khách hàng
      infoCustomer: {name:'', phone: '', address: '', description: '', product: ''}
      }
  },
    methods: {
  clearName () {
    this.infoCustomer = {name:'', phone: '', address: '', description: ''}
  },
  sendInfoOk (evt) {
    // Prevent modal from closing
    evt.preventDefault()
    if (!this.infoCustomer.name || !this.infoCustomer.phone) {
      alert('Vui lập nhập đầy đủ thông tin của bạn')
    } else {
      this.handleSubmit()
    }
  },
  handleSubmit () {
    // Thêm vào cơ sở dữ liệu
    console.log(this.items);
     this.infoCustomer.product = this.items;
     console.log(this.infoCustomer.product);
    this.$firebaseRefs.Customer.push(this.infoCustomer)
    
    this.clearName()
    this.$refs.modal.hide()
    // Xóa dữ liệu Local
    localStorage.removeItem('cart');
    window.location.replace("http://localhost:8080");
    this.items=''
  },
  // Xóa sản phảm đã chọn
  deleteProduct(item) {
    // console.log(item.key);
    // console.log(JSON.parse(localStorage.getItem("cart")));
    
    var array=[];
    var newcart=[];
    var i;
    array=JSON.parse(localStorage.getItem("cart"));       // Lấy giá trị mảng cũ
    
    for (i=0; i < this.items.length; i++) {
      if(this.items[i].key!=item.key) {
        newcart.push(this.items[i]);
      }
    }
    localStorage.setItem("cart", JSON.stringify(newcart))
    this.items= JSON.parse(localStorage.getItem("cart"));
    this.$emit('outCart', JSON.parse(localStorage.getItem("cart")).length);
  }
}
}
</script>
<style scoped>
</style>