<template>
  <div class="container">
    <div v-bind:class="{show: showModalEditEmployee}" class="modal-container">
      <div class="user-modal">
        <h3 class="text-info">Sửa Thông Tin</h3>
          <div class="form-group">
            <label for="">Id</label>
            <input required type="text" v-model="emp_no" class="form-control"/>
          </div>
  
          <div class="form-group">
            <label for="">First_name</label>
            <input required type="text" v-model="first_name" class="form-control"/>
          </div>
          
          <div class="form-group">
            <label for="">Last_name</label>
            <input required type="text" v-model="last_name" class="form-control"/>
          </div>
          

          <div class="form-group">
          <label for="">Gender</label>
          <select v-model="gender" class="form-control" >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

          <div class="form-group">
            <label for="">Hire_date</label>
            <input required type="text" v-model="hire_date" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="">Birth_date</label>
            <input required type="text" v-model="birth_date" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="">Title_id</label>
            <select v-model="title_id" class="form-control"> 
              <option
                v-for="title in listtitle"
                 v-bind:value="title.id" v-bind:key="title.id"> 
                {{ title.name }} 
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="">department_id</label>
            <select v-model="department_id" class="form-control"> 
              <option
                v-for="department in listdepartment"
                 v-bind:value="department.id" v-bind:key="department.id"> 
                {{ department.name }} 
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="">Salary</label>
            <input required type="text" v-model="salary" class="form-control"/>
          </div>

          <button v-on:click.prevent="closeModal()" class="btn btn-secondary mr-1">Đóng</button>
          <button v-on:click="updateUser()" type="submit" class="btn btn-primary">Lưu</button> 
      </div>
    </div>

  </div>
</template>

<script>
import editemployeeAPI from "../api/employee";
//import loginAPI  from '..//api/auth'

export default {
  name: 'UserEditForm',
  data() {
    return {
      emp_no: "",
      first_name: "",
      last_name: "",
      gender: "",
      hire_date: "",
      birth_date: "",
      title_id: "",
      department_id: "",
      salary: "",
      listtitle: [],
      listdepartment: [],
      user: '',
      showModal: false
    }
  },

  props: ['showModalEditEmployee'],

  methods: {
    // POST cập nhật thông tin employee
    async updateUser() {
      await editemployeeAPI.editEmployee({
          emp_no: this.emp_no,
          first_name: this.first_name,
          last_name: this.last_name,
          gender: this.gender,
          hire_date: this.hire_date,
          birth_date: this.birth_date,
          title_id: this.title_id,
          department_id: this.department_id,
          salary: this.salary,
        })
        .then(() => {
          console.log("123456");
          this.$router.push("/userstable");
          this.$router.go("/userstable");
        });
        editemployeeAPI.listEmployee()
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //truyen tu con len cha
    closeModal() {
      this.$emit( 'close-modal' );
    },
    editModal() {
      this.$emit( 'edit-modal');
    }
  },
  // nhận được dữ liệu 
  created() {
    editemployeeAPI.listTitle()
    .then((res) => {
      this.listtitle = res.data;
    });

    editemployeeAPI.listDepartment()
    .then((res) => {
      this.listdepartment = res.items;
    });

    // event click
    
  },
  // Chức năng hiện hoặc đóng form sửa employee
  computed: {
    modalClass() {
      return this.showModal ? 'show' : '';
    }
  }
  
};
</script>

<style>

</style>



<!-- 
<template>
  <div class="container">
    <div v-bind:class="modalClass" class="modal-container">
      <div class="user-modal">
        <h3 class="text-info">Sửa Thông Tin</h3>
        <form>
          <div class="form-group">
            <label for="">Id</label>
            <input type="text" v-model="idEdit" class="form-control"/>
          </div>
  
          <div class="form-group">
            <label for="">First_name</label>
            <input type="text" id="first_nameEdit" class="form-control"/>
          </div>
          
          <div class="form-group">
            <label for="">Last_name</label>
            <input v-bind:value="user.last_name" required type="text" id="last_nameEdit" class="form-control"/>
          </div>
          

          <div class="form-group">
            <label for="">Gender</label>
            <input v-bind:value="user.gender" required type="text" id="genderEdit" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="">Hire_date</label>
            <input v-bind:value="user.hire_date" required type="text" id="hire_dateEdit" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="">Birth_date</label>
            <input v-bind:value="user.birth_date" required type="text" id="birth_dateEdit" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="">Title_id</label>
            <input v-bind:value="user.title_id" required type="text" id="title_idEdit" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="">Department_id</label>
            <input v-bind:value="user.department_id" required type="text" id="department_idEdit" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="">Salary</label>
            <input v-bind:value="user.salary" required type="text" id="salaryEdit" class="form-control"/>
          </div>

          <button v-on:click.prevent="showModal = !showModal" class="btn btn-secondary mr-1">Đóng</button>
          <button v-on:click="updateUser(user._id)" type="submit" class="btn btn-primary">Lưu</button> 
        </form>
      </div>
    </div>

  </div>
</template> -->

