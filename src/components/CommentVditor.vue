<template>
  <div class="vditor-box">
    <div id="commentVditor"></div>
  </div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/src/assets/scss/index.scss';

export default {
  name: 'CommentVditor',
  data() {
    return {
      contentEditor: null,
    };
  },
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.initEditor();
  },
  watch: {
    // 监听编辑器内容变化
    content(newValue) {
      this.setContent(newValue);
    },
  },
  methods: {
    // 初始化 vditor
    initEditor() {
      this.contentEditor = new Vditor('commentVditor', {
        height: 280,
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false,
        },
        hint: {
          emoji: {
            pray: '🙏',
            broken_heart: '💔',
            ok_hand: '👌',
            smile: '😄',
            laughing: '😆',
            smirk: '😏',
            heart_eyes: '😍',
            grin: '😁',
            stuck_out_tongue: '😛',
            expressionless: '😑',
            unamused: '😒',
            sob: '😭',
            joy: '😂',
            tired_face: '😫',
            blush: '😊',
            cry: '😢',
            fearful: '😨',
          },
        },
        counter: 100000,
        after: () => {
          this.setContent(this.content);
        },
      });
    },
    // 获取编辑器文本
    getContent() {
      return this.contentEditor.getValue();
    },
    // 获取 HTML
    getHTML() {
      return this.contentEditor.getHTML();
    },
    // 设置编辑器文本
    setContent(val) {
      this.contentEditor.setValue(val);
    },
  },
};
</script>

<style lang="scss"></style>
