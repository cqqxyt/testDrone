<template>
  <div class="ly_popup" v-bind="$attrs">
    1212
    <strong v-if="title" class="na-ly_popup__text" v-html="secureTitle" />
    <span class="text" v-html="msg" />
  </div>
</template>

<script>
export default {
  inheritAttrs:false,
  name: "AlertModal",
  props: {
    name:{
      type:String,
      default:'1'
    },
    visible: {
      type: Boolean,
      default: false
    },
    /**
     * 제목
     */
    title: {
      type: String,
      default() {
        return "";
      }
    },
    /**
     * 내용
     */
    msg: {
      type: String,
      default() {
        return "";
      }
    },
    /**
     * 확인 버튼 레이블
     */
    label: {
      type: String,
      default() {
        return "확인";
      }
    },
    /**
     * 확인 버튼 콜백
     */
    okClicked: {
      type: Function,
      default: () => {}
    },
    isForbidLockBody: {
      type: Boolean,
      default: true
    }
  },
  mounted(){
    this.$listeners.lis()
  },
  computed:{
    test(){
      console.log(1212)
    }
  },
  methods: {
    test1(){
 console.log(1212)
    },
    /**
     * 모달 닫기
     */
    closeModal() {
      if (this.$route.path === "/track/undefined") {
        this.$router.push("/artist/155266");
      }
      this.$store.dispatch("modal/close", this).then(() => {
        if (typeof this.okClicked === "function") {
          this.okClicked();
        }
      });
    }
  }
};
</script>
