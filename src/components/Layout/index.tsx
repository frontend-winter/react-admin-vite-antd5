import {
  GithubFilled,
  InfoCircleFilled,
  LoginOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import ProLayout from "@ant-design/pro-layout";
import { Input, Switch, Tooltip } from "antd";
import { useContext, useState } from "react";
import KeepAlive from "@/common/hocs/keepAlive";
import { IUserInitialState } from "@/store/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { baseRouterList } from "@/routes";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/common/context";
import { Settings } from "@/config/defaultSetting";
import {
  ProBreadcrumb,
  ProConfigProvider,
  ProSettings,
} from "@ant-design/pro-components";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { treeRouter } from "@/common/utils/common";
import { useLocationListen } from "@/common/hooks";

export default () => {
  const { user } = useSelector(state => state) as { user: IUserInitialState };
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const dispatch = useDispatch();
  const { signOut } = useContext(AuthContext);
  const [dark, setDark] = useState(false);

  useLocationListen(listener => {
    // console.log(listener, "listener");
    setPathname(listener.pathname);
  });

  const settings: ProSettings | undefined = {
    title: Settings.title.slice(0, 11),
    // fixSiderbar: true,
    layout: "mix",
    // splitMenus: true,
  };

  return (
    <ProConfigProvider dark={dark}>
      <div
        id="admin-pro-layout"
        style={{
          height: "100vh",
        }}
      >
        <ProLayout
          siderWidth={245}
          logo={Settings.logo}
          fixSiderbar
          ErrorBoundary={false}
          route={{
            path: "/",
            routes: treeRouter([...baseRouterList, ...user.menu]),
          }}
          {...settings}
          location={{
            pathname,
          }}
          waterMarkProps={{
            content: Settings.title,
          }}
          appList={[
            {
              icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
              title: "Blog",
              desc: "杭州市较知名的 UI 设计语言",
              url: "https://hzdjs.cn",
            },
          ]}
          avatarProps={{
            src: "https://joeschmoe.io/api/v1/random",
            size: "small",
            title: (
              <div>
                {(user.token as unknown as { username: string })?.username}
              </div>
            ),
          }}
          headerContentRender={() => <ProBreadcrumb />}
          actionsRender={props => {
            if (props.isMobile) return [];
            return [
              props.layout !== "side" && document.body.clientWidth > 1400 ? (
                <div
                  key="SearchOutlined"
                  aria-hidden
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 24,
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Input
                    style={{
                      borderRadius: 4,
                      marginInlineEnd: 12,
                      backgroundColor: "rgba(0,0,0,0.03)",
                    }}
                    prefix={
                      <SearchOutlined
                        style={{
                          color: "rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    }
                    placeholder="搜索方案"
                    bordered={false}
                  />
                  <PlusCircleFilled
                    style={{
                      color: "var(--ant-primary-color)",
                      fontSize: 24,
                    }}
                  />
                </div>
              ) : undefined,
              <InfoCircleFilled key="InfoCircleFilled" />,
              <QuestionCircleFilled key="QuestionCircleFilled" />,

              <Tooltip placement="bottom" title={"Github"}>
                <a
                  href="https://github.com/frontend-winter/react-admin-vite-antd5"
                  target="_blank"
                >
                  <GithubFilled key="GithubFilled" />
                </a>
              </Tooltip>,
              <Tooltip placement="bottom" title={"singOut"}>
                <LoginOutlined
                  onClick={async () => {
                    await signOut(dispatch);
                    navigate("/login");
                  }}
                />
              </Tooltip>,
            ];
          }}
          menuFooterRender={props => {
            if (props?.collapsed || props?.isMobile) return undefined;
            return (
              <div style={{ textAlign: "center" }}>
                Late Night mode
                <Switch
                  // checkedChildren="开启"
                  // unCheckedChildren="关闭"
                  defaultChecked={false}
                  onChange={v => setDark(v)}
                />
              </div>
            );
          }}
          onMenuHeaderClick={() => navigate("/")}
          menuItemRender={(item, dom) => (
            <Link
              onClick={() => {
                setPathname(item.path || "/");
              }}
              to={item?.path || "/"}
            >
              {dom}
            </Link>
          )}
        >
          <ErrorBoundary>
            <KeepAlive include={[]} keys={[]} />
          </ErrorBoundary>
        </ProLayout>
      </div>
    </ProConfigProvider>
  );
};
