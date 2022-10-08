<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="container">
    <h3 class="mt-2 mb-3 float-left text-primary">DANH SÁCH EMPLOYEE</h3>
    <button
      v-on:click="showModalAddEmployee"
      class="btn btn-lg btn-outline-primary float-right"
    >
      Thêm Employee
    </button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
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
        <tr v-for="user in users" :key="user.emp_no" class="m-5">
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
              v-on:click.prevent="showModalEditEmployee(user.id)"
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
    <!-- <el-row type="flex" justify="space-between" class="mt-3">
      <el-pagination
        background
        @size-change="handleChangeSize"
        @current-change="handleChangePage"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      />
    </el-row> -->
    
    <UserRegisterForm
      :visible.sync="showModalAdd"
      :showModalRegisterEmployee.sync="showModalAdd"
      @close-modal="emitCloseShowModal"
    >
    </UserRegisterForm>

    <UserEditForm
      :visible.sync="showModalEdit"
      @close-modal="emitCloseShowModalEdit"
      :idEdit="idEdit"
      @edit-modal="listUser" 
      :data="selectedEmployee"    
    >
    </UserEditForm>

    <UserDeleteForm
      :showModalDeleteEmployee="showModalDelete"
      @close-modal="emitShowModalDelete"
      :idDelete="idDelete"
      @list-employee="listUser"
    >
    </UserDeleteForm>

    <Pagination
    :pageSize.sync="pageSize"
    :pageCount.sync = "pageCount"
    :page.sync = "page"
    :total="total"
    @loadPage="loadPage()"
    ></Pagination>
    
  </div>
</template>
//@delete-modal="deleteUser"
<script>
import employeeAPI from "../api/employee";
import UserRegisterForm from "./UserRegisterForm.vue";
import UserEditForm from "./UserEditForm.vue";
import UserDeleteForm from "./UserDeleteForm.vue";
import Pagination from "../components/Pagination.vue";
export default {
  name: "UsersTable",
  components: {
    UserRegisterForm,
    UserEditForm,
    UserDeleteForm,
    Pagination,
},
  data() {
    return {
      idEdit: null,
      idDelete: null,
      users: [] ,
      showModal: false,
      showModalAdd: false,
      showModalEdit: false,
      showModalDelete: false,
      page:1,
      pageCount: 0,
      pageSize: 10,
      total:0,
      
      selectedEmployee: null
    };
  },
  
  mounted() {
    let user = localStorage.getItem("Token");
    if (!user) {
      this.$router.push({ name: "Register" });
    }
  },
  // yêu cầu GET được thực hiện đối với API để hiện list employee
  async created() {
    await this.listUser();
  },
  computed: {

  },
  methods: {
    async listUser() {
      const datapage = {
        page: this.page, 
        page_size: this.pageSize
      }
      await employeeAPI
        .listEmployee(datapage)
        .then((res) => {
        this.users = res.data;
        this.total =res.dataCount
        this.pageCount = res.maxPage
        
        

        console.log("success list employee");

        })
        .catch((error) => {
          console.error(error);
        });
    },

    //Load lại trang call api đến listEmployee
    async loadPage() {
      await this.listUser()
      console.log("ddd")
    },

    //khi bấm nút Thêm employee thì showModalAdd thành true
    showModalAddEmployee() {
      this.showModalAdd = true;
  
    },

    // gọi emit bên UserRegisterForm
    emitCloseShowModal() {
      this.showModalAdd = false;
    },

    //khi bấm nút edit thì showModalEditEmployee thành true
    async showModalEditEmployee(idEdit) {
      await employeeAPI.showEmployee(idEdit).then((res) => {
        console.log(res)
        this.selectedEmployee = res.employee  
      })
      .catch((error) => {
        console.error(error);
      });

      this.showModalEdit = true;
      this.idEdit = idEdit;
      this.visible = true;
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





//cách 2
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
