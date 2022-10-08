<template>
  <el-dialog
    title="Sửa thông tin employee"
    :visible.sync="visible"
    width="600px"
    top="50px"
    @close="closeModal"
    @open="loadData"
  >
    <el-form :model="form" :rules="rules" ref="form" v-loading="showModal">
      <el-form-item label="Avatar" prop="avatar">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :file-list="form.avatar"
          :on-change="uploadAvatar"
          :on-remove="removeAvatar"
          :class="{ hideUpload: showUpload }"
          limit="1"
        >
        </el-upload>
      </el-form-item>

      <el-form-item label="Images" prop="images">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :file-list="form.images"
          :on-change="uploadImage"
          :on-remove="removeImage"
          limit="10"
        >
        </el-upload>
      </el-form-item>

      <el-form-item label="Id" prop="emp_no">
        <el-input
          required
          type="text"
          v-model="form.emp_no"
          placeholder="Nhập id"
        ></el-input>
      </el-form-item>
      <el-form-item label="First_name" prop="first_name">
        <el-input
          required
          type="text"
          v-model="form.first_name"
          placeholder="Nhập first_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="Last_name" prop="last_name">
        <el-input
          required
          type="text"
          v-model="form.last_name"
          placeholder="Nhập last_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model="form.gender" placeholder="Chọn gender">
          <el-option value="M">Male</el-option>
          <el-option value="F">Female</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Hire_date" prop="hire_date">
        <el-date-picker
          type="date"
          v-model="form.hire_date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="Chọn hire_date"
        />
      </el-form-item>
      <el-form-item label="Birth_date" prop="birth_date">
        <el-date-picker
          type="date"
          v-model="form.birth_date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="Chọn birth_date"
        />
      </el-form-item>
      <el-form-item label="Title_id" prop="title_id">
        <el-select v-model="form.title_id" placeholder="Chọn title_id">
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
          v-model="form.department_id"
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
          v-model="form.salary"
          placeholder="Nhập Salary"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="closeModal()" :disabled="showModal"
        >Đóng
      </el-button>
      <el-button type="primary" :loading="showModal" @click="updateUser()">
        Lưu
      </el-button>
    </span>
  </el-dialog>
</template>


<script>
import editemployeeAPI from "../api/employee";
import {
  required,
  minLength,
  maxLength,
  between,
} from "vuelidate/lib/validators";
export default {
  name: "UserEditForm",
  data() {
    return {
      form: {
        avatar: "",
        images: "",
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
      listtitle: [],
      listdepartment: [],
      user: "",
      showModal: false,
      urlAvatar: [],
      listAvatar: [],
      showUpload: false,
      listUrlImage: [],
      listImageBefore: [],
      listImage: [],
      fileListImage: [],
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
  // nhận được dữ liệu list title và department
  created() {
    editemployeeAPI.listTitle().then((res) => {
      this.listtitle = res.data;
    });

    editemployeeAPI.listDepartment().then((res) => {
      this.listdepartment = res.items;
    });
  },

  props: {
    visible: {
      // ẩn hiện form
      type: Boolean,
      default: false,
    },
    idEdit: {},
    employee: {
      type: Object,
    },
    data: {
      type: Object,
      default: () => {},
    },
    addStatus: {
      type: Boolean,
    },
  },

  watch: {
    employee: function (value) {
      (this.form = {
        ...value,
      }),
        this.getUrlAvt();
      this.getUrlImg();
      this.showUpload = true;
    },
    addStatus: function () {
      this.form = {};
      this.listAvatar = [];
    },
  },

  // Chức năng hiện hoặc đóng form sửa employee
  computed: {
    modalClass() {
      return this.showModal ? "show" : "";
    },
  },

  methods: {
    async getListImages(listImageBefore) {
      let data = new FormData();
      for (let i = 0; i < listImageBefore.length; i++) {
        data.append("image", listImageBefore[i])
        await editemployeeAPI.apiListImages(data).then((res) => {
          console.log("res", res)
          this.fileListImage.push(res.data)
        })
        .catch((error) => {
          console.error(error);''
        });
      }
    },

    loadData() {
      console.log("avatar:", this.data.avatar);
      const avt = [{ url: this.getUrlAvt(this.data.avatar) }];
      this.form.avatar = avt;
      this.form.emp_no = this.data.emp_no || "";
      this.form.first_name = this.data.first_name || "";
      this.form.last_name = this.data.last_name || "";
      this.form.gender = this.data.gender || "";
      this.form.hire_date = this.data.hire_date || "";
      this.form.birth_date = this.data.birth_date || "";
      this.form.title_id = this.data.title_id || "";
      this.form.department_id = this.data.department_id || "";
      this.form.salary = this.data.salary || "";

      console.log("listImageBefore", this.getListImages(this.listImageBefore))
      const img = [{ url: this.getUrlImg(this.getListImages(this.listImageBefore))}]
      this.form.images = img;
    }, 
    // POST cập nhật thông tin employee
    async updateUser() {
      this.showModal = true;
      const formData = new FormData();
      // chuyển đổi định dạng cho avt
      let urlAvt = null; // urlImg = []
      for (let i = 0; i < this.form.avatar.length; i++) {
        if (this.form.avatar[i].raw) {
          urlAvt = this.form.avatar[i].raw;
        } else {
          urlAvt = this.form.avatar[i].url.replace("http://6bfe-27-72-98-245.ngrok.io/image/","");
        }
      }

      // chuyển đổi định dạng cho img
      this.fileListImage = [];
      for (let i = 0; i < this.form.images.length; i++) {
        if (!this.form.images[i].raw) {
          let urlImg = this.form.images[i].url.replace("http://6bfe-27-72-98-245.ngrok.io/image/","");
          this.fileListImage.push(urlImg)
        }
      }

      console.log("url la", urlAvt);
      formData.append("avatar", urlAvt);
      formData.append("emp_no", this.form.emp_no);
      formData.append("first_name", this.form.first_name);
      formData.append("last_name", this.form.last_name);
      formData.append("gender", this.form.gender);
      formData.append("hire_date", this.form.hire_date);
      formData.append("birth_date", this.form.birth_date);
      formData.append("title_id", this.form.title_id);
      formData.append("department_id", this.form.department_id);
      formData.append("salary", this.form.salary);

      for (var i = 0; i < this.fileListImage.length; i++) {
        console.log("urlImg", this.fileListImage[i]);
        formData.append("images[]", this.fileListImage[i]);
      }
      
      await editemployeeAPI.editEmployee(this.idEdit, formData).then(() => {
          console.log("123456");
          this.$router.push("/userstable");
          this.$router.go("/userstable");
          this.showModal = false;
        })
        .catch((error) => {
          console.error(error);
          this.showModal = false;
        });

      this.$emit("edit-modal");

      editemployeeAPI.listEmployee(formData).then((res) => {
          this.users = res.data;
          this.$emit("reload");
          this.$emit("update:employee", formData);
          this.deleteUrlImage();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getUrlAvt(url) {
      if (url) {
        return process.env.VUE_APP_URL_AVATAR + "/" + this.data.avatar;
      }
      return url;
    },

    getUrlImg(url) {
      if (url) {
        return process.env.VUE_APP_URL_AVATAR + "/" + this.data.images;
      }
      return url;
    },

    deleteUrlImage() {
      console.log("123");
      this.listImage = [];
      this.listUrlImage = [];
      this.listImageBefore = [];
    },

    //https://8649-221-133-18-67.ngrok.io/image/202208241021.png hiển thị để sửa
    uploadAvatar(file, listAvatar) {
      console.log("fileAvt", file);
      console.log("listAvatar", listAvatar);

      this.form.avatar = listAvatar;
      this.showUpload = !this.showUpload;
    },

    // 2 api để  lấy url và post lên
    uploadImage(file, listImage) {
      console.log("fileImg", file);
      this.listImageBefore.push(listImage);
    },

    removeAvatar() {
      this.listAvatar = [];
      this.showUpload = false;
    },

    removeImage(e) {
      console.log(e);
      if (e.raw) {
        this.listImageBefore = this.listImageBefore.filter((file) => {
          return file != e.raw;
        });
      } else {
        this.fileListImage = this.fileListImage.filter((file) => {
          console.log("file:", e.url, "file :", file);
          return true;
        });
      }
      console.log(this.listImageBefore);
    },

    // replaceUrlAvatar() {
    //   // chuyển đổi định dạng cho avt
    //   let urlAvt = null; // urlImg = []
    //   for (let i = 0; i < this.form.avatar.length; i++) {
    //     if (this.form.avatar[i].raw) {
    //       urlAvt = this.form.avatar[i].raw;
    //     } else {
    //       urlAvt = this.form.avatar[i].url.replace(
    //         "http://6bfe-27-72-98-245.ngrok.io/image/",
    //         ""
    //       );
    //     }
    //   }
    // },

    // replaceUrlImage() {
    //   // chuyển đổi định dạng cho img
    //   let urlImg = [];
    //   for (let i = 0; i < this.listImage.length; i++) {
    //     if (!this.listImage[i].raw) {
    //       urlImg = this.listImage[i].raw;
    //     } else {
    //       urlImg = this.listImage[i].url.replace(
    //         "http://6bfe-27-72-98-245.ngrok.io/image/",
    //         ""
    //       );
    //     }
    //   }
    // },

    //truyen tu con len cha
    closeModal() {
      this.showUpload = false;
      this.$refs.form.resetFields();
      this.$emit("close-modal");
    },
  },
};
</script>

<style>
.hideUpload > .el-upload-list > .el-upload--picture-card {
  display: none;
}
</style>



<!-- <template>
  <div class="container">
    <div v-bind:class="{ show: showModalEditEmployee }" class="modal-container">
      <div class="user-modal">
        <h3 class="text-info">Sửa Thông Tin</h3>

        <div class="form-group">
          <input
            type="file"
            accept="image/*"
            name="image"
            id="file"
            onchange="uploadAvatar(e)"
            style="display: none"
          />
          <label for="file" style="cursor: pointer">Upload Avatar</label>
          <div id="avatar" ref="avatar">{{ fileList }}</div>
          <img src="" id="avatar" width="100" />
        </div>

        <div class="form-group">
          <label for="">Id</label>
          <input
            required
            type="text"
            v-model="editForm.emp_no"
          
          />
        </div>

        <div class="form-group">
          <label for="">First_name</label>
          <input
            required
            type="text"
            v-model="editForm.first_name"
            
          />
        </div>
        <div class="error" v-if="!$v.first_name.required">
          Vui lòng không để trống
        </div>
        <div class="error" v-if="!$v.first_name.minLength">
          First_name phải có tối thiểu
          {{ $v.first_name.$params.minLength.min }} ký tự
        </div>

        <div class="form-group">
          <label for="">Last_name</label>
          <input
            required
            type="text"
            v-model="editForm.last_name"
            
          />
        </div>
        <div class="error" v-if="!$v.last_name.required">
          Vui lòng không để trống
        </div>
        <div class="error" v-if="!$v.last_name.minLength">
          Last_name phải có tối thiểu
          {{ $v.last_name.$params.minLength.min }} ký tự
        </div>

        <div class="form-group">
          <label for="">Gender</label>
          <select v-model="editForm.gender" class="form-control">
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div class="form-group">
          <label for="">Hire_date</label>
          <el-date-picker
            required
            type="date"
            v-model="editForm.hire_date"
            placeholder="Chọn ngày"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
            ></el-date-picker
          >
        </div>

        <div class="form-group">
          <label for="">Birth_date</label>
          <el-date-picker
            required
            type="date"
            v-model="editForm.birth_date"
            placeholder="Chọn ngày"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
            ></el-date-picker
          >
        </div>

        <div class="form-group">
          <label for="">Title_id</label>
          <select v-model="editForm.title_id" class="form-control">
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
          <label for="">department_id</label>
          <select v-model="editForm.department_id" class="form-control">
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
          <label for="">Salary</label>
          <input
            required
            type="text"
            v-model="editForm.salary"
            class="form-control"
          />
        </div>

        <button
          v-on:click.prevent="closeModal()"
          class="btn btn-secondary mr-1"
        >
          Đóng
        </button>
        <button v-on:click="updateUser()" type="submit" class="btn btn-primary">
          Lưu
        </button>
      </div>
    </div>
  </div>
</template> -->

