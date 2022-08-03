<template>
  <div class="container1">
    <div
      v-bind:class="{ show: showModalDeleteEmployee }"
      class="modal-container1"
    >
      <div class="user-modal1">
        <h3 class="text-primary">Bạn có chắc chắn muốn xóa employee?</h3>
        <button
          v-on:click.prevent="closeModal()"
          class="btn btn-secondary mr-1"
        >
          Cancel
        </button>
        <button v-on:click="deleteUser()" type="submit" class="btn btn-primary">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import deleteemployeeAPI from "../api/employee";
export default {
  name: "UserDeleteForm",
  data() {
    return {
    
      users: [],
      showModalDelete: false,
    };
  },
  props: ["showModalDeleteEmployee", "idDelete"],

  methods: {
    // DELETE yêu cầu xóa người dùng
    async deleteUser() {
      console.log('1223')
      await deleteemployeeAPI.deleteEmployee(this.idDelete)
      .then(()=> {
        this.$router.push("/userstable");
        this.$router.go("/userstable");
      })
      .catch((error) => {
        console.error(error);
      });
      this.$emit('list-employee')
    },


    closeModal() {
      this.$emit("close-modal");
    },
    deleteModal() {
        this.$emit('delete-modal')
    },
    },

  computed: {
    modalDelete() {
      return this.showModalDelete ? "show" : "";
    },
  },
};
</script>
<style>
.modal-container1 {
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

.modal-container1.show {
  opacity: 1;
  pointer-events: auto;
}

.user-modal1 {
  color: #535353;
  background-color: #fff;
  background-image: url("../assets/background.jpg");
  height: 200px;
  width: 450px;
  padding: 40px 50px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(98, 177, 233, 0.3);
  text-decoration-style: 8px;
}

.user-modal1 h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 0;
  width: 500px;
  height: 100px;
}

.user-modal1 p {
  opacity: 0.9;
}

.user-modal1 button {
  left: 300px;
  right: 300px;
}
</style>




//Cách 1, truyền iddelete sang component con từ con gọi 
api xóa, từ con tạo 1 suwk kiện gọi đến cha đểncha gọi lại list
<!-- <script>
import deleteemployeeAPI from "../api/employee";
export default {
  name: "UserDeleteForm",
  data() {
    return {
      idDelete='',
      users: [],
      showModalDelete: false,
    };
  },
  props: ["showModalDeleteEmployee"],

  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    deleteModal() {
        this.$emit('delete-modal')
    },
    },

  computed: {
    modalDelete() {
      return this.showModalDelete ? "show" : "";
    },
  },
};
</script> -->