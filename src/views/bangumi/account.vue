<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-if="false"
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
      <el-button
        v-waves
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-refresh"
        @click="handleRefresh"
      >{{ $t('table.refresh') }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('table.add') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="$t('bangumiSettings.id')" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('bangumiSettings.platform')" width="180px" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.sitedriver" size="small">
              <el-option
                v-for="item in sites"
                :key="item.sitedriver"
                :label="item.sitename"
                :value="item.sitedriver"
              />
            </el-select>
          </template>
          <template v-else>
            <span>{{ scope.row.sitename }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column :label="$t('bangumiSettings.authinfo')">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-input
                  v-model="scope.row.username"
                  :placeholder="$t('bangumiSettings.username')"
                  size="small"
                />
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="scope.row.password"
                  :placeholder="$t('bangumiSettings.noChangeWithNonValue')"
                  size="small"
                />
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <span>{{ scope.row.username }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column :label="$t('bangumiSettings.status')" class-name="status-col" width="110">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.status" size="mini">
              <el-option :label="$t('common.enable')" :value="1" />
              <el-option :label="$t('common.disable')" :value="0" />
            </el-select>
          </template>
          <template v-else>
            <el-tag
              v-if="false"
              :disable-transitions="true"
              :type="scope.row.status | statusFilter"
              size="mini"
            >{{ transferStatus(scope.row.status) }}</el-tag>
            <span
              v-else
              :class="scope.row.status | statusFilter"
              class="span-border"
            >{{ transferStatus(scope.row.status) }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" :width="actionBarLength" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-button
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(scope.row)"
            >{{ $t('common.ok') }}</el-button>
            <el-button
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >{{ $t('common.cancel') }}</el-button>
          </template>
          <template v-else>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="scope.row.edit=!scope.row.edit"
            >{{ $t('common.edit') }}</el-button>
            <el-button
              v-if="scope.row.status === 0"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="handleEnable(scope.row)"
            >{{ $t('common.enable') }}</el-button>
            <el-button
              v-if="scope.row.status === 1"
              type="info"
              size="small"
              icon="el-icon-circle-close-outline"
              @click="handleDisable(scope.row)"
            >{{ $t('common.disable') }}</el-button>
            <el-button
              size="small"
              icon="el-icon-delete"
              type="danger"
              @click="deleteItem(scope.row)"
            >{{ $t('common.delete') }}</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t(textMap[dialogStatus])" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('bangumiSettings.platform')">
          <el-select
            v-model="temp.sitedriver"
            :placeholder="$t('common.pleaseSelect')"
            class="filter-item"
          >
            <el-option
              v-for="item in sites"
              :key="item.sitedriver"
              :label="item.sitename"
              :value="item.sitedriver"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('bangumiSettings.username')" prop="nicename">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item :label="$t('bangumiSettings.password')" prop="password">
          <el-input v-model="temp.password" type="password" />
        </el-form-item>
        <el-form-item :label="$t('bangumiSettings.status')">
          <el-select
            v-model="temp.status"
            :placeholder="$t('common.pleaseSelect')"
            class="filter-item"
          >
            <el-option
              v-for="item in calendarStatusOptions"
              :key="item.key"
              :label="$t(`common.${item.label}`)"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '@/api/settings'
import waves from '@/directive/waves' // 水波纹指令

const temp = {
  id: undefined,
  sitedriver: '',
  username: '',
  password: undefined,
  status: 1
}

export default {
  name: 'BangumiAccounts',
  directives: {
    waves
  },
  filters: {
    statusFilter: function(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      sites: [
        {
          sitename: 'Acg.Rip',
          sitedriver: 'AcgRip'
        },
        {
          sitename: '动漫花园',
          sitedriver: 'Dmhy'
        },
        {
          sitename: 'Nyaa',
          sitedriver: 'Nyaa'
        },
        {
          sitename: '萌番组',
          sitedriver: 'MoeBangumi'
        },
        {
          sitename: '爱恋动漫BT下载',
          sitedriver: 'Kisssub'
        }
      ],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        edit: 'common.edit',
        create: 'common.create'
      },
      calendarStatusOptions: [
        { label: 'isDisabled', key: 0 },
        { label: 'isEnabled', key: 1 }
      ],
      temp: Object.assign({}, temp),
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['language']),
    actionBarLength() {
      let width = 0
      switch (this.language) {
        case 'en':
          width = 300
          break
        case 'zh':
        default:
          width = 280
          break
      }
      return width
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      api.fetchBangumiAccounts(this.listQuery)
        .then(response => {
          const items = response.data.data
          this.list = items.map(v => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            //  will be used when user click the cancel botton START
            v.originalUsername = v.username
            v.originalStatus = v.status
            //  will be used when user click the cancel botton STOP
            v.password = ''
            return v
          })
          this.listLoading = false
        })
    },
    transferStatus(status) {
      const statusMap = {
        1: this.$t('common.isEnabled'),
        0: this.$t('common.isDisabled')
      }
      return statusMap[status]
    },
    cancelEdit(row) {
      row.username = row.originalUsername
      row.status = row.originalStatus
      row.password = ''
      row.edit = false
      // this.$message({
      //   message: 'The title has been restored to the original value',
      //   type: 'warning'
      // })
    },
    confirmEdit(row) {
      console.log(row)
      api.updateBangumiAccount(row.id, row)
        .then(data => {
          console.log(data)
          row.edit = false
          const self = this
          row.originalUsername = row.username
          row.originalStatus = row.status
          // this.list.some((v, index, list) => {
          //   if (v.id === row.id) {
          //     this.list[index] = row
          //     return true
          //   }
          // })
          this.$message({
            message: self.$t('common.updateDone'),
            type: 'success'
          })
        })
        .catch(e => {
          console.log(e)
          this.getList()
          const self = this
          this.$message({
            message: self.$t('common.updateFailed'),
            type: 'warning'
          })
        })

      // row.edit = false
      // row.originalTitle = row.title
      // this.$message({
      //   message: 'The title has been edited',
      //   type: 'success'
      // })
    },
    deleteItem(row) {
      this.$confirm(
        this.$t('common.deleteConfirmContent'),
        this.$t('common.deleteConfirmTitle'),
        {
          confirmButtonText: this.$t('common.ok'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          this.listLoading = true
          api.deleteBangumiAccount(row.id)
            .then(response => {
              if (response.status === 204) {
                this.getList()
                this.$message({
                  type: 'success',
                  message: this.$t('common.deleteDone')
                })
              }
            })
        })
    },
    handleEnable(row) {
      api.changeBangumiAccountStatus(row.id, 1)
        .then(data => {
          row.status = 1
          this.$notify({
            message: this.$t('common.actionDone'),
            type: 'success'
          })
        })
        .catch(e => {
          this.$notify({
            message: this.$t('common.actionFailed'),
            type: 'error'
          })
        })
    },
    handleDisable(row) {
      api.changeBangumiAccountStatus(row.id, 0)
        .then(data => {
          row.status = 0
          this.$notify({
            message: this.$t('common.actionDone'),
            type: 'success'
          })
        })
        .catch(e => {
          this.$notify({
            message: this.$t('common.actionFailed'),
            type: 'error'
          })
        })
    },
    handleRefresh() {
      this.getList()
    },
    resetTemp() {
      this.temp = Object.assign({}, temp)
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          api.createBangumiAccount(tempData)
            .then(response => {
              this.$message({
                type: 'success',
                message: this.$t('common.actionDone')
              })
              this.getList()
              this.dialogFormVisible = false
            })
            .catch(e => {
              this.$message({
                type: 'error',
                message: this.$t('common.actionFailed')
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.cur-md-input {
  background-color: inherit;
  font-size: 14px;
}

.span-border {
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  padding: 2.5px 10px;
}

.span-border.success {
  border-color: rgba(103, 194, 58, 0.2);
  background-color: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}
.span-border.danger {
  border-color: rgba(245, 108, 108, 0.2);
  background-color: rgba(245, 108, 108, 0.1);
  color: #f56c6c;
}
</style>
