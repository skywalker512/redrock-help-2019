<template>
  <div>
    <header>
      <VBack />
      <div @click="handelAnswerPublished">
        <vPublishButton />
      </div>
    </header>
    <div class="question">{{ oneQuestion.content }}</div>
    <div class="title">问题回答</div>
    <EditAnswerBox />
    <EditImage />
    <VPopup
      :massage="progressMassage"
      v-if="editProgress"
    />
    <VPopup
      :massage="wordsMassage"
      v-if="isShowWordsTips"
    />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

import EditAnswerBox from '@/components/EditAnswerBox'
import EditImage from '@/components/EditImage'
import { FETCH_PUBLISH_ANSWER, EDIT_LEAVE } from '../store/type/actions';
import { END_PORGRESSING } from '../store/type/mutations';

export default {
  name: 'answerEdit',
  components: {
    EditAnswerBox,
    EditImage
  },
  data () {
    return {
      progressMassage: '发布中，请稍后...',
      wordsMassage: '你的输入必须大于 4 个字符',
      subscriber: null,
      isShowWordsTips: false,
      timer: null,
    }
  },
  computed: {
    ...mapGetters(['oneQuestion', 'editProgress', 'editWord'])
  },
  beforeRouteLeave (_, __, next) {
    this.$store.dispatch(EDIT_LEAVE)
    next()
  },
  methods: {
    handelAnswerPublished () {
      if (this.editWord.length < 4) {
        this.isShowWordsTips = true
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.isShowWordsTips = false
        }, 1500)
      } else {
        this.$store.dispatch(FETCH_PUBLISH_ANSWER, this.oneQuestion.id)
        // 订阅完成发布的事件
        this.subscriber = this.$store.subscribe(async (mutation, state) => {
          if (mutation.type === END_PORGRESSING) {
            // 删除这个订阅
            await this.subscriber()
            this.$router.go(-1)
          }
        })
      }

    }
  }
}
</script>

<style lang="less" scoped>
header {
  margin: 30px;
  display: flex;
  justify-content: space-between;
}
.question {
  margin: 30px;
  font-size: 32px;
  line-height: 40px;
}
.title {
  margin: 30px 0 20px 30px;
  font-size: 28px;
  color: @fontColor;
}
</style>
