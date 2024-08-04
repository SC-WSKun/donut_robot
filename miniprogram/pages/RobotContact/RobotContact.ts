// pages/RobotContact/RobotContact.ts
import * as THREE from '../../asset/libs/three.weapp.min.js'
import loadObj from './loadObj'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ws_url: "",
    canvasId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = THREE.global.registerCanvas(res[0].node);
        this.setData({
          canvasId: canvas._canvasId
        })
        loadObj(canvas, THREE)
      })

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    THREE.global.unregisterCanvas(this.data.canvasId)
  },

  touchStart(e: any) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e: any) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e: any) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  },
})