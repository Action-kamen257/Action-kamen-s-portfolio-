export interface Metric {
  value: string;
  label: string;
}

export interface Challenge {
  title: string;
  problem: string;
  resolution: string;
}

export interface CaseStudy {
  role?: string;
  timeline?: string;
  problem?: string;
  solution?: string;
  keyFeatures?: string[];
  challenges?: Challenge[];
  learnings?: string[];
}

export interface Dossier {
  id: string;
  codeName: string;
  title: string;
  category: 'ai' | 'gis' | 'robotics' | 'fullstack' | string;
  status: string;
  statusType?: string;
  accentColor?: string;
  icon?: string;
  summary: string;
  briefing: string;
  previewImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  metrics: Metric[];
  architecture: string[];
  caseStudy?: CaseStudy;
}

export const DOSSIERS: Dossier[] = [
  {
    "id": "brain-tumor-ai",
    "codeName": "PROJECT // NEURASCAN-V2",
    "title": "Brain Tumor AI & Grad-CAM Explainability",
    "category": "ai",
    "status": "DEPLOYED • OPEN SOURCE",
    "statusType": "deployed",
    "summary": "Vision Transformer + ResNet-50 dual-stage ensemble for MRI brain tumor classification with real-time Grad-CAM saliency heatmaps.",
    "briefing": "Medical practitioners need not just high accuracy, but transparent explainability to trust AI diagnostics. NeuraScan provides a dual-stage binary & 4-class classification pipeline that pinpoints glioma, meningioma, pituitary tumors and healthy scans with visual saliency evidence.",
    "architecture": [
      "Binary Screening Stage: Lightweight ResNet-18 filters healthy vs tumor scans with 99.4% precision.",
      "Multi-Class Saliency Stage: ResNet-50 / ViT classifies tumor type with Grad-CAM gradient backpropagation.",
      "Medical Heatmap Engine: OpenCV colormap overlays directly highlighting tumor bounding contours.",
      "Deployment Pipeline: Containerized FastAPI backend with Gradio UI deployed to HuggingFace Spaces."
    ],
    "metrics": [
      {
        "label": "Validation Accuracy",
        "value": "99.2%"
      },
      {
        "label": "Grad-CAM Inference",
        "value": "< 45ms"
      },
      {
        "label": "Diagnostic Classes",
        "value": "4 Types"
      },
      {
        "label": "Model Architecture",
        "value": "ViT + ResNet"
      }
    ],
    "tags": [
      "PyTorch",
      "Vision Transformers",
      "Grad-CAM",
      "FastAPI",
      "OpenCV",
      "Gradio"
    ],
    "liveUrl": "https://huggingface.co/spaces",
    "githubUrl": "https://github.com",
    "icon": "Brain",
    "previewImage": "/assets/projects/neurascan-gradcam.jpg",
    "accentColor": "#e11d48",
    "caseStudy": {
      "role": "Lead ML & Computer Vision Engineer",
      "timeline": "3 Months (Iterative Research & Production Deployment)",
      "problem": "Standard deep learning models act as black boxes in clinical workflows. When a neural network detects an intracranial neoplasm, radiologists require anatomical evidence of which voxel regions activated the prediction to prevent catastrophic false positives.",
      "solution": "Engineered a two-tiered neural diagnostic pipeline: Stage 1 acts as a rapid binary gatekeeper separating non-tumor scans; Stage 2 applies a Vision Transformer & ResNet-50 ensemble with Grad-CAM saliency mapping to render pixel-level gradient activation maps over the tumor mass in real-time.",
      "keyFeatures": [
        "Dual-Stage Binary & 4-Class Classification (Glioma, Meningioma, Pituitary, Normal).",
        "Grad-CAM (Gradient-Weighted Class Activation Mapping) on convolutional & attention heads.",
        "Interactive Gradio UI with real-time confidence scores and diagnostic heatmaps.",
        "Robust input validation preventing non-MRI noise and artifacts from spoofing model inference."
      ],
      "challenges": [
        {
          "title": "Class Imbalance in Rare Tumor Subtypes",
          "problem": "Initial training data contained significantly fewer pituitary adenoma scans compared to gliomas, causing recall degradation.",
          "resolution": "Implemented weighted focal loss combined with affine spatial augmentation (elastic deformations, subtle rotation, and contrast jitter)."
        },
        {
          "title": "Gradient Vanishing in Deep Saliency Layers",
          "problem": "Standard backpropagation in Vision Transformer attention layers generated noisy heatmaps with poor anatomical boundary definition.",
          "resolution": "Combined token-level attention rollouts with last-layer CNN feature maps using OpenCV threshold contouring for crisp tumor borders."
        }
      ],
      "learnings": [
        "Clinicians prioritize explainability and confidence distributions over a raw 0.5% accuracy increase.",
        "Containerizing PyTorch models with ONNX Runtime reduces cold-start latency from 1.2s to 45ms on edge GPUs."
      ]
    }
  },
  {
    "id": "dhule-cyber-police",
    "codeName": "PROJECT // CYBER-SHIELD-5K",
    "title": "Dhule Cyber Police Case Management System",
    "category": "gis",
    "status": "LIVE PRODUCTION • 5,200+ CASES",
    "statusType": "live",
    "summary": "Official cyber-crime investigation tracking and evidence ledger utilized daily by law enforcement officers across Dhule district.",
    "briefing": "Handling thousands of sensitive cyber-crime dockets across multiple jurisdictions required replacing fragmented registers with an encrypted, role-authenticated case management web platform featuring multi-station sync and officer telemetry.",
    "architecture": [
      "Role-Based Access Control: Granular officer permissions, investigator dockets, and supervisory audits.",
      "Real-time Firestore Database: Instant sync of case evidence, complainant statements, and suspect profiles.",
      "Encrypted Dossier Exports: Automated generation of standardized police charge-sheet summaries.",
      "Production Deployment: Cloud Functions and Firebase Hosting maintaining zero-downtime availability."
    ],
    "metrics": [
      {
        "label": "Cases Managed",
        "value": "5,200+"
      },
      {
        "label": "Police Stations",
        "value": "30+ PS"
      },
      {
        "label": "Query Latency",
        "value": "< 80ms"
      },
      {
        "label": "Uptime Record",
        "value": "99.9%"
      }
    ],
    "tags": [
      "Flutter Web",
      "Firebase Firestore",
      "Cloud Functions",
      "Security",
      "Law Enforcement"
    ],
    "liveUrl": "https://dhule-cyber-police.web.app",
    "githubUrl": "https://github.com",
    "icon": "ShieldCheck",
    "previewImage": "/assets/projects/dhule-police-architecture.png",
    "accentColor": "#00b4d8",
    "caseStudy": {
      "role": "Lead Full-Stack & Systems Architect",
      "timeline": "Rural Police Internship (Production Handover)",
      "problem": "Dhule District Cyber Cell was tracking over 5,000 active financial fraud, identity theft, and cyber harassment cases using physical paper registers and uncoordinated Excel sheets. This led to evidence misplacement, duplicate entries, and delayed court charge-sheets.",
      "solution": "Architected and deployed a multi-station case ledger on Flutter Web and Firebase. Implemented strict role-based access control (Investigating Officers vs. Superintending Officers), instantaneous offline-first caching, automated Excel/PDF charge-sheet report generation, and real-time case status tracking.",
      "keyFeatures": [
        "Live Case Lifecycle Tracking (Registered → Investigating → Bank Freeze → Charge-sheeted).",
        "Granular Role-Based Security: Police Station-level segregation with administrative audit logs.",
        "Bulk Evidence Importer: Validates and imports historical NCCRP portals records in seconds.",
        "Offline-Resilient Flutter Web Client: Operable during remote police station network dropouts."
      ],
      "challenges": [
        {
          "title": "Handling 5,200+ Legacy Records with Inconsistent Schemas",
          "problem": "Legacy spreadsheets had inconsistent column formats, missing phone numbers, and varied date formats.",
          "resolution": "Engineered automated Python data sanitization scripts that cleansed, normalized, and batch-uploaded verified JSON structures directly to Firestore."
        },
        {
          "title": "Data Confidentiality & Legal Auditability",
          "problem": "Police data requires strict non-repudiation and access controls preventing unauthorized docket modifications.",
          "resolution": "Configured comprehensive Firebase Security Rules enforcing officer token claims and immutable timestamped audit logs for every case modification."
        }
      ],
      "learnings": [
        "Designing for government and law enforcement requires extreme UX simplicity—officers must complete workflows in under 3 clicks.",
        "Real-time database indexes are essential when querying multi-thousand case collections with compound filter criteria."
      ]
    }
  },
  {
    "id": "dhule-gis-map",
    "codeName": "PROJECT // POLICE-GIS-COMMAND",
    "title": "Dhule Police GIS & Sensitive Point Control Map",
    "category": "gis",
    "status": "LIVE SYSTEM • OFFLINE READY",
    "statusType": "live",
    "summary": "High-precision geospatial GIS command map mapping all police stations, sensitive religious/communal spots, and BIT chowkies for bandobast planning.",
    "briefing": "During major festivals, VIP visits, and emergency situations, police command staff need real-time spatial intelligence of sensitive intersections, patrol BIT beats, and jurisdictional boundaries across Dhule City and rural sectors.",
    "architecture": [
      "Geospatial Layer Engine: Leaflet.js rendering 100+ sensitive spots, CCTV locations, and station boundaries.",
      "Bandobast Planning Tool: Interactive deployment planner calculating police officer troop density.",
      "Offline Standalone Mode: Self-contained spatial assets operable on police field laptops without internet.",
      "Live Filtering: Instant toggling by police station jurisdiction and threat level classification."
    ],
    "metrics": [
      {
        "label": "Police Stations Mapped",
        "value": "All District"
      },
      {
        "label": "Sensitive Points",
        "value": "120+ Spots"
      },
      {
        "label": "Bandobast Routes",
        "value": "15+ Corridors"
      },
      {
        "label": "Bundle Size",
        "value": "Standalone"
      }
    ],
    "tags": [
      "Leaflet GIS",
      "JavaScript",
      "Firebase Hosting",
      "Spatial Analytics",
      "GeoJSON"
    ],
    "liveUrl": "https://dhule-gis-map.web.app",
    "githubUrl": "https://github.com",
    "icon": "MapPin",
    "previewImage": "/assets/projects/dhule-gis-preview.png",
    "accentColor": "#e11d48",
    "caseStudy": {
      "role": "Geospatial Systems Developer",
      "timeline": "2 Months (Field Survey & Command Deployment)",
      "problem": "Commanding officers planning bandobast troop deployments for sensitive events had to rely on static paper wall maps. Assessing route bottlenecks, vulnerable religious intersections, and patrol jurisdiction overlaps required hours of manual cross-referencing.",
      "solution": "Developed a standalone GIS command application powered by Leaflet.js and GeoJSON. Mapped 100% of Dhule district police stations, BIT police chowkies, high-priority sensitive points, and route corridors with toggleable threat-level filters and live troop density calculations.",
      "keyFeatures": [
        "100% Offline-Capable: Embedded GeoJSON boundaries and vector markers functioning without internet.",
        "Interactive Bandobast Route Corridor Calculator: Computes officer stationing requirements.",
        "Multi-Jurisdiction Filter: Instant spatial switching between Dhule City, Azadnagar, Mohadi, and Rural stations.",
        "Printable High-Resolution Sector Briefing Maps for field officers."
      ],
      "challenges": [
        {
          "title": "Inaccurate GPS Coordinates from Ground Field Notes",
          "problem": "Several rural police outposts and historical sensitive points had imprecise coordinates.",
          "resolution": "Reconciled spatial points with Google Earth KML layers, OpenStreetMap bounding boxes, and ground police beat logs to ensure sub-10-meter spatial precision."
        },
        {
          "title": "Zero-Dependency Standalone Field Deployment",
          "problem": "Police laptops deployed in mobile command vans frequently lack internet connectivity and administrative install permissions.",
          "resolution": "Compiled all tiles, icons, and spatial datasets into a single self-contained offline HTML/JS bundle that launches instantaneously in any browser."
        }
      ],
      "learnings": [
        "Geospatial visualization unlocks massive situational clarity during high-stakes police crowd control scenarios.",
        "Keeping GIS tools lightweight and dependency-free ensures 100% reliability in field environments."
      ]
    }
  },
  {
    "id": "silly-smart-mark1",
    "codeName": "PROJECT // SMART-BOT-MK1",
    "title": "Silly Smart Mark1 (Autonomous Vision Robot)",
    "category": "robotics",
    "status": "HARDWARE PROTOTYPE",
    "statusType": "prototype",
    "summary": "Autonomous indoor robot butler equipped with YOLO real-time vision, ultrasonic obstacle mapping, and wireless telemetry control.",
    "briefing": "Combining computer vision with micro-robotics to build an autonomous bot that recognizes humans, follows hand gestures, navigates rooms safely, and delivers payloads across indoor spaces.",
    "architecture": [
      "Visual Perception: ESP32-CAM streaming video feed into YOLOv8 object detection model on host edge.",
      "Motion Controller: Dual L298N H-Bridge motor drivers coordinating differential drive mechanics.",
      "Obstacle Avoidance: Ultrasonic sensor array calculating dynamic emergency braking envelopes.",
      "Telemetry HUD: WebSockets command center broadcasting real-time battery and motor telemetry."
    ],
    "metrics": [
      {
        "label": "Vision FPS",
        "value": "30 FPS"
      },
      {
        "label": "Avoidance Range",
        "value": "2.5 Meters"
      },
      {
        "label": "Payload Capacity",
        "value": "1.2 KG"
      },
      {
        "label": "Microcontroller",
        "value": "ESP32"
      }
    ],
    "tags": [
      "Robotics",
      "ESP32",
      "YOLOv8",
      "MicroPython",
      "C++",
      "Hardware"
    ],
    "githubUrl": "https://github.com",
    "icon": "Bot",
    "accentColor": "#00b4d8",
    "caseStudy": {
      "role": "Embedded Systems & Robotics Engineer",
      "timeline": "4 Months (Design, CAD, Circuit Wiring, & Vision Integration)",
      "problem": "Building affordable indoor companion robots typically requires expensive LiDAR and industrial SBCs. The goal was to engineer an intelligent autonomous butler capable of person-following, obstacle avoidance, and telemetry reporting using low-cost microcontrollers and edge vision.",
      "solution": "Built Mark1 using an ESP32 microcontroller as the low-level hardware actuator and a laptop host PC as the high-level neural brain. The bot streams video over Wi-Fi, runs YOLOv8 person tracking, calculates dynamic steering vectors, and sends low-latency motor commands via WebSockets.",
      "keyFeatures": [
        "Autonomous Human Tracking: Computes bounding-box centroid offsets to steer motors toward users.",
        "Dynamic Emergency Braking: HC-SR04 ultrasonic array prevents collisions at speeds up to 1.5 m/s.",
        "Wireless WebSockets HUD: Live cockpit streaming motor RPM, battery voltage, and vision bounding boxes.",
        "Dual Control Modes: Seamless toggle between autonomous tracking and manual gamepad pilot mode."
      ],
      "challenges": [
        {
          "title": "Wi-Fi Video Stream Latency & Packet Loss",
          "problem": "High-resolution video streaming over HTTP caused a 350ms latency spike, causing steering oscillation.",
          "resolution": "Downscaled camera stream to QVGA 320x240 with JPEG compression quality 12 and shifted telemetry commands to lightweight binary UDP packets."
        },
        {
          "title": "Motor Power Noise Affecting Microcontroller Stability",
          "problem": "DC motor inductive kickback caused sudden ESP32 brownouts and reboot loops.",
          "resolution": "Isolated logic power from motor power using dual 18650 battery banks and added decoupling flyback diodes and 100uF capacitors across the L298N drivers."
        }
      ],
      "learnings": [
        "Decoupling high-level vision computation from low-level real-time motor actuation provides maximum safety and modularity.",
        "Hardware debugging requires methodical power budget analysis and physical oscilloscope testing."
      ]
    }
  },
  {
    "id": "pune-crime-dashboard",
    "codeName": "PROJECT // PUNE-ANALYTICS",
    "title": "Pune Crime Intelligence & Predictive Dashboard",
    "category": "fullstack",
    "status": "COMPLETED MISSION",
    "statusType": "deployed",
    "summary": "Full-stack predictive dashboard aggregating crime patterns, incident frequency distributions, and spatial hotspots.",
    "briefing": "Analyzes historical FIR records using clustering algorithms to assist law enforcement in optimizing night patrol routes and identifying emerging cyber/physical crime hubs.",
    "architecture": [
      "Backend Microservice: FastAPI running asynchronous query optimization over PostgreSQL database.",
      "Spatial Clustering: DBSCAN algorithm identifying temporal and spatial incident density peaks.",
      "Interactive Frontend: Next.js with Recharts visual telemetry and heatmaps."
    ],
    "metrics": [
      {
        "label": "Incidents Processed",
        "value": "10,000+"
      },
      {
        "label": "Clustering Precision",
        "value": "94.6%"
      },
      {
        "label": "Response Speed",
        "value": "< 60ms"
      }
    ],
    "tags": [
      "FastAPI",
      "React",
      "PostgreSQL",
      "Data Science",
      "Python"
    ],
    "githubUrl": "https://github.com",
    "icon": "Activity",
    "accentColor": "#e11d48",
    "caseStudy": {
      "role": "Full-Stack & Data Science Developer",
      "timeline": "1.5 Months (Data Wrangling & API Architecture)",
      "problem": "Police administrative teams struggle to detect emerging crime trends from raw numerical logs without spatial and temporal cluster analysis.",
      "solution": "Constructed an asynchronous data processing pipeline in FastAPI that ingests FIR records, executes DBSCAN spatial density clustering, and exposes analytical endpoints consumed by a modern Next.js dashboard with interactive crime charts.",
      "keyFeatures": [
        "Spatial Hotspot Detection: Automatically flags high-density crime clusters across urban zones.",
        "Temporal Heatmaps: Visualizes incident frequencies by hour of day and day of week.",
        "Asynchronous FastAPI Queries with indexed PostgreSQL spatial queries."
      ],
      "challenges": [
        {
          "title": "Handling Outliers in Geographic Noise",
          "problem": "Isolated single-incident records skewed standard K-Means clustering centers.",
          "resolution": "Transitioned to density-based spatial clustering (DBSCAN) with customized epsilon and min_samples parameters to filter noise."
        }
      ],
      "learnings": [
        "Asynchronous database connection pooling (asyncpg) delivers 5x query throughput compared to synchronous ORMs."
      ]
    }
  },
  {
    "id": "tushar-robo",
    "codeName": "PROJECT // ROBO-VISION-AI",
    "title": "Tushar Robo & Gesture Interaction System",
    "category": "ai",
    "status": "ACTIVE EXPERIMENT",
    "statusType": "prototype",
    "summary": "Multi-modal vision assistant recognizing facial landmarks, hand gestures, and spoken audio commands in real-time.",
    "briefing": "Building a natural human-machine interaction pipeline allowing touchless gesture control for smart vision appliances and robotic actuators.",
    "architecture": [
      "MediaPipe Vision Mesh: 21-point 3D hand landmark tracking running at 60 FPS in real-time.",
      "NLP Command Parser: Light LLM/intent parser transforming vocal prompts into robotic actuation vectors.",
      "FastAPI Event Bus: Low-latency event streaming via server-sent events."
    ],
    "metrics": [
      {
        "label": "Gesture Latency",
        "value": "16ms"
      },
      {
        "label": "Landmark Confidence",
        "value": "98%"
      },
      {
        "label": "Framework",
        "value": "MediaPipe"
      }
    ],
    "tags": [
      "MediaPipe",
      "OpenCV",
      "Python",
      "Gesture AI",
      "Human-Robot Interaction"
    ],
    "githubUrl": "https://github.com",
    "icon": "Sparkles",
    "accentColor": "#00b4d8",
    "caseStudy": {
      "role": "AI & HCI Researcher",
      "timeline": "Ongoing Exploration",
      "problem": "Traditional mouse and touch interfaces are cumbersome when interacting with physical robots or sterile medical environments. Natural gesture controls require real-time tracking with near-zero latency.",
      "solution": "Built a multi-modal computer vision interaction system utilizing Google MediaPipe 21-point 3D hand mesh detection and dynamic gesture recognition vectors to issue robotic and application commands touchlessly.",
      "keyFeatures": [
        "60 FPS Real-Time 3D Hand Mesh and Finger Joint Angle Calculation.",
        "Custom Static & Dynamic Gesture Classifier (Thumbs up, pinch-to-zoom, swipe, peace sign).",
        "FastAPI Server-Sent Events bus streaming command vectors to connected actuators."
      ],
      "challenges": [
        {
          "title": "Lighting Variation in WebCam Feeds",
          "problem": "Harsh shadows caused landmark tracking loss on finger tips.",
          "resolution": "Applied adaptive histogram equalization (CLAHE) on input frames prior to neural inference."
        }
      ],
      "learnings": [
        "Edge-optimized landmark tracking enables rich computer vision interfaces even on low-end hardware."
      ]
    }
  }
];
