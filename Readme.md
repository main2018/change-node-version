# 启动script时自动切换node版本（使用nvm）并在切换完成后自动执行指定script，当你有多个项目的node版本不一致时可以使用，来替代手动执行nvm的过程
## usage: 当你需要执行npm run dev时，添加命令cnv
step1:
```json
"scripts": {
  "cnv": "change-node-version 20.18.0 -s dev",
  "dev": "vite",
}
```
step2:
```bash
npm run cnv
```