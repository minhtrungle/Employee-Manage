<template lang="">
    <el-row type="flex" justify="space-between" class="mt-3">
      <el-pagination
        background
        @size-change="handleChangeSize"
        @current-change="handleChangePage"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="changepageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      />
    </el-row>
</template>
<script>
export default {
    components: {
  },
  props: {
    data: Array,
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type:Number,
      default: 10
    },
    pageCount:{
      type: Number,
    },
    page:{
      type: Number,
    }
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
    };
  },
  methods: {
    // phân trang
    handleChangePage(page) {
      this.$emit("update:page", page);
      this.$emit("loadPage")
    },
    handleChangeSize(pageSize) {
      this.$emit("update:pageSize", pageSize);
      this.$emit("loadPage")
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(value) {  
        return value
      } 
    },
    changepageSize: {
      get() {
        return this.pageSize
      },
      set(value) {  
        return value
      } 
    }
  }
};
</script>     