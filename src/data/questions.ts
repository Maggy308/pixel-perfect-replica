export type Category =
  | "Cloud Concepts"
  | "Azure Architecture and Services"
  | "Azure Management and Governance";

export interface Question {
  id: string;
  category: Category;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const CATEGORIES: { name: Category; description: string }[] = [
  { name: "Cloud Concepts", description: "Cloud models, service types, and core benefits like scalability." },
  { name: "Azure Architecture and Services", description: "Regions, availability zones, compute, networking, and storage." },
  { name: "Azure Management and Governance", description: "Cost, security, compliance, and tools to manage resources." },
];

// Original practice questions written for study purposes. Not actual exam questions.
export const QUESTIONS: Question[] = [
  {
    id: "q1", category: "Cloud Concepts", topic: "Cloud computing basics",
    question: "A small bakery wants to stop buying its own servers and instead rent computing power over the internet, paying only for what it uses. What is this approach called?",
    options: ["On-premises hosting", "Cloud computing", "Edge caching", "Local virtualization"],
    correctIndex: 1,
    explanation: "Cloud computing means renting compute, storage, and other services over the internet from a provider, usually paying only for what you use.",
  },
  {
    id: "q2", category: "Cloud Concepts", topic: "Cloud service models",
    question: "Your team wants to deploy a web app without managing the operating system or patching servers, but still write their own code. Which service model fits best?",
    options: ["Infrastructure as a Service (IaaS)", "Software as a Service (SaaS)", "Platform as a Service (PaaS)", "On-premises"],
    correctIndex: 2,
    explanation: "With PaaS, the provider manages the OS and infrastructure. You focus on your application code and data.",
  },
  {
    id: "q3", category: "Cloud Concepts", topic: "Cloud service models",
    question: "Which of these is the best example of Software as a Service (SaaS)?",
    options: ["Renting a virtual machine", "Using a hosted email service in your browser", "Deploying code to a managed app platform", "Buying a physical server rack"],
    correctIndex: 1,
    explanation: "SaaS delivers a finished application you simply use, like web-based email. The provider manages everything behind it.",
  },
  {
    id: "q4", category: "Cloud Concepts", topic: "Scalability",
    question: "An online shop automatically adds more servers during a holiday sale and removes them afterwards. Which cloud benefit does this show?",
    options: ["Elasticity", "Fault tolerance", "Governance", "Data sovereignty"],
    correctIndex: 0,
    explanation: "Elasticity means resources grow and shrink automatically to match demand, so you don't pay for idle capacity.",
  },
  {
    id: "q5", category: "Cloud Concepts", topic: "Scalability",
    question: "Upgrading a single virtual machine to have more CPU and memory is an example of what?",
    options: ["Scaling out (horizontal)", "Scaling up (vertical)", "Load balancing", "Geo-replication"],
    correctIndex: 1,
    explanation: "Scaling up (vertical scaling) adds power to an existing machine. Scaling out adds more machines instead.",
  },
  {
    id: "q6", category: "Cloud Concepts", topic: "Shared responsibility & security",
    question: "In the shared responsibility model, which item is ALWAYS the customer's responsibility, no matter the service model?",
    options: ["Physical datacenter security", "Their own data and user accounts", "Host operating system patches", "Network cabling"],
    correctIndex: 1,
    explanation: "The cloud provider handles the physical side. Customers always remain responsible for their data, devices, and who has access to their accounts.",
  },
  {
    id: "q7", category: "Azure Architecture and Services", topic: "Azure regions",
    question: "What is an Azure region?",
    options: ["A single server rack", "A geographic area containing one or more datacenters", "A billing account", "A type of virtual network"],
    correctIndex: 1,
    explanation: "A region is a geographic area with one or more datacenters close together and connected by a fast network.",
  },
  {
    id: "q8", category: "Azure Architecture and Services", topic: "Availability zones",
    question: "Why would you spread your app across multiple availability zones within a region?",
    options: ["To lower the monthly bill", "To protect against a single datacenter failure", "To speed up code compilation", "To avoid needing a subscription"],
    correctIndex: 1,
    explanation: "Availability zones are separate datacenters within a region. Using several keeps your app running if one zone has a problem.",
  },
  {
    id: "q9", category: "Azure Architecture and Services", topic: "Virtual machines",
    question: "A company needs full control over the operating system and installed software of a server in Azure. Which service should they choose?",
    options: ["Azure Virtual Machines", "Azure Functions", "Azure Blob Storage", "Azure DNS"],
    correctIndex: 0,
    explanation: "Azure Virtual Machines are IaaS: you get a full server where you control the OS and software.",
  },
  {
    id: "q10", category: "Azure Architecture and Services", topic: "Serverless compute",
    question: "You want to run a small piece of code only when a file is uploaded, without managing any servers. Which option fits best?",
    options: ["A reserved virtual machine", "Azure Functions", "A dedicated host", "A virtual network gateway"],
    correctIndex: 1,
    explanation: "Azure Functions is serverless: code runs on events (like a file upload) and you pay only while it runs.",
  },
  {
    id: "q11", category: "Azure Management and Governance", topic: "Identity & security",
    question: "Which security practice requires users to confirm their identity with something extra, like a phone code, besides their password?",
    options: ["Single sign-on", "Multifactor authentication", "Role-based access control", "Encryption at rest"],
    correctIndex: 1,
    explanation: "Multifactor authentication (MFA) adds a second proof of identity, making stolen passwords much less useful to attackers.",
  },
  {
    id: "q12", category: "Azure Management and Governance", topic: "Governance & policy",
    question: "An organization wants to prevent anyone from creating resources outside approved regions. Which tool helps enforce this rule?",
    options: ["Azure Policy", "Azure Monitor", "Azure Advisor", "Azure Backup"],
    correctIndex: 0,
    explanation: "Azure Policy lets you define rules (like allowed regions) and automatically enforce or flag resources that break them.",
  },
];
