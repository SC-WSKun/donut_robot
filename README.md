# Donut Robot
`Donut Robot` 是 [BaiduAsrRobot](https://github.com/SC-WSKun/BaiduAsrRobot) 的小程序版本，是一款用于与机器人进行交互的智能助手。

## 使用方式
1. 在输入框输入机器人ip，点击"连接"按钮即可发起 Websocket 连接。
2. 点击"订阅"按钮，会订阅机器人相关的 `ROS Topic`。
3. 默认机器人为"对话模式"，可以进行自然语言交流。唤醒词为"旺财旺财"
4. 点击"指令模式"按钮会切换为指令模式，这时会对自然语言中的移动命令进行响应。