import { DataStore } from "./js/base/DataStore.js";
// 微信部分api的使用

export class Tool{
  constructor(){
    // 初始化数据(没有数据需要初始化,不写)
  }
  // 手机振动的效果
  zhendong(){
    wx.vibrateLong({
      success(){
        console.log('振动了一次');
      }
    })
  }
  // 播放音乐
  playMusic(src,loop){
    // 创建音频
    const music = wx.createInnerAudioContext();
    // 音频文件的路径
    music.src = src;
    // 设置循环播放
    music.loop = loop;
    return music;
  }
  // 获取手机信息
  getTelInfo(){
    wx.getSystemInfo({
      success(res){
        console.log(res);
      }
    })
  }
  // 获取用户的信息
  getUserInfo(callback){
    // 创建用户信息按钮
    const button = wx.createUserInfoButton({
      type: "text",
      text: "请授权用户信息",
      style: {
        left: 100,
        top: 100,
        width: 150,
        height: 40,
        backgroundColor: "#3ed4a0",
        borderColor: "#b34d0a",
        borderWidth: 2,
        borderRadius: 10, 
        color: 'golden',
        textAlign: "center",
        fontSize: 16,
        lineHeight: 30
      }
    });
    // 监听按钮的点击事件
    button.onTap(res=>{
      if(res.userInfo){
        // 用户授权了
        // console.log(res.userInfo);
        callback();
        // 销毁按钮
        button.destroy();
      }
    });
  }
  // 向服务器发送Http请求
  send(){
    wx.request({
      url: 'http://localhost:4000',
      success(res){
        console.log(res);
      }
    })
  }

  // 发送socket数据
  sendSocket(){
    // 1. 建立连接
    wx.connectSocket({
      url: 'ws://localhost:4000',
      success(res){
        console.log('连接服务器socket成功');
      },
      fail(err){
        console.log('连接失败,socket');
      }
    })
    // 2. 连接成功后, 回调中可以发送数据
    wx.onSocketOpen(function(){
      // 向后台发送数据
      wx.sendSocketMessage({
        data: '微信发送的数据',
        success(){
          console.log('微信发送数据成功');
        }
      });
      // 从后台接收数据
      wx.onSocketMessage(function(res){
        console.log(res);
      })
    });

  }
    // 下载图片
    downPic(){
      wx.downloadFile({
        url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571812813684&di=37ea9e84f7316ae265156cc18a58ce84&imgtype=0&src=http%3A%2F%2Fpix0.agoda.net%2FhotelImages%2F490%2F49023%2F49023_17021011350050904933.jpg%3Fs%3D1024x768',
        success(res){
          // 显示在手机屏幕上
          console.log(res);
          let img = wx.createImage();
          img.src = res.tempFilePath;
          img.onload = ()=>{
            DataStore.getInstance().ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 375, 667);
          }
          // 保存到手机相册
          // 下载在线音乐并播放
          // let path = res.tempFilePath; // 获取下载音乐的临时地址(需要网上音乐地址路径)
          // 播放音乐
          // let ctx = wx.createInnerAudioContext();
          // ctx.src = path;
          // ctx.autoplay = true;
        }
      })
    }

    // 上传图片
    // upload(){

    // }
}