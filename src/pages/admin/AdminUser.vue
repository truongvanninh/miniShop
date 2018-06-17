 <template>
<div>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="4" class="my-1">
        <b-form-group class="mb-0">
           <b-input-group>
            <b-input-group-text slot="append" :disabled="!filter" @click="filter = ''">
                <strong class="text-danger">X</strong>
            </b-input-group-text>
            <b-form-input v-model="filter" placeholder="Tìm kiếm"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="4" class="my-1 ml-auto" right>
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 ml-5" />
      </b-col>
      <b-col md="1" class="my-1" right>
        <b-form-group class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Bảng hiển thị thông tin -->
    <b-table
             stacked="md"
             :items="User"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
    >
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="infoUserUpdate(row.item, row.index, $event.target)" class="mr-1">
          Sửa thông tin
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Ẩn' : 'Hiện' }} số đo
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
          <b-row>
            <b-col>
              <table class="infoTable">
                <tr style="text-align: center;">
                  <th class="px-3">Quần</th>
                  <th>Dài quân</th>
                  <th>Vòng mông</th>
                  <th>Vòng bụng</th>
                  <th>Vòng đùi</th>
                  <th>Vòng gối</th>
                  <th>Hạ gối</th>
                  <th>Bụng chân</th>
                  <th>Ống chân</th>
                </tr>
                <tr style="text-align: center; font-size:20px;">
                  <td style="font-size:17px;">Số đo</td>
                  <td>{{row.item.daiQuan}}</td>
                  <td>{{row.item.vMongQuan}}</td>
                  <td>{{row.item.vBung}}</td>
                  <td>{{row.item.vDui}}</td>
                  <td>{{row.item.vGoi}}</td>
                  <td>{{row.item.haGoi}}</td>
                  <td>{{row.item.vBungChan}}</td>
                  <td>{{row.item.ongChan}}</td>
                </tr>
              </table>
            </b-col>
            <b-col>
              <table class="infoTable">
                <tr style="text-align: center;">
                  <th style="bacground: #fff;" class="px-4">Áo</th>
                  <th>Dài áo</th>
                  <th>Dài tay</th>
                  <th>Vòng cổ</th>
                  <th>Vòng ngực</th>
                  <th>Vòng vai</th>
                  <th>Vòng lách</th>
                  <th>Bắp tay</th>
                  <th>Vòng eo</th>
                  <th>Vòng mông</th>
                </tr>
                <tr style="text-align: center;font-size:20px;">
                  <td style="font-size:17px;">Số đo</td>
                  <td>{{row.item.daiAo}}</td>
                  <td>{{row.item.daiTay}}</td>
                  <td>{{row.item.vCo}}</td>
                  <td>{{row.item.vNguc}}</td>
                  <td>{{row.item.vVai}}</td>
                  <td>{{row.item.vLach}}</td>
                  <td>{{row.item.vBapTay}}</td>
                  <td>{{row.item.vEo}}</td>
                  <td>{{row.item.vMongAo}}</td>
                </tr>
              </table>
            </b-col>
          </b-row>
      </template>
    </b-table>

    <!-- Setup User -->
    <b-modal  id="modalUpadteUser" 
              @hide="resetModal" 
              :title="'Cập nhật thông tin: ' + itemUpdate.name"
              size="lg"  
              @ok="updateOk"
              ref="myModalRef">
      <b-row>
        <b-col>
          <b-row>
            <b-col md="4">
              <label style="margin-top: 10px">Tên:</label>  
            </b-col>
            <b-col>
              <b-form-input type="text"
                v-model="itemUpdate.name"
                :value="itemUpdate.name"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col md="4">
              <label style="margin-top: 10px">Số điện thoại:</label>  
            </b-col>
            <b-col>
              <b-form-input type="text"
                v-model="itemUpdate.phone"
                :value="itemUpdate.phone"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row> <br>
      <b-row>
        <b-col>
          <b-row>
            <b-col md="4">
              <label style="margin-top: 10px">Địa chỉ:</label>  
            </b-col>
            <b-col>
              <b-form-input type="text"
                v-model="itemUpdate.address"
                :value="itemUpdate.address"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col md="4">
              <label style="margin-top: 10px">Tuổi:</label>  
            </b-col>
            <b-col>
              <b-form-input type="text"
                v-model="itemUpdate.age"
                :value="itemUpdate.age"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row> <br>
      <b-row>
        <b-col>
          <table class="infoTable">
            <tr style="text-align: center;">
              <th class="px-3">Quần</th>
              <th>Dài quân</th>
              <th>Vòng mông</th>
              <th>Vòng bụng</th>
              <th>Vòng đùi</th>
              <th>Vòng gối</th>
              <th>Hạ gối</th>
              <th>Bụng chân</th>
              <th>Ống chân</th>
            </tr>
            <tr style="text-align: center;">
              <td>Số đo</td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.daiQuan"
                :value="itemUpdate.daiQuan"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vMongQuan"
                :value="itemUpdate.vMongQuan"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vBung"
                :value="itemUpdate.vBung"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vDui"
                :value="itemUpdate.vDui"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vGoi"
                :value="itemUpdate.vGoi"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.haGoi"
                :value="itemUpdate.haGoi"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vBungChan"
                :value="itemUpdate.vBungChan"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.ongChan"
                :value="itemUpdate.ongChan"
                ></b-form-input>
              </td>
            </tr>
          </table>
        </b-col>
        <b-col>
          <table class="infoTable">
            <tr style="text-align: center;">
              <th style="bacground: #fff;" class="px-4">Áo</th>
              <th>Dài áo</th>
              <th>Dài tay</th>
              <th>Vòng cổ</th>
              <th>Vòng ngực</th>
              <th>Vòng vai</th>
              <th>Vòng lách</th>
              <th>Bắp tay</th>
              <th>Vòng eo</th>
              <th>Vòng mông</th>
            </tr>
            <tr style="text-align: center;">
              <td>Số đo</td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.daiAo"
                :value="itemUpdate.daiAo"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.daiTay"
                :value="itemUpdate.daiTay"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vCo"
                :value="itemUpdate.vCo"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vNguc"
                :value="itemUpdate.vNguc"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vVai"
                :value="itemUpdate.vVai"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vLach"
                :value="itemUpdate.vLach"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vBapTay"
                :value="itemUpdate.vBapTay"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vEo"
                :value="itemUpdate.vEo"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="itemUpdate.vMongAo"
                :value="itemUpdate.vMongAo"
                ></b-form-input>
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>
      <b-btn @click="showDismissibleAlert=true" variant="warning" class="mt-3 mb-1">
        Xóa dữ liệu người dùng
      </b-btn>
      <b-alert variant="danger"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
        <b-button size="md" variant="danger" @click="deleteUser">
          Xóa ngay
        </b-button> Tất cả dữ liệu về người dùng sẽ bị xóa
      </b-alert>
    </b-modal>
  </b-container>
  <md-button class="md-fab md-primary" style="position:fixed; top: 270px;right: 0;" v-b-modal.modalPrevent>
      <md-icon>add</md-icon>
      <md-tooltip md-direction="top">Thêm sản phẩm</md-tooltip>
  </md-button>
  <!-- Create khách hàng -->
    <b-modal size="lg"
             id="modalPrevent"
             ref="modal"
             title="Nhập thông tin khách hàng"
             @ok="createOk">
      <b-row>
        <b-col>
          <b-row>
            <b-col md="4">
              <label style="margin-top: 10px">Họ tên:</label>  
            </b-col>
            <b-col>
              <b-form-input type="text"
                v-model="infoUser.name"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col md="4">
              <label style="margin-top: 10px">Số điện thoại:</label>  
            </b-col>
            <b-col>
              <b-form-input type="text"
                v-model="infoUser.phone"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row> <br>
      <b-row>
        <b-col>
          <b-row>
            <b-col md="4">
              <label style="margin-top: 10px">Địa chỉ:</label>  
            </b-col>
            <b-col>
              <b-form-input type="text"
                v-model="infoUser.address"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col md="4">
              <label style="margin-top: 10px">Tuổi:</label>  
            </b-col>
            <b-col>
              <b-form-input type="text"
                v-model="infoUser.age"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row> <br>
      <b-row>
        <b-col>
          <table class="infoTable">
            <tr style="text-align: center;">
              <th class="px-3">Quần</th>
              <th>Dài quân</th>
              <th>Vòng mông</th>
              <th>Vòng bụng</th>
              <th>Vòng đùi</th>
              <th>Vòng gối</th>
              <th>Hạ gối</th>
              <th>Bụng chân</th>
              <th>Ống chân</th>
            </tr>
            <tr style="text-align: center;">
              <td>Số đo</td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.daiQuan"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vMongQuan"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vBung"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vDui"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vGoi"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.haGoi"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vBungChan"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.ongChan"
                ></b-form-input>
              </td>
            </tr>
          </table>
        </b-col>
        <b-col>
          <table class="infoTable">
            <tr style="text-align: center;">
              <th style="bacground: #fff;" class="px-4">Áo</th>
              <th>Dài áo</th>
              <th>Dài tay</th>
              <th>Vòng cổ</th>
              <th>Vòng ngực</th>
              <th>Vòng vai</th>
              <th>Vòng lách</th>
              <th>Bắp tay</th>
              <th>Vòng eo</th>
              <th>Vòng mông</th>
            </tr>
            <tr style="text-align: center;">
              <td>Số đo</td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.daiAo"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.daiTay"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vCo"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vNguc"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vVai"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vLach"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vBapTay"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vEo"
                ></b-form-input>
              </td>
              <td>
                <b-form-input type="text"
                v-model="infoUser.vMongAo"
                ></b-form-input>
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>
    </b-modal>
</div>
</template>

<script>
import {db} from '../../firebase'
const items = []
// DCA
const infoUser = { name: '',
  address: '',
  phone: '',
  age: '',
  daiQuan: '',
  daiAo: '',
  vMongQuan: '',
  vNguc: '',
  vBung: '',
  vEo: '',
  haGoi: '',
  vMongAo: '',
  vDui: '',
  vCo: '',
  vGoi: '',
  daiTay: '',
  vBungChan: '',
  vLach: '',
  ongChan: '',
  vBapTay: '',
  vVai: '',
}
export default {
  firebase: {
      User: db.ref('infoUser')
  },
  beforeCreate: function () {
    
  },
  data () {
    return {
      user: this.User,
      fields: [
        { key: 'name', label: 'Tên khách', sortable: true },
        { key: 'phone', label: 'Số điện thoại ', sortable: true, 'class': 'text-center' },
        { key: 'address', label: 'Địa chỉ', 'class': 'text-center' },
        { key: 'age', label: 'Tuổi', 'class': 'text-center' },
        { key: 'actions', label: 'Thiết lập' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      filter: null,

      // itemUpdate
      itemUpdate:'',
      // Delete
       showDismissibleAlert: false,

      // DCA data
      infoUser: infoUser
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  
  methods: {
    // Cập nhât thông tin khách hàng
    infoUserUpdate (item, index, button) {
      this.itemUpdate = item
      this.$root.$emit('bv::show::modal', 'modalUpadteUser', button)
    },
    updateOk() {
      this.$firebaseRefs.User.child(this.itemUpdate['.key']).set(this.itemUpdate)
    },
    deleteUser() {
      this.$firebaseRefs.User.child(this.itemUpdate['.key']).remove()
      this.hideModal()
    },
    hideModal () { // Đóng modal người dùng bị xóa
      this.$refs.myModalRef.hide()
      this.showDismissibleAlert=false
    },


    resetModal () { // Khôi phục model hay đó
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    createOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.infoUser.name) {
        alert('Please enter your name')
      } else {
        this.addUser()
      }
      
    },
    addUser() {
      this.$firebaseRefs.User.push(this.infoUser)
      this.$refs.modal.hide()
    }
  }
}
</script>
<style scoped>
  .infoTable {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  .infoTable td, .infoTable th {
      border: 1px solid #ddd;
      padding: 8px;
  }

  .infoTable tr:nth-child(even){background-color: #f2f2f2;}

  .infoTable tr:hover {background-color: #ddd;}

  .infoTable th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #4CAF50;
      color: white;
  }
</style>