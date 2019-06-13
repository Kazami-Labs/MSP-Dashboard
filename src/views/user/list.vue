<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword"
        :placeholder="$t('table.search')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-show="false"
        v-model="listQuery.status"
        :placeholder="$t('common.status')"
        clearable
        class="filter-item"
        style="width: 130px"
        @change="handleFilter"
      >
        <el-option
          v-for="item in calendarStatusOptions"
          :key="item.key"
          :label="$t(`common.${item.label}`)"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-show="false"
        v-model="listQuery.sort"
        :placeholder="$t('table.sort')"
        clearable
        class="filter-item"
        style="width: 140px"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="$t(`users.${item.label}`)"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-show="false"
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
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="$t('users.id')" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('users.name')" class-name="fixed-width" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.avatar_addr" :src="scope.row.avatar_addr" class="avatar">
          <span class="break-word user-name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('users.nicename')" class-name="fixed-width" align="center">
        <template slot-scope="scope">
          <span class="break-word">{{ scope.row.nicename }}</span>
          <span v-show="scope.row.is_admin" class="admin-span no-wrap">
            <svg-icon icon-class="admin" />
            {{ $t('users.isAdmin') }}
          </span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('users.email')" class-name="fixed-width" align="center">
        <template slot-scope="scope">
          <a :href="`mailto:${scope.row.email}`" class="break-word">{{ scope.row.email }}</a>
        </template>
      </el-table-column>

      <el-table-column :label="$t('users.registered')" width="180" align="center">
        <template slot-scope="scope">
          <span class="break-word">{{ scope.row.registered_at }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('users.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ transferStatus(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.actions')"
        align="center"
        class-name="small-padding"
        width="110"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.row)"
          >{{ $t('users.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :title="$t(textMap[dialogStatus])" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="100px"
        style="margin:0 50px;"
      >
        <el-form-item :label="$t('users.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('users.nicename')" prop="nicename">
          <el-input v-model="temp.nicename" />
        </el-form-item>
        <el-form-item :label="$t('users.email')" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item :label="$t('users.password')" prop="password">
          <el-input v-model="temp.password" type="password" />
        </el-form-item>
        <el-form-item :label="$t('users.setAsAdmin')" prop="password">
          <el-radio-group v-model="temp.is_admin" size="small">
            <el-radio :label="1" border>{{ $t('common.yes') }}</el-radio>
            <el-radio :label="0" border>{{ $t('common.no') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('users.status')">
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
        <el-button v-t="'table.cancel'" @click="dialogFormVisible = false" />
        <el-button v-t="'table.confirm'" type="primary" @click="handleSubmit" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchUsers } from '@/api/settings'
import { createUser, updateUser } from '@/api/user'
import waves from '@/directive/waves' // 水波纹指令

const temp = {
  id: undefined,
  name: '',
  email: '',
  password: undefined,
  is_admin: 0,
  status: 1
}

export default {
  name: 'UserList',
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
      total: 0,
      listLoading: true,
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        keyword: undefined,
        status: undefined
      },
      calendarStatusOptions: [
        { label: 'isDisabled', key: 0 },
        { label: 'isEnabled', key: 1 }
      ],
      sortOptions: [
        // { label: 'idAsc', key: '+id' },
        // { label: 'idDesc', key: '-id' },
        // { label: 'createdAtAsc', key: '+create_at' },
        // { label: 'createdAtDesc', key: '-create_at' }
      ],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        edit: 'common.edit',
        create: 'common.create'
      },
      temp: Object.assign({}, temp),
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      return fetchUsers(this.listQuery)
        .then(response => {
          this.list = response.data.data
          this.total = response.data.total
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
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleFilter() {
      this.getList()
    },
    handleRefresh() {
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleEdit(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleSubmit() {
      switch (this.dialogStatus) {
        case 'create':
          return this.createData()
        case 'update':
          return this.updateData()
      }
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          createUser(tempData)
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
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData.id, tempData)
            .then(response => {
              this.$message({
                type: 'success',
                message: this.$t('common.updateDone')
              })
              this.getList()
                .then(() => {
                  this.dialogFormVisible = false
                })
            })
            .catch(e => {
              this.$message({
                type: 'error',
                message: this.$t('common.updateFailed')
              })
            })
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      const tHeader = [
        this.$t('users.name'),
        this.$t('users.email'),
        this.$t('users.nicename'),
        this.$t('users.registered'),
        this.$t('users.status')
      ]
      const filterVal = ['name', 'email', 'nicename', 'registered', 'status']
      import('@/vendor/Export2Excel').then(excel => {
        const list = JSON.parse(JSON.stringify(this.list))
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    resetTemp() {
      this.temp = Object.assign({}, temp)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'status') {
          for (const status of this.calendarStatusOptions) {
            if (status.key === v[j]) {
              v[j] = this.$t(`common.${status.label}`)
              break
            }
          }
          return v[j]
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.break-word {
  word-break: break-word;
}
.no-wrap {
  white-space: nowrap;
}

.user-name,
.avatar {
  display: inline-block;
  vertical-align: middle;
}

.avatar {
  width: 50px;
}

.admin-span {
  border: 1px solid #258cff;
  border-radius: 5px;
  margin-left: 5px;
  padding: 2px;
  color: #258cff;
}
</style>
