
// components/robot-control/robot-control.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isRecognizing: false,
    recorderManager: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    connectWebSocket() {
      const url = "localhost:8765"
      console.log("connecting to socket:", url)
      // wx.connectSocket({
      //   url,
      //   protocols: [FoxgloveClient.SUPPORTED_SUBPROTOCOL],
      //   success: (res) => {
      //     console.log("connect success:", res)
      //   },
      //   fail: (error) => {
      //     console.log("fail to connect websocket:", error)
      //   }
      // })
    },
    startRecognize() {
      wx.getAvailableAudioSources({
        success: (res) => {
          console.log(res)
          if(res.audioSources && res.audioSources.find((source)=>{return source === "voice_recognition"})){
            const recorderManager = wx.getRecorderManager()
            const recordOption: WechatMiniprogram.RecorderManagerStartOption = {
              audioSource: "voice_recognition",
              sampleRate: 44100,
              encodeBitRate: 192000,
              format: 'aac',
              frameSize: 50
            }
            recorderManager.onStart((res)=>{
              console.log("recorder start")
            })
            recorderManager.onError((err)=>{
              console.error("recorder error:", err)
            })
            recorderManager.onFrameRecorded((res) => {
              const { frameBuffer } = res
              console.log('frameBuffer.byteLength', frameBuffer.byteLength)
            })
            recorderManager.start(recordOption)
          }
        }
      })
    }
  }
})
