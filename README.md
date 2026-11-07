# Federico Falconi

**Control Engineer** · born 11 December 2001 · currently in Rennes, France

> *Focus on what matters.*

**Portfolio:** [falconi23.github.io/portfolio](https://falconi23.github.io/portfolio/)

I build controllers that let systems act reliably in the real world. My work sits where estimation, guidance and learning meet: the control loops and models that keep a system on track despite everything it can't measure directly.

---

## Now

**Research intern, RAINBOW Team (IRISA-Inria, CNRS)**, Rennes, France · since September 2026
M.Sc. thesis on world models for aerial robots (AdaSkyJEPA), working with Antonio Franchi, Tommaso Belvedere and Paolo Robuffo Giordano: an online-adaptive, JEPA-style world model for quadrotors that adapts to the robot's physical uncertainties, developed in simulation with deployment planned on the team's quadrotor fleet.

## Education

### M.Sc. in Control Engineering
Sapienza University of Rome  
*Expected 2027*

Classical and learning-based control (PID, LQR, MPC, reinforcement learning), state estimation, and guidance, navigation and control for autonomous multi-agent systems.

### B.Sc. in Computer Engineering (*Ingegneria Informatica*)
Roma Tre University  
*2024*

Thesis: *Obstacle Avoidance Algorithm for an Autonomous Mobile Robot*. An Arduino-based tracked robot with ultrasonic sensing, benchmarked across five materials and three terrains.

## Highlights

- **First author, IEEE/IFAC CoDIT 2026** (Bari, Italy, July 2026): *A 6-DOF Deep Reinforcement Learning Architecture for Autonomous Debris Capture and Orbit Transfer*, with Kirolos Romany Anwar Kamel, Danilo Menegatti and Prof. Francesco Delli Priscoli (DIAG, Sapienza). Presented as speaker and published in [IEEE Xplore](https://ieeexplore.ieee.org/document/11630811). PPO policies fly the whole active-debris-removal mission: they discovered fuel-optimal two-burn Hohmann transfers on its own, absorbed a +400 kg·m² inertia jump at capture with no retuning, computes a 6-DOF command in 0.18 ms (about two orders of magnitude faster than typical NMPC), and completes the mission with zero collisions.
- **Sapienza Flight Team, Control Engineer** (2025 – 2026): designed a 20-state Extended Kalman Filter that replaced the team's legacy estimator, running in real time on the VTOL autopilot for the UAS Challenge 2026.

## Selected work

| Project | Field | Year | Code |
|---|---|---|---|
| **Swarm Laser Debris Removal**: three drones trained with cooperative deep RL to laser-ablate orbital debris and return to base | Multi-Agent RL | 2026 | [repo](https://github.com/Falconi23/swarm-laser-debris-removal) |
| **Multi-Agent Debris Capture & Manipulation**: a pilot and an arm-operator policy capture debris with a 6-DOF chaser and three 3-DOF arms | Multi-Agent RL | 2026 | [repo](https://github.com/Falconi23/multi-agent-debris-capture) |
| **6-DOF Debris Capture & Orbit Transfer**: PPO policies for the transfer, proximity, capture and de-orbit phases (the CoDIT paper) | Deep RL / GNC | 2026 | [repo](https://github.com/Falconi23/debris-capture-orbit-transfer) · [paper](https://ieeexplore.ieee.org/document/11630811) |
| **VTOL State Estimation**: a 20-state EKF built with CasADi and generated to C for the Sapienza Flight Team autopilot | State estimation | 2025 – 2026 | [repo](https://github.com/Falconi23/vtol-ekf-state-estimation) |
| **Da Vinci VR Surgical Simulator**: forward/inverse kinematics, URDF pipeline and haptic VR for the dVRK | Robotics simulation | 2025 – 2026 | [repo](https://github.com/Falconi23/davinci-vr-surgical-simulator) |
| **Autonomous Obstacle-Avoidance Rover**: the bachelor thesis robot, with Arduino firmware and MATLAB telemetry | Mobile robotics | 2024 | [repo](https://github.com/Falconi23/autonomous-obstacle-avoidance-rover) |
| **PLC Precision-Irrigation Automation**: a 17-step IEC 61131-3 SFC on a Beckhoff TwinCAT soft-PLC, with an ADS HMI and an iFIX SCADA over OPC UA | Industrial automation | 2024 | [repo](https://github.com/Falconi23/plc-precision-irrigation) |

**Tools:** Python, C/C++, C#, MATLAB/Simulink, PyTorch, Stable-Baselines3, TwinCAT 3, OPC UA, Unity, Blender.

## Beyond engineering

I'm a sports addict. I played football for years, up to semi-professional level: from 2018 to 2020 I trained and competed with **Trastevere Calcio** in the Serie D national championship and the Coppa Italia, after playing for several of the region's top clubs. Football taught me most of what I bring to engineering teams: discipline, resilience and making decisions under pressure. The same love for sport took me behind the scenes of the 2025 Internazionali BNL d'Italia, one of the world's biggest tennis tournaments, where I worked in guest relations and VIP hospitality. I'm active and adventure-driven, I love the outdoors, and curiosity keeps me learning new technologies, research and tools.

## Contact

- Email: [federico.falconi23@icloud.com](mailto:federico.falconi23@icloud.com)
- LinkedIn: [linkedin.com/in/federico-falconi](https://www.linkedin.com/in/federico-falconi/)
- GitHub: [github.com/Falconi23](https://github.com/Falconi23)

---

## About this repository

This is my personal portfolio website, live at **[falconi23.github.io/portfolio](https://falconi23.github.io/portfolio/)**: a minimal, text-first page. The hero sets my name full-bleed over the step response of an underdamped second-order system; a single **Projects** button opens the list of selected work, and each project expands in place with its contributions, key numbers, technical specifications and links to code and papers.

- **Stack:** static HTML, CSS and vanilla JavaScript, with no libraries and no build step (about 70 KB). Typeset in Geist and Geist Mono.
- **Motion:** CSS transitions driven by state classes, scroll reveals and counters through `IntersectionObserver`, the hero curve drawn with the Web Animations API. Everything respects `prefers-reduced-motion`.
- **Deep links:** `#projects`, `#projects/<id>` (for example `#projects/swarm`) and `#about` open the matching view directly.
- **Layout:** `index.html` at the root; the site's code lives in `site/` (`app.js`, `style.css`, and `projects.js` with all project content). Icons and the link-preview image are in `assets/img/`.

### Run locally

```bash
python3 -m http.server 8766
# open http://localhost:8766/
```
