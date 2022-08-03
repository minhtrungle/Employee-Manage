<template>
  <div class="container">
    <div
      v-bind:class="{ show: showModalRegisterEmployee }"
      class="modal-container"
    >
      <div class="user-modal">
        <h3 class="text-primary">Thêm Employee</h3>

        <div class="form-group">
          <label for="">Id</label>
          <input required type="text" v-model="emp_no" class="form-control" />
        </div>

        <div class="form-group">
          <label for="first_name">First_name</label>
          <input
            required
            type="text"
            v-model="first_name"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="last_name">Last_name</label>
          <input
            required
            type="text"
            v-model="last_name"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="gender">Gender</label>
          <select v-model="gender" class="form-control" >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div class="form-group">
          <label for="hire_date">Hire_date</label>
          <input
            required
            type="text"
            v-model="hire_date"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="birth_date">Birth_date</label>
          <input
            required
            type="text"
            v-model="birth_date"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="title_id">Title_id</label>
          <select v-model="title_id" class="form-control">
            <option
              v-for="title in listtitle"
              v-bind:value="title.id"
              v-bind:key="title.id"
            >
              {{ title.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="department_id">Department_id</label>
          <select v-model="department_id" class="form-control">
            <option
              v-for="department in listdepartment"
              v-bind:value="department.id"
              v-bind:key="department.id"
            >
              {{ department.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="salary">Salary</label>
          <input required type="text" v-model="salary" class="form-control" />
        </div>

        <button
          v-on:click.prevent="closeModal()"
          class="btn btn-secondary mr-1"
        >
          Đóng
        </button>
        <button v-on:click="createUser()" type="submit" class="btn btn-primary">
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import addemployeeAPI from "../api/employee";
export default {
  name: "UserRegisterForm",
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
      showModal: false,
      listtitle: [],
      listdepartment: [],
    };
  },
  created() {
    addemployeeAPI.listTitle()
    .then((res) => {
      this.listtitle = res.data;
    });

    addemployeeAPI.listDepartment()
    .then((res) => {
      this.listdepartment = res.items;
    });

  },
  props: ["showModalRegisterEmployee"],

  methods: {
    // Yêu cầu POST để tạo employee mới
    async createUser() {
      await addemployeeAPI.addEmployee({
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
      addemployeeAPI.listEmployee()
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },

  // Chức năng hiện hoặc đóng form thêm employee
  computed: {
    modalClass() {
      return this.showModal ? "show" : "";
    },
  },
};
</script>

<style>
.modal-container {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}

.modal-container.show {
  opacity: 1;
  pointer-events: auto;
}

.user-modal {
  color: #535353;
  background-color: #fff;
  background-image: url("../assets/background.jpg");
  height: 725px;
  width: 450px;
  padding: 40px 50px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(98, 177, 233, 0.3);
  text-decoration-style: 8px;
}

.user-modal h1 {
  margin: 0;
}

.user-modal p {
  opacity: 0.9;
}

.form-group {
  font-size: 11px;
  box-sizing: 5px;
  height: 48px;
  width: 350px;
}
</style>







<!-- <template>
  <div class="container">
    <button v-on:click="showModal = !showModal" class="btn btn-lg btn-outline-primary float-right">Thêm User</button>
    <div v-bind:class="modalClass" class="modal-container">
      <div class="user-modal">
        <h3 class="text-primary">Thêm User</h3>
        <form>
          <div class="form-group">
            <label for="">Id</label>
            <input required value="" type="text" id="idRegister" class="form-control"/>
          </div>
    
          <div class="form-group">
            <label for="first_name">First_name</label>
            <input required value="" type="text" id="first_nameRegister" class="form-control"/>
          </div>
          
          <div class="form-group">
            <label for="last_name">Last_name</label>
            <input required value="" type="text" id="last_nameRegister" class="form-control"/>
          </div>
          
    
          <div class="form-group">
            <label for="gender">Gender</label>
            <input required value="" type="text" id="genderRegister" class="form-control"/>
          </div>
          
          <div class="form-group">
            <label for="hire_date">Hire_date</label>
            <input required value="" type="text" id="hire_dateRegister" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="birth_date">Birth_date</label>
            <input required value="" type="text" id="birth_dateRegister" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="title_id">Title_id</label>
            <input required value="" type="text" id="title_idRegister" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="department_id">Department_id</label>
            <input required value="" type="text" id="department_idRegister" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="salary">Salary</label>
            <input required value="" type="text" id="salaryRegister" class="form-control"/>
          </div>

          <button v-on:click.prevent="showModal = !showModal" class="btn btn-secondary mr-1">Đóng</button>
          <button v-on:click="createUser()" type="submit" class="btn btn-primary">Lưu</button> 
        </form>
      </div>
    </div>

  </div>
</template> -->