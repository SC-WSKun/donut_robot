// components/Button/Button.ts
interface ButtonState{
  text: string,
  handler: ()=>void
}
Component({
  options:{
    virtualHost: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickButton: function(){
      this.triggerEvent('tapFunc')
    }
  },
})
