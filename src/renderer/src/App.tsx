import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Navbar from "@/components/Navbar";
import Versions from "@/components/Versions";
import classes from "./App.module.css";

export default function App(): JSX.Element {
  return (
    <div className={classes.app}>
      <PanelGroup direction="horizontal" autoSaveId="app-layout">
        <Panel
          defaultSize={25}
          minSize={15}
          maxSize={50}
          {...(classes.navbar && { className: classes.navbar })}
        >
          <Navbar />
        </Panel>
        <PanelResizeHandle
          {...(classes.resizeHandle && { className: classes.resizeHandle })}
        />
        <Panel {...(classes.main && { className: classes.main })}>
          Main
          <Versions />
        </Panel>
      </PanelGroup>
    </div>
  );
}
