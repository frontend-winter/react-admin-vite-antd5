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

const timeList = ["早上好", "上午好", "中午好", "下午好", "晚上好"];
const currentTimeRange = () => {
  const now = new Date();
  const hours = now.getHours();
  let text = "";
  // 判断当前时间段
  if (hours >= 0 && hours < 9) {
    text = timeList[0];
  } else if (hours >= 9 && hours < 11) {
    text = timeList[1];
  } else if (hours >= 11 && hours < 13) {
    text = timeList[2];
  } else if (hours >= 13 && hours < 18) {
    text = timeList[3];
  } else if (hours >= 18 && hours < 24) {
    text = timeList[4];
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

export { currentTimeRange, isMobile, sleep };
