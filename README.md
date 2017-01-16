# LoL 查询小程序版

## 使用

拳头提供的是 SDK，所以无法直接前端调用，需要使用到 nodejs 作为后端提供接口，因为 SDK 支持 redis，所以也配置一个 redis 服务，使用 docker 进行实现。

### 下载代码

```bash
git clone https://github.com/chuhanan/MiniLol.git
```

进入文件夹 `MiniLol/server`
```bash
cd MiniLol/server
```

下载镜像并运行容器，该步骤前确认在**docker**主机内进行
```bash
./start.sh
```

然后可以打开浏览器，如果是使用`VirtualBox`则输入虚拟机地址+8080，如果是 Mac 可以直接输入`127.0.0.1:8080`访问。

