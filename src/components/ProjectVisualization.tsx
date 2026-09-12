"use client";

import type { Project } from "@/lib/content";
import { PipelineDiagram } from "@/components/viz/PipelineDiagram";
import { FlowDiagram } from "@/components/viz/FlowDiagram";
import { AmpVisualization } from "@/components/viz/AmpVisualization";

export function ProjectVisualization({ viz }: { viz: Project["viz"] }) {
  switch (viz) {
    case "mac":
      return (
        <div className="flex flex-col gap-3">
          <PipelineDiagram
            stages={["OPERAND\nFETCH", "PARTIAL\nPRODUCTS ×4", "PARTIAL\nSUM", "ACCUMULATE", "64-BIT\nOUTPUT"]}
            tokenCount={2}
          />
          <div className="flex justify-between font-mono text-[10px] text-ink-faint">
            <span>5-STAGE PIPELINE</span>
            <span>40 BACK-TO-BACK OPS</span>
          </div>
        </div>
      );
    case "riscv":
      return (
        <div className="flex flex-col gap-3">
          <PipelineDiagram stages={["IF", "ID", "EX", "MEM", "WB"]} tokenCount={3} cycleSeconds={2.8} />
          <div className="flex justify-between font-mono text-[10px] text-ink-faint">
            <span>HAZARD DETECTION + FORWARDING</span>
            <span>12-FILE MODULE HIERARCHY</span>
          </div>
        </div>
      );
    case "amp":
      return <AmpVisualization />;
    case "robot":
      return (
        <div className="flex flex-col gap-6">
          <FlowDiagram nodes={["FLAME / GAS SENSORS", "RASPBERRY PI 3B", "DECISION LOGIC", "PUMP / ALARM"]} />
          <FlowDiagram nodes={["ESP32-CAM", "LIVE STREAM", "WEBSOCKET", "REMOTE CONTROL"]} dotDuration={2.4} />
        </div>
      );
    case "uniform":
      return <FlowDiagram nodes={["SOLAR PANEL (5W)", "POWER MGMT", "ATMEGA16A", "SENSORS", "GPS / GSM"]} dotDuration={3.4} />;
    case "footstep":
      return <FlowDiagram nodes={["FOOTSTEP", "MECHANICAL ENERGY", "PIEZO CONVERSION", "RECTIFICATION", "REGULATED OUTPUT"]} dotDuration={3.6} />;
    default:
      return null;
  }
}
