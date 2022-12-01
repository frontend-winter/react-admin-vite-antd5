import dayjs from "dayjs";

/**
 * @description sleep
 * @param {number} time
 */
const sleep = (time: number | undefined) =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const currentTimeRange = () => {
  const now = dayjs();
  const hours = now.hour();
  let text = "";
  // 判断当前时间段
  if (hours >= 0 && hours <= 10) {
    text = `早上好`;
  } else if (hours > 10 && hours <= 14) {
    text = `中午好`;
  } else if (hours > 14 && hours <= 18) {
    text = `下午好`;
  } else if (hours > 18 && hours <= 24) {
    text = `晚上好`;
  }
  return text;
};
export { sleep, currentTimeRange };
