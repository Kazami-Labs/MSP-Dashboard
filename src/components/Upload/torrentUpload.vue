<template>
  <el-upload
    ref="upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-remove="beforeRemove"
    :limit="limit"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :action="actionUrl"
    :auto-upload="false"
    class="upload"
    accept="application/x-bittorrent"
  >
    <el-button
      slot="trigger"
      :loading="loading"
      size="small"
      type="primary"
    >{{ $t('torrentUpload.selectFile') }}</el-button>
    <el-button
      :loading="loading"
      size="small"
      type="success"
      @click="submitUpload"
    >{{ $t('torrentUpload.submitUpload') }}</el-button>
    <div slot="tip" class="el-upload__tip">
      <slot/>
    </div>
  </el-upload>
</template>
<script>
export default {
  name: 'TorrentUpload',
  props: {
    actionUrl: {
      type: String,
      required: true
    },
    initFilename: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      loading: false
    }
  },
  computed: {
    limit() {
      return 1
    }
  },
  watch: {
    initFilename: function(file) {
      if (file) {
        this.fileList = [{
          name: file
        }]
      }
    }
  },
  created() {
    // console.log(this.actionUrl)
    // console.log(this.value)
  },
  methods: {
    submitUpload() {
      this.loading = true
      this.$refs.upload.submit()
    },
    handleRemove: function(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview: function(file) {
      console.log(file)
    },
    handleExceed: function(files, fileList) {
      // this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      this.loading = false
      this.$message.warning(`当前限制选择 ${this.limit} 个文件。你可以先移除当前文件，再选择新的文件上传！`)
    },
    beforeRemove: function(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess: function(response, file, fileList) {
      this.loading = false
      this.$emit('on-success', response, file, fileList)
    }
  }
}
</script>

<style scoped>
</style>

