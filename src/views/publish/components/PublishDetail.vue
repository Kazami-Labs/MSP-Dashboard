<template>
  <div class="post-container">
    <el-form
      ref="postForm"
      v-loading="formLoading"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <sticky :class-name="`sub-navbar ${postForm.post_status}`">
        <CommentDropdown v-model="postForm.comment_status" />
        <el-button
          :loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >{{ $t('publish.publish') }}</el-button>
        <el-button :loading="loading" type="warning" @click="draftForm">{{ $t('publish.draft') }}</el-button>
      </sticky>

      <div class="post-main-container">
        <el-row>
          <Warning v-if="false" />
          <el-col :span="24">
            <el-row class="editor-head">
              <el-col :span="12">
                <el-form-item prop="title">
                  <MDinput
                    v-model="postForm.post_title"
                    :maxlength="100"
                    name="name"
                    required
                  >{{ $t('publish.title') }}</MDinput>
                </el-form-item>
              </el-col>
              <el-col :span="5" class="bangumi-subgroup">
                <el-form-item prop="subgroup">
                  <MDinput
                    v-model="postForm.bangumi.group_name"
                    :maxlength="100"
                    name="name"
                    required
                  >{{ $t('bangumi.subtGroup') }}</MDinput>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="bangumi-year">
                <el-form-item prop="bangumiYear">
                  <el-select
                    v-model="postForm.bangumi.year"
                    :placeholder="$t('bangumi.year')"
                    style="margin-top: 36px;"
                    filterable
                  >
                    <el-option
                      v-for="(item, index) in bangumiYears"
                      :key="index"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="editor-guid">
              <el-col>
                <el-form-item prop="title">
                  <MDinput
                    v-model="postForm.guid"
                    :maxlength="100"
                    name="guid"
                    required
                  >{{ $t('publish.guid') }}</MDinput>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <torrent-upload
                :action-url="uploadTorrentApi"
                :init-filename="postForm.bangumi.filename"
                @on-success="handleTorrentUploadSuccess"
              >{{ $t('publish.torrentUploadTips') }}</torrent-upload>
            </el-form-item>

            <div class="editor-container">
              <mavon-editor
                ref="editor"
                v-model="postForm.markdown_code"
                :language="language"
                :ishljs="true"
                style="min-height: 600px;"
                @change="handleMarkdownChange"
              />
            </div>

            <el-form-item class="publish-excerpt">
              <MDinput
                v-model="postForm.post_excerpt"
                :placeholder="$t('common.inputTips')"
                name="post_excerpt"
                class="excerpt-input"
                required
              >{{ $t('publish.excerpt') }}</MDinput>
              <span
                v-show="contentShortLength"
                class="word-counter"
              >{{ contentShortLength }}{{ $t('publish.words') }}</span>
            </el-form-item>

            <div class="postinfo-container">
              <el-row>
                <el-col v-if="postForm.id" :span="24">
                  <el-form class="postinfo-container-form" label-position="left" label-suffix=":">
                    <el-form-item
                      :label="$t('publish.author')"
                      label-width="60px"
                      class="postinfo-container-item"
                    >
                      <el-select
                        v-if="false"
                        v-model="postForm.post_author"
                        :placeholder="$t('publish.searchUser')"
                        :remote-method="getRemoteUserList"
                        filterable
                        remote
                      >
                        <el-option
                          v-for="item in userListOptions"
                          :key="item.id"
                          :label="item.nicename"
                          :value="item.id"
                        />
                      </el-select>
                      {{ postForm.author.nicename }}
                    </el-form-item>
                  </el-form>
                  <el-form class="postinfo-container-form" label-position="right" label-suffix=":">
                    <el-form-item
                      :label="$t('publish.createdAt')"
                      label-width="120px"
                      class="postinfo-container-item"
                    >{{ postForm.post_date }}</el-form-item>
                    <el-form-item
                      :label="$t('publish.updatedAt')"
                      label-width="120px"
                      class="postinfo-container-item"
                    >{{ postForm.post_modified }}</el-form-item>
                  </el-form>
                </el-col>

                <el-col v-if="false" :span="10">
                  <el-form-item
                    v-if="false"
                    :label="$t('publish.createdAt') + ':'"
                    label-width="80px"
                    class="postInfo-container-item"
                  >
                    <el-date-picker
                      v-model="postForm.post_date"
                      :readonly="true"
                      :placeholder="$t('common.chooseDatetime')"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-form-item>
                </el-col>

                <el-col v-if="false" :span="6">
                  <el-form-item
                    :label="$t('table.importance') + ':'"
                    label-width="60px"
                    class="postInfo-container-item"
                  >
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="margin-top:8px;"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import torrentUpload from '@/components/Upload/torrentUpload'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { fetchPublish, createPublish, updatePublish, uploadTorrentApi } from '@/api/publish'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
import { CommentDropdown } from './Dropdown'

const defaultForm = {
  post_status: 'draft',
  post_title: '', // 文章题目
  post_content: '', // 文章内容
  markdown_code: '', // Markdown 代码
  post_excerpt: '', // 文章摘要
  guid: '', // 文章外链
  // image_uri: '', // 文章图片
  post_date: undefined, // 前台展示时间
  post_modified: undefined, // 前台展示时间
  id: undefined,
  // platforms: ['a-platform'],
  comment_disabled: false,
  // importance: 0,
  bangumi: {
    filename: '',
    filepath: '',
    title: '',
    group_name: '',
    year: ''
  }
}

export default {
  name: 'PublishDetail',
  components: {
    MDinput,
    Sticky,
    Warning,
    CommentDropdown,
    torrentUpload
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      formLoading: false,
      userListOptions: [],
      bangumiYears: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['language']),
    contentShortLength() {
      if (this.postForm.post_excerpt) {
        return this.postForm.post_excerpt.length
      } else {
        return 0
      }
    },
    lang() {
      return this.$store.getters.language
    },
    uploadTorrentApi() {
      return uploadTorrentApi
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.bangumiYearsInit()
  },
  methods: {
    fetchData(id) {
      this.formLoading = true
      fetchPublish(id)
        .then(response => {
          this.postForm = response.data
          if (!this.postForm.bangumi) {
            this.postForm.bangumi = defaultForm.bangumi
          }
          // Set tagsview title
          this.setTagsViewTitle()
          this.setUserSelect()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.formLoading = false
        })
    },
    setTagsViewTitle() {
      const title = this.$t('publish.editPublish')
      const post_name = decodeURI(this.postForm.post_title)
      const route = Object.assign({}, this.$route, { title: `${title}-${post_name}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    setUserSelect() {
      this.userListOptions.push(this.postForm.author)
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      // console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          const id = this.postForm.id
          const data = this.postForm
          data.post_status = 'published'
          let promise
          let successMsg
          if (id) {
            promise = updatePublish(id, data)
            successMsg = this.$t('common.updateDone')
          } else {
            promise = createPublish(data)
            successMsg = this.$t('publish.publishDone')
          }
          promise
            .then(response => {
              // console.log(response)
              this.$notify({
                title: this.$t('common.success'),
                message: successMsg,
                type: 'success',
                duration: 2000
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      // console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          const id = this.postForm.id
          const data = this.postForm
          data.post_status = 'draft'
          let promise
          let successMsg
          if (id) {
            promise = updatePublish(id, data)
            successMsg = this.$t('common.updateDone')
          } else {
            promise = createPublish(data)
            successMsg = this.$t('publish.draftDone')
          }
          promise
            .then(response => {
              // console.log(response)
              this.$notify({
                title: this.$t('common.success'),
                message: successMsg,
                type: 'success',
                duration: 2000
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.data) return
        this.userListOptions = response.data.data
      })
    },
    handleTorrentUploadSuccess(response, file, fileList) {
      const form = this.postForm
      const bangumi = form.bangumi
      bangumi.filename = response.filename
      bangumi.filepath = response.filepath
      bangumi.title = response.title
      bangumi.group_name = response.group_name
      if (form.post_title.length === 0) {
        form.post_title = response.title
      }
      if (bangumi.year === '') {
        bangumi.year = this.bangumiYears[0]
      }
    },
    handleMarkdownChange(value, render) {
      this.postForm.post_content = render
    },
    bangumiYearsInit() {
      const date = new Date()
      let year = date.getFullYear()
      for (let i = 0; i < 10; ++i) {
        this.bangumiYears.push(year)
        --year
      }
    }
  }
}
</script>

<style scoped>
.bangumi-subgroup,
.bangumi-year {
  margin-left: 10px;
}
.el-form-item {
  margin-bottom: 40px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.post-container {
  position: relative;
  .post-main-container {
    padding: 40px 45px 20px 50px;
    .postinfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postinfo-container-form {
        display: inline-block;
        .postinfo-container-item {
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
    .publish-excerpt {
      .word-counter {
        position: absolute;
        right: 40px;
        bottom: 0;
        color: #777;
      }
    }
  }
}
</style>
