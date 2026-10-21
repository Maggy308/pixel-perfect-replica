export type Category =
  | "Cloud Concepts"
  | "Azure Architecture and Services"
  | "Azure Management and Governance";

export type Difficulty = "Beginner" | "Intermediate";
export const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate"];

export interface Question {
  id: string;
  difficulty: Difficulty;
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
    id: "q1", difficulty: "Beginner", category: "Cloud Concepts", topic: "Cloud computing basics",
    question: "A small bakery wants to stop buying its own servers and instead rent computing power over the internet, paying only for what it uses. What is this approach called?",
    options: ["On-premises hosting", "Cloud computing", "Edge caching", "Local virtualization"],
    correctIndex: 1,
    explanation: "Cloud computing means renting compute, storage, and other services over the internet from a provider, usually paying only for what you use.",
  },
  {
    id: "q2", difficulty: "Intermediate", category: "Cloud Concepts", topic: "Cloud service models",
    question: "Your team wants to deploy a web app without managing the operating system or patching servers, but still write their own code. Which service model fits best?",
    options: ["Infrastructure as a Service (IaaS)", "Software as a Service (SaaS)", "Platform as a Service (PaaS)", "On-premises"],
    correctIndex: 2,
    explanation: "With PaaS, the provider manages the OS and infrastructure. You focus on your application code and data.",
  },
  {
    id: "q3", difficulty: "Beginner", category: "Cloud Concepts", topic: "Cloud service models",
    question: "Which of these is the best example of Software as a Service (SaaS)?",
    options: ["Renting a virtual machine", "Using a hosted email service in your browser", "Deploying code to a managed app platform", "Buying a physical server rack"],
    correctIndex: 1,
    explanation: "SaaS delivers a finished application you simply use, like web-based email. The provider manages everything behind it.",
  },
  {
    id: "q4", difficulty: "Beginner", category: "Cloud Concepts", topic: "Scalability",
    question: "An online shop automatically adds more servers during a holiday sale and removes them afterwards. Which cloud benefit does this show?",
    options: ["Elasticity", "Fault tolerance", "Governance", "Data sovereignty"],
    correctIndex: 0,
    explanation: "Elasticity means resources grow and shrink automatically to match demand, so you don't pay for idle capacity.",
  },
  {
    id: "q5", difficulty: "Intermediate", category: "Cloud Concepts", topic: "Scalability",
    question: "Upgrading a single virtual machine to have more CPU and memory is an example of what?",
    options: ["Scaling out (horizontal)", "Scaling up (vertical)", "Load balancing", "Geo-replication"],
    correctIndex: 1,
    explanation: "Scaling up (vertical scaling) adds power to an existing machine. Scaling out adds more machines instead.",
  },
  {
    id: "q6", difficulty: "Intermediate", category: "Cloud Concepts", topic: "Shared responsibility & security",
    question: "In the shared responsibility model, which item is ALWAYS the customer's responsibility, no matter the service model?",
    options: ["Physical datacenter security", "Their own data and user accounts", "Host operating system patches", "Network cabling"],
    correctIndex: 1,
    explanation: "The cloud provider handles the physical side. Customers always remain responsible for their data, devices, and who has access to their accounts.",
  },
  {
    id: "q7", difficulty: "Beginner", category: "Azure Architecture and Services", topic: "Azure regions",
    question: "What is an Azure region?",
    options: ["A single server rack", "A geographic area containing one or more datacenters", "A billing account", "A type of virtual network"],
    correctIndex: 1,
    explanation: "A region is a geographic area with one or more datacenters close together and connected by a fast network.",
  },
  {
    id: "q8", difficulty: "Intermediate", category: "Azure Architecture and Services", topic: "Availability zones",
    question: "Why would you spread your app across multiple availability zones within a region?",
    options: ["To lower the monthly bill", "To protect against a single datacenter failure", "To speed up code compilation", "To avoid needing a subscription"],
    correctIndex: 1,
    explanation: "Availability zones are separate datacenters within a region. Using several keeps your app running if one zone has a problem.",
  },
  {
    id: "q9", difficulty: "Beginner", category: "Azure Architecture and Services", topic: "Virtual machines",
    question: "A company needs full control over the operating system and installed software of a server in Azure. Which service should they choose?",
    options: ["Azure Virtual Machines", "Azure Functions", "Azure Blob Storage", "Azure DNS"],
    correctIndex: 0,
    explanation: "Azure Virtual Machines are IaaS: you get a full server where you control the OS and software.",
  },
  {
    id: "q10", difficulty: "Intermediate", category: "Azure Architecture and Services", topic: "Serverless compute",
    question: "You want to run a small piece of code only when a file is uploaded, without managing any servers. Which option fits best?",
    options: ["A reserved virtual machine", "Azure Functions", "A dedicated host", "A virtual network gateway"],
    correctIndex: 1,
    explanation: "Azure Functions is serverless: code runs on events (like a file upload) and you pay only while it runs.",
  },
  {
    id: "q11", difficulty: "Beginner", category: "Azure Management and Governance", topic: "Identity & security",
    question: "Which security practice requires users to confirm their identity with something extra, like a phone code, besides their password?",
    options: ["Single sign-on", "Multifactor authentication", "Role-based access control", "Encryption at rest"],
    correctIndex: 1,
    explanation: "Multifactor authentication (MFA) adds a second proof of identity, making stolen passwords much less useful to attackers.",
  },
  {
    id: "q12", difficulty: "Intermediate", category: "Azure Management and Governance", topic: "Governance & policy",
    question: "An organization wants to prevent anyone from creating resources outside approved regions. Which tool helps enforce this rule?",
    options: ["Azure Policy", "Azure Monitor", "Azure Advisor", "Azure Backup"],
    correctIndex: 0,
    explanation: "Azure Policy lets you define rules (like allowed regions) and automatically enforce or flag resources that break them.",
  },
  {
    id: "q13", difficulty: "Beginner", category: "Cloud Concepts", topic: "Cloud deployment models",
    question: "A startup runs all of its apps on servers owned and operated by a cloud provider and shared with other customers. Which deployment model is this?",
    options: ["Private cloud", "Public cloud", "Hybrid cloud", "Community datacenter"],
    correctIndex: 1,
    explanation: "In a public cloud, the provider owns the hardware and many customers share it. You just use the services over the internet.",
  },
  {
    id: "q14", difficulty: "Intermediate", category: "Cloud Concepts", topic: "Cloud deployment models",
    question: "A hospital keeps sensitive patient records in its own datacenter but uses a cloud provider for its public website. Which deployment model is this?",
    options: ["Public cloud", "Private cloud", "Hybrid cloud", "Multi-region cloud"],
    correctIndex: 2,
    explanation: "Hybrid cloud combines private (your own) infrastructure with public cloud, letting you choose where each workload runs.",
  },
  {
    id: "q15", difficulty: "Beginner", category: "Azure Architecture and Services", topic: "Storage",
    question: "Which Azure service is designed to store large amounts of unstructured data such as photos, videos, and backups?",
    options: ["Azure Blob Storage", "Azure Virtual Network", "Azure Policy", "Azure Functions"],
    correctIndex: 0,
    explanation: "Blob Storage holds unstructured data (\"blobs\") like images, video, and backup files at massive scale.",
  },
  {
    id: "q16", difficulty: "Intermediate", category: "Azure Architecture and Services", topic: "Storage redundancy",
    question: "You want your stored data copied to a second region far away, so it survives a regional outage. Which redundancy option fits?",
    options: ["Locally redundant storage (LRS)", "Zone-redundant storage (ZRS)", "Geo-redundant storage (GRS)", "No redundancy"],
    correctIndex: 2,
    explanation: "GRS replicates data to a paired secondary region. LRS keeps copies in one datacenter; ZRS spreads them across zones in one region.",
  },
  {
    id: "q17", difficulty: "Beginner", category: "Azure Architecture and Services", topic: "Networking",
    question: "Which Azure service lets your Azure resources, like virtual machines, communicate privately with each other?",
    options: ["Azure Virtual Network", "Azure Blob Storage", "Azure Advisor", "Azure Cost Management"],
    correctIndex: 0,
    explanation: "An Azure Virtual Network (VNet) is your private network in Azure, letting resources talk securely to each other.",
  },
  {
    id: "q18", difficulty: "Intermediate", category: "Azure Architecture and Services", topic: "Networking",
    question: "A company wants an encrypted connection over the public internet between its office network and its Azure virtual network. What should it use?",
    options: ["Azure DNS", "VPN Gateway", "Azure Blob Storage", "Resource locks"],
    correctIndex: 1,
    explanation: "A VPN Gateway sends encrypted traffic over the internet between your on-premises network and Azure.",
  },
  {
    id: "q19", difficulty: "Beginner", category: "Azure Management and Governance", topic: "Cost management",
    question: "Before moving to Azure, a team wants to estimate the monthly cost of the services they plan to use. Which tool helps?",
    options: ["Azure Pricing Calculator", "Azure Monitor", "Azure Policy", "Azure Bastion"],
    correctIndex: 0,
    explanation: "The Pricing Calculator lets you pick services and settings to estimate costs before you deploy anything.",
  },
  {
    id: "q20", difficulty: "Intermediate", category: "Azure Management and Governance", topic: "Cost management",
    question: "A finance team wants to get an alert when Azure spending reaches 80% of a monthly limit. What should they configure?",
    options: ["A resource lock", "A budget in Cost Management", "An availability zone", "A virtual network"],
    correctIndex: 1,
    explanation: "Budgets in Azure Cost Management track spending and send alerts when costs hit thresholds you set.",
  },
  {
    id: "q21", difficulty: "Beginner", category: "Azure Management and Governance", topic: "Resource organization",
    question: "What is an Azure resource group?",
    options: ["A team of Azure support engineers", "A logical container that holds related resources", "A physical datacenter", "A type of storage account"],
    correctIndex: 1,
    explanation: "A resource group is a logical folder for related resources, so you can manage, secure, and delete them together.",
  },
  {
    id: "q22", difficulty: "Intermediate", category: "Azure Management and Governance", topic: "Identity & security",
    question: "You want a support team to view and restart virtual machines but not delete them. Which feature gives this fine-grained permission?",
    options: ["Azure role-based access control (RBAC)", "Geo-redundant storage", "Azure Pricing Calculator", "Availability zones"],
    correctIndex: 0,
    explanation: "RBAC assigns roles with specific permissions to users or groups, following the principle of least privilege.",
  },
  {
    id: "q23", difficulty: "Beginner", category: "Azure Management and Governance", topic: "Resource organization",
    question: "A company wants to label resources with information like \"Department: Marketing\" to track costs. What should it use?",
    options: ["Tags", "Resource locks", "Availability sets", "VPN Gateway"],
    correctIndex: 0,
    explanation: "Tags are name/value labels on resources. They help organize resources and group costs in billing reports.",
  },
  {
    id: "q24", difficulty: "Intermediate", category: "Azure Management and Governance", topic: "Governance & policy",
    question: "An admin wants to stop anyone from accidentally deleting a critical production database, even users with full permissions. What should they apply?",
    options: ["A tag", "A resource lock (CanNotDelete)", "A budget alert", "Azure Advisor"],
    correctIndex: 1,
    explanation: "A CanNotDelete resource lock blocks deletion until the lock is removed, protecting key resources from mistakes.",
  },
];
