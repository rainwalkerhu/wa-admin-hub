import { Select as iSelect, Option as iOption } from 'element-ui'

export default {
  components: {
    iSelect,
    iOption
  },
  name: 'WaSelect',
  props: {
    value: {
      type: [Array, Number, String, Object],
      default: function () { return [] }
    },
    data: {
      type: [Object],
      default: function () { return {} }
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  computed: {
    options () {
      return this.data.options || []
    }
  },
  watch: {
    value () {
      this.currentValue = this.value
    }
  },
  created () {
    this.currentValue = this.value
  },
  render (h) {
    const self = this
    const inputEvent = (val) => {
      self.$emit('input', val)
    }
    const privateProps = {
      value: this.currentValue
    }
    const commonProps = {
      disabled: this.data.disabled,
      multiple: this.data.multiple
    }
    const groupProps = this.data.groupProps
    const props = Object.assign({}, commonProps, groupProps, privateProps)
    const listeners = Object.assign({}, this.$listeners, { input: inputEvent })
    return (
      <i-select { ...{ props: props } } { ...{ on: listeners } }>
        {
          self._l(self.options, (option, i) => {
            const privateProps = { label: option.name, key: i }
            const commonProps = self.data.inputProps
            const itemProps = option
            const props = Object.assign({}, commonProps, itemProps, privateProps)
            return (
              <i-option
                { ...{ props: props } }
              />
            )
          })
        }
      </i-select>
    )
  }
}
