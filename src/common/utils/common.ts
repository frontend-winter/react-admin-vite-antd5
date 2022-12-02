import dayjs from "dayjs";
import { MenuItem } from "@/components/Layout/layout";

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

const isMobile = () => {
  const userAgentInfo = navigator.userAgent;
  const mobileAgents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  let mobile_flag = false;
  //根据userAgent判断是否是手机
  for (let v = 0; v < mobileAgents.length; v++) {
    if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
      mobile_flag = true;
      break;
    }
  }
  const screen_width = window.screen.width;
  const screen_height = window.screen.height;
  //根据屏幕分辨率判断是否是手机
  if (screen_width > 325 && screen_height < 750) {
    mobile_flag = true;
  }
  return mobile_flag;
};

export const treeRouter = (list: MenuItem[]) => {
  return list.map(item => {
    return {
      path: item.path,
      name: item.label,
      icon: item.icon,
      routes:
        "children" in item
          ? item.children!.map(({ children, icon, label, path }) => {
              return {
                path: path,
                name: label,
                icon: icon,
                routes: children,
              };
            })
          : undefined,
    };
  });
};

export { sleep, currentTimeRange, isMobile };
