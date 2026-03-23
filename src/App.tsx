import { lazy, Suspense, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import { AppLayout } from "@/components/layout/AppLayout";

const Overview = lazy(() => import("@/pages/Overview"));
const CoordinationTopology = lazy(() => import("@/pages/CoordinationTopology"));
const CoordinationLoad = lazy(() => import("@/pages/CoordinationLoad"));
const StrategyFlow = lazy(() => import("@/pages/StrategyFlow"));
const StrategyList = lazy(() => import("@/pages/StrategyList"));
const StrategyAudit = lazy(() => import("@/pages/StrategyAudit"));
const AIExplain = lazy(() => import("@/pages/AIExplain"));
const AIModelStatus = lazy(() => import("@/pages/AIModelStatus"));
const EnergyAnalysis = lazy(() => import("@/pages/EnergyAnalysis"));
const COPTrends = lazy(() => import("@/pages/COPTrends"));
const CoolingAnalysis = lazy(() => import("@/pages/CoolingAnalysis"));
const MVOverview = lazy(() => import("@/pages/MVOverview"));
const MVAttribution = lazy(() => import("@/pages/MVAttribution"));
const EquipmentList = lazy(() => import("@/pages/EquipmentList"));
const EquipmentParams = lazy(() => import("@/pages/EquipmentParams"));
const AlarmCenter = lazy(() => import("@/pages/AlarmCenter"));
const RollbackHistory = lazy(() => import("@/pages/RollbackHistory"));
const EventLog = lazy(() => import("@/pages/EventLog"));
const WorkOrders = lazy(() => import("@/pages/WorkOrders"));
const SystemArch = lazy(() => import("@/pages/SystemArch"));
const Scene3DPlaceholder = lazy(() => import("@/pages/Scene3DPlaceholder"));

const withSuspense = (element: ReactNode) => (
  <Suspense
    fallback={
      <div style={{ minHeight: 240, display: "grid", placeItems: "center" }}>
        <Spin size="large" />
      </div>
    }
  >
    {element}
  </Suspense>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overview" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/overview" element={withSuspense(<Overview />)} />
        <Route path="/coordination/topology" element={withSuspense(<CoordinationTopology />)} />
        <Route path="/coordination/load" element={withSuspense(<CoordinationLoad />)} />
        <Route path="/strategy/flow" element={withSuspense(<StrategyFlow />)} />
        <Route path="/strategy/list" element={withSuspense(<StrategyList />)} />
        <Route path="/strategy/audit" element={withSuspense(<StrategyAudit />)} />
        <Route path="/ai/explain" element={withSuspense(<AIExplain />)} />
        <Route path="/ai/model" element={withSuspense(<AIModelStatus />)} />
        <Route path="/reports/energy" element={withSuspense(<EnergyAnalysis />)} />
        <Route path="/reports/cop" element={withSuspense(<COPTrends />)} />
        <Route path="/reports/cooling" element={withSuspense(<CoolingAnalysis />)} />
        <Route path="/mv/overview" element={withSuspense(<MVOverview />)} />
        <Route path="/mv/attribution" element={withSuspense(<MVAttribution />)} />
        <Route path="/equipment/list" element={withSuspense(<EquipmentList />)} />
        <Route path="/equipment/params" element={withSuspense(<EquipmentParams />)} />
        <Route path="/alarms/center" element={withSuspense(<AlarmCenter />)} />
        <Route path="/alarms/rollback" element={withSuspense(<RollbackHistory />)} />
        <Route path="/operations/events" element={withSuspense(<EventLog />)} />
        <Route path="/operations/workorders" element={withSuspense(<WorkOrders />)} />
        <Route path="/architecture" element={withSuspense(<SystemArch />)} />
        <Route path="/scene3d" element={withSuspense(<Scene3DPlaceholder />)} />
      </Route>
      <Route path="*" element={<Navigate to="/overview" replace />} />
    </Routes>
  );
}

export default App;


