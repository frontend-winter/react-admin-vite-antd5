export interface MenuItem {
  label: string;
  key: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}
