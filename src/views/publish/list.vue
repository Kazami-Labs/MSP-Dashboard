<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('publish.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        :placeholder="$t('publish.status')"
        clearable
        class="filter-item"
        style="width: 130px"
        @change="handleFilter"
      >
        <el-option
          v-for="item in calendarStatusOptions"
          :key="item"
          :label="$t(`publish.${item}`)"
          :value="item"
        />
      </el-select>
      <el-select
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
          :label="$t(`publish.${item.label}`)"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-refresh"
        @click="handleRefresh"
      >{{ $t('table.refresh') }}</el-button>
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
      <el-table-column :label="$t('publish.id')" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('publish.date')" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.post_date }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('publish.author')" width="120px" align="center">
        <template slot-scope="scope">
          <span class="break-word">{{ scope.row.author.nicename }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('publish.status')" class-name="status-col" width="110">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.post_status | statusFilter"
          >{{ $t(`publish.${scope.row.post_status}`) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('publish.title')" min-width="300px">
        <template slot-scope="scope">
          <router-link :to="'/posts/edit/'+scope.row.id" class="link-type">
            <span class="break-word">{{ scope.row.post_title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" :width="actionBarLength" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.post_status === 'draft'"
            type="success"
            size="small"
            icon="el-icon-upload"
            @click="handlePublish(scope.row, $event)"
          >{{ $t('publish.publish') }}</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >{{ $t('publish.edit') }}</el-button>
          <el-button
            type="info"
            size="small"
            icon="el-icon-document"
            @click="handleShowLog(scope.row)"
          >{{ $t('publish.showBangumiSyncLog') }}</el-button>
          <el-button
            v-if="scope.row.post_status === 'published'"
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >{{ $t('publish.delete') }}</el-button>
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

    <el-dialog
      :visible.sync="dialogSyncLog"
      :title="$t('publish.showBangumiSyncLog') + ` - ${dialogSyncLogTitle}`"
    >
      <el-table
        v-loading="dialogSyncLogLoading"
        :data="logData"
        border
        fit
        highlight-current-row
        stripe
        style="width: 100%"
      >
        <el-table-column :label="$t('bangumi.platform')" prop="site" />
        <el-table-column :label="$t('bangumi.syncState')" prop="sync_state" />
        <el-table-column :label="$t('bangumi.logFile')">
          <template slot-scope="scope">
            <el-button
              v-t="'bangumi.showLogContents'"
              type="text"
              size="small"
              @click="handleShowLogContents(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.createdAt')" prop="created_at" />
      </el-table>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogSyncLogContents"
      :title="$t('publish.showBangumiSyncLog') + ` - ${dialogSyncLogPlatform} - ${dialogSyncLogTitle}`"
      class="sync-detail"
    >
      <el-container>
        <el-main v-loading="dialogSyncLogContentsLoading">
          <pre>{{ logContents }}</pre>
        </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '@/api/publish'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'PublishList',
  directives: {
    waves
  },
  filters: {
    statusFilter: function(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      calendarStatusOptions: [
        'published',
        'draft',
        // 'deleted',
        'inherit'
      ],
      sortOptions: [
        { label: 'idAsc', key: '+id' },
        { label: 'idDesc', key: '-id' },
        { label: 'createdAtAsc', key: '+create_at' },
        { label: 'createdAtDesc', key: '-create_at' }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        status: undefined
      },
      downloadLoading: false,
      dialogSyncLog: false,
      dialogSyncLogTitle: '',
      dialogSyncLogLoading: true,
      dialogSyncLogContents: false,
      dialogSyncLogPlatform: '',
      dialogSyncLogContentsLoading: true,
      logData: [],
      logContents: ''
    }
  },
  computed: {
    ...mapGetters(['language']),
    actionBarLength() {
      let width = 0
      switch (this.language) {
        case 'en':
          width = 380
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
      api.fetchList(this.listQuery)
        .then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
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
    handleShowLog(row) {
      this.dialogSyncLogLoading = true
      this.dialogSyncLogTitle = row.post_title
      this.logData = []
      api.getTransferLogs(row.id)
        .then(data => {
          this.logData = data.data
        })
        .finally(() => {
          this.dialogSyncLogLoading = false
        })
      this.dialogSyncLog = true
    },
    handleDownload() {
      this.$message({
        type: 'info',
        message: this.$t('common.isDeveloping')
      })
    },
    handleEdit(row) {
      this.$router.push(`/posts/edit/${row.id}`)
    },
    handlePublish(row, e) {
      api.changeStatus(row.id, 'published')
        .then(data => {
          row.post_status = 'published'
          this.$notify({
            message: this.$t('publish.publishSucceed', [row.post_title]),
            type: 'success'
          })
        })
        .catch(e => {
          this.$notify({
            message: this.$t('publish.publishFailed', [e.message]),
            type: 'error'
          })
        })
    },
    handleDelete(row) {
      console.log('handle delete:', row)
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
          api.deletePublish(row.id)
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
    handleShowLogContents(row) {
      this.dialogSyncLogContents = true
      this.dialogSyncLogPlatform = row.site
      this.dialogSyncLogContentsLoading = true
      this.logContents = ''
      api.getTransferLogsContents(row.id)
        .then(data => {
          this.logContents = data.data.contents
          this.dialogSyncLogContentsLoading = false
        })
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
.sync-detail pre {
  width: 100%;
  height: 45vh;
  overflow-x: hidden;
  overflow-y: scroll;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: rgba(100, 100, 100, 0.5) solid 1px;
}
</style>
