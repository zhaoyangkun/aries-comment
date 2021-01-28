<template>
  <div class="comment-container">
    <a-form-model ref="publishForm" :model="publishForm" :rules="publishRules">
      <a-row :gutter="16">
        <a-col :lg="8" class="input-item">
          <a-form-model-item class="form-item" prop="nick_name">
            <a-input v-model="publishForm.nick_name" placeholder="呢称" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" class="input-item">
          <a-form-model-item class="form-item" prop="email">
            <a-input
              type="email"
              placeholder="邮箱"
              v-model="publishForm.email"
            />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" class="input-item">
          <a-form-model-item class="form-item" prop="url">
            <a-input placeholder="网址" v-model="publishForm.url" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row class="comment-textarea-box t_a_l">
        <a-col :span="24">
          <a-form-model-item class="form-item" prop="content">
            <CommentVditor ref="commentVditor" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>

    <a-row class="button-box">
      <a-col :span="21"></a-col>
      <a-col :span="3">
        <a-button id="submit-btn" @click="handlePublishComment">提交</a-button>
      </a-col>
    </a-row>

    <a-row class="comment-number-box">
      <div class="t_a_l">
        <span id="comment-number">{{ pagination.dis_num }}</span> 条评论
      </div>
    </a-row>

    <a-row
      class="comment-content-box"
      v-for="comment in commentList"
      :key="comment.ID"
    >
      <a-row class="comment-root-box">
        <a-col :span="2" class="user-img-box">
          <img
            class="user-img"
            src="https://cn.gravatar.com/avatar/7b072beef3e42b99231f9ecb0a0856b9&d=mm"
          />
        </a-col>
        <a-col :span="22" class="comment-detail-box">
          <a-col :span="24">
            <a-col></a-col>
            <a-col></a-col>
            <p class="nickname f_l">{{ comment.nick_name }}</p>
            <p class="device f_l">{{ comment.device }}</p>
          </a-col>
          <a-col :span="24">
            <p class="time f_l">{{ showTime(comment.CreatedAt) }}</p>
            <p class="reply-btn-box">
              <a
                @click="handleOpenDrawer(comment.ID, comment.ID)"
                class="reply-btn"
                >回复</a
              >
            </p>
          </a-col>
          <a-col :span="24">
            <p
              class="comment-content t_a_l f_l"
              v-html="comment.md_content"
            ></p>
          </a-col>
        </a-col>
      </a-row>

      <a-row
        class="comment-reply-box"
        v-for="child_comment in comment.child_comments"
        :key="child_comment.ID"
      >
        <a-col :span="2" class="user-img-box">
          <img
            class="user-img"
            src="https://cn.gravatar.com/avatar/7b072beef3e42b99231f9ecb0a0856b9&d=mm"
          />
        </a-col>
        <a-col :span="22" class="comment-detail-box">
          <a-col :span="24">
            <p class="nickname f_l">
              {{ child_comment.nick_name }}
            </p>
            <p class="device f_l">{{ child_comment.device }}</p>
          </a-col>
          <a-col :span="24">
            <p class="time f_l">{{ showTime(child_comment.CreatedAt) }}</p>
            <p class="reply-btn-box">
              <a
                @click="
                  handleOpenDrawer(
                    child_comment.root_comment_id,
                    child_comment.ID,
                  )
                "
                class="reply-btn"
                >回复</a
              >
            </p>
          </a-col>
          <a-col :span="24">
            <p class="at-user">@{{ child_comment.parent_comment.nick_name }}</p>
            <p
              class="comment-content t_a_l f_l"
              v-html="child_comment.md_content"
            ></p>
          </a-col>
        </a-col>
      </a-row>

      <a-divider class="divider" />
    </a-row>

    <a-row class="empty-tip" v-if="commentList.length === 0">
      <span>暂无评论</span>
    </a-row>

    <!-- 分页 -->
    <a-row>
      <a-pagination
        :default-current="pagination.page"
        :total="pagination.total_num"
        :page-size="pagination.size"
        @change="handlePageChange"
      />
    </a-row>

    <!-- 回复弹窗 -->
    <a-drawer
      title="回复"
      :placement="placement"
      :closable="true"
      :visible="visible"
      :height="300"
      @close="handleCloseDrawer"
    >
      <div class="comment-container">
        <a-form-model ref="replyForm" :model="replyForm" :rules="replyRules">
          <a-row :gutter="16">
            <a-col :lg="8" class="input-item">
              <a-form-model-item class="form-item" prop="nick_name">
                <a-input placeholder="呢称" v-model="replyForm.nick_name" />
              </a-form-model-item>
            </a-col>
            <a-col :lg="8" class="input-item">
              <a-form-model-item class="form-item" prop="email">
                <a-input
                  type="email"
                  placeholder="邮箱"
                  v-model="replyForm.email"
                />
              </a-form-model-item>
            </a-col>
            <a-col :lg="8" class="input-item">
              <a-form-model-item class="form-item" prop="url">
                <a-input placeholder="网址" v-model="replyForm.url" />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row class="comment-textarea-box t_a_l">
            <a-col :span="24">
              <a-form-model-item class="form-item" prop="url">
                <ReplyVditor ref="replyVditor" v-model="replyForm.url" />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row class="button-box">
            <a-col :span="21"></a-col>
            <a-col :span="3">
              <a-button id="submit-btn" @click="handleReplyComment"
                >提交</a-button
              >
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import CommentVditor from '../components/CommentVditor';
import ReplyVditor from '../components/ReplyVditor';

export default {
  name: 'Comment',
  components: {
    CommentVditor,
    ReplyVditor,
  },
  props: {
    article_id: {
      type: Number,
      default: 2,
    },
    page_id: {
      type: Number,
      default: 0,
    },
    comment_type: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      placement: 'bottom',
      visible: false,
      user: null,
      commentList: [],
      device: '',
      pagination: {
        page: 1,
        size: 5,
        state: 3,
        type: 0,
        total_pages: 0,
        total_num: 0,
        dis_num: 0,
        page_id: 0,
        article_id: 0,
        is_parent: 1,
      },
      publishForm: {
        admin_user_id: null,
        article_id: null,
        page_id: null,
        root_comment_id: null,
        parent_comment_id: null,
        type: 1,
        email: '',
        url: '',
        nick_name: '',
        content: '',
        md_content: '',
        device: '',
      },
      replyForm: {
        admin_user_id: null,
        article_id: null,
        page_id: null,
        root_comment_id: null,
        parent_comment_id: null,
        type: 1,
        email: '',
        url: '',
        nick_name: '',
        content: '',
        md_content: '',
        device: '',
      },
      publishRules: {
        nick_name: [
          {required: true, message: '请输入呢称', trigger: 'blur'},
          {max: 50, message: '呢称不能超过 50 个字符', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式有误', trigger: 'blur'},
        ],
        url: [
          {required: true, message: '请输入网址', trigger: 'blur'},
          {type: 'url', message: '网址格式有误', trigger: 'blur'},
        ],
        content: [
          {
            required: true,
            pattern: /^(?!\n$)/,
            trigger: 'blur',
            message: '请输入评论内容',
          },
          {min: 6, trigger: 'blur', message: '评论字数不能少于 6'},
          {max: 1200, trigger: 'blur', message: '评论字数不能超过 1200'},
        ],
      },
      replyRules: {
        nick_name: [
          {required: true, message: '请输入呢称', trigger: 'blur'},
          {max: 50, message: '呢称不能超过 50 个字符', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式有误', trigger: 'blur'},
        ],
        url: [
          {required: true, message: '请输入网址', trigger: 'blur'},
          {type: 'url', message: '网址格式有误', trigger: 'blur'},
        ],
        content: [
          {
            required: true,
            pattern: /^(?!\n$)/,
            trigger: 'blur',
            message: '请输入回复内容',
          },
          {max: 1200, trigger: 'blur', message: '评论字数不能超过 1200'},
        ],
      },
    };
  },
  async created() {
    await this.handleFetchCommentSetting();
    await this.handleFetchUserData();
    await this.handleFetchCommentData();
    this.initDevice();
  },
  methods: {
    handleOpenDrawer(root_id, parent_id) {
      this.replyForm.root_comment_id = root_id;
      this.replyForm.parent_comment_id = parent_id;
      this.visible = true;
    },
    handleCloseDrawer() {
      this.visible = false;
    },
    handlePageChange(page) {
      this.pagination.page = page;
      this.handleFetchCommentData();
    },
    async handleFetchCommentSetting() {
      await this.$axios
        .get('/sys_setting/items?name=评论设置')
        .then((res) => {
          const data = res.data;
          if (data.code === 100) {
            if (data.data.page_size) {
              this.pagination.size = parseInt(data.data.page_size);
            }
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleFetchUserData() {
      await this.$axios
        .get('/all_users')
        .then((res) => {
          const data = res.data;
          if (data.code === 100) {
            this.user = data.data[0];
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error('发生了错误');
        });
    },
    async handleFetchCommentData() {
      this.pagination.article_id = 2;
      this.pagination.page_id = 0;
      await this.$axios
        .get('/comments', {
          params: {
            page: this.pagination.page,
            size: this.pagination.size,
            key: this.pagination.key,
            type: this.pagination.type,
            state: this.pagination.state,
            is_parent: this.pagination.is_parent,
            article_id: this.pagination.article_id,
            page_id: this.pagination.page_id,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 100) {
            this.commentList = data.data.data;
            this.pagination.total_pages = data.data.total_pages;
            this.pagination.total_num = data.data.total_num;
            this.pagination.dis_num = data.data.dis_num;
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error('发生了错误');
        });
    },
    handlePublishComment() {
      this.publishForm.admin_user_id = this.user.ID;
      this.publishForm.article_id = this.article_id;
      this.publishForm.page_id = this.page_id;
      this.publishForm.type = this.comment_type;
      this.publishForm.content = this.$refs.commentVditor.getContent();
      this.publishForm.md_content = this.$refs.commentVditor.getHTML();
      this.$refs.publishForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('/comments', this.publishForm)
            .then((res) => {
              const data = res.data;
              if (data.code === 100) {
                this.$message.success(data.msg);
                this.handleFetchCommentData();
              } else {
                this.$message.error(data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error('发生了错误');
            });
        }
      });
    },
    handleReplyComment() {
      this.replyForm.admin_user_id = this.user.ID;
      this.replyForm.article_id = this.article_id;
      this.replyForm.page_id = this.page_id;
      this.replyForm.type = this.comment_type;
      this.replyForm.content = this.$refs.replyVditor.getContent();
      this.replyForm.md_content = this.$refs.replyVditor.getHTML();
      this.$refs.replyForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('/comments', this.replyForm)
            .then((res) => {
              const data = res.data;
              if (data.code === 100) {
                this.$message.success(data.msg);
                this.handleFetchCommentData();
              } else {
                this.$message.error(data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error('发生了错误');
            });
        }
      });
    },
    initDevice() {
      const OS = this.getOS();
      const browser = this.getBrowser();
      const device = `${browser.broswer} ${browser.version} in ${OS}`;
      this.publishForm.device = device;
      this.replyForm.device = device;
    },
    getOS() {
      const sUserAgent = navigator.userAgent;

      const isIphone = sUserAgent.indexOf('iPhone') > -1;
      if (isIphone) return 'iPhone';
      const isIpod = sUserAgent.indexOf('iPod') > -1;
      if (isIpod) return 'iPod';
      const isIpad = sUserAgent.indexOf('iPad') > -1;
      if (isIpad) return 'iPad';
      const isAndroid = sUserAgent.indexOf('Android') > -1;
      if (isAndroid) return 'Android';

      const isWin =
        navigator.platform == 'Win32' || navigator.platform == 'Windows';
      const isMac =
        navigator.platform == 'Mac68K' ||
        navigator.platform == 'MacPPC' ||
        navigator.platform == 'Macintosh' ||
        navigator.platform == 'MacIntel';
      if (isMac) return 'Mac';
      const isUnix = navigator.platform == 'X11' && !isWin && !isMac;
      if (isUnix) return 'Unix';
      const isLinux = String(navigator.platform).indexOf('Linux') > -1;
      if (isLinux) return 'Linux';
      if (isWin) {
        const isWin2K =
          sUserAgent.indexOf('Windows NT 5.0') > -1 ||
          sUserAgent.indexOf('Windows 2000') > -1;
        if (isWin2K) return 'Win2000';
        const isWinXP =
          sUserAgent.indexOf('Windows NT 5.1') > -1 ||
          sUserAgent.indexOf('Windows XP') > -1;
        if (isWinXP) return 'WinXP';
        const isWin2003 =
          sUserAgent.indexOf('Windows NT 5.2') > -1 ||
          sUserAgent.indexOf('Windows 2003') > -1;
        if (isWin2003) return 'Win2003';
        const isWinVista =
          sUserAgent.indexOf('Windows NT 6.0') > -1 ||
          sUserAgent.indexOf('Windows Vista') > -1;
        if (isWinVista) return 'WinVista';
        const isWin7 =
          sUserAgent.indexOf('Windows NT 6.1') > -1 ||
          sUserAgent.indexOf('Windows 7') > -1;
        if (isWin7) return 'Win7';
        const isWin10 =
          sUserAgent.indexOf('Windows NT 10') > -1 ||
          sUserAgent.indexOf('Windows 10') > -1;
        if (isWin10) return 'Win10';
      }
      return 'unknown OS';
    },
    getBrowser() {
      const sys = {};
      const ua = navigator.userAgent.toLowerCase();
      let s;
      (s = ua.match(/edg\/([\d.]+)/))
        ? (sys.edge = s[1])
        : (s = ua.match(/rv:([\d.]+)\) like gecko/))
        ? (sys.ie = s[1])
        : (s = ua.match(/msie ([\d.]+)/))
        ? (sys.ie = s[1])
        : (s = ua.match(/firefox\/([\d.]+)/))
        ? (sys.firefox = s[1])
        : (s = ua.match(/chrome\/([\d.]+)/))
        ? (sys.chrome = s[1])
        : (s = ua.match(/opera.([\d.]+)/))
        ? (sys.opera = s[1])
        : (s = ua.match(/version\/([\d.]+).*safari/))
        ? (sys.safari = s[1])
        : 0;

      if (sys.edge) return {broswer: 'Edge', version: sys.edge};
      if (sys.ie) return {broswer: 'IE', version: sys.ie};
      if (sys.firefox) return {broswer: 'Firefox', version: sys.firefox};
      if (sys.chrome) return {broswer: 'Chrome', version: sys.chrome};
      if (sys.opera) return {broswer: 'Opera', version: sys.opera};
      if (sys.safari) return {broswer: 'Safari', version: sys.safari};

      return {broswer: 'unknown browser', version: ''};
    },
    showTime(time) {
      const timePublish = new Date(time);
      const timeNow = new Date();
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const month = day * 30;
      const diffValue = timeNow - timePublish;
      const diffMonth = diffValue / month;
      const diffWeek = diffValue / (7 * day);
      const diffDay = diffValue / day;
      const diffHour = diffValue / hour;
      const diffMinute = diffValue / minute;
      let result;

      if (diffMonth > 3) {
        result = timePublish.getFullYear() + '-';
        result += timePublish.getMonth() + '-';
        result += timePublish.getDate();
      } else if (diffMonth > 1) {
        result = parseInt(diffMonth) + '月前';
      } else if (diffWeek > 1) {
        result = parseInt(diffWeek) + '周前';
      } else if (diffDay > 1) {
        result = parseInt(diffDay) + '天前';
      } else if (diffHour > 1) {
        result = parseInt(diffHour) + '小时前';
      } else if (diffMinute > 1) {
        result = parseInt(diffMinute) + '分钟前';
      } else {
        result = '刚刚';
      }

      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
$max_width: 600px;
$margin_0_a: 0 auto;
$margin_t_10: 10px;
$grey: rgb(168, 170, 172);
$red: rgb(244, 121, 131);

@mixin padding_0 {
  padding: 0;
}
@mixin margin_0 {
  margin: 0;
}
@mixin border_0 {
  border: 0;
}
@mixin single-line {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}

%line-height-20 {
  line-height: 20px;
  height: 20px;
  @include margin_0;
  @include single-line;
}

h1 {
  color: green;
}
.f_l {
  float: left;
}
.f_r {
  float: right;
}
.t_a_l {
  text-align: left;
}
.t_a_c {
  text-align: center;
}
#submit-btn {
  float: right;
}
.comment-container {
  max-width: $max_width;
  margin: $margin_0_a;
  padding: 10px;
}
.comment-container .input-item {
  margin: 5px 0;
}
.comment-textarea-box {
  margin-top: $margin_t_10;
}
.button-box {
  margin-top: $margin_t_10;
}
.comment-content-box {
  margin-top: 10px;
}
.comment-reply-box {
  width: 97%;
  margin-left: 3%;
  margin-top: 5px;
}
.comment-content {
  width: 100%;
  line-height: 20px;
  margin-top: 10px;
}
.comment-detail-box {
  padding-left: 5px;
}
.comment-number-box {
  line-height: 20px;
  margin-top: 5px;
}
.comment-container .nickname {
  max-width: 30%;
  @extend %line-height-20;
}
.comment-container .device {
  max-width: 70%;
  margin-left: 10px;
  color: $grey;
  @extend %line-height-20;
}
.comment-container .time {
  width: 50%;
  color: $grey;
  float: left;
  text-align: left;
  @extend %line-height-20;
}
.comment-container .reply-btn-box {
  width: 50%;
  float: left;
  text-align: right;
  @extend %line-height-20;
}
.reply-btn-box .reply-btn {
  color: $red;
}
.user-img-box .user-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 1s ease-in-out;
}
.user-img-box img:hover {
  transform: rotateZ(180deg);
}
.divider {
  margin: 5px 0;
}
.empty-tip {
  line-height: 60px;
  color: $grey;
}
.at-user {
  color: $grey;
  text-align: left;
  @include padding_0;
  @include margin_0;
}

@media screen and (max-width: 768px) {
  .comment-container .nickname {
    max-width: 100%;
    line-height: 20px;
    height: 20px;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  .comment-container .device {
    max-width: 100%;
    color: rgb(168, 170, 172);
    line-height: 20px;
    height: 20px;
    margin: 0;
    overflow: hidden;
    clear: both;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  .user-img {
    width: 25px;
    height: 25px;
  }
}

.form-item {
  @include margin_0;
}
</style>
