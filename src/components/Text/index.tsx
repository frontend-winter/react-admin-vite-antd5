import { Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";
import React, { memo } from "react";

function Text({ children }: TextProps) {
  return <Typography.Text>{children}</Typography.Text>;
}

export default memo(Text);
