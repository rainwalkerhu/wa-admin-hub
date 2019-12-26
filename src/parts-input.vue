<template>
  <div class="parts-input">
    <div class="parts-input__inner" @mouseover="handleShow" @mouseleave="handleHidden">
      <template v-for="i in parts">
        <div
          :key="'part'+i"
          :style="{'width': (isArray(partWidth)? partWidth[i-1]:partWidth)+5+'px'}"
          class="parts-input_some is-not-last"
        >
          <input
            v-model="data[i-1]"
            :ref="'part'+(i-1)"
            :style="{'width': (isArray(partWidth)? partWidth[i-1]:partWidth)}"
            @input="handleChange(i-1)"
            @change="handleInputChange"
            @focus="handleShow"
            @blur="handleHidden"
          />
          {{i===parts?'':split}}
        </div>
      </template>
      <span v-show="clearBtn" class="parts-input__suffix">
        <span class="parts-input__suffix-inner">
          <i
            class="parts-input__icon el-icons icon-close-fill parts-input__clear"
            @click="handleClear"
          />
        </span>
      </span>
    </div>
  </div>
</template>
<script>
import { isString, isArray, isBoolean } from 'lodash'

export default {
  name: 'PartsInput',
  props: {
    value: {
      type: [Array, String],
      default: null
    },
    parts: {
      type: [Number],
      default: 1
    },
    split: {
      type: [String],
      default: ''
    },
    size: {
      type: [Number, Array],
      default: 999999
    },
    splitWay: {
      type: [String, Boolean],
      default: false
    },
    partWidth: {
      type: [Number, Array],
      default: 100
    }
  },
  data () {
    return {
      data: [],
      lastSize: [],
      isArray,
      clearBtn: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (isString(value)) {
          setTimeout(() => {
            this.handleSplit(value)
          }, 0)
        }
        if (isArray(value)) {
          this.data = value
        }
      }
    }
  },
  created () {
    // 生成段长度
    let size = []
    if (!isArray(this.size)) {
      size = Array.from(new Array(this.parts), () => this.size)
    } else {
      size = this.size
    }
    this.lastSize = size
  },
  methods: {
    handleChange (index) {
      // 如果输入的长度等于限定长度，就自动跳到下一段
      if (this.data[index].length >= this.lastSize[index] && index < this.parts - 1) {
        this.$refs['parts' + (index + 1)][0].focus()
      }
      // 判断是不是黏贴操作
      if (index === 0 && this.data[index].length > (this.lastSize[index] + 1) && this.splitWay) {
        let value = this.data[index]
        this.handleSplit(value)
      } else {
        this.data[index] = this.data[index].substr(0, this.lastSize[index])
      }
      if (isString(this.value)) {
        this.$emit('input', this.arrayToString(this.data))
      }
    },
    handleInputChange () {
      this.$emit('change')
    },
    // 字符串切割方式
    handleSplit (value) {
      let data = []
      // 分割方式判断
      if (isBoolean(this.splitWay)) {
        if (!this.splitWay) {
          this.data = value
          return false
        }
        // 有分隔符的按照分隔符分割
        if (this.split !== '' && isString(value)) {
          data = value.split(this.split)
        }
        // 无分隔符的按照size分割
        if (this.split === '' && isString(value)) {
          let data = []
          this.lastSize.map((length, index) => {
            data[index] = value.substr(0, length)
            value = value.substr(length, value.length)
          })
        }
      }
      // 无分隔符，但是split有值的按照size分割
      if (isString(value) && this.splitWay === 'size') {
        this.lastSize.map((length, index) => {
          data[index] = value.substr(0, length)
          value = value.substr(length, value.length)
        })
      }
      this.data = data
    },
    arrayToString (array) {
      let string = ''
      // 合并方式判断
      if (isBoolean(this.splitWay)) {
        if (!this.splitWay) {
          return array.join('')
        }
        // 有分隔符的按照分隔符合并
        if (this.split !== '') {
          string = array.join(this.split)
        }
        // 无分隔符的直接合并
        if (this.split === '') {
          string = array.join('')
        }
      }
      // 无分隔符，但是split有值的直接合并
      if (this.splitWay === 'size') {
        string = array.join('')
      }
      return string
    },
    handleClear () {
      this.$emit('input', '')
    },
    handleShow () {
      this.clearBtn = this.data.join('').length > 0
    },
    handleHidden () {
      this.clearBtn = false
    }
  }
}

</script>
<style lang="stylus">
@import './parts-input.styl'
</style>
