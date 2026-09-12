// Single source of truth for all resume-derived content.
// Every section pulls from here — nothing below is fabricated beyond the resume.

export const person = {
  name: "Vamshi Krishna Reddy Rajanala",
  shortName: "Vamshi Rajanala",
  initials: "VR",
  title: "Electronic Engineer",
  tagline: "Hardware • FPGA • Embedded Systems • Verification",
  email: "vamshireddy.rajanala@gmail.com",
  phone: "(361) 459-9552",
  phoneHref: "+13614599552",
  linkedin: "https://linkedin.com/in/vamshi-krishna-reddy-rajanala-448780342",
  linkedinLabel: "linkedin.com/in/vamshi-krishna-reddy-rajanala-448780342",
  resumeHref: "/resume.pdf",
  summary:
    "Electronic engineer with hands-on experience in schematic capture, PCB layout review, board-level bring-up, hardware validation, digital design, FPGA development, embedded systems, and technical debugging.",
  longSummary:
    "Electronic engineer (MS, 4.0/4.0) with hands-on schematic capture, PCB layout review, and board-level bring-up experience across analog, digital, and RF systems. Validates hardware functionality with oscilloscopes, multimeters, and logic analyzers, and debugs board-level issues to root cause. Familiar with AI/GPU server and high-performance compute rack architectures through coursework and independent study of platforms comparable to the GB3600 ecosystem. Documents engineering work clearly and collaborates across hardware, firmware, and software teams.",
};

export const heroLabels = [
  "FPGA",
  "VERILOG",
  "PCB",
  "SIGNAL INTEGRITY",
  "EMBEDDED SYSTEMS",
  "DIGITAL DESIGN",
  "AI COMPUTE",
];

export const identityStats = [
  { value: 4.0, decimals: 2, suffix: "/4.0", label: "MS Electrical Engineering GPA" },
  { value: 3.25, decimals: 2, suffix: "/4.0", label: "B.Tech ECE GPA" },
  { value: 7, decimals: 0, suffix: "", label: "Engineering projects delivered" },
  { value: 7, decimals: 0, suffix: "", label: "Certifications completed" },
] as const;

export type CapabilityCategory = {
  id: string;
  title: string;
  items: string[];
  viz: "schematic" | "scope" | "shift" | "bus" | "terminal" | "rack";
};

export const capabilities: CapabilityCategory[] = [
  {
    id: "hardware",
    title: "Hardware Design",
    items: [
      "Schematic Capture",
      "PCB Layout Review",
      "Component Selection",
      "Board Bring-Up",
      "Power Delivery Fundamentals",
      "Signal Integrity",
    ],
    viz: "schematic",
  },
  {
    id: "test",
    title: "Test & Validation",
    items: [
      "Oscilloscope",
      "Multimeter",
      "Logic Analyzer",
      "Spectrum Analyzer",
      "Signal Generator",
      "TDR",
      "VNA",
      "Root Cause Analysis",
    ],
    viz: "scope",
  },
  {
    id: "digital",
    title: "Digital Design",
    items: ["Verilog HDL", "RTL Design", "FPGA", "Xilinx Vivado", "Self-Checking Testbenches"],
    viz: "shift",
  },
  {
    id: "embedded",
    title: "Embedded Systems",
    items: ["Embedded C", "I2C", "SPI", "UART", "Microcontrollers"],
    viz: "bus",
  },
  {
    id: "programming",
    title: "Programming & Automation",
    items: ["Python", "MATLAB", "TCL", "C/C++"],
    viz: "terminal",
  },
  {
    id: "hpc",
    title: "High-Performance Compute",
    items: [
      "AI Server Architecture",
      "GPU Compute Rack Fundamentals",
      "High-Speed Digital Design",
      "Thermal Awareness",
      "Power Delivery Awareness",
    ],
    viz: "rack",
  },
];

export type SkillNode = {
  id: string;
  label: string;
  leaves: string[];
};

export const skillMatrix: SkillNode[] = [
  {
    id: "fpga",
    label: "FPGA",
    leaves: ["Verilog HDL", "RTL Design", "Xilinx Vivado", "Icarus Verilog", "Timing Constraints", "Self-Checking Testbench"],
  },
  {
    id: "hardware",
    label: "Hardware",
    leaves: ["Schematic Capture", "PCB Layout Review", "Board Bring-Up", "Power Delivery", "Signal Integrity"],
  },
  {
    id: "digital",
    label: "Digital",
    leaves: ["RTL Design", "Verilog HDL", "Pipelining", "Hazard Detection", "Forwarding Logic"],
  },
  {
    id: "embedded",
    label: "Embedded",
    leaves: ["Embedded C", "I2C", "SPI", "UART", "Microcontrollers"],
  },
  {
    id: "simulation",
    label: "Simulation",
    leaves: ["LTSpice", "SPICE Simulation", "Icarus Verilog", "Analog Circuit Design"],
  },
  {
    id: "testing",
    label: "Testing",
    leaves: ["Oscilloscope", "Multimeter", "Logic Analyzer", "Spectrum Analyzer", "TDR", "VNA"],
  },
  {
    id: "programming",
    label: "Programming",
    leaves: ["Python", "MATLAB", "TCL", "C/C++"],
  },
  {
    id: "server",
    label: "Server Architecture",
    leaves: ["AI Server Fundamentals", "GPU Compute Rack Fundamentals", "High-Speed Digital Design", "Thermal Awareness"],
  },
];

export const experience = {
  title: "Project Intern — Digital Systems Verification and Validation",
  org: "Advanced Systems Laboratory (ASL), Defence Research and Development Organisation (DRDO)",
  dates: "Jul 2023 – Sep 2023",
  signalChain: [
    { id: "antenna", label: "Antenna", detail: "Horn antenna receiving the S-band telemetry downlink (2200–2290 MHz)." },
    { id: "lna", label: "LNA", detail: "Low-noise amplifier boosting the received signal ahead of the receiver front end." },
    { id: "receiver", label: "Telemetry Receiver", detail: "Demodulates the telemetry downlink into raw voltage-level data." },
    { id: "computer", label: "Rugged Computer", detail: "Runs the MATLAB conversion pipeline, turning raw receiver output into usable telemetry parameters." },
  ],
  measurementTags: ["Fiber Optic", "Coaxial", "Twisted Pair", "OTDR", "TDR", "VNA", "S-Band", "2200–2290 MHz", "Telemetry", "Signal Chain"],
  bullets: [
    "Characterized fiber optic, coax, and twisted pair cable performance for a missile telemetry ground station prototype using OTDR, TDR, and VNA measurements across the S-band operating frequency range (2200–2290 MHz) to select the lowest-loss cable type.",
    "Built and validated the ground station signal chain (horn antenna, low-noise amplifier, telemetry receiver, rugged computer), reading schematics and datasheets to select and integrate components, and debugged hardware and firmware timing issues through systematic root cause analysis.",
    "Wrote MATLAB code to convert raw receiver voltage output into usable telemetry parameter values, turning previously unusable raw data into meaningful measurements.",
    "Operated oscilloscopes, multimeters, logic analyzers, and spectrum analyzers to validate signal fidelity, documenting test procedures and results in clear technical reports for repeatable use.",
  ],
};

export const labInstruments = [
  { id: "scope", label: "Oscilloscope", detail: "Signal validation and time-domain debugging." },
  { id: "spectrum", label: "Spectrum Analyzer", detail: "Frequency-domain signal fidelity checks." },
  { id: "multimeter", label: "Multimeter", detail: "Voltage, current, and continuity verification." },
  { id: "logic", label: "Logic Analyzer", detail: "Digital bus and timing capture (I2C/SPI/UART)." },
  { id: "vna", label: "VNA", detail: "Vector Network Analyzer — RF component and cable characterization." },
  { id: "siggen", label: "Signal Generator", detail: "Stimulus generation for circuit and board testing." },
  { id: "tdr", label: "TDR", detail: "Time Domain Reflectometer — locates impedance discontinuities in cabling." },
  { id: "devboard", label: "Dev Board", detail: "Xilinx FPGA development board for RTL bring-up." },
  { id: "pcb", label: "PCB", detail: "Multi-layer board under schematic and layout review." },
] as const;

export type ProjectFilterTag = "FPGA" | "DIGITAL" | "ANALOG" | "EMBEDDED" | "ROBOTICS" | "POWER ELECTRONICS";

export type Project = {
  id: string;
  index: string;
  name: string;
  subtitle?: string;
  technologies: string[];
  tags: ProjectFilterTag[];
  objective: string;
  challenge: string;
  implementation: string[];
  result: string;
  lead?: boolean;
  viz: "mac" | "riscv" | "amp" | "robot" | "uniform" | "footstep";
};

export const projects: Project[] = [
  {
    id: "mac-unit",
    index: "01",
    name: "Pipelined Multiply-Accumulate Unit for Xilinx FPGAs",
    technologies: ["Verilog", "Xilinx Vivado", "Icarus Verilog"],
    tags: ["FPGA", "DIGITAL"],
    objective: "Shorten the critical path of a 32×32-to-64-bit multiply-accumulate unit for Xilinx FPGAs.",
    challenge: "A single-cycle 32×32 multiplier creates a long critical path that limits achievable clock frequency.",
    implementation: [
      "Designed a 5-stage pipelined 32×32-to-64-bit MAC unit in Verilog.",
      "Split the single-cycle 32×32 multiplier into four 16×16 partial products distributed across pipeline stages.",
      "Authored Vivado XDC timing constraints and documented the timing-closure workflow.",
    ],
    result: "Verified functional correctness with a self-checking testbench driving 40 back-to-back operations in Icarus Verilog.",
    viz: "mac",
  },
  {
    id: "riscv",
    index: "02",
    name: "RISC-V RTL Implementation",
    subtitle: "5-Stage Pipelined RV32I Processor",
    technologies: ["Verilog HDL", "Icarus Verilog"],
    tags: ["FPGA", "DIGITAL"],
    lead: true,
    objective: "Implement a RISC-V RV32I processor core with a classic 5-stage pipeline.",
    challenge: "Correctly resolve data and control hazards across IF/ID/EX/MEM/WB without stalling more than necessary.",
    implementation: [
      "Implemented RTL for a RISC-V RV32I 5-stage pipeline with hazard detection and forwarding logic.",
      "Structured the design across a 12-file Verilog module hierarchy.",
    ],
    result: "Built four self-checking testbenches, debugging discrepancies to root cause and verifying all four in Icarus Verilog.",
    viz: "riscv",
  },
  {
    id: "power-amp",
    index: "03",
    name: "3-Stage Class AB Power Amplifier",
    technologies: ["LTSpice", "Analog Circuit Design", "TIP41C / TIP42C"],
    tags: ["ANALOG"],
    objective: "Design a high-gain audio power amplifier able to drive a low-impedance load, and validate it in simulation and on the bench.",
    challenge:
      "The first topology — three 2N3904 voltage-gain stages into 10 kΩ — clipped into a square wave rather than amplifying: too much gain and no stage capable of driving the load. The Class AB redesign then showed crossover distortion at the zero crossings, where neither output transistor is conducting.",
    implementation: [
      "Reworked the topology to two 2N3904 gain stages feeding a TIP41C/TIP42C complementary Class AB output pair on ±10 V rails, driving 8 Ω.",
      "Biased the output pair with two 1N4148 diodes (D1/D2) between the bases, holding both transistors just at conduction so neither switches fully off at the crossing.",
      "Iterated in LTSpice transient simulation, then built and validated a breadboard prototype.",
    ],
    result:
      "Clean sinusoidal output with the crossover notch removed — 50 mV/1 kHz in, 2.961 V peak out, measured at 59.2 V/V (35.4 dB).",
    viz: "amp",
  },
  {
    id: "planar-diode",
    index: "04",
    name: "Planar PN Junction Diode — TCAD Device Simulation",
    technologies: ["Silvaco ATLAS", "TCAD", "Semiconductor Device Physics"],
    tags: ["ANALOG"],
    objective:
      "Model a planar PN junction diode at device level and extract its electrical characteristics from first-principles semiconductor physics.",
    challenge:
      "Unlike a circuit simulator, which is handed a diode model, TCAD has to solve the carrier transport equations across a meshed physical structure — so the geometry, doping profile and contact materials all have to be defined before any current exists.",
    implementation: [
      "Defined the planar device structure in Silvaco ATLAS — silicon body with nickel contacts, roughly 300 µm wide and 2 µm deep.",
      "Specified the net doping profile forming the junction and meshed the structure for numerical solution.",
      "Swept anode bias and solved for terminal current to extract the I–V characteristic.",
    ],
    result:
      "Reproduced the classic diode characteristic from device physics: flat below ~0.6 V, exponential turn-on at ~0.65–0.7 V, ~6 µA at 1 V.",
    viz: "amp",
  },
  {
    id: "fire-robot",
    index: "05",
    name: "Fire Fighting Robot",
    technologies: ["Raspberry Pi 3B", "ESP32-CAM", "C/C++", "Python"],
    tags: ["ROBOTICS", "EMBEDDED"],
    lead: true,
    objective:
      "Build a robot that detects fire autonomously and suppresses it, while a human operator keeps eyes on the scene from a safe distance.",
    challenge:
      "Detection has to be autonomous and immediate, but navigation should not be — so sensing, actuation, live video and remote drive control all had to run together on constrained embedded hardware without the video stream starving the sensor loop.",
    implementation: [
      "Programmed Python GPIO logic on a Raspberry Pi 3B to poll flame and gas sensors.",
      "Triggered a relay-driven water pump and buzzer alarm automatically on detection.",
      "Developed ESP32-CAM firmware in C/C++ for live camera streaming and WebSocket-based remote control of dual DC motors with PWM speed control.",
    ],
    result: "Closed detection-to-suppression loop running autonomously, with live video and drive control available to an operator over a browser on a phone.",
    viz: "robot",
  },
  {
    id: "solar-uniform",
    index: "06",
    name: "Solar-Based Electronic Defense Uniform",
    technologies: ["ATmega16A", "Embedded C", "GPS", "GSM", "5W Flexible Solar Panel"],
    tags: ["EMBEDDED", "POWER ELECTRONICS"],
    lead: true,
    objective: "Engineer a wearable system combining energy harvesting, thermal management, and location tracking.",
    challenge: "Integrate solar energy harvesting, power management, and GPS/GSM tracking into one low-power embedded platform.",
    implementation: [
      "Led a four-member team integrating a 5W flexible solar panel, ATmega16A microcontroller, real-time thermal management, and GPS/GSM location tracking.",
      "Designed power management and energy-harvesting circuitry.",
      "Implemented low-level I2C/UART driver routines for peripheral integration.",
    ],
    result: "Functional multifunctional embedded hardware system integrating power, sensing, and tracking.",
    viz: "uniform",
  },
  {
    id: "footstep-harvester",
    index: "07",
    name: "Footstep Energy Harvesting System",
    technologies: ["Piezoelectric Arrays", "Power Electronics", "RFID", "Microcontroller"],
    tags: ["POWER ELECTRONICS", "ANALOG"],
    lead: true,
    objective:
      "Convert footstep mechanical energy into regulated electrical power, store it, and dispense it as RFID-authenticated mobile device charging.",
    challenge:
      "A piezo disc under load produces a short, irregular AC spike, not a supply — the output is unregulated, varies with every footstep, and is useless for charging until it has been rectified, smoothed, regulated and buffered into storage.",
    implementation: [
      "Led a team building a piezoelectric array beneath a tread platform, arranged to maximise output voltage per step.",
      "Designed the conditioning chain — rectification, filtering and voltage regulation — feeding 18650 cell storage.",
      "Added a controller with an LCD readout of generated charge, and an RFID reader gating access to the USB charging output.",
    ],
    result:
      "Working prototype: footsteps charge the cells, the LCD reports accumulated charge, and an authorised RFID tag releases power to the USB charging point.",
    viz: "footstep",
  },
];

/**
 * Real artifacts from the work itself — simulator output, schematics,
 * measured waveforms, source. Everything here was taken from the project
 * files; the terminal blocks are literal stdout from running the testbenches
 * with Icarus Verilog 12.0, not reconstructions.
 */
export type Evidence =
  | { kind: "image"; src: string; alt: string; caption: string; width: number; height: number }
  | { kind: "terminal"; command: string; lines: string[]; caption: string }
  | { kind: "code"; file: string; code: string; caption: string };

export const projectEvidence: Record<string, Evidence[]> = {
  "mac-unit": [
    {
      kind: "code",
      file: "rtl/mac_pipelined.v — S1",
      code: `// each of these is a short 16x16->32 multiply, not the full 32x32
wire [31:0] p_ll_c = a_lo * b_lo;
wire [31:0] p_lh_c = a_lo * b_hi;
wire [31:0] p_hl_c = a_hi * b_lo;
wire [31:0] p_hh_c = a_hi * b_hi;`,
      caption:
        "The whole technique in four lines: one 32×32 multiply becomes four 16×16 partial products, each with far shorter combinational depth, with a pipeline register after every combining stage.",
    },
    {
      kind: "terminal",
      command: "iverilog -g2012 -o tb_mac.vvp rtl/mac_pipelined.v tb/tb_mac_pipelined.v && vvp tb_mac.vvp",
      lines: [
        "PASS op#36: acc_out=c4077a8dc1d67189",
        "PASS op#37: acc_out=da56f724acb5445a",
        "PASS op#38: acc_out=452c9a5f026ec4a2",
        "PASS op#39: acc_out=d2c9f8858cb4d1c6",
        "--------------------------------------------------",
        "tb_mac_pipelined: ALL 40 RESULTS MATCHED — ALL TESTS PASSED",
      ],
      caption:
        "40 back-to-back operations at full throughput (a new operand pair every cycle, including a mid-stream clear), each checked against a behavioural model delayed to match the 5-cycle latency.",
    },
    {
      kind: "code",
      file: "constraints/mac_pipelined.xdc",
      code: `create_clock -name clk -period 10.000 [get_ports clk]

set_input_delay  -clock clk -max 2.000 [get_ports {a[*] b[*] valid_in clear}]
set_output_delay -clock clk -max 2.000 [get_ports {acc_out[*] valid_out}]
set_false_path -from [get_ports rst_n]`,
      caption:
        "Timing constraints written to be board-independent — generic clock and I/O delay budget, async reset excluded from setup/hold, so it synthesises standalone or drops into a real board's constraint set.",
    },
  ],

  riscv: [
    {
      kind: "code",
      file: "rtl/forwarding_unit.v",
      code: `// operand A (rs1)
if (ex_mem_reg_write && (ex_mem_rd != 5'd0) && (ex_mem_rd == id_ex_rs1))
    forward_a = 2'b10;                 // freshest: 1 instruction ahead
else if (mem_wb_reg_write && (mem_wb_rd != 5'd0) && (mem_wb_rd == id_ex_rs1))
    forward_a = 2'b01;                 // 2 instructions ahead
else
    forward_a = 2'b00;                 // register file`,
      caption:
        "EX/MEM takes priority over MEM/WB because it holds the more recent value; x0 is excluded so writes to the zero register never forward. Back-to-back dependent ALU instructions run with zero stalls.",
    },
    {
      kind: "code",
      file: "rtl/hazard_unit.v",
      code: `wire load_use_hazard = id_ex_mem_read &&
                       (id_ex_rd != 5'd0) &&
                       ((id_ex_rd == if_id_rs1) || (id_ex_rd == if_id_rs2));

assign stall       = load_use_hazard;   // freeze PC + IF/ID, bubble ID/EX
assign pc_write    = ~load_use_hazard;
assign if_id_write = ~load_use_hazard;`,
      caption:
        "The one hazard forwarding cannot fix: a load's result isn't ready until MEM, one stage too late for EX-stage forwarding, so the pipeline stalls exactly one cycle and inserts a bubble.",
    },
    {
      kind: "terminal",
      command: "iverilog -g2012 -I rtl -o tb_ls.vvp rtl/*.v tb/tb_loadstore.v && vvp tb_ls.vvp",
      lines: [
        "PASS [value read back)] = 42",
        "PASS [-use stall == 43] = 43",
        "PASS [ forward) == 105] = 105",
        "PASS [rwarding worked)] = 105",
        "--------------------------------------------------",
        "tb_loadstore: ALL TESTS PASSED",
      ],
      caption:
        "Load-use stall and EX-forwarding verified together on the full pipeline — not the units in isolation.",
    },
    {
      kind: "terminal",
      command: "vvp tb_branch.vvp ; vvp tb_top.vvp ; vvp tb_alu.vvp",
      lines: [
        "x1=5 x2=5 x3(fail-flag)=0 x4=100 x5=200 x6=1 x7=2 x8=9",
        "tb_branch: ALL TESTS PASSED (all three taken branches flushed correctly)",
        "",
        "sum(1..5) result: x10 = 15 (expected 15)",
        "tb_top: ALL TESTS PASSED",
        "",
        "tb_alu: 13 / 13 tests passed",
      ],
      caption:
        "The other three of the four self-checking benches: branch resolution with pipeline flush, a full sum-loop integration program, and directed ALU coverage.",
    },
  ],

  "power-amp": [
    {
      kind: "image",
      src: "/projects/amp-v1-clipping.png",
      alt: "LTSpice schematic and transient plot of the first amplifier topology, showing the output clipped into a square wave",
      width: 2116,
      height: 946,
      caption:
        "First topology — three 2N3904 voltage-gain stages into a 10 kΩ load. At 200 mV input the output is not an amplified sine but a hard-clipped square wave, asymmetric at roughly +9 V / −3.5 V. Too much gain and no output stage able to drive the load.",
    },
    {
      kind: "image",
      src: "/projects/amp-schematic.png",
      alt: "LTSpice schematic of the final three-stage Class AB amplifier",
      width: 2880,
      height: 1800,
      caption:
        "The redesign: two 2N3904 gain stages feeding a TIP41C / TIP42C complementary Class AB output pair on ±10 V rails into an 8 Ω load. D1 and D2 (1N4148) sit between the output transistors' bases — that diode drop is what biases both devices just into conduction and removes the crossover notch.",
    },
    {
      kind: "image",
      src: "/projects/amp-output-clean.png",
      alt: "LTSpice transient simulation showing a clean sinusoidal output with no crossover distortion",
      width: 2880,
      height: 1800,
      caption:
        "Result: 50 mV / 1 kHz in (green), clean sinusoid out (blue) with no crossover notch at the zero crossings. Cursor reads 2.961 V peak — 59.2 V/V, or 35.4 dB.",
    },
  ],

  "fire-robot": [
    {
      kind: "image",
      src: "/projects/robot-block.png",
      alt: "Block diagram of the fire fighting robot showing sensors feeding a Raspberry Pi that drives the pump, alarm and motors",
      width: 1400,
      height: 787,
      caption:
        "System architecture. Flame sensor, gas sensor and the ESP32-CAM feed the Raspberry Pi 3B; it drives the relay/pump circuit, the alarm, and the motor interface for the drive wheels. The phone and monitor on the right are the operating unit — detection is autonomous, navigation stays under human control.",
    },
    {
      kind: "image",
      src: "/projects/robot-psu.png",
      alt: "Regulated power supply schematic: transformer, bridge rectifier, filter capacitor and 5V regulator",
      width: 1400,
      height: 508,
      caption:
        "The regulated supply feeding the logic: 230 V / 50 Hz through a step-down transformer, bridge rectifier, filter capacitor and a 5 V linear regulator. Unglamorous, but every board on the robot depends on it being clean.",
    },
  ],

  "solar-uniform": [
    {
      kind: "image",
      src: "/projects/uniform-internals.jpg",
      alt: "The defense uniform opened flat, showing the solar panel, microcontroller, battery cells and wiring mounted on the inner lining",
      width: 787,
      height: 1400,
      caption:
        "The build itself — the uniform opened flat with the harvesting and tracking electronics mounted to the inner lining: solar panel, controller board, 18650 cells and the wiring loom, all of which had to survive being worn.",
    },
    {
      kind: "image",
      src: "/projects/uniform-wiring.jpg",
      alt: "Wiring diagram of the solar uniform showing solar panel, controller, battery, GPS/GSM module, fan and display",
      width: 1400,
      height: 943,
      caption:
        "Wiring for the integrated system: solar panel and charge circuit into the battery, controller driving the thermal-management fan and display, with the GPS/GSM module for location reporting. Bench-verified end to end — the GSM link returned live latitude/longitude fixes by SMS.",
    },
  ],

  "footstep-harvester": [
    {
      kind: "image",
      src: "/projects/footstep-build.jpg",
      alt: "The assembled footstep energy harvesting prototype with a row of piezoelectric discs, controller, LCD and battery cells",
      width: 1400,
      height: 1050,
      caption:
        "The working prototype: a row of piezoelectric discs under the tread plate, feeding the conditioning and rectification circuit, with the controller, LCD readout and 18650 storage cells wired alongside.",
    },
    {
      kind: "image",
      src: "/projects/footstep-block.jpg",
      alt: "Block diagram showing piezo sensors, RFID reader and power supply feeding a controller that drives a transistor driver, LCD and mobile charging output",
      width: 1400,
      height: 802,
      caption:
        "System block diagram. The piezo array and RFID reader feed the controller, which drives the transistor stage, the LCD readout and the mobile charging output — RFID gates who is allowed to draw the harvested charge.",
    },
    {
      kind: "image",
      src: "/projects/footstep-schematic.jpg",
      alt: "Full circuit schematic of the footstep energy harvesting system",
      width: 1400,
      height: 1020,
      caption:
        "The full schematic — piezo input through rectification and regulation into storage, with the controller, display and charging output around it. This is the analog-to-digital boundary the project was really about: an irregular AC piezo signal turned into something a device can safely charge from.",
    },
  ],

  "planar-diode": [
    {
      kind: "image",
      src: "/projects/diode-structure.png",
      alt: "Silvaco ATLAS device cross-section of a planar PN diode showing net doping and materials",
      width: 800,
      height: 600,
      caption:
        "The simulated device itself: a planar diode cross-section in Silvaco ATLAS, about 300 µm wide and 2 µm deep, shaded by absolute net doping with the nickel contacts, silicon body and substrate called out.",
    },
    {
      kind: "image",
      src: "/projects/diode-iv.png",
      alt: "Simulated forward I-V characteristic of the planar PN diode from Silvaco ATLAS",
      width: 800,
      height: 600,
      caption:
        "Forward I–V swept from the device solution: flat below ~0.6 V, then the exponential turn-on knee at roughly 0.65–0.7 V, reaching about 6 µA at 1 V — the textbook diode equation reproduced from device physics rather than a circuit model.",
    },
  ],
};

export const education = [
  {
    school: "Texas A&M University, Kingsville",
    degree: "Master of Science, Electrical Engineering",
    gpa: "4.0 / 4.0",
    dates: "Aug 2024 – May 2026",
  },
  {
    school: "Jawaharlal Nehru Technological University, Hyderabad",
    degree: "Bachelor of Technology, Electronics and Communication Engineering",
    gpa: "3.25 / 4.0",
    dates: "Jul 2019 – Jun 2023",
    coursework: [
      "Digital System Design",
      "VLSI Design",
      "System on Chip Architecture",
      "Electronic Devices and Circuits",
      "Network Analysis and Transmission Lines",
      "Electromagnetic Fields and Waves",
      "Signals and Systems",
      "Embedded System Design",
    ],
  },
];

export const certifications = [
  { name: "VLSI Design", issuer: "Simplilearn", date: "Sep 2023", id: "2176287" },
  { name: "Digital Signal Processing", issuer: "Simplilearn", date: "Dec 2023", id: "2176283" },
  { name: "Embedded System Design", issuer: "Simplilearn", date: "Feb 2024", id: "2176281" },
  { name: "Simulation and Measurement of Telemetry Receiving System", issuer: "Project Certification, DRDO" },
  { name: "PCB Design: Cadence OrCAD & Allegro Expert Certification", issuer: "Udemy" },
  { name: "FPGA Engineer: Verilog with Xilinx Vivado Design Suite", issuer: "Udemy" },
  { name: "Verilog HDL: VLSI Hardware Design Comprehensive Masterclass", issuer: "Udemy" },
];

export const technicalJourney = [
  { year: "2019", label: "B.Tech Begins" },
  { year: "2023", label: "B.Tech Completed" },
  { year: "2023", label: "DRDO Project Internship" },
  { year: "2024", label: "Master's Begins" },
  { year: "2026", label: "Master's Completion" },
];

export const methodology = [
  {
    step: "01",
    title: "Understand the System",
    detail:
      "Before touching a probe, map what the system is supposed to do: block diagram, signal chain, power domains, and where this board or design fits in the larger stack.",
  },
  {
    step: "02",
    title: "Read Schematics & Datasheets",
    detail:
      "Trace the actual schematic net-by-net against the datasheet's recommended operating conditions — timing, voltage tolerances, and pin functions — before assuming a component is misbehaving.",
  },
  {
    step: "03",
    title: "Measure",
    detail:
      "Instrument the circuit directly: oscilloscope and logic analyzer for timing and signal integrity, multimeter for DC rails, spectrum analyzer or VNA when RF or high-speed behavior is in question.",
  },
  {
    step: "04",
    title: "Isolate the Fault",
    detail:
      "Narrow the search space by splitting the system at test points and known-good boundaries — is it the source, the path, or the load? Reproduce the failure on demand before going further.",
  },
  {
    step: "05",
    title: "Identify Root Cause",
    detail:
      "Push past the symptom to the underlying mechanism — a marginal timing budget, a biasing error, a grounding issue — so the fix addresses the cause, not just the visible effect.",
  },
  {
    step: "06",
    title: "Implement Fix",
    detail:
      "Make the targeted change — a component swap, a constraint update, an RTL correction — and keep it scoped so its effect on the rest of the system stays predictable.",
  },
  {
    step: "07",
    title: "Validate",
    detail:
      "Re-run the original measurement that exposed the fault, then check adjacent functionality and edge cases so the fix didn't just move the problem elsewhere.",
  },
  {
    step: "08",
    title: "Document",
    detail:
      "Write down what failed, why, and how it was resolved in a form a teammate could follow without re-deriving it — the report is what makes the fix repeatable.",
  },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
