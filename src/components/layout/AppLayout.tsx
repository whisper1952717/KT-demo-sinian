import {
  AuditOutlined,
  CheckSquareOutlined,
  ClusterOutlined,
  ControlOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  DotChartOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
  LineChartOutlined,
  NodeIndexOutlined,
  PieChartOutlined,
  RollbackOutlined,
  SafetyCertificateOutlined,
  SlidersOutlined,
  TableOutlined,
  UnorderedListOutlined,
  VideoCameraOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import ProLayout, { type MenuDataItem } from "@ant-design/pro-layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HeaderContent } from "./HeaderContent";

const menuData: MenuDataItem[] = [
  { path: "/overview", name: "系统总览", icon: <DashboardOutlined /> },
  {
    path: "/coordination",
    name: "双冷源协调",
    icon: <ClusterOutlined />,
    children: [
      { path: "/coordination/topology", name: "系统拓扑", icon: <ClusterOutlined /> },
      { path: "/coordination/load", name: "负荷分配", icon: <PieChartOutlined /> },
    ],
  },
  {
    path: "/strategy",
    name: "策略中心",
    icon: <NodeIndexOutlined />,
    children: [
      { path: "/strategy/flow", name: "策略流转", icon: <NodeIndexOutlined /> },
      { path: "/strategy/list", name: "策略列表", icon: <UnorderedListOutlined /> },
      { path: "/strategy/audit", name: "策略审计", icon: <AuditOutlined /> },
    ],
  },
  {
    path: "/ai",
    name: "智能决策",
    icon: <ExperimentOutlined />,
    children: [
      { path: "/ai/explain", name: "决策解释", icon: <ExperimentOutlined /> },
      { path: "/ai/model", name: "模型状态", icon: <FundProjectionScreenOutlined /> },
    ],
  },
  {
    path: "/reports",
    name: "能效报表",
    icon: <FundOutlined />,
    children: [
      { path: "/reports/energy", name: "能耗分析", icon: <FundOutlined /> },
      { path: "/reports/cop", name: "COP 趋势", icon: <LineChartOutlined /> },
      { path: "/reports/cooling", name: "冷量分析", icon: <DotChartOutlined /> },
    ],
  },
  {
    path: "/mv",
    name: "节能验证",
    icon: <SafetyCertificateOutlined />,
    children: [
      { path: "/mv/overview", name: "M&V 总览", icon: <SafetyCertificateOutlined /> },
      { path: "/mv/attribution", name: "节能归因", icon: <SlidersOutlined /> },
    ],
  },
  {
    path: "/equipment",
    name: "设备状态",
    icon: <TableOutlined />,
    children: [
      { path: "/equipment/list", name: "设备列表", icon: <TableOutlined /> },
      { path: "/equipment/params", name: "运行参数", icon: <ControlOutlined /> },
    ],
  },
  {
    path: "/alarms",
    name: "告警与回滚",
    icon: <WarningOutlined />,
    children: [
      { path: "/alarms/center", name: "告警中心", icon: <WarningOutlined /> },
      { path: "/alarms/rollback", name: "回滚记录", icon: <RollbackOutlined /> },
    ],
  },
  {
    path: "/operations",
    name: "运维管理",
    icon: <FileTextOutlined />,
    children: [
      { path: "/operations/events", name: "事件日志", icon: <FileTextOutlined /> },
      { path: "/operations/workorders", name: "工单审批", icon: <CheckSquareOutlined /> },
    ],
  },
  { path: "/architecture", name: "系统架构", icon: <DeploymentUnitOutlined /> },
  { path: "/scene3d", name: "3D 场景(预留)", icon: <VideoCameraOutlined /> },
];

export const AppLayout = () => {
  const location = useLocation();

  return (
    <ProLayout
      title=""
      location={{ pathname: location.pathname }}
      route={{ routes: menuData }}
      menuItemRender={(item, dom) => <Link to={item.path || "/overview"}>{dom}</Link>}
      fixSiderbar
      fixedHeader
      layout="mix"
      navTheme="realDark"
      contentStyle={{ padding: 12 }}
      logo={false}
      headerContentRender={() => <HeaderContent />}
      token={{
        sider: {
          colorMenuBackground: "#0f2336",
          colorTextMenu: "#9db2c7",
          colorTextMenuSelected: "#d6e4f0",
          colorBgMenuItemSelected: "rgba(24, 144, 255, 0.3)",
        },
        header: {
          colorBgHeader: "#0f2336",
        },
      }}
    >
      <Outlet />
    </ProLayout>
  );
};