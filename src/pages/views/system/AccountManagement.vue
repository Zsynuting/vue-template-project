<template>
  <el-container class="page-container">
    <el-header>
      <div class="page-section">
        <el-row>
          <el-col :span="18">
            <el-button @click="add" :disabled="editing">添加</el-button>
            <el-button @click="edit" :disabled="adding || currentIndex < 0">编辑</el-button>
            <el-button @click="remove" :disabled="adding || editing || currentIndex < 0">删除</el-button>
            <el-button>导入</el-button>
            <el-button>导出</el-button>
          </el-col>
          <el-col :span="6">
            <el-input v-model="condition" class="search">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
                @keydown.enter="search"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
    </el-header>

    <el-main class="table-wrap">
      <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" title="社区总体信息">
        <el-form label-width="150px" :model="model" :inline="true" :rules="modelRules" ref="form">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="角色:" prop="roleIds">
            <remote-selector-multi
              v-model="model.roleIds"
              :name.sync="model.roleNames"
              :ajax-proxy="$api.role"
            ></remote-selector-multi>
          </el-form-item>
          <el-form-item label="管辖小区:" prop="administrativeDivisionIds">
            <tree-scope-selector
              :ajax-proxy="$api.administrativeDivision"
              v-model="model.administrativeDivisionIds"
              :name.sync="model.administrativeDivisionNames"
            ></tree-scope-selector>
          </el-form-item>
          <el-form-item label="管辖单位:" prop="organizationIds">
            <remote-selector-multi
              v-model="model.organizationIds"
              :name.sync="model.organizationNames"
              :ajax-proxy="$api.organization"
            ></remote-selector-multi>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="model.status"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button @click="save">保存</el-button>
        </span>
      </el-dialog>

      <el-table
        :data="data"
        size="small"
        :stripe="true"
        :border="true"
        :highlight-current-row="true"
        height="100%"
        @row-click="selectRow"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="username" label="账户" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roleNames" label="角色" show-overflow-tooltip></el-table-column>
        <el-table-column prop="administrativeDivisionNames" label="管辖小区" show-overflow-tooltip></el-table-column>
        <el-table-column prop="organizationNames" label="管辖单位" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <el-pagination
        v-if="totalPages"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-count="totalPages"
        @current-change="load"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import RemoteSelectorMulti from "@/components/RemoteSelectorMulti";
import TreeScopeSelector from "@/components/TreeScopeSelector";
import mixin from "../management-page-mixin";

export default {
  name: "AccountManagement",
  components: { RemoteSelectorMulti, TreeScopeSelector },
  mixins: [mixin],
  computed: {
    defaultModel() {
      return {
        username: null,
        roleNames: null,
        administrativeDivisionNames: null,
        organizationNames: null
      };
    },
    modelRules() {
      return {
        username: [this.requiredRule],
        roleIds: [this.requiredRule],
        administrativeDivisionIds: [this.requiredRule]
      };
    }
  },
  mounted() {
    this.ajaxProxy = this.$api.account.default;
    this.load();
  }
};
</script>