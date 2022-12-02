import React, { useRef, useEffect, useReducer, useMemo, memo } from "react";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation, useOutlet } from "react-router-dom";

const KeepAlive = (props: { include: any; keys: any }) => {
  const outlet = useOutlet();
  const { include, keys } = props;
  const { pathname } = useLocation();
  const componentList = useRef(new Map());
  // @ts-ignore
  const forceUpdate = useReducer(bool => !bool)[1]; // 强制渲染
  const cacheKey = useMemo(
    () => pathname + "__" + keys[pathname],
    [pathname, keys]
  );
  const activeKey = useRef<string>("");
  useEffect(() => {
    componentList.current.forEach(function (value, key) {
      const _key = key.split("__")[0];
      if (!include.includes(_key) || _key === pathname) {
        // @ts-ignore
        this.delete(key);
      }
    }, componentList.current);
    activeKey.current = cacheKey;
    if (!componentList.current.has(activeKey.current)) {
      componentList.current.set(activeKey.current, outlet);
    }
    forceUpdate();
  }, [cacheKey, include]); // eslint-disable-line
  return (
    <>
      {Array.from(componentList.current).map(([key, component]) => (
        <div key={key}>
          {key === activeKey.current ? (
            <div>{component}</div>
          ) : (
            <div style={{ display: "none" }}>{component}</div>
          )}
        </div>
      ))}
    </>
    // <TransitionGroup component={null}>
    //   {Array.from(componentList.current).map(([key, component]) => (
    //     <CSSTransition key={key} appear={true} timeout={500} classNames="fade">
    //       {key === activeKey.current ? (
    //         <div
    //           className={`layout-container${
    //             include.includes(key.split("__")[0]) ? " keep-alive-fade" : ""
    //           }`}
    //         >
    //           {component}
    //         </div>
    //       ) : (
    //         <div
    //           className="layout-container__keep-alive"
    //           style={{ display: "none" }}
    //         >
    //           {component}
    //         </div>
    //       )}
    //     </CSSTransition>
    //   ))}
    // </TransitionGroup>
  );
};

export default memo(KeepAlive);
