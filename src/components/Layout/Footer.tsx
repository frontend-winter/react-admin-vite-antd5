import { Layout as LayoutAntd } from "antd";
import { Settings } from "@/config/defaultSetting";

export function Footer() {
  return (
    <LayoutAntd.Footer style={{ textAlign: "center" }}>
      2022 - 2022 @ {Settings.title}
    </LayoutAntd.Footer>
  );
}
