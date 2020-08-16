<template>
  <div :class="keyboardClass" />
</template>

<script>
import Keyboard from 'simple-keyboard'
import { autoItKeys } from '@/constants/autoItKeys.js'
import 'simple-keyboard/build/css/index.css'
export default {
  name: 'SimpleKeyboard',
  props: {
    keyboardClass: {
      default: 'simple-keyboard',
      type: String
    },
    input: {
      type: String,
      default: null
    }
  },
  data: () => ({
    keyboard: null
  }),
  watch: {
    input (input) {
      this.keyboard.setInput(input)
    }
  },
  mounted () {
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        default: [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' {enter}',
          '{shift} z x c v b n m , . / {arrowup}',
          '.com @ {space} {arrowleft} {arrowdown} {arrowright}'
        ],
        shift: [
          '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M < > ? {shift}',
          '.com @ {space}'
        ]
      }
    })
  },
  methods: {
    translateToAutoIt (input) {
      return autoItKeys[input] || false
    },
    onChange (input) {
      this.$emit('onChange', input)
    },
    onKeyPress (button) {
      if (autoItKeys[button]) {
        return this.$emit('onKeyPress', autoItKeys[button])
      }
      this.$emit('onKeyPress', button)
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{shift}' || button === '{lock}') { this.handleShift() }
    },
    handleShift () {
      const currentLayout = this.keyboard.options.layoutName
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
      this.keyboard.setOptions({
        layoutName: shiftToggle
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hg-theme-default .hg-button {
  background: black !important;
}
</style>
