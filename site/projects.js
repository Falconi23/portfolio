// Project content for the minimal site. Text only: plots and media live in each project's own
// GitHub repository. `code` is the repository URL once it is published (null = "Code coming soon"). `org` is shown next to year and city.
export const PROJECTS = [
  {
    "id": "swarm",
    "title": "Swarm Laser Debris Removal",
    "name": "Cooperative Multi-Agent Deep Reinforcement Learning (DRL) for Autonomous Laser-Based Active Debris Removal (ADR)",
    "field": "Multi-Agent Reinforcement Learning",
    "year": "2026",
    "place": "Sapienza University of Rome",
    "desc": "A three-drone swarm trained end-to-end with cooperative deep RL to laser-ablate LEO space debris and return to base, under full 6-DOF orbital physics.",
    "contributions": [
      "Modeled each drone as a 6-DOF CubeSat-class chaser and diagnosed a physical actuation-drift mismatch that had silently blocked convergence for 20M+ steps",
      "Engineered formation-keeping behavior — three drones converge into and hold an equilateral triangle around the debris target throughout engagement",
      "Designed the cooperative laser-ablation engagement logic — three drones firing simultaneously within a shared pointing-tolerance cone to destroy the target",
      "Iteratively shaped a dense-plus-sparse reward function — including explicit formation terms — to avoid local optima in a 6-DOF, 3-agent coordination problem"
    ],
    "stats": [
      {
        "value": "20",
        "unit": "M",
        "label": "training steps to convergence"
      },
      {
        "value": "+197",
        "unit": "",
        "label": "mean episodic reward (from +34 baseline)"
      },
      {
        "value": "179",
        "unit": "steps",
        "label": "steps to complete full 3-phase mission"
      },
      {
        "value": "97.9",
        "unit": "%",
        "label": "propellant efficiency vs. available budget"
      }
    ],
    "headline": "Fixing one actuation constraint took the policy from 0% mission completions to a fully converged 179-step mission.",
    "specs": [
      {
        "label": "Algorithm",
        "text": "Independent PPO (IPPO) with full parameter sharing, trained via Fictitious Self-Play with a rotating trainee"
      },
      {
        "label": "Simulator & State Space",
        "text": "Custom Python 6-DOF Keplerian simulator (ECI/LVLH, rigid-body Euler dynamics) modeling CubeSat-class drone chasers; 28-D per-agent Dec-POMDP observation — goal error, obstacle positions, attitude, angular velocity, mission phase"
      },
      {
        "label": "Action Space",
        "text": "MultiDiscrete([3]^6) bang-bang thruster/torque commands, 729 combinations, with phase-dependent force magnitude"
      },
      {
        "label": "Reward Design",
        "text": "Dense navigation/fuel/pointing/damping/APF/formation terms plus sparse milestone bonuses at phase transitions"
      }
    ],
    "outcomes": [
      "Converged policy achieves 100% mission completion with near-deterministic, low-entropy behavior",
      "Reward variance collapsed post-fix, reflecting a stable, high-confidence policy rather than a lucky outlier",
      "Laser damage compounds cooperatively — each additional drone in the formation drives a near-linear reduction in kill time",
      "Propellant margin held comfortably above the mission budget across all three phases, with no fuel-critical states encountered"
    ],
    "tools": [
      {
        "label": "Core Stack",
        "items": [
          {
            "name": "Python",
            "use": "Glue code, training scripts, environment logic"
          },
          {
            "name": "PyTorch",
            "use": "Neural network backend for the PPO policy"
          },
          {
            "name": "Stable-Baselines3 (PPO)",
            "use": "Training loop and policy optimization"
          },
          {
            "name": "PettingZoo",
            "use": "Multi-agent Dec-POMDP environment interface"
          },
          {
            "name": "Gymnasium",
            "use": "Single-agent environment API compatibility layer"
          }
        ]
      },
      {
        "label": "Sensor Modeling",
        "items": [
          {
            "name": "Skyfield",
            "use": "Astronomical computation library for realistic ephemerides"
          },
          {
            "name": "JPL DE421 ephemeris",
            "use": "Planetary/solar position data for star-tracker simulation"
          },
          {
            "name": "Hipparcos star catalog",
            "use": "Reference stars for attitude determination"
          }
        ]
      },
      {
        "label": "Visualization",
        "items": [
          {
            "name": "Matplotlib",
            "use": "3D mission trajectory rendering"
          },
          {
            "name": "Custom frame/GIF pipeline",
            "use": "Step-by-step mission playback exports"
          }
        ]
      }
    ],
    "closing": "A three-drone swarm that cooperatively laser-ablates orbital debris and returns to base — a working, fully autonomous path toward laser-based active debris removal.",
    "paper": null,
    "code": "https://github.com/Falconi23/swarm-laser-debris-removal",
    "org": "Sapienza University of Rome"
  },
  {
    "id": "capture",
    "title": "Multi-Agent Debris Capture & Manipulation",
    "name": "A Cooperative Multi-Agent Reinforcement Learning (MARL) Framework for Autonomous Orbital Manipulation and Debris Removal",
    "field": "Multi-Agent Reinforcement Learning",
    "year": "2026",
    "place": "Sapienza University of Rome",
    "desc": "Two cooperating PPO agents jointly pilot a 6-DOF spacecraft and control 9-DOF robotic arms to autonomously capture orbital debris.",
    "contributions": [
      "Modeled realistic orbital disturbances — atmospheric drag and gravity-gradient torques — perturbing the coupled 15-DOF dynamics",
      "Formulated the mission as a POMDP with degraded, noisy sensor states instead of perfect ground-truth observations",
      "Implemented a SITL star-tracker pipeline using the TRIAD algorithm for realistic attitude sensing",
      "Split control across two independently-trained policies — a Pilot and an Arm Operator — to avoid the non-stationarity collapse of training both jointly"
    ],
    "stats": [
      {
        "value": "15",
        "unit": "DOF",
        "label": "coupled multibody dynamics (6-DOF spacecraft + 9-DOF arms)"
      },
      {
        "value": "2",
        "unit": "",
        "label": "independent PPO policies — Pilot and Arm Operator (IPPO)"
      },
      {
        "value": "12.1M+",
        "unit": "",
        "label": "training steps per agent, per saved checkpoints"
      },
      {
        "value": "3",
        "unit": "",
        "label": "cooperating 3-DOF robotic arms on the chaser spacecraft"
      }
    ],
    "headline": "Two independently-trained PPO agents coordinate a 15-DOF spacecraft-and-arm system to capture debris autonomously.",
    "specs": [
      {
        "label": "Algorithm",
        "text": "Independent PPO (IPPO) with round-robin decentralized training: one agent learns while the other acts on its frozen policy"
      },
      {
        "label": "Simulator",
        "text": "Custom Python 15-DOF physics engine (RK4-integrated Keplerian orbital dynamics, quaternion attitude kinematics, atmospheric drag, gravity-gradient torques, time-variant mass)"
      },
      {
        "label": "State & Action Space",
        "text": "Pilot: 18-D partial state (POMDP, noisy star-tracker sensing), 6 discrete thruster/wheel channels; Arm Operator: 27-D state, 9 discrete joint-velocity channels across 3 arms"
      },
      {
        "label": "Reward Design",
        "text": "Multi-term shaped rewards — navigation, attitude, safety, fuel-efficiency for the Pilot; approach, workspace, time for the Arm Operator"
      }
    ],
    "outcomes": [
      "Cooperative behavior emerges from shared constraints and coupled rewards, with no explicit agent communication",
      "Policy adapts zero-shot to a ~400 kg·m² inertia jump at debris capture (Huygens-Steiner effect)",
      "End-to-end mission trained across sequential FSM phases: approach, hover, capture, and return",
      "Checkpointed training continued well past initial convergence to further stabilize the harder Arm-Operator policy"
    ],
    "tools": [
      {
        "label": "Core Stack",
        "items": [
          {
            "name": "Python",
            "use": "Environment and training orchestration"
          },
          {
            "name": "Stable-Baselines3",
            "use": "PPO/IPPO implementation for both Pilot and Arm Operator policies"
          },
          {
            "name": "Gymnasium",
            "use": "Single-agent environment API"
          },
          {
            "name": "PettingZoo",
            "use": "Multi-agent Dec-POMDP interface"
          },
          {
            "name": "SuperSuit",
            "use": "Environment wrappers for PettingZoo/SB3 compatibility"
          }
        ]
      },
      {
        "label": "Sensor & Analysis",
        "items": [
          {
            "name": "Skyfield",
            "use": "Ephemeris computation for the star-tracker pipeline"
          },
          {
            "name": "Hipparcos catalog",
            "use": "Reference stars for TRIAD attitude estimation"
          },
          {
            "name": "JPL DE421 ephemerides",
            "use": "Solar/planetary position data"
          },
          {
            "name": "NumPy",
            "use": "Numerical backend for the physics engine"
          },
          {
            "name": "Matplotlib",
            "use": "Mission trajectory and reward plots"
          }
        ]
      }
    ],
    "closing": "A sensor-realistic, multi-agent control framework pointing toward autonomous active debris removal missions like ESA's ClearSpace-1.",
    "paper": null,
    "code": "https://github.com/Falconi23/multi-agent-debris-capture",
    "org": "Sapienza University of Rome"
  },
  {
    "id": "transfer",
    "title": "6-DOF Debris Capture & Orbit Transfer",
    "name": "A 6-DOF Deep Reinforcement Learning (DRL) Architecture for Autonomous Debris Capture and Orbit Transfer",
    "field": "Deep Reinforcement Learning",
    "year": "2026",
    "place": "Sapienza University of Rome",
    "desc": "A PPO-based 6-DOF GNC architecture that autonomously captures an uncooperative orbital debris target and de-orbits it: learned orbital transfers out to the debris and back down, and a learned 6-DOF proximity, capture and return phase.",
    "contributions": [
      "Built the proximity environment so that capture happens mid-episode with no reset: the policy flies on through the mass and inertia jump and the return leg, starting from a perturbed handover",
      "Modeled instantaneous inertia adaptation via the Huygens-Steiner theorem after physical debris capture",
      "Designed SMA/eccentricity energy rewards for the orbital transfers, fixing the 'ghost-target' stagnation of a naive distance-based reward",
      "Designed a curriculum that progressively tightens the arrival tolerances of the orbital transfers, down to 250 m on the de-orbit"
    ],
    "stats": [
      {
        "value": "400",
        "unit": "kg·m²",
        "label": "inertia jump at capture, absorbed with no controller retuning"
      },
      {
        "value": "0.18",
        "unit": "ms",
        "label": "actor-network inference time per control step (Apple M2)"
      },
      {
        "value": "6",
        "unit": "DOF",
        "label": "coupled translational and rotational control during proximity operations and capture"
      },
      {
        "value": "4",
        "unit": "",
        "label": "mission phases, from Hohmann transfer to de-orbit, flown by three PPO policies"
      }
    ],
    "headline": "Three PPO policies fly a complete debris capture and de-orbit mission, from the outbound Hohmann transfer to disposal, with zero collisions.",
    "specs": [
      {
        "label": "Algorithm",
        "text": "Proximal Policy Optimization (PPO) via Stable-Baselines3: one policy per mission segment, MlpPolicy [128,128] for the orbital transfers and [256,256] for 6-DOF proximity operations, with curriculum learning on the arrival tolerances"
      },
      {
        "label": "Simulator & State Space",
        "text": "Custom Gymnasium environments: absolute ECI Keplerian propagation (RK4 for the transfers), LVLH relative frame, quaternion attitude, Tsiolkovsky mass depletion; 18-D body-frame telemetry for proximity operations, compact orbital observations (with radial velocity) for the transfers"
      },
      {
        "label": "Action Space",
        "text": "Hybrid: MultiDiscrete(3) prograde/coast/retrograde for the outbound transfer; MultiDiscrete([3]×6) bang-bang force and torque commands for proximity and capture; continuous 3-axis thrust in [-1,1]^3 for the de-orbit"
      },
      {
        "label": "Reward Design",
        "text": "Phase-specific shaping: orbital-energy (SMA and eccentricity) rewards for the transfers, a coasting penalty along the Hohmann arc, milestone rewards at capture (+50) and return (+100), and a fuel penalty proportional to the propellant burned"
      }
    ],
    "outcomes": [
      "Discovered autonomous two-burn Hohmann transfers without explicit burn-timing programming",
      "Absorbed a +400 kg·m² inertia surge on capture without any controller retuning",
      "Stabilized a +0.5 m/s unmitigated handover perturbation that risked collision within 16 s",
      "Runs fast enough for real-time onboard control — roughly two orders of magnitude faster than typical NMPC solvers"
    ],
    "tools": [
      {
        "label": "Core Stack",
        "items": [
          {
            "name": "Python",
            "use": "Environment and training orchestration"
          },
          {
            "name": "Stable-Baselines3",
            "use": "PPO implementation (MlpPolicy, 256x256 MLP)"
          },
          {
            "name": "NumPy",
            "use": "Numerical backend for the orbital propagator"
          },
          {
            "name": "Custom Gymnasium environment",
            "use": "Per-segment mission environments"
          }
        ]
      },
      {
        "label": "Analysis & Plotting",
        "items": [
          {
            "name": "Matplotlib",
            "use": "Trajectory visualization and mission GIFs"
          },
          {
            "name": "MATLAB",
            "use": "Post-hoc trajectory analysis and figure generation"
          }
        ]
      }
    ],
    "closing": "Presented as Speaker & First Author at IEEE/IFAC CoDIT 2026 (Bari, Italy, July 2026) — published in the IEEE Xplore Digital Library.",
    "paper": "https://ieeexplore.ieee.org/document/11630811",
    "code": "https://github.com/Falconi23/debris-capture-orbit-transfer",
    "org": "Sapienza University of Rome"
  },
  {
    "id": "ekf",
    "title": "VTOL State Estimation",
    "name": "A 20-State Extended Kalman Filter for the Sapienza Flight Team VTOL",
    "field": "State Estimation & Sensor Fusion",
    "year": "2025 – 2026",
    "place": "Sapienza Flight Team (SASA), Rome",
    "desc": "A custom 20-state Extended Kalman Filter that replaced the legacy estimator of the team's VTOL tricopter, fusing IMU, GNSS and AHRS data in real time on the autopilot competing in the UAS Challenge 2026.",
    "contributions": [
      "Architected a custom 20-state Extended Kalman Filter to replace the legacy estimator, fusing IMU, GNSS and AHRS data over a 17-dimensional measurement vector",
      "Built the quaternion-kinematics process and measurement models, with Jacobians from CasADi automatic differentiation and a numerically stable Joseph-form covariance update",
      "Optimized real-time execution via CasADi automatic differentiation and C-code generation, compiling the filter into a Simulink S-Function for closed-loop Software-In-The-Loop validation",
      "Designed a MATLAB/Simulink autopilot with a complete SITL framework to validate trajectory generation and adaptive control across vertical and fixed-wing flight modes"
    ],
    "stats": [
      {
        "value": "20",
        "unit": "states",
        "label": "EKF state vector"
      },
      {
        "value": "17",
        "unit": "",
        "label": "dimensional measurement vector (IMU, GNSS, AHRS)"
      }
    ],
    "headline": "A filter modeled symbolically, generated to C and validated in closed loop before flying on the team's UAS Challenge autopilot.",
    "specs": [
      {
        "label": "Estimator",
        "text": "20-state Extended Kalman Filter with quaternion attitude kinematics, CasADi-derived Jacobians and a Joseph-form covariance update"
      },
      {
        "label": "Measurements",
        "text": "IMU, GNSS and AHRS fused over a 17-dimensional measurement vector"
      },
      {
        "label": "Implementation",
        "text": "CasADi automatic differentiation and C-code generation, packaged as a Simulink S-Function"
      },
      {
        "label": "Validation",
        "text": "Closed-loop Software-In-The-Loop with the team autopilot across vertical and fixed-wing flight modes"
      }
    ],
    "outcomes": [
      "Replaced the team's legacy estimator with a custom 20-state EKF",
      "Filter compiled to C and run in real time on the UAS Challenge autopilot",
      "Complete SITL framework for trajectory generation and adaptive control of a VTOL tricopter"
    ],
    "tools": [
      {
        "label": "Core Stack",
        "items": [
          {
            "name": "MATLAB / Simulink",
            "use": "Filter design, autopilot and SIL/SITL simulation"
          },
          {
            "name": "CasADi",
            "use": "Automatic differentiation of the filter Jacobians"
          },
          {
            "name": "C code generation",
            "use": "Real-time implementation as a Simulink S-Function"
          }
        ]
      }
    ],
    "closing": "The estimator at the heart of the team's autopilot: every flight decision of the VTOL starts from its state estimate.",
    "paper": null,
    "code": "https://github.com/Falconi23/vtol-ekf-state-estimation",
    "org": "Sapienza Flight Team (SASA)"
  },
  {
    "id": "davinci",
    "title": "Da Vinci VR Surgical Simulator",
    "name": "Integration of a Realistic Phantom in the da Vinci Research Kit (dVRK) Simulator for an Educational Tool",
    "field": "Robotics Simulation",
    "year": "2025 – 2026",
    "place": "Sapienza University of Rome",
    "desc": "A native Unity/C# simulator of the da Vinci Research Kit with VR head-tracking and dual haptic feedback, built as a low-cost, ROS-free training alternative.",
    "contributions": [
      "Implemented the native C# forward-kinematics pipeline mapping joint space to PSM pose in real time",
      "Built the Jacobian-transpose inverse-kinematics solver for task-space end-effector control",
      "Contributed to migrating the kinematic-chain pipeline from an error-prone Blender/FBX workflow to a more reliable URDF-based CoppeliaSim-to-Unity conversion",
      "Contributed to the haptic/VR integration layer — the Geomagic Touch C++/DLL bridge and Meta Quest 3 head tracking"
    ],
    "stats": [
      {
        "value": "7",
        "unit": "DoF",
        "label": "PSM joint-space vector controlled (q ∈ R7)"
      },
      {
        "value": "2",
        "unit": "",
        "label": "Geomagic Touch devices for independent dual-arm haptic control"
      },
      {
        "value": "<1",
        "unit": "mm",
        "label": "final positional residual of the IK solver on convergence"
      },
      {
        "value": "5",
        "unit": "",
        "label": "integrated modules: Unity engine, URDF models, C# solver, haptics, VR"
      }
    ],
    "headline": "Replaced a costly da Vinci-style console with consumer VR/haptic hardware and a from-scratch C# kinematics stack.",
    "specs": [
      {
        "label": "Platform",
        "text": "Unity engine (C#) with PhysX ArticulationBody-driven physics"
      },
      {
        "label": "Simulator & Integration",
        "text": "dVRK PSM, originally modeled in CoppeliaSim (V-REP); transferred via URDF-based kinematic-chain conversion, replacing an earlier Blender/FBX pipeline"
      },
      {
        "label": "Phantom Model",
        "text": "Anatomical phantom approximated with primitive capsule colliders for stable, high-frequency haptic force feedback"
      },
      {
        "label": "Use Case",
        "text": "Educational/training tool for robotic-assisted minimally invasive surgery, as a low-cost alternative to the physical dVRK console"
      }
    ],
    "outcomes": [
      "Built a standalone Unity architecture with no dependency on ROS or external UDP middleware",
      "Achieved stable force feedback on Geomagic Touch by using capsule colliders instead of mesh",
      "Delivered head-tracked stereo VR via Meta Quest 3 driving an internal endoscopic camera view",
      "Demonstrated sub-millimetric convergence of the Jacobian-transpose IK solver in isolated validation"
    ],
    "tools": [
      {
        "label": "Simulation Platform",
        "items": [
          {
            "name": "Unity (C#)",
            "use": "Real-time simulation engine and rendering"
          },
          {
            "name": "PhysX ArticulationBody",
            "use": "Joint-driven physics for the PSM arm"
          },
          {
            "name": "URDF import pipeline",
            "use": "Kinematic-chain transfer from CoppeliaSim"
          }
        ]
      },
      {
        "label": "Haptics",
        "items": [
          {
            "name": "Geomagic Touch",
            "use": "Dual-arm haptic input/output devices"
          },
          {
            "name": "Custom C++/OpenHaptics DLL",
            "use": "Bridges Geomagic Touch to Unity"
          }
        ]
      },
      {
        "label": "VR",
        "items": [
          {
            "name": "Meta Quest 3",
            "use": "Head-tracked stereo VR headset"
          },
          {
            "name": "Oculus XR Plugin",
            "use": "Unity integration for VR head tracking"
          }
        ]
      }
    ],
    "closing": "A ROS-free da Vinci simulator that swaps a six-figure surgical console for consumer VR and haptic hardware — putting full C# kinematics behind an accessible, affordable path into surgical robotics training.",
    "paper": null,
    "code": "https://github.com/Falconi23/davinci-vr-surgical-simulator",
    "org": "Sapienza University of Rome"
  },
  {
    "id": "rover",
    "title": "Autonomous Obstacle-Avoidance Rover",
    "name": "Obstacle Avoidance Algorithm for an Autonomous Mobile Robot (AMR)",
    "field": "Autonomous Mobile Robotics",
    "year": "2024",
    "place": "Roma Tre University, Rome",
    "desc": "A tracked Arduino robot that senses obstacles via ultrasonic sonar and autonomously stops, backs off, and reroutes around them in real time.",
    "contributions": [
      "Refactored an existing tracked-robot kit into a working obstacle-avoidance system, interfacing an HC-SR04 sonar and dual DC motors through an Arduino Uno",
      "Wrote the Arduino C++ reactive control loop, tuning stop/reverse/re-measure timing to avoid overshooting into detected obstacles",
      "Evaluated IR proximity sensors before settling on ultrasonic sonar for more reliable distance sensing across varied materials",
      "Built a MATLAB/serial telemetry link with live motor-speed plots, and benchmarked detection accuracy and turning behavior across five materials and three terrains"
    ],
    "stats": [
      {
        "value": "15",
        "unit": "cm",
        "label": "obstacle distance that triggers the stop/avoid maneuver"
      },
      {
        "value": "<5",
        "unit": "%",
        "label": "distance-reading error on metal obstacles (best case)"
      },
      {
        "value": "15-20",
        "unit": "%",
        "label": "distance-reading error on fabric obstacles (worst case)"
      },
      {
        "value": "20-30",
        "unit": "%",
        "label": "turning-angle loss measured on carpet vs. smooth flooring"
      }
    ],
    "headline": "Detection accuracy ranged from under 5% error on metal to 15-20% on fabric, with a 15cm safety stop threshold.",
    "specs": [
      {
        "label": "Platform",
        "text": "Aluminum-alloy tracked chassis (refactored from an existing kit) with rubber tracks and plastic gearing"
      },
      {
        "label": "Sensors",
        "text": "HC-SR04 ultrasonic sonar (2-400cm range, 1cm resolution, 40kHz, 30-degree beam); IR sensors evaluated but not used in the final design"
      },
      {
        "label": "Actuation & Control",
        "text": "Two 9V DC encoder motors via an L293D H-bridge shield; Arduino Uno sketch: on obstacle ≤15cm, stop, reverse briefly, re-measure with the fixed forward sonar, pivot away, resume"
      },
      {
        "label": "Testing",
        "text": "Sensor accuracy trials on iron, wood, plastic, glass and fabric; navigation trials on smooth flooring, carpet and concrete"
      }
    ],
    "outcomes": [
      "Turning angle dropped 20-30% on carpet/rough terrain compared to the standard-surface turn",
      "Tracked wheels let the robot roll over small steps without falsely triggering the sensor",
      "Avoidance maneuver reliably sequences stop, reverse, re-measure and pivot before resuming",
      "Live MATLAB telemetry confirmed motor response matched the commanded stop-reverse-turn sequence in real time"
    ],
    "tools": [
      {
        "label": "Hardware",
        "items": [
          {
            "name": "Arduino Uno",
            "use": "Onboard control microcontroller"
          },
          {
            "name": "L293D Motor Shield",
            "use": "Dual H-bridge motor driver"
          },
          {
            "name": "HC-SR04",
            "use": "Ultrasonic distance sensor"
          }
        ]
      },
      {
        "label": "Telemetry",
        "items": [
          {
            "name": "MATLAB",
            "use": "Real-time serial telemetry and motor-speed plotting"
          },
          {
            "name": "Arduino Explorer package",
            "use": "MATLAB-to-Arduino serial bridge"
          }
        ]
      },
      {
        "label": "Firmware",
        "items": [
          {
            "name": "NewPing",
            "use": "Ultrasonic sensor timing library"
          },
          {
            "name": "AFMotor",
            "use": "DC motor control library"
          },
          {
            "name": "Arduino IDE (C/C++)",
            "use": "Onboard control sketches"
          }
        ]
      }
    ],
    "closing": "Completed as Federico Falconi's Bachelor's thesis in Computer Engineering at Roma Tre University.",
    "paper": null,
    "code": "https://github.com/Falconi23/autonomous-obstacle-avoidance-rover",
    "org": "Roma Tre University"
  },
  {
    "id": "field",
    "title": "PLC Precision-Irrigation Automation",
    "name": "Sequential Function Chart Automation of a Precision-Irrigation Field Process",
    "field": "PLC Automation & Industrial Networks",
    "year": "2024",
    "place": "Roma Tre University, Rome",
    "desc": "A Beckhoff TwinCAT PLC drives rain, ploughing, seeding and irrigation cycles through a 17-step Sequential Function Chart, exposed live to a C# HMI over ADS and to an iFIX SCADA over OPC UA.",
    "contributions": [
      "Modeled the full field lifecycle as an IEC 61131-3 Sequential Function Chart in TwinCAT 3",
      "Designed two alternative branches: rain delivered in time vs. watchdog alarm, then water-tanker vs. hose-sprinkler irrigation",
      "Built limit-switch sensing across 12 boolean sensors to detect actuator travel and drive state transitions",
      "Implemented a TON watchdog timer with a dedicated reset/abort branch to keep the SFC from stalling silently on actuator failure"
    ],
    "stats": [
      {
        "value": "17",
        "unit": "",
        "label": "sequential steps in the field-automation SFC"
      },
      {
        "value": "2",
        "unit": "",
        "label": "alternative branches: rain vs. watchdog alarm, tanker vs. hose"
      },
      {
        "value": "12",
        "unit": "",
        "label": "boolean limit-switch sensors monitored in real time"
      },
      {
        "value": "5",
        "unit": "s",
        "label": "TON watchdog timeout supervising the automation cycle"
      }
    ],
    "headline": "A 17-step Sequential Function Chart runs the entire field cycle — rain, plough, seed, irrigate — with zero manual state tracking.",
    "specs": [
      {
        "label": "Platform",
        "text": "Beckhoff TwinCAT 3 soft-PLC runtime, programmed in IEC 61131-3 Sequential Function Chart (SFC)"
      },
      {
        "label": "Architecture",
        "text": "17-step SFC with two alternative branches, driven by 12 boolean limit-switch sensors and 9 actuator command outputs"
      },
      {
        "label": "Connectivity & HMI",
        "text": "TwinCAT OPC UA server publishing the process variables (Data Access) to an iFIX SCADA, with read-only guest access; C# WinForms HMI over ADS with event-driven on-change notifications"
      },
      {
        "label": "Supervision",
        "text": "TON watchdog timer (5s) monitoring cycle health, with a dedicated reset/abort SFC branch"
      }
    ],
    "outcomes": [
      "Two irrigation methods, tanker or hose, are picked at runtime with equal probability, and the SFC follows the chosen branch",
      "Live HMI mirrors PLC state within one notification cycle through event-driven ADS updates",
      "OPC UA layer exposes the field sensors and actuator commands (19 variables) to the iFIX SCADA without touching the SFC logic",
      "Sensor-driven limit switches replace fixed-time delays, keeping every axis synchronized to real actuator position"
    ],
    "tools": [
      {
        "label": "PLC Runtime",
        "items": [
          {
            "name": "Beckhoff TwinCAT 3",
            "use": "Soft-PLC runtime environment"
          },
          {
            "name": "IEC 61131-3 SFC",
            "use": "Sequential Function Chart programming language"
          }
        ]
      },
      {
        "label": "SCADA & OPC UA",
        "items": [
          {
            "name": "TwinCAT OPC UA Server",
            "use": "Tag exposure to the SCADA layer"
          },
          {
            "name": "OPC UA Data Access",
            "use": "Live read access to the process variables"
          },
          {
            "name": "iFIX",
            "use": "SCADA supervision over OPC UA"
          }
        ]
      },
      {
        "label": "HMI Client",
        "items": [
          {
            "name": "C# / .NET WinForms",
            "use": "Desktop HMI application"
          },
          {
            "name": "TwinCAT.Ads",
            "use": "Client library for PLC communication over ADS"
          }
        ]
      }
    ],
    "closing": "A from-scratch Sequential Function Chart automation stack — bridging classical SFC PLC sequencing with OPC UA connectivity to an iFIX SCADA.",
    "paper": null,
    "code": "https://github.com/Falconi23/plc-precision-irrigation",
    "org": "Roma Tre University"
  }
];
