<template>
  <el-table :data="queues" style="width: 100%;padding-top: 15px;">
    <el-table-column :label="$t('dashboard.postTitle')" min-width="200">
      <template slot-scope="scope">{{ scope.row.post_title }}</template>
    </el-table-column>
    <el-table-column :label="$t('dashboard.siteName')" width="145" align="center">
      <template slot-scope="scope">{{ scope.row.sitename }}</template>
    </el-table-column>
    <el-table-column :label="$t('dashboard.status')" width="150" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusTranslate }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@/i18n'

export default {
  filters: {
    statusFilter: function(status) {
      const statusMap = {
        finished: 'success',
        failed: 'danger',
        pending: 'default',
        processing: 'default'
      }
      return statusMap[status]
    },
    statusTranslate: function(status) {
      return status ? i18n.t(`common.${status}`) : ''
    }
  },
  computed: {
    ...mapGetters(['queues'])
  }
}
</script>
