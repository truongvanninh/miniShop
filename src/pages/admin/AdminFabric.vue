<template>
<div>
  <b-container fluid>
    <!-- Interface controls -->
    <b-row>
      <b-col md="4" class="my-1">
        <b-form-group class="mb-0">
           <b-input-group>
            <b-input-group-text slot="append" :disabled="!filter" @click="filter = ''">
                <strong class="text-danger">X</strong>
            </b-input-group-text>
            <b-form-input v-model="filter" placeholder="Tìm sản phẩm"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="3" class="mt-1">
        <b-form-select v-model="selected" :options="selectPR" class="mb-3" :click="selectedProduct(selected)"></b-form-select>
      </b-col>
      <b-col md="3" class="my-1 ml-auto" right>
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 ml-5" />
      </b-col>
      <b-col md="1" class="my-1" right>
        <b-form-group class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Bảng dữ liệu -->
    <b-table
             stacked="md"
             :items="Product"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
    >
      <template slot="image" slot-scope="row"><b-img rounded :src="row.value" width="75" height="75"  alt="img"/></template>
      <template slot="name" slot-scope="row">{{row.value}}</template>
      <template slot="price" slot-scope="row">{{row.value}}</template>
      <template slot="type" slot-scope="row">{{row.value}}</template>
      <template slot="actions" slot-scope="row">
        <b-button v-b-modal="'deleteModal'" size="sm"  variant="danger" @click.stop="infoDelete(row.item)">Xóa</b-button>
        <b-button size="sm" @click.stop="infoUpdate(row.item, row.index, $event.target)" class="mr-1" variant="success">
          Sửa thông tin
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Delete modal -->
    <b-modal id="deleteModal" :title="'Xóa sản phẩm: ' + this.itemDelete.name" @ok="deleteItem">     
      <b-media>
        <img :src="itemDelete.image" width="95" alt="Sản phẩm" style="float: left"/>
        <div  style="display:inline-block; " class="ml-3 pt-0">
          <b-alert show variant="danger" style="color:#ff5252;"> 
            <md-icon style="color:#ff5252;">report_problem</md-icon > Hình ảnh, dữ liệu của sản phẩm sẽ bị xóa !<br>
            <md-icon style="color:#ff5252;">report_problem</md-icon> Bạn không thể khôi phục dữ liệu khi đã xóa !
          </b-alert>
        </div>
      </b-media>
      <div slot="modal-ok" >
        Xóa sản phẩm
      </div>
      <div slot="modal-cancel">
        Không xóa
      </div>
    </b-modal>
    <!-- Update modal -->
    <b-modal  
              size="lg" 
              id="modalUpdate" 
              @ok="updateOk"
              :title="modalUpdate.title">
      <b-row >
        <b-col style="text-align: center">
          <img :src="itemUpdate.image" alt="">
        </b-col>
        <b-col>
          <form  @submit.stop.prevent="handleSubmit">
            <b-form-input type="text"
                    placeholder="Tên sản phẩm"
                    v-model="itemUpdate.name"
                    :value="itemUpdate.name"
                    ></b-form-input> <br>
            <b-form-input type="text"
                    placeholder="Giá"
                    v-model="itemUpdate.price"
                    :value="itemUpdate.price"
                    ></b-form-input> <br>
            <b-form-input type="text"
                    placeholder="Mô tả"
                    v-model="itemUpdate.description"
                    :value="itemUpdate.description"
                    ></b-form-input> <br>
            <b-form-select v-model="itemUpdate.type" :options="addSelect" class="mb-3"></b-form-select><br>
            <div>
                <input type="file" multiple accept="image/*" @change="detectFiles($event.target.files)">
                <div class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</div>
            </div>
          </form>
        </b-col>
      </b-row>
      <div slot="modal-ok" >
        Cập nhật 
      </div>
      <div slot="modal-cancel">
        Hủy
      </div>
    </b-modal>
  </b-container>

  <!-- Thêm sản phẩm -->
  <md-button class="md-fab md-primary" style="position:fixed; top: 270px;right: 0;" v-b-modal.modalPrevent>
      <md-icon>add</md-icon>
      <md-tooltip md-direction="top">Thêm sản phẩm</md-tooltip>
  </md-button>
  <b-modal size="lg"
            id="modalPrevent"
            ref="modal"
            title="Nhập thông tin vải"
            @ok="addProductOk">
    <form  @submit.stop.prevent="handleSubmit">
      <b-form-input type="text"
              placeholder="Tên sản phẩm"
              v-model="infoProduct.name"
              ></b-form-input> <br>
      <b-form-input type="text"
              placeholder="Giá"
              v-model="infoProduct.price"
              ></b-form-input> <br>
      <b-form-input type="text"
              placeholder="Mô tả"
              v-model="infoProduct.description"
              ></b-form-input> <br>
      <b-form-select v-model="infoProduct.type" :options="addSelect" class="mb-3"></b-form-select><br>
      <div>
          <input type="file" multiple accept="image/*" @change="detectFiles($event.target.files)">
          <div class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</div>
      </div>
    </form>
    <div slot="modal-ok">
      Thêm sản phẩm
    </div>
    <div slot="modal-cancel">
      Hủy
    </div>
  </b-modal>
</div>
</template>

<script>
import {storage} from '../../firebase'
import {storageRef} from '../../firebase'
import {db} from '../../firebase'

const infoProduct = {nameImage: '', image: '', name: '', price: '', description: '', type:'Veston nam'}

const items = []

export default {
firebase: {
    Product: db.ref('infoFabric'),
  },
  data () {
    return {
      // Chọn danh mục sản phẩm
      selected: null,
      selectPR: [
        { value: null, text: 'Tất cả sản phẩm' },
        { value: 'kaki', text: 'kaki' },
        { value: 'lanh', text: 'lanh' },
        { value: 'cotton', text: 'cotton' },
        { value: 'nỉ', text: 'nỉ'}
      ],
      addSelect: [
        { value: 'kaki', text: 'kaki' },
        { value: 'lanh', text: 'lanh' },
        { value: 'cotton', text: 'cotton' },
        { value: 'nỉ', text: 'nỉ'}
      ],
      // Dữ liểu bảng sản phẩm
      fields: [
        { key: 'image', label: 'Hình ảnh'},
        { key: 'name', label: 'Tên vải', sortable: true },
        { key: 'price', label: 'Giá', sortable: true, 'class': 'text-center' },
        { key: 'type', label: 'Loại vải' },
        { key: 'actions', label: 'Thiết lập' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      pageOptions: [ 10, 20, 30],
      sortBy: null,
      sortDesc: false,
      filter: null,
      // Upload image
      progressUpload: 0,
      file: File,
      uploadTask: '',
      downloadURL: '',
      myFile: '',
      // Update
      itemUpdate: '',
      modalUpdate: { title: '', content: '' },
      // Delete
      itemDelete: '',
      // Data 
      infoProduct: infoProduct,
    }
  },
  computed: {
    sortOptions () {  // Bảng dữ liệu Bootstrap
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    selectedProduct(item) {
      this.filter=item

    },
    onFiltered (filteredItems) {   // Bảng dữ liệu Bootstrap
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    // Image upload
    detectFiles (fileList) {
      Array.from(Array(fileList.length).keys()).map( x => {
        this.myFile = fileList[x]
      })
    },

    // Product add
    addProductOk (evt) {
      evt.preventDefault()
      if (!this.infoProduct.name && this.myFile =='') {
        alert('Vui lòng nhập tên sản phẩm')
      } else {
        this.addProduct()
      }
    },
    addProduct () {
      let file = this.myFile
      this.uploadTask = storage.ref(file.name).put(file);

      this.uploadTask.then(snapshot => {
        this.downloadURL = this.uploadTask.snapshot.downloadURL;
        this.$emit('url', this.downloadURL)
        
        this.infoProduct.nameImage = file.name
        this.infoProduct.image = this.downloadURL
        this.$firebaseRefs.Product.push(this.infoProduct)
        this.$refs.modal.hide()
      })
    },

    // Upadte
    infoUpdate (item, index, button) {
      this.itemUpdate = item
      this.modalUpdate.title = `Thông tin: ` +  this.itemUpdate.name
      this.$root.$emit('bv::show::modal', 'modalUpdate', button)
    },
    updateOk () {
      let file = this.myFile
      if(file!='') {
        this.uploadTask = storage.ref(file.name).put(file);
        this.uploadTask.then(snapshot => {
          this.downloadURL = this.uploadTask.snapshot.downloadURL;
          this.$emit('url', this.downloadURL)
          // Xóa ảnh cũ
          var desertRef = storageRef.child(this.updateProduct.nameImage);
          desertRef.delete().then(function() { }).catch(function(error) { });
          this.updateProduct.image = file.name
          this.updateProduct.image = this.downloadURL
          this.$firebaseRefs.Product.child(this.itemUpdate['.key']).set(this.updateProduct)
        })
      }else {
        this.$firebaseRefs.Product.child(this.itemUpdate['.key']).set(this.updateProduct)
      }
        this.$refs.modal.hide()
    },
    
    // Delete
    infoDelete(item) {
      this.itemDelete = item
    },
    deleteItem: function () {
      if(this.itemDelete.nameImage) {
        var desertRef = storageRef.child(this.itemDelete.nameImage);
        desertRef.delete().then(function() { }).catch(function(error) { });
      }
      
      this.$firebaseRefs.Product.child(this.itemDelete['.key']).remove()
    },
  },
  watch: {
    uploadTask: function() { // Image upload
      this.uploadTask.on('state_changed', sp => {
          this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      })
    }
  }
}

</script>
<style>
.progress-bar {
  margin: 10px 0;
}
</style>