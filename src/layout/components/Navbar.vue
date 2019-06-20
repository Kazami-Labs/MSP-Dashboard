<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="queues-loading">
        <el-tooltip :content="queuesBtnTips" effect="dark" placement="top-end">
          <el-button
            :type="queuesBtnType"
            :loading="queuesBtnLoading"
            class="el-button-micro"
            icon="el-icon-check"
            circle
            @click="$router.push({ name: 'Dashboard' })"
          />
        </el-tooltip>
      </div>

      <error-log class="errLog-container right-menu-item" />

      <lang-select class="international right-menu-item" />

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item v-t="'navbar.home'" />
          </router-link>
          <a target="_blank" href="javascript:void()" @click="handleToPortal">
            <el-dropdown-item>Portal</el-dropdown-item>
          </a>
          <a target="_blank" href="javascript:void()" @click="handleToTelescope">
            <el-dropdown-item>Telescope</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span v-t="'navbar.logout'" style="display:block;" @click="logout" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { toPortal } from '@/api/user'
import { getQueues } from '@/api/publish'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'
import ErrorLog from '@/components/ErrorLog'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect,
    ErrorLog
  },
  data() {
    return {
      queuesBtnType: 'primary',
      queuesBtnLoading: true,
      queuesBtnTips: '',
      queuesInterval: null
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  created() {
    this.queuesBtnTips = this.$t('navbar.queueProcess')
  },
  mounted() {
    const INTERVAL_TO_GET_QUEUES = 3000
    this.queuesInterval = window.setInterval(() => {
      this.checkQueues().catch(e => {
        window.clearInterval(this.queuesInterval)
      })
    }, INTERVAL_TO_GET_QUEUES)
  },
  destroyed() {
    window.clearInterval(this.queuesInterval)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleToPortal() {
      toPortal().then(() => {
        window.open('/')
      })
    },
    handleToTelescope() {
      toPortal().then(() => {
        window.open('/telescope')
      })
    },
    checkQueues() {
      return getQueues().then(res => {
        this.$store.dispatch('app/storeQueues', res.data.list)
        if (res.data.has_done) {
          this.queuesBtnType = 'success'
          this.queuesBtnTips = this.$t('navbar.queueCompile')
          this.queuesBtnLoading = false
        } else {
          this.queuesBtnType = 'primary'
          this.queuesBtnTips = this.$t('navbar.queueProcess')
          this.queuesBtnLoading = true
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    display: inline-block;
    width: calc(100% - 315px);
  }

  .right-menu {
    display: inline-block;
    width: 250px;
    height: 100%;
    line-height: 50px;
    text-align: right;

    > * {
      display: inline-block;
      margin-right: 10px;
    }

    .queues-loading {
      vertical-align: top;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
