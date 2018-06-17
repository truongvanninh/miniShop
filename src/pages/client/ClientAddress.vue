<template>
  <b-container fluid>
    <b-row class="my-1">
      <b-col sm="1"><label>Tên bạn: </label></b-col>
      <b-col sm="4"><b-form-input  :type="'text'"></b-form-input></b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="1"><label>Địa chỉ: </label></b-col>
      <b-col sm="4"><b-form-input  :type="'text'"></b-form-input></b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="1"><label>Số điện thoại: </label></b-col>
      <b-col sm="4"><b-form-input  :type="'tell'"></b-form-input></b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="1"><label>Email: </label></b-col>
      <b-col sm="4"><b-form-input  :type="'email'"></b-form-input></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      types: [
        'text', 'password', 'email', 'number', 'url',
        'tel', 'date', `time`, 'range', 'color'
      ]
    }
  }
}
</script>