import FileUpload from '@/components/FileUpload'
import _ from 'lodash'
import {
  mapGetters
} from 'vuex'
import {
  idRegExp,
  integerRegExp,
  doubleRegExp,
  mobileRegExp,
  phoneRegExp,
  longitudeRegExp,
  latitudeRegExp
} from "@/utils/regexp"

export default {
  components: {
    FileUpload
  },

  data() {
    return {
      // 列表数据
      data: [],
      currentPage: 1,
      totalPages: 0,
      // 编辑对象
      model: {},
      // ajax 互操作代理
      ajaxProxy: null,
      // 当前选择的列表条目
      currentData: null,
      // 当前选择的列表条目索引
      currentIndex: -1,
      // 编辑对话框是否可见
      dialogVisible: false,
      // adding/editing 用来区分编辑状态
      adding: false,
      editing: false,
      // 查询条件
      condition: "",
      // 精确查询
      advancedSearch: false
    };
  },

  computed: {
    ...mapGetters({
      dictionary: "getDictionary"
    }),
    requiredRule() {
      return {
        required: true,
        message: "必填"
      };
    },
    idRule() {
      return {
        validator: (rule, value, callback) => {
          if (!value || idRegExp.test(value)) {
            callback();
          } else {
            callback(new Error(rule.message));
          }
        },
        message: "请检查输入的身份证号"
      };
    },
    phoneRule() {
      return {
        validator: (rule, value, callback) => {
          if (!value || mobileRegExp.test(value) || phoneRegExp.test(value)) {
            callback();
          } else {
            callback(new Error(rule.message));
          }
        },
        message: "请检查输入的电话号码"
      };
    },
    integerRule() {
      return {
        validator: (rule, value, callback) => {
          if (!value || integerRegExp.test(value)) {
            callback();
          } else {
            callback(new Error(rule.message));
          }
        },
        message: "请确认输入的数字"
      };
    },
    doubleRule() {
      return {
        validator: (rule, value, callback) => {
          if (!value || doubleRegExp.test(value)) {
            callback();
          } else {
            callback(new Error(rule.message));
          }
        },
        message: "请检查输入的数字"
      };
    },
    positiveRule() {
      return {
        validator: (rule, value, callback) => {
          if (value > 0) {
            callback();
          } else {
            callback(new Error(rule.message));
          }
        },
        message: "请检查输入的数字"
      };
    },
    longitudeRule() {
      return {
        validator: (rule, value, callback) => {
          if (!value || longitudeRegExp.test(value)) {
            callback();
          } else {
            callback(new Error(rule.message));
          }
        },
        message: "经度格式为：-180.0～+180.0（整数部分为0～180，必须输入1到5位小数）"
      };
    },
    latitudeRule() {
      return {
        validator: (rule, value, callback) => {
          if (!value || latitudeRegExp.test(value)) {
            callback();
          } else {
            callback(new Error(rule.message));
          }
        },
        message: "维度格式为：-90.0～+90.0（整数部分为0～90，必须输入1到5位小数）"
      };
    },
    searchingCondition() {
      let condition = {};
      if (this.advancedSearch) {
        condition = {
          ...this.searchingModel
        }
      } else {
        condition = {
          condition: this.condition
        }
      }
      return condition;
    }
  },

  watch: {
    dialogVisible(visible) {
      if (!visible) {
        // 隐藏时重置添加/编辑状态
        this.adding = false;
        this.editing = false;
        // 隐藏时重置表单的验证状态
        this.$refs.form.clearValidate();
      }
    }
  },

  methods: {
    load() {
      return this.ajaxProxy.get({
        page: this.currentPage - 1,
        ...this.searchingCondition
      }).then(({
        data
      }) => {
        this.data = data.content;
        this.totalPages = data.totalPages;
      });
    },
    add() {
      this.adding = true;
      this.editing = false;
      this.dialogVisible = true;
      this.model = _.cloneDeep(this.defaultModel);
      this.$nextTick(_ => {
        this.$refs.form.clearValidate();
      })
    },
    edit() {
      if (this.currentIndex > -1) {
        this.dialogVisible = true;
        this.model = _.cloneDeep(this.currentData);
        this.$nextTick(_ => {
          this.$refs.form.clearValidate();
        })
      } else {
        this.$message("请先选择一条数据");
      }
    },
    close() {
      this.dialogVisible = false;
    },
    selectRow(row) {
      this.currentData = row;
      this.currentIndex = this.data.indexOf(row);
    },
    save() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          if (this.adding) {
            this.ajaxProxy.post(this.model).then(() => {
              this.data.unshift(_.cloneDeep(this.model));
              this.close();
            })
          } else {
            this.ajaxProxy.put(this.model).then(() => {
              this.currentData = _.cloneDeep(this.model);
              this.data.splice(this.currentIndex, 1, this.currentData);
              this.close();
            })
          }
        } else {
          this.$message("表单中有非法字段");
        }
      });
    },
    remove() {
      if (this.currentIndex > -1) {
        this.$confirm("即将删除当前记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.ajaxProxy.delete(this.currentData).then(() => {
              this.data.splice(this.currentIndex, 1);
              this.currentData = null;
              this.currentIndex = -1;
              this.$message("记录已删除");
              this.load();
            })
          })
          .catch(() => {
            this.$message("取消删除");
          });
      } else {
        this.$message("请先选择一条数据");
      }
    },
    search() {
      this.currentPage = 1;
      this.load();
    },
    importFile(formData) {
      this.ajaxProxy.importFile(formData).then(() => {
        this.load();
      });
    },
    exportFile() {
      this.ajaxProxy.exportFile({
        page: this.currentPage - 1,
        ...this.searchingCondition
      });
    },
    downloadExample() {
      this.ajaxProxy.downloadExample();
    }
  }
}
