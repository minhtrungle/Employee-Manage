<template>
  <el-dialog
    title="Thêm employee mới"
    :visible.sync="visible"
    width="600px"
    top="90px"
    @close="closeModal"
  >
    <el-form :model="addForm" :rules="rules" ref="form" v-loading="showModal">
      <el-form-item label="Avatar" prop="avatar">
        <div
            :class="{ hide: hideAvatar }"
            class="showAvatar"
            @click="chooseImage"
            :style="{ 'background-image': `url(${filePreview})` }"
          ></div>

          <div>
            <input
              :class="{ hide: isshowAvatar }"
              ref="fileInput"
              type="file"
              @input="selectImage"
            />
          </div>
      </el-form-item>
      <el-form-item label="Id" prop="emp_no">
        <el-input
          required
          type="text"
          v-model="addForm.emp_no"
          placeholder="Nhập id"
        ></el-input>
      </el-form-item>
      <el-form-item label="First_name" prop="first_name">
        <el-input
          required
          type="text"
          v-model="addForm.first_name"
          placeholder="Nhập first_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="Last_name" prop="last_name">
        <el-input
          required
          type="text"
          v-model="addForm.last_name"
          placeholder="Nhập last_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model="addForm.gender" placeholder="Chọn gender">
          <el-option value="M">Male</el-option>
          <el-option value="F">Female</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Hire_date" prop="hire_date">
        <el-date-picker
          type="date"
          v-model="addForm.hire_date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="Chọn hire_date"
        />
      </el-form-item>
      <el-form-item label="Birth_date" prop="birth_date">
        <el-date-picker
          type="date"
          v-model="addForm.birth_date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="Chọn birth_date"
        />
      </el-form-item>
      <el-form-item label="Title_id" prop="title_id">
        <el-select v-model="addForm.title_id" placeholder="Chọn title_id">
          <el-option
            v-for="title in listtitle"
            v-bind:value="title.id"
            v-bind:key="title.id"
          >
            {{ title.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Department_id" prop="department_id">
        <el-select
          v-model="addForm.department_id"
          placeholder="Chọn department_id"
        >
          <el-option
            v-for="department in listdepartment"
            v-bind:value="department.id"
            v-bind:key="department.id"
          >
            {{ department.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Salary" prop="salary">
        <el-input
          required
          type="text"
          v-model="addForm.salary"
          placeholder="Nhập Salary"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="closeModal()" :disabled="showModal"
        >Đóng</el-button
      >
      <el-button
        type="primary"
        :loading="showModal"
        @click="createUser()"
      >
        Lưu
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import addemployeeAPI from "../api/employee";
import {
  required,
  minLength,
  maxLength,
  between,
} from "vuelidate/lib/validators";
export default {
  name: "UserRegisterForm",
  data() {
    return {
      addForm: {
        avatar: "",
        emp_no: "",
        first_name: "",
        last_name: "",
        gender: "",
        hire_date: "",
        birth_date: "",
        title_id: "",
        department_id: "",
        salary: "",
      },
      showModal: false,
      listtitle: [],
      listdepartment: [],
      listAvatar: [],
      urlAvatar: [],
      filePreview: null,
      showUpload: false,
      isshowAvatar: false,
      hideAvatar: false,
      rules: {
        emp_no: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
        first_name: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
        last_name: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
        gender: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
        hire_date: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
        birth_date: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
        title_id: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
        department_id: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
        salary: [
          {
            required: true,
            message: "Vui lòng không được để trống",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  validations: {
    emp_no: {
      between: between(1, 50),
    },
    first_name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(10),
    },
    last_name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(10),
    },
    salary: {
      between: between(1, 10000),
    },
  },

  created() {
    addemployeeAPI.listTitle().then((res) => {
      this.listtitle = res.data;
    });

    addemployeeAPI.listDepartment().then((res) => {
      this.listdepartment = res.items;
    });
  },
  props: {
    showModalRegisterEmployee: {},
    visible: { // ẩn hiện form
      type: Boolean,
      default: false,
    },
    employee: {
      type: Object,
    },
  },

  methods: {
    // Yêu cầu POST để tạo employee mới
    async createUser() {
      const formData = new FormData();

      formData.append("avatar", this.addForm.avatar);
      formData.append("emp_no", this.addForm.emp_no);
      formData.append("first_name", this.addForm.first_name);
      formData.append("last_name", this.addForm.last_name);
      formData.append("gender", this.addForm.gender);
      formData.append("hire_date", this.addForm.hire_date);
      formData.append("birth_date", this.addForm.birth_date);
      formData.append("title_id", this.addForm.title_id);
      formData.append("department_id", this.addForm.department_id);
      formData.append("salary", this.addForm.salary);

      await addemployeeAPI.addEmployee(formData).then(() => {
        console.log("123456");  
        this.$router.push("/userstable");
        this.$router.go("/userstable");
        this.hideAvatar = true;
      });

      addemployeeAPI
        .listEmployee()
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    chooseImage() {
      this.$refs.fileInput.click();
    },
    selectImage(event) {
      let fileInput = this.$refs.fileInput;
      let imgFile = fileInput.files;

      if (imgFile && imgFile[0]) {
        let reader = new FileReader();
        reader.onload = (event) => {
          this.filePreview = event.target.result;
        };

        reader.readAsDataURL(imgFile[0]);
        this.$emit("fileInput", imgFile[0]);
        this.isshowAvatar = true,
        this.addForm.avatar = event.target.files[0];
        this.showUpload = !this.showUpload;
      }
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
  height: 720px;
  width: 450px;
  padding: 10px 50px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(98, 177, 233, 0.3);
  text-decoration-style: 2px;
  display: block;
  position: relative;
}

.user-modal h1 {
  margin: 0;
}

.user-modal p {
  opacity: 0.9;
}

.form-group {
  font-size: 14px;
  display: block;
  line-height: 24px;
  box-sizing: 30px;
}
.form-control {
  height: 15px;
  width: 100px;
}
.error {
  font-size: 14px;
  color: hsl(0, 100%, 55%);
}

.showAvatar {
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  background-position: center center;
  background-size: cover;
}
.hide {
  display: none;
}
</style>



<!-- <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          onchange="uploadAvatar(e)"
          style="display: none"
        />
        <label for="file" style="cursor: pointer">Upload Avatar</label>
        <div id="avatar" ref="avatar"> {{fileList}} </div>
        <img src="" id="avatar" width="100" /> -->



<!-- <template>
  <div class="container">
    <div
      v-bind:class="{ show: showModalRegisterEmployee }"
      class="modal-container"
    >
      <div class="user-modal">
        <h3 class="text-primary">Thêm Employee mới</h3>
        <div class="form-group">
          <div
            :class="{ hide: hideAvatar }"
            class="showAvatar"
            @click="chooseImage"
            :style="{ 'background-image': `url(${filePreview})` }"
          ></div>

          <div>
            <input
              :class="{ hide: isshowAvatar }"
              ref="fileInput"
              type="file"
              @input="selectImage"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="emp_no">Id</label>
          <input required type="text" v-model="addForm.emp_no" />
        </div>

        <div class="form-group">
          <label for="first_name">First_name</label>
          <input required type="text" v-model="addForm.first_name" />
        </div>
        <div class="error" v-if="!$v.first_name.required">
          Vui lòng không để trống
        </div>
        <div class="error" v-if="!$v.first_name.minLength">
          First_name phải có tối thiểu
          {{ $v.first_name.$params.minLength.min }} ký tự
        </div>

        <div class="form-group">
          <label for="last_name">Last_name</label>
          <input required type="text" v-model="addForm.last_name" />
        </div>
        <div class="error" v-if="!$v.last_name.required">
          Vui lòng không để trống
        </div>
        <div class="error" v-if="!$v.last_name.minLength">
          Last_name phải có tối thiểu
          {{ $v.last_name.$params.minLength.min }} ký tự
        </div>

        <div class="form-group">
          <label for="gender">Gender</label>
          <select v-model="addForm.gender">
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div class="form-group">
          <label for="hire_date">Hire_date</label>
          <el-date-picker
            required
            type="date"
            v-model="addForm.hire_date"
            placeholder="Chọn ngày"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
            ></el-date-picker
          >
        </div>

        <div class="form-group">
          <label for="birth_date">Birth_date</label>
          <el-date-picker
            required
            type="date"
            v-model="addForm.birth_date"
            placeholder="Chọn ngày"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
            ></el-date-picker
          >
        </div>

        <div class="form-group">
          <label for="title_id">Title_id</label>
          <select v-model="addForm.title_id">
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
          <select v-model="addForm.department_id">
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
          <input required type="text" v-model="addForm.salary" />
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
</template> -->