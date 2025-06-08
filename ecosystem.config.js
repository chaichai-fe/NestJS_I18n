/**
 * PM2 进程管理配置文件
 * 用于管理 Node.js 应用程序的部署、监控和运行
 */
module.exports = {
  apps: [
    {
      // 应用程序名称，用于在 PM2 中识别
      name: 'nestjs-i18n',
      // 应用程序的入口文件路径
      script: 'dist/src/main.js',
      // 启动的实例数量，'max' 表示根据 CPU 核心数启动最大实例数
      instances: 'max',
      // 执行模式：cluster 模式，用于负载均衡
      exec_mode: 'cluster',
      // 当应用程序崩溃时自动重启
      autorestart: true,
      // 是否启用文件监控，false 表示不监控文件变化
      watch: false,
      // 当内存使用超过 1G 时自动重启
      max_memory_restart: '1G',
      // 生产环境变量配置
      env: {
        NODE_ENV: 'production',
      },
      // 开发环境变量配置
      env_development: {
        NODE_ENV: 'development',
      },
      // 错误日志文件路径
      error_file: 'logs/err.log',
      // 标准输出日志文件路径
      out_file: 'logs/out.log',
      // 合并日志文件路径
      log_file: 'logs/combined.log',
      // 在日志中添加时间戳
      time: true,
    },
  ],
}
