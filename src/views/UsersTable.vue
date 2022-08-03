<template>
  <div class="container">
    <h3 class="mt-2 mb-3 float-left text-primary">DANH SÁCH EMPLOYEE</h3>
    <button v-on:click="showModalAddEmployee" class="btn btn-lg btn-outline-primary float-right"> Thêm Employee </button>
    <table class="table table-striped">
      <thead> 
        <tr>
          <th scope="col"> Id </th>
          <th scope="col">First_name</th>
          <th scope="col">Last_name</th>
          <th scope="col">Gender</th>
          <th scope="col">Hire_date</th>
          <th scope="col">Birth_date</th>
          <th scope="col">Title_id</th>
          <th scope="col">Department_id</th>
          <th scope="col">Salary</th>
        </tr>
      </thead>
      <tbody>
        <!-- API -->
        <tr v-for="(user) in users" :key="user.emp_no" class="m-5">
          <td>{{ user.emp_no }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.hire_date }}</td>
          <td>{{ user.birth_date }}</td>
          <td>{{ user.title_id }}</td>
          <td>{{ user.department_id }}</td>
          <td>{{ user.salary }}</td>
          <td>
              <button
                v-on:click.prevent="showModalEditEmployee()"
                class="btn btn-sm btn-info mr-1"
              >
                Edit
              </button>
              <button
                v-on:click="showModalDeleteEmployee(user.id)"
                type="submit"
                class="btn btn-sm btn-danger"
              >
                Delete
              </button>
          </td>
        </tr>
      </tbody>
    </table>

    <UserRegisterForm
      :showModalRegisterEmployee="showModalAdd"
      @close-modal="emitCloseShowModal"
    >
    </UserRegisterForm>

    <UserEditForm
      :showModalEditEmployee="showModalEdit"
      @close-modal="emitCloseShowModalEdit"
    
    >
    </UserEditForm>
      
    <UserDeleteForm
    :showModalDeleteEmployee="showModalDelete"
    @close-modal="emitShowModalDelete  "
    :idDelete="idDelete"
    @list-employee="listUser"
    >
    </UserDeleteForm>

  </div>
</template>
//@delete-modal="deleteUser"
<script>
import employeeAPI from "../api/employee";
import UserRegisterForm from "./UserRegisterForm.vue";
import UserEditForm from "./UserEditForm.vue";
import UserDeleteForm from "./UserDeleteForm.vue"

export default {
  name: "UsersTable",
  components: {
    UserRegisterForm,
    UserEditForm,
    UserDeleteForm,
  },

  mounted() {
    let user = localStorage.getItem("Token");
    if (!user) {
      this.$router.push({ name: "Register" });
    }
  },
  data() {
    return {
      idDelete: null,
      users: [],
      showModal: false,
      showModalAdd: false,
      showModalEdit: false,
      showModalDelete: false,
    };
  },

  // yêu cầu GET được thực hiện đối với API để hiện list employee
  async created() {
    await employeeAPI.listEmployee()
      .then((res) => {
        this.users = res.data;
        console.log("success list employee");
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    async listUser() 
    {
      await employeeAPI.listEmployee() 
      .then((res) => {
        this.users =res.data;
        console.log("success delete employee");
      })
      .catch((error) => {
        console.error(error);
      });
    },
  
    //khi bấm nút thêm employee thì showModalAdd thành true
    showModalAddEmployee() {
      this.showModalAdd = true;
    },

    // gọi emit bên UserRegisterForm
    emitCloseShowModal() {
      this.showModalAdd = false;
    },

    //khi bấm nút edit thì showModalEditEmployee thành true
    showModalEditEmployee() {
      this.showModalEdit = true;
    },

    // gọi emit bên UserEditForm
    emitCloseShowModalEdit() {
      this.showModalEdit = false;
    },

    //khi bấm nút delete thì showModalDeleteEmployee thành true
    showModalDeleteEmployee(idDelete) {
      this.showModalDelete = true;
      this.idDelete = idDelete;
    },
    // gọi emit bên UserDeleteForm
    emitShowModalDelete() {
      this.showModalDelete = false;
    },
    
  },
};
</script>

<style scoped>
th {
  padding-left: 0rem;
}
h3 {
  font-size: 1rem;
}
</style>





//cách
// import employeeAPI from "../api/employee";
// import UserRegisterForm from "./UserRegisterForm.vue";
// import UserEditForm from "./UserEditForm.vue";
// import UserDeleteForm from "./UserDeleteForm.vue"

// export default {
//   name: "UsersTable",
//   components: {
//     UserRegisterForm,
//     UserEditForm,
//     UserDeleteForm,
//   },

//   mounted() {
//     let user = localStorage.getItem("Token");
//     if (!user) {
//       this.$router.push({ name: "Register" });
//     }
//   },
//   data() {
//     return {
//       idDelete: null,
//       users: [],
//       showModal: false,
//       showModalAdd: false,
//       showModalEdit: false,
//       showModalDelete: false,
//     };
//   },

//   // yêu cầu GET được thực hiện đối với API để hiện list employee
//   async created() {
//     await employeeAPI.listEmployee()
//       .then((res) => {
//         this.users = res.data;
//         console.log("success list employee");
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   },
//   methods: {
//     async deleteUser() 
//     {
//       await employeeAPI.deleteEmployee(this.idDelete)
//       .then(() => {
//         this.$router.push("/userstable");
//         this.$router.go("/userstable");
        
//       }
//       ),
//       employeeAPI.listEmployee() 
//       .then((res) => {
//         this.users =res.data;
//         console.log("success delete employee");
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     },
  
//     //khi bấm nút thêm employee thì showModalAdd thành true
//     showModalAddEmployee() {
//       this.showModalAdd = true;
//     },

//     // gọi emit bên UserRegisterForm
//     emitCloseShowModal() {
//       this.showModalAdd = false;
//     },

//     //khi bấm nút edit thì showModalEditEmployee thành true
//     showModalEditEmployee() {
//       this.showModalEdit = true;
//     },

//     // gọi emit bên UserEditForm
//     emitCloseShowModalEdit() {
//       this.showModalEdit = false;
//     },

//     //khi bấm nút delete thì showModalDeleteEmployee thành true
//     showModalDeleteEmployee(idDelete) {
//       this.showModalDelete = true;
//       this.idDelete = idDelete;
//     },
//     // gọi emit bên UserDeleteForm
//     emitShowModalDelete() {
//       this.showModalDelete = false;
//     },
    
//   },
// };
