import sosnail from 'sosnail';

// 随机生成头像
export function createIdenticon(text) {
  return sosnail.identicon({
    text: text,
  });
}
