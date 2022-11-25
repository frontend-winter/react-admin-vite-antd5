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

export { sleep };
