"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Send,
  Bot,
  MessageSquare,
  Activity,
  Star,
  Share2,
  TrendingUp,
  Building,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data for agents (same as dashboard)
const allAgents = [
  // LifeBot Agents
  {
    id: "sales-hub",
    type: "lifebot",
    title: "Sales Hub",
    description: "6 apps",
    fullDescription:
      "Comprehensive sales automation platform that streamlines your entire sales process from lead generation to deal closure. Includes CRM integration, email automation, pipeline management, and advanced analytics.",
    icon: TrendingUp,
    gradient: "from-blue-500 to-purple-600",
    category: "revenue",
    industry: "finance",
    function: "sales",
    tags: ["sales", "revenue", "crm", "analytics"],
    creator: "LifeBot Team",
    features: [
      "Lead Scoring",
      "Email Automation",
      "Pipeline Management",
      "Sales Analytics",
      "CRM Integration",
      "Deal Tracking",
    ],
    useCases: ["B2B Sales", "Lead Nurturing", "Sales Forecasting", "Team Performance"],
  },
  {
    id: "banking-insurance-hub",
    type: "lifebot",
    title: "Banking & Insurance Hub",
    description: "8 apps",
    fullDescription:
      "Specialized AI agent for banking and insurance operations, providing customer service automation, risk assessment, and compliance monitoring.",
    icon: Building,
    gradient: "from-green-500 to-blue-600",
    category: "customer",
    industry: "finance",
    function: "support",
    tags: ["banking", "insurance", "finance", "customer service"],
    creator: "LifeBot Team",
    features: [
      "Risk Assessment",
      "Compliance Monitoring",
      "Customer Support",
      "Document Processing",
      "Fraud Detection",
      "Policy Management",
    ],
    useCases: ["Customer Onboarding", "Claims Processing", "Risk Analysis", "Regulatory Compliance"],
  },
  // Community Agents
  {
    id: "linkedin-post-generator",
    type: "community",
    name: "LinkedIn Post Generator",
    description: "Create engaging LinkedIn posts with AI",
    fullDescription:
      "AI-powered tool that helps professionals create compelling LinkedIn content. Analyzes trending topics, suggests optimal posting times, and generates engaging posts tailored to your industry and audience.",
    tags: ["Productivity", "Marketing"],
    emoji: "📝",
    category: "productivity",
    industry: "technology",
    function: "marketing",
    creator: "Sarah Chen",
    features: [
      "Content Generation",
      "Trend Analysis",
      "Engagement Optimization",
      "Hashtag Suggestions",
      "Post Scheduling",
      "Performance Analytics",
    ],
    useCases: ["Personal Branding", "Thought Leadership", "Company Updates", "Industry Insights"],
  },
  {
    id: "healthcare-assistant",
    type: "community",
    name: "Healthcare Assistant",
    description: "Medical information and appointment scheduling",
    fullDescription:
      "Intelligent healthcare assistant that provides medical information, schedules appointments, and helps patients manage their health records and medication schedules.",
    tags: ["Healthcare", "Productivity"],
    emoji: "🏥",
    category: "customer",
    industry: "healthcare",
    function: "support",
    creator: "Dr. Michael Rodriguez",
    features: [
      "Appointment Scheduling",
      "Medication Reminders",
      "Health Records",
      "Symptom Checker",
      "Doctor Finder",
      "Insurance Verification",
    ],
    useCases: ["Patient Care", "Appointment Management", "Health Monitoring", "Medical Consultations"],
  },
]

export default function AgentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Array<{ type: "user" | "agent"; content: string; timestamp: Date }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("response")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const agent = allAgents.find((a) => a.id === params.id)

  useEffect(() => {
    if (!agent) {
      router.push("/")
    }
  }, [agent, router])

  if (!agent) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const userMessage = { type: "user" as const, content: query, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setQuery("")

    // Simulate AI response
    setTimeout(() => {
      const agentResponse = {
        type: "agent" as const,
        content: `Thank you for your question about "${query}". As ${
          agent.type === "lifebot" ? agent.title : agent.name
        }, I can help you with that. This is a simulated response demonstrating the agent's capabilities in ${agent.function} and ${agent.category}.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentResponse])
      setIsLoading(false)
    }, 1500)
  }

  const IconComponent = agent.type === "lifebot" ? agent.icon : null

  return (
    <div className="min-h-screen relative overflow-hidden max-w-full">
      {/* New Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-violet-800 to-fuchsia-900 overflow-hidden">
        {/* Animated wave shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[10%] left-[5%] w-[80%] h-[60%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 blur-3xl animate-wave"></div>
          <div className="absolute top-[30%] right-[10%] w-[70%] h-[50%] rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-600 blur-3xl animate-wave delay-1000"></div>
          <div className="absolute bottom-[5%] left-[20%] w-[60%] h-[40%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 blur-3xl animate-float-slow"></div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-[15%] left-[10%] w-24 h-24 rounded-full bg-blue-500/30 blur-xl animate-pulse"></div>
        <div className="absolute top-[40%] right-[15%] w-32 h-32 rounded-full bg-purple-500/30 blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-[20%] left-[30%] w-28 h-28 rounded-full bg-pink-500/30 blur-xl animate-pulse delay-1500"></div>

        {/* Rotating gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-fuchsia-500/10 animate-rotate-slow"></div>

        {/* Mesh pattern overlay */}
        <div className="absolute inset-0 bg-mesh opacity-20"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-white">LifeBot</span>
              </div>

              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => router.push("/")}
                  className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                >
                  Home
                </button>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                  Agents
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                  About Us
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                  Contact Us
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                  Pricing
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                  Documentation
                </a>
              </nav>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/")}
                  className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="hidden lg:flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                  >
                    Get Started
                  </Button>
                </div>

                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-xl border-b border-white/20">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => router.push("/")}
                className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2 w-full text-left"
              >
                Home
              </button>
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                Agents
              </a>
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                Pricing
              </a>
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                Documentation
              </a>
              <div className="pt-4 border-t border-white/20 space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/")}
                  className="w-full text-white/70 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <Button variant="ghost" size="sm" className="w-full text-white/80 hover:text-white hover:bg-white/10">
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex">
          {/* Left Panel - Agent Info & Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-6 overflow-hidden">
              {/* Agent Header */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {agent.type === "lifebot" && IconComponent ? (
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${agent.gradient} shadow-lg`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      ) : (
                        <div className="text-5xl">{agent.emoji}</div>
                      )}
                      <div>
                        <div className="text-sm text-white/60 mb-1">
                          Powered by{" "}
                          <span className="text-blue-300 font-medium">
                            {agent.type === "lifebot" ? "LifeBot Agent Studio" : "Community"}
                          </span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                          {agent.type === "lifebot" ? agent.title : agent.name}
                        </h1>
                        <p className="text-white/80 text-lg mb-3">{agent.fullDescription}</p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>Created by {agent.creator}</span>
                          <div className="flex gap-2">
                            {agent.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="border-white/30 text-white/80 bg-white/5">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Interface */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex-1 overflow-hidden">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex-1 mb-4">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-white/60">
                        <div className="text-center">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Start by submitting a query...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === "user"
                                  ? "bg-blue-500/20 text-white border border-blue-400/30"
                                  : "bg-white/10 text-white border border-white/20"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-60 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-white/10 text-white border border-white/20 p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Query Input */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                      placeholder="Ask your query..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 resize-none"
                      rows={3}
                    />
                    <Button
                      type="submit"
                      disabled={!query.trim() || isLoading}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - Response & Activity */}
          <div className="w-80 border-l border-white/20 bg-white/5 backdrop-blur-sm">
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
                  <TabsTrigger value="response" className="text-white data-[state=active]:bg-white/20">
                    Response
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="text-white data-[state=active]:bg-white/20">
                    Activity
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="response" className="mt-6">
                  <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
                    <CardContent className="p-4">
                      <h3 className="text-white font-semibold mb-3">Features</h3>
                      <div className="space-y-2">
                        {agent.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-xl border border-white/20 mt-4">
                    <CardContent className="p-4">
                      <h3 className="text-white font-semibold mb-3">Use Cases</h3>
                      <div className="space-y-2">
                        {agent.useCases.map((useCase, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-white/30 text-white/80 bg-white/5 mr-2 mb-2"
                          >
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                  <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
                    <CardContent className="p-4">
                      <h3 className="text-white font-semibold mb-3">Recent Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-blue-500 text-white text-xs">
                              {agent.creator
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-white/80">
                            <span className="font-medium">{agent.creator}</span> updated the agent
                            <div className="text-xs text-white/60">2 hours ago</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Activity className="w-3 h-3 text-green-400" />
                          </div>
                          <div className="text-white/80">
                            Agent performance improved
                            <div className="text-xs text-white/60">1 day ago</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Star className="w-3 h-3 text-blue-400" />
                          </div>
                          <div className="text-white/80">
                            Received 5-star rating
                            <div className="text-xs text-white/60">3 days ago</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
