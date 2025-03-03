/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-02 16:09:10
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-02 23:46:52
 * @FilePath: /change-node-version/test/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import path from 'node:path';

const obj = {
  name: ''
}
obj.name ||= 'zhangsan';
console.log(obj.name, 111111);
// console.log(path, 888888);
