export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  dueDate: string;

  // ✅ Newly added fields from backend model
  status: "ACTIVE" | "COMPLETED" | "ARCHIVED";
  created_at: string; // ISO format e.g. "2025-06-14T09:00:00Z"
  updated_at: string; // ISO format

  owner: {
    id: string;
    email: string;
    avatar_url?: string;
    role: "ADMIN";
  };

  members: {
    name: string;
    role: string;
    email: string;
    status: "online" | "offline";
  }[];

  stats: {
    totalTasks: number;
    completedTasks: number;
    completionPercentage: number;
    timeRemaining: string;
    tasksTrend: number;
    membersTrend: number;
    completionTrend: number;
  };
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignee?: {
    name: string;
  };
}

export interface Activity {
  projectId: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "Website Redesign",
    description:
      "Complete overhaul of the company website with modern design and improved UX",
    icon: "🎨",
    color: "#8b5cf6",
    category: "design",
    dueDate: "2023-12-15",
    status: "ACTIVE",
    created_at: "2023-01-15T09:30:00Z",
    updated_at: "2023-11-27T14:45:00Z",
    owner: {
      id: "user-1",
      email: "john@example.com",
      avatar_url: "https://example.com/avatars/john.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "John Doe",
        role: "Project Manager",
        email: "john@example.com",
        status: "online",
      },
      {
        name: "Sarah Johnson",
        role: "UI Designer",
        email: "sarah@example.com",
        status: "offline",
      },
      {
        name: "Michael Brown",
        role: "Developer",
        email: "michael@example.com",
        status: "online",
      },
      {
        name: "Emily Davis",
        role: "Content Writer",
        email: "emily@example.com",
        status: "offline",
      },
    ],
    stats: {
      totalTasks: 24,
      completedTasks: 16,
      completionPercentage: 67,
      timeRemaining: "18 days",
      tasksTrend: 12,
      membersTrend: 5,
      completionTrend: 8,
    },
  },
  {
    id: "project-2",
    name: "Mobile App Development",
    description:
      "Building a cross-platform mobile application for customer engagement",
    icon: "📱",
    color: "#ec4899",
    category: "development",
    dueDate: "2024-01-30",
    status: "ACTIVE",
    created_at: "2023-03-10T11:15:00Z",
    updated_at: "2023-11-27T16:20:00Z",
    owner: {
      id: "user-1",
      email: "john@example.com",
      avatar_url: "https://example.com/avatars/john.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "John Doe",
        role: "Project Manager",
        email: "john@example.com",
        status: "online",
      },
      {
        name: "Alex Wilson",
        role: "Lead Developer",
        email: "alex@example.com",
        status: "online",
      },
      {
        name: "Lisa Chen",
        role: "UX Designer",
        email: "lisa@example.com",
        status: "offline",
      },
    ],
    stats: {
      totalTasks: 32,
      completedTasks: 8,
      completionPercentage: 25,
      timeRemaining: "64 days",
      tasksTrend: -3,
      membersTrend: 0,
      completionTrend: 5,
    },
  },
  {
    id: "project-3",
    name: "Marketing Campaign",
    description:
      "Q1 marketing campaign focused on product launch and brand awareness",
    icon: "📈",
    color: "#10b981",
    category: "marketing",
    dueDate: "2024-03-15",
    status: "ACTIVE",
    created_at: "2023-05-22T14:00:00Z",
    updated_at: "2023-11-25T10:30:00Z",
    owner: {
      id: "user-2",
      email: "emma@example.com",
      avatar_url: "https://example.com/avatars/emma.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "John Doe",
        role: "Project Manager",
        email: "john@example.com",
        status: "online",
      },
      {
        name: "Emma Thompson",
        role: "Marketing Lead",
        email: "emma@example.com",
        status: "online",
      },
      {
        name: "David Miller",
        role: "Content Strategist",
        email: "david@example.com",
        status: "offline",
      },
      {
        name: "Sophia Garcia",
        role: "Social Media Specialist",
        email: "sophia@example.com",
        status: "online",
      },
      {
        name: "James Wilson",
        role: "Graphic Designer",
        email: "james@example.com",
        status: "offline",
      },
    ],
    stats: {
      totalTasks: 18,
      completedTasks: 2,
      completionPercentage: 11,
      timeRemaining: "108 days",
      tasksTrend: 4,
      membersTrend: 2,
      completionTrend: -2,
    },
  },
  {
    id: "project-4",
    name: "Product Research",
    description:
      "Market research and competitor analysis for upcoming product features",
    icon: "🔍",
    color: "#f59e0b",
    category: "research",
    dueDate: "2024-02-28",
    status: "ACTIVE",
    created_at: "2023-06-05T13:45:00Z",
    updated_at: "2023-11-26T09:15:00Z",
    owner: {
      id: "user-3",
      email: "olivia@example.com",
      avatar_url: "https://example.com/avatars/olivia.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "John Doe",
        role: "Project Manager",
        email: "john@example.com",
        status: "online",
      },
      {
        name: "Robert Taylor",
        role: "Research Analyst",
        email: "robert@example.com",
        status: "offline",
      },
      {
        name: "Olivia Martin",
        role: "Data Scientist",
        email: "olivia@example.com",
        status: "online",
      },
    ],
    stats: {
      totalTasks: 15,
      completedTasks: 9,
      completionPercentage: 60,
      timeRemaining: "33 days",
      tasksTrend: 7,
      membersTrend: -1,
      completionTrend: 10,
    },
  },
  {
    id: "project-5",
    name: "Internal Tools Upgrade",
    description: "Modernization of internal systems and productivity tools",
    icon: "🛠️",
    color: "#3b82f6",
    category: "development",
    dueDate: "2023-12-31",
    status: "ACTIVE",
    created_at: "2023-02-18T08:00:00Z",
    updated_at: "2023-11-27T11:30:00Z",
    owner: {
      id: "user-4",
      email: "alex@example.com",
      avatar_url: "https://example.com/avatars/alex.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "Alex Wilson",
        role: "Tech Lead",
        email: "alex@example.com",
        status: "online",
      },
      {
        name: "Michael Brown",
        role: "Backend Developer",
        email: "michael@example.com",
        status: "online",
      },
      {
        name: "Lisa Chen",
        role: "Frontend Developer",
        email: "lisa@example.com",
        status: "online",
      },
      {
        name: "Daniel Kim",
        role: "DevOps Engineer",
        email: "daniel@example.com",
        status: "offline",
      },
    ],
    stats: {
      totalTasks: 42,
      completedTasks: 28,
      completionPercentage: 67,
      timeRemaining: "34 days",
      tasksTrend: 5,
      membersTrend: 0,
      completionTrend: 15,
    },
  },
  {
    id: "project-6",
    name: "Customer Portal",
    description: "Development of self-service portal for enterprise customers",
    icon: "🌐",
    color: "#6366f1",
    category: "development",
    dueDate: "2024-04-20",
    status: "ACTIVE",
    created_at: "2023-04-10T10:20:00Z",
    updated_at: "2023-11-24T15:10:00Z",
    owner: {
      id: "user-5",
      email: "sophia@example.com",
      avatar_url: "https://example.com/avatars/sophia.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "Sophia Garcia",
        role: "Product Owner",
        email: "sophia@example.com",
        status: "online",
      },
      {
        name: "Alex Wilson",
        role: "Architect",
        email: "alex@example.com",
        status: "online",
      },
      {
        name: "Emma Thompson",
        role: "UX Designer",
        email: "emma@example.com",
        status: "offline",
      },
      {
        name: "David Miller",
        role: "Technical Writer",
        email: "david@example.com",
        status: "online",
      },
    ],
    stats: {
      totalTasks: 56,
      completedTasks: 12,
      completionPercentage: 21,
      timeRemaining: "142 days",
      tasksTrend: 8,
      membersTrend: 3,
      completionTrend: 4,
    },
  },
  {
    id: "project-7",
    name: "Q4 Sales Report",
    description: "Compilation and analysis of Q4 sales performance",
    icon: "📊",
    color: "#f97316",
    category: "analytics",
    dueDate: "2024-01-15",
    status: "ACTIVE",
    created_at: "2023-10-01T09:00:00Z",
    updated_at: "2023-11-27T12:45:00Z",
    owner: {
      id: "user-6",
      email: "david@example.com",
      avatar_url: "https://example.com/avatars/david.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "David Miller",
        role: "Data Analyst",
        email: "david@example.com",
        status: "online",
      },
      {
        name: "Olivia Martin",
        role: "Data Engineer",
        email: "olivia@example.com",
        status: "online",
      },
      {
        name: "Robert Taylor",
        role: "Sales Manager",
        email: "robert@example.com",
        status: "offline",
      },
    ],
    stats: {
      totalTasks: 18,
      completedTasks: 6,
      completionPercentage: 33,
      timeRemaining: "49 days",
      tasksTrend: -2,
      membersTrend: 0,
      completionTrend: 10,
    },
  },
  {
    id: "project-8",
    name: "Employee Training Program",
    description:
      "Development of new employee onboarding and training materials",
    icon: "🎓",
    color: "#06b6d4",
    category: "hr",
    dueDate: "2024-02-10",
    status: "ACTIVE",
    created_at: "2023-07-15T13:30:00Z",
    updated_at: "2023-11-20T16:00:00Z",
    owner: {
      id: "user-7",
      email: "emily@example.com",
      avatar_url: "https://example.com/avatars/emily.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "Emily Davis",
        role: "HR Specialist",
        email: "emily@example.com",
        status: "offline",
      },
      {
        name: "James Wilson",
        role: "Instructional Designer",
        email: "james@example.com",
        status: "online",
      },
      {
        name: "Sarah Johnson",
        role: "Graphic Designer",
        email: "sarah@example.com",
        status: "online",
      },
    ],
    stats: {
      totalTasks: 27,
      completedTasks: 15,
      completionPercentage: 56,
      timeRemaining: "75 days",
      tasksTrend: 3,
      membersTrend: 1,
      completionTrend: 7,
    },
  },
  {
    id: "project-9",
    name: "Server Migration",
    description: "Migration of production servers to new cloud infrastructure",
    icon: "☁️",
    color: "#64748b",
    category: "operations",
    dueDate: "2023-12-05",
    status: "ACTIVE",
    created_at: "2023-09-01T07:45:00Z",
    updated_at: "2023-11-27T17:30:00Z",
    owner: {
      id: "user-8",
      email: "daniel@example.com",
      avatar_url: "https://example.com/avatars/daniel.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "Daniel Kim",
        role: "DevOps Lead",
        email: "daniel@example.com",
        status: "online",
      },
      {
        name: "Michael Brown",
        role: "Backend Developer",
        email: "michael@example.com",
        status: "online",
      },
      {
        name: "Lisa Chen",
        role: "Frontend Developer",
        email: "lisa@example.com",
        status: "offline",
      },
      {
        name: "Alex Wilson",
        role: "Architect",
        email: "alex@example.com",
        status: "online",
      },
    ],
    stats: {
      totalTasks: 38,
      completedTasks: 22,
      completionPercentage: 58,
      timeRemaining: "8 days",
      tasksTrend: 6,
      membersTrend: 0,
      completionTrend: 12,
    },
  },
  {
    id: "project-10",
    name: "Annual Conference",
    description: "Planning and execution of company annual conference event",
    icon: "🎤",
    color: "#d946ef",
    category: "events",
    dueDate: "2024-05-20",
    status: "ACTIVE",
    created_at: "2023-01-30T11:00:00Z",
    updated_at: "2023-11-25T14:20:00Z",
    owner: {
      id: "user-9",
      email: "sarah@example.com",
      avatar_url: "https://example.com/avatars/sarah.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "Sarah Johnson",
        role: "Event Coordinator",
        email: "sarah@example.com",
        status: "online",
      },
      {
        name: "Emma Thompson",
        role: "Marketing Lead",
        email: "emma@example.com",
        status: "offline",
      },
      {
        name: "James Wilson",
        role: "Design Lead",
        email: "james@example.com",
        status: "online",
      },
      {
        name: "David Miller",
        role: "Content Manager",
        email: "david@example.com",
        status: "online",
      },
      {
        name: "Sophia Garcia",
        role: "Social Media",
        email: "sophia@example.com",
        status: "offline",
      },
    ],
    stats: {
      totalTasks: 64,
      completedTasks: 18,
      completionPercentage: 28,
      timeRemaining: "175 days",
      tasksTrend: 10,
      membersTrend: 2,
      completionTrend: 5,
    },
  },
  {
    id: "project-11",
    name: "Security Audit",
    description: "Comprehensive security review and penetration testing",
    icon: "🔒",
    color: "#ef4444",
    category: "security",
    dueDate: "2024-01-10",
    status: "ACTIVE",
    created_at: "2023-08-15T14:30:00Z",
    updated_at: "2023-11-26T13:15:00Z",
    owner: {
      id: "user-10",
      email: "robert@example.com",
      avatar_url: "https://example.com/avatars/robert.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "Robert Taylor",
        role: "Security Lead",
        email: "robert@example.com",
        status: "offline",
      },
      {
        name: "Daniel Kim",
        role: "DevOps",
        email: "daniel@example.com",
        status: "online",
      },
      {
        name: "Alex Wilson",
        role: "Developer",
        email: "alex@example.com",
        status: "online",
      },
      {
        name: "Olivia Martin",
        role: "Data Analyst",
        email: "olivia@example.com",
        status: "offline",
      },
    ],
    stats: {
      totalTasks: 29,
      completedTasks: 7,
      completionPercentage: 24,
      timeRemaining: "44 days",
      tasksTrend: 4,
      membersTrend: 1,
      completionTrend: 3,
    },
  },
  {
    id: "project-12",
    name: "Product Launch 2024",
    description: "Cross-functional project for launching our flagship product",
    icon: "🚀",
    color: "#14b8a6",
    category: "product",
    dueDate: "2024-06-01",
    status: "ACTIVE",
    created_at: "2023-03-01T10:00:00Z",
    updated_at: "2023-11-27T09:45:00Z",
    owner: {
      id: "user-1",
      email: "john@example.com",
      avatar_url: "https://example.com/avatars/john.jpg",
      role: "ADMIN",
    },
    members: [
      {
        name: "John Doe",
        role: "Program Manager",
        email: "john@example.com",
        status: "online",
      },
      {
        name: "Emma Thompson",
        role: "Marketing",
        email: "emma@example.com",
        status: "online",
      },
      {
        name: "Alex Wilson",
        role: "Engineering",
        email: "alex@example.com",
        status: "online",
      },
      {
        name: "Sarah Johnson",
        role: "Design",
        email: "sarah@example.com",
        status: "offline",
      },
      {
        name: "David Miller",
        role: "Content",
        email: "david@example.com",
        status: "online",
      },
      {
        name: "Sophia Garcia",
        role: "Social Media",
        email: "sophia@example.com",
        status: "offline",
      },
    ],
    stats: {
      totalTasks: 87,
      completedTasks: 23,
      completionPercentage: 26,
      timeRemaining: "186 days",
      tasksTrend: 15,
      membersTrend: 3,
      completionTrend: 7,
    },
  },
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    projectId: "project-1",
    title: "Design homepage wireframes",
    description: "Create wireframes for the new homepage design",
    status: "completed",
    priority: "high",
    dueDate: "Nov 10",
    assignee: {
      name: "Sarah Johnson",
    },
  },
  {
    id: "task-2",
    projectId: "project-1",
    title: "Implement responsive navigation",
    description: "Develop responsive navigation menu for all device sizes",
    status: "in-progress",
    priority: "medium",
    dueDate: "Nov 15",
    assignee: {
      name: "Michael Brown",
    },
  },
  {
    id: "task-3",
    projectId: "project-1",
    title: "Write content for about page",
    description: "Create compelling content for the about us section",
    status: "todo",
    priority: "medium",
    dueDate: "Nov 18",
    assignee: {
      name: "Emily Davis",
    },
  },
  {
    id: "task-4",
    projectId: "project-1",
    title: "Design product showcase section",
    description: "Create visuals for the product showcase carousel",
    status: "review",
    priority: "high",
    dueDate: "Nov 20",
    assignee: {
      name: "Sarah Johnson",
    },
  },
  {
    id: "task-5",
    projectId: "project-1",
    title: "Optimize images for web",
    description: "Compress and optimize all images for faster loading",
    status: "todo",
    priority: "low",
    dueDate: "Nov 22",
    assignee: {
      name: "John Doe",
    },
  },
  {
    id: "task-6",
    projectId: "project-1",
    title: "Implement contact form",
    description: "Create and style the contact form with validation",
    status: "todo",
    priority: "medium",
    dueDate: "Nov 25",
    assignee: {
      name: "Michael Brown",
    },
  },
  {
    id: "task-7",
    projectId: "project-1",
    title: "SEO optimization",
    description: "Implement SEO best practices across the website",
    status: "todo",
    priority: "high",
    dueDate: "Nov 28",
  },
  {
    id: "task-8",
    projectId: "project-2",
    title: "Design app wireframes",
    description: "Create wireframes for all main app screens",
    status: "completed",
    priority: "high",
    dueDate: "Nov 5",
    assignee: {
      name: "Lisa Chen",
    },
  },
  {
    id: "task-9",
    projectId: "project-2",
    title: "Develop authentication system",
    description: "Implement secure user authentication and authorization",
    status: "in-progress",
    priority: "high",
    dueDate: "Nov 15",
    assignee: {
      name: "Alex Wilson",
    },
  },
  {
    id: "task-10",
    projectId: "project-2",
    title: "Create user profile screens",
    description: "Design and implement user profile functionality",
    status: "todo",
    priority: "medium",
    dueDate: "Nov 25",
    assignee: {
      name: "John Doe",
    },
  },
  {
    id: "task-11",
    projectId: "project-3",
    title: "Define campaign goals",
    description: "Set clear objectives and KPIs for the marketing campaign",
    status: "completed",
    priority: "high",
    dueDate: "Nov 5",
    assignee: {
      name: "Emma Thompson",
    },
  },
  {
    id: "task-12",
    projectId: "project-3",
    title: "Create social media content calendar",
    description: "Plan out social media posts for the campaign duration",
    status: "in-progress",
    priority: "medium",
    dueDate: "Nov 12",
    assignee: {
      name: "Sophia Garcia",
    },
  },
  {
    id: "task-13",
    projectId: "project-4",
    title: "Conduct user interviews",
    description: "Interview 10 target users for product feedback",
    status: "in-progress",
    priority: "high",
    dueDate: "Nov 18",
    assignee: {
      name: "Robert Taylor",
    },
  },
  {
    id: "task-14",
    projectId: "project-4",
    title: "Analyze competitor features",
    description: "Create a detailed analysis of competitor product features",
    status: "completed",
    priority: "medium",
    dueDate: "Nov 8",
    assignee: {
      name: "Olivia Martin",
    },
  },
];

export const mockActivities: Activity[] = [
  {
    projectId: "project-1",
    user: "Sarah Johnson",
    action: "completed task",
    target: "Design homepage wireframes",
    time: "2 hours ago",
  },
  {
    projectId: "project-1",
    user: "Michael Brown",
    action: "started working on",
    target: "Implement responsive navigation",
    time: "4 hours ago",
  },
  {
    projectId: "project-1",
    user: "John Doe",
    action: "added",
    target: "SEO optimization task",
    time: "Yesterday at 3:45 PM",
  },
  {
    projectId: "project-1",
    user: "Emily Davis",
    action: "commented on",
    target: "Write content for about page",
    time: "Yesterday at 1:30 PM",
  },
  {
    projectId: "project-1",
    user: "Sarah Johnson",
    action: "uploaded new designs for",
    target: "Product showcase section",
    time: "2 days ago",
  },
  {
    projectId: "project-2",
    user: "Alex Wilson",
    action: "started working on",
    target: "Develop authentication system",
    time: "3 hours ago",
  },
  {
    projectId: "project-2",
    user: "Lisa Chen",
    action: "completed",
    target: "Design app wireframes",
    time: "Yesterday at 5:20 PM",
  },
  {
    projectId: "project-3",
    user: "Emma Thompson",
    action: "completed",
    target: "Define campaign goals",
    time: "2 days ago",
  },
  {
    projectId: "project-3",
    user: "Sophia Garcia",
    action: "started working on",
    target: "Create social media content calendar",
    time: "Yesterday at 10:15 AM",
  },
  {
    projectId: "project-4",
    user: "Robert Taylor",
    action: "started",
    target: "Conduct user interviews",
    time: "5 hours ago",
  },
  {
    projectId: "project-4",
    user: "Olivia Martin",
    action: "completed",
    target: "Analyze competitor features",
    time: "Yesterday at 4:30 PM",
  },
];
