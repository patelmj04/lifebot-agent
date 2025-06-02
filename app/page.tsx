"use client"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { Search, Bot, TrendingUp, Users, Heart, Building, Sparkles, Filter, Loader2, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Generate more agents for demonstration purposes
const generateMoreLifebotAgents = (count = 20) => {
  const baseAgents = [
    {
      title: "Sales Hub",
      description: "6 apps",
      icon: TrendingUp,
      gradient: "from-blue-500 to-purple-600",
      category: "revenue",
      industry: "finance",
      function: "sales",
      tags: ["sales", "revenue", "crm", "analytics"],
    },
    {
      title: "Banking & Insurance Hub",
      description: "8 apps",
      icon: Building,
      gradient: "from-green-500 to-blue-600",
      category: "customer",
      industry: "finance",
      function: "support",
      tags: ["banking", "insurance", "finance", "customer service"],
    },
    {
      title: "Marketing Hub",
      description: "12 apps",
      icon: Sparkles,
      gradient: "from-pink-500 to-orange-500",
      category: "revenue",
      industry: "technology",
      function: "marketing",
      tags: ["marketing", "campaigns", "social media", "analytics"],
    },
    {
      title: "Customer Service Hub",
      description: "5 apps",
      icon: Heart,
      gradient: "from-purple-500 to-pink-500",
      category: "customer",
      industry: "retail",
      function: "support",
      tags: ["customer service", "support", "chat", "helpdesk"],
    },
    {
      title: "Analytics Hub",
      description: "7 apps",
      gradient: "from-cyan-500 to-blue-500",
      icon: TrendingUp,
      category: "productivity",
      industry: "technology",
      function: "analytics",
      tags: ["analytics", "data", "insights", "reporting"],
    },
  ]

  const industries = ["finance", "healthcare", "technology", "retail", "education", "manufacturing"]
  const functions = ["sales", "marketing", "support", "analytics", "operations", "development"]
  const categories = ["productivity", "revenue", "customer"]
  const gradients = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-blue-600",
    "from-pink-500 to-orange-500",
    "from-purple-500 to-pink-500",
    "from-cyan-500 to-blue-500",
    "from-yellow-500 to-orange-600",
    "from-indigo-500 to-blue-600",
  ]
  const icons = [TrendingUp, Building, Sparkles, Heart]
  const tagSets = [
    ["analytics", "data", "insights", "reporting"],
    ["sales", "revenue", "crm", "analytics"],
    ["marketing", "campaigns", "social media", "analytics"],
    ["customer service", "support", "chat", "helpdesk"],
    ["productivity", "workflow", "automation", "tools"],
    ["development", "code", "api", "integration"],
  ]

  const result = [...baseAgents]

  for (let i = 0; i < count; i++) {
    const randomIcon = icons[Math.floor(Math.random() * icons.length)]
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]
    const randomIndustry = industries[Math.floor(Math.random() * industries.length)]
    const randomFunction = functions[Math.floor(Math.random() * functions.length)]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomTags = tagSets[Math.floor(Math.random() * tagSets.length)]

    result.push({
      title: `${randomIndustry.charAt(0).toUpperCase() + randomIndustry.slice(1)} ${
        Math.random() > 0.5 ? "Hub" : "Suite"
      } ${i + 1}`,
      description: `${Math.floor(Math.random() * 15) + 3} apps`,
      icon: randomIcon,
      gradient: randomGradient,
      category: randomCategory,
      industry: randomIndustry,
      function: randomFunction,
      tags: randomTags,
    })
  }

  return result
}

const generateMoreCommunityAgents = (count = 30) => {
  const baseAgents = [
    {
      name: "LinkedIn Post Generator",
      description: "Create engaging LinkedIn posts with AI",
      tags: ["Productivity", "Marketing"],
      emoji: "📝",
      category: "productivity",
      industry: "technology",
      function: "marketing",
    },
    {
      name: "Healthcare Assistant",
      description: "Medical information and appointment scheduling",
      tags: ["Healthcare", "Productivity"],
      emoji: "🏥",
      category: "customer",
      industry: "healthcare",
      function: "support",
    },
    {
      name: "Code Review Bot",
      description: "Automated code analysis and suggestions",
      tags: ["Technology", "Development"],
      emoji: "💻",
      category: "productivity",
      industry: "technology",
      function: "analytics",
    },
    {
      name: "Financial Advisor",
      description: "Personal finance management and advice",
      tags: ["Finance", "Planning"],
      emoji: "💰",
      category: "revenue",
      industry: "finance",
      function: "analytics",
    },
    {
      name: "Content Creator",
      description: "Generate blog posts and social media content",
      tags: ["Marketing", "Creativity"],
      emoji: "✨",
      category: "revenue",
      industry: "technology",
      function: "marketing",
    },
    {
      name: "Travel Planner",
      description: "Plan trips and find the best deals",
      tags: ["Travel", "Productivity"],
      emoji: "✈️",
      category: "productivity",
      industry: "retail",
      function: "sales",
    },
    {
      name: "Language Tutor",
      description: "Learn languages with personalized lessons",
      tags: ["Education", "Language"],
      emoji: "🗣️",
      category: "productivity",
      industry: "technology",
      function: "support",
    },
    {
      name: "Recipe Generator",
      description: "Create recipes based on available ingredients",
      tags: ["Food", "Lifestyle"],
      emoji: "👨‍🍳",
      category: "productivity",
      industry: "retail",
      function: "support",
    },
  ]

  const industries = ["finance", "healthcare", "technology", "retail", "education", "manufacturing"]
  const functions = ["sales", "marketing", "support", "analytics", "operations", "development"]
  const categories = ["productivity", "revenue", "customer"]
  const emojis = ["🤖", "🧠", "📊", "📈", "🔍", "📱", "💡", "🔧", "🎯", "🚀", "⚙️", "📝", "🏆", "🔔", "📚", "🎨"]
  const tagPairs = [
    ["AI", "Automation"],
    ["Productivity", "Workflow"],
    ["Finance", "Planning"],
    ["Marketing", "Social Media"],
    ["Healthcare", "Wellness"],
    ["Education", "Learning"],
    ["Technology", "Innovation"],
    ["Sales", "CRM"],
    ["Analytics", "Reporting"],
    ["Customer Service", "Support"],
  ]
  const namePrefix = [
    "Smart",
    "AI",
    "Intelligent",
    "Auto",
    "Quick",
    "Pro",
    "Advanced",
    "Easy",
    "Power",
    "Ultra",
    "Super",
    "Hyper",
  ]
  const nameSuffix = [
    "Assistant",
    "Bot",
    "Helper",
    "Agent",
    "Companion",
    "Tool",
    "Wizard",
    "Genius",
    "Expert",
    "Master",
    "Pro",
    "Guru",
  ]
  const nameMiddle = [
    "Email",
    "Document",
    "Meeting",
    "Task",
    "Project",
    "Calendar",
    "Chat",
    "Data",
    "Content",
    "Social",
    "Video",
    "Image",
    "Code",
    "Finance",
    "Health",
  ]

  const result = [...baseAgents]

  for (let i = 0; i < count; i++) {
    const randomIndustry = industries[Math.floor(Math.random() * industries.length)]
    const randomFunction = functions[Math.floor(Math.random() * functions.length)]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
    const randomTags = tagPairs[Math.floor(Math.random() * tagPairs.length)]
    const randomPrefix = namePrefix[Math.floor(Math.random() * namePrefix.length)]
    const randomMiddle = nameMiddle[Math.floor(Math.random() * nameMiddle.length)]
    const randomSuffix = nameSuffix[Math.floor(Math.random() * nameSuffix.length)]

    result.push({
      name: `${randomPrefix} ${randomMiddle} ${randomSuffix}`,
      description: `AI-powered ${randomMiddle.toLowerCase()} ${
        Math.random() > 0.5 ? "automation" : "management"
      } for ${randomIndustry} professionals`,
      tags: randomTags,
      emoji: randomEmoji,
      category: randomCategory,
      industry: randomIndustry,
      function: randomFunction,
    })
  }

  return result
}

// Generate large datasets
const lifebotAgents = generateMoreLifebotAgents(50)
const communityAgents = generateMoreCommunityAgents(100)

// Constants for infinite scroll
const ITEMS_PER_PAGE = 8
const SCROLL_THRESHOLD = 300 // px from bottom to trigger loading more

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedFunction, setSelectedFunction] = useState("all")
  const [selectedAgentType, setSelectedAgentType] = useState("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Pagination state
  const [lifebotPage, setLifebotPage] = useState(1)
  const [communityPage, setCommunityPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMoreLifebot, setHasMoreLifebot] = useState(true)
  const [hasMoreCommunity, setHasMoreCommunity] = useState(true)

  // Refs for infinite scroll
  const lifebotLoaderRef = useRef(null)
  const communityLoaderRef = useRef(null)

  // Filter all agents
  const filteredLifebotAgents = useMemo(() => {
    return lifebotAgents.filter((agent) => {
      const matchesSearch =
        agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory
      const matchesIndustry = selectedIndustry === "all" || agent.industry === selectedIndustry
      const matchesFunction = selectedFunction === "all" || agent.function === selectedFunction
      const matchesAgentType = selectedAgentType === "all" || selectedAgentType === "lifebot"

      return matchesSearch && matchesCategory && matchesIndustry && matchesFunction && matchesAgentType
    })
  }, [searchTerm, selectedCategory, selectedIndustry, selectedFunction, selectedAgentType])

  const filteredCommunityAgents = useMemo(() => {
    return communityAgents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory
      const matchesIndustry = selectedIndustry === "all" || agent.industry === selectedIndustry
      const matchesFunction = selectedFunction === "all" || agent.function === selectedFunction
      const matchesAgentType = selectedAgentType === "all" || selectedAgentType === "community"

      return matchesSearch && matchesCategory && matchesIndustry && matchesFunction && matchesAgentType
    })
  }, [searchTerm, selectedCategory, selectedIndustry, selectedFunction, selectedAgentType])

  // Paginated agents
  const paginatedLifebotAgents = useMemo(() => {
    return filteredLifebotAgents.slice(0, lifebotPage * ITEMS_PER_PAGE)
  }, [filteredLifebotAgents, lifebotPage])

  const paginatedCommunityAgents = useMemo(() => {
    return filteredCommunityAgents.slice(0, communityPage * ITEMS_PER_PAGE)
  }, [filteredCommunityAgents, communityPage])

  // Check if there are more agents to load
  useEffect(() => {
    setHasMoreLifebot(paginatedLifebotAgents.length < filteredLifebotAgents.length)
    setHasMoreCommunity(paginatedCommunityAgents.length < filteredCommunityAgents.length)
  }, [paginatedLifebotAgents, filteredLifebotAgents, paginatedCommunityAgents, filteredCommunityAgents])

  // Reset pagination when filters change
  useEffect(() => {
    setLifebotPage(1)
    setCommunityPage(1)
  }, [searchTerm, selectedCategory, selectedIndustry, selectedFunction, selectedAgentType])

  // Intersection observer for infinite scroll
  const handleObserver = useCallback((entries, observer, isLifebot) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setIsLoadingMore(true)
      // Simulate loading delay
      setTimeout(() => {
        if (isLifebot) {
          setLifebotPage((prev) => prev + 1)
        } else {
          setCommunityPage((prev) => prev + 1)
        }
        setIsLoadingMore(false)
      }, 800)
    }
  }, [])

  // Set up intersection observers
  useEffect(() => {
    const lifebotObserver = new IntersectionObserver((entries) => handleObserver(entries, lifebotObserver, true), {
      rootMargin: "0px 0px 300px 0px",
    })

    const communityObserver = new IntersectionObserver((entries) => handleObserver(entries, communityObserver, false), {
      rootMargin: "0px 0px 300px 0px",
    })

    if (lifebotLoaderRef.current && hasMoreLifebot) {
      lifebotObserver.observe(lifebotLoaderRef.current)
    }

    if (communityLoaderRef.current && hasMoreCommunity) {
      communityObserver.observe(communityLoaderRef.current)
    }

    return () => {
      if (lifebotLoaderRef.current) lifebotObserver.unobserve(lifebotLoaderRef.current)
      if (communityLoaderRef.current) communityObserver.unobserve(communityLoaderRef.current)
    }
  }, [handleObserver, hasMoreLifebot, hasMoreCommunity])

  // Handle manual load more
  const loadMoreLifebot = () => {
    if (hasMoreLifebot) {
      setIsLoadingMore(true)
      setTimeout(() => {
        setLifebotPage((prev) => prev + 1)
        setIsLoadingMore(false)
      }, 800)
    }
  }

  const loadMoreCommunity = () => {
    if (hasMoreCommunity) {
      setIsLoadingMore(true)
      setTimeout(() => {
        setCommunityPage((prev) => prev + 1)
        setIsLoadingMore(false)
      }, 800)
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedIndustry("all")
    setSelectedFunction("all")
    setSelectedAgentType("all")
  }

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "all" ||
    selectedIndustry !== "all" ||
    selectedFunction !== "all" ||
    selectedAgentType !== "all"

  const router = useRouter()

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
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                  Home
                </a>
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
                <div className="hidden md:flex items-center space-x-4">
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
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                Home
              </a>
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
        <main className="relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">
              {/* Enhanced Hero Header */}
              <div className="text-center mb-12">
                <div className="relative">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    AI LifeBot Agent
                  </h1>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60"></div>
                </div>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Discover and explore a collection of powerful AI Agents crafted to boost productivity, enhance
                  customer experience, and optimize workflows.
                </p>
              </div>

              {/* Enhanced Search and Filters */}
              <div className="mb-12">
                <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                          <Input
                            placeholder="Search agents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:bg-white/15 transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="w-full sm:w-[200px] bg-white/10 backdrop-blur-sm border-white/30 text-white focus:border-white/50">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20">
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="productivity">Productivity & Cost Savings</SelectItem>
                            <SelectItem value="revenue">Revenue Generation</SelectItem>
                            <SelectItem value="customer">Customer Experience</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                          <SelectTrigger className="w-full sm:w-[150px] bg-white/10 backdrop-blur-sm border-white/30 text-white focus:border-white/50">
                            <SelectValue placeholder="Industry" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20">
                            <SelectItem value="all">All Industries</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                          <SelectTrigger className="w-full sm:w-[150px] bg-white/10 backdrop-blur-sm border-white/30 text-white focus:border-white/50">
                            <SelectValue placeholder="Function" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20">
                            <SelectItem value="all">All Functions</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={selectedAgentType} onValueChange={setSelectedAgentType}>
                          <SelectTrigger className="w-full sm:w-[180px] bg-white/10 backdrop-blur-sm border-white/30 text-white focus:border-white/50">
                            <SelectValue placeholder="Agent Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20">
                            <SelectItem value="all">All Agents</SelectItem>
                            <SelectItem value="lifebot">LifeBot Agents</SelectItem>
                            <SelectItem value="community">Community Agents</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {hasActiveFilters && (
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Filter className="h-4 w-4" />
                          <span>Showing {filteredLifebotAgents.length + filteredCommunityAgents.length} results</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced LifeBot Agents Section */}
              {(selectedAgentType === "all" || selectedAgentType === "lifebot") && filteredLifebotAgents.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 mr-3">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    LifeBot Agents
                    <Badge className="ml-3 bg-white/20 text-white border-white/30">
                      {filteredLifebotAgents.length}
                    </Badge>
                  </h2>
                  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide max-w-full">
                    {paginatedLifebotAgents.map((agent, index) => (
                      <Card
                        key={index}
                        onClick={() =>
                          router.push(`/agent/${agent.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`)
                        }
                        className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer group"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`p-3 rounded-xl bg-gradient-to-r ${agent.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              <agent.icon className="h-6 w-6 text-white" />
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                            >
                              Hub
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                            {agent.title}
                          </h3>
                          <p className="text-white/70 mb-3">{agent.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {agent.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="outline"
                                className="text-xs border-white/30 text-white/80 bg-white/5"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Lifebot Loader */}
                  {hasMoreLifebot && (
                    <div ref={lifebotLoaderRef} className="flex justify-center items-center py-4 mt-4">
                      <Button
                        onClick={loadMoreLifebot}
                        disabled={isLoadingMore}
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                      >
                        {isLoadingMore ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Load More Agents"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Community Agents Section */}
              {(selectedAgentType === "all" || selectedAgentType === "community") &&
                filteredCommunityAgents.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 mr-3">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      Community Agents
                      <Badge className="ml-3 bg-white/20 text-white border-white/30">
                        {filteredCommunityAgents.length}
                      </Badge>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {paginatedCommunityAgents.map((agent, index) => (
                        <Card
                          key={index}
                          onClick={() => router.push(`/agent/${agent.name.toLowerCase().replace(/\s+/g, "-")}`)}
                          className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all duration-300 cursor-pointer group"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                {agent.emoji}
                              </div>
                              <Badge variant="outline" className="border-white/30 text-white/80 bg-white/5">
                                Community
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                              {agent.name}
                            </h3>
                            <p className="text-white/70 text-sm mb-4 line-clamp-2">{agent.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {agent.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="bg-white/20 backdrop-blur-sm text-white/90 text-xs border-white/30"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Community Loader */}
                    {hasMoreCommunity && (
                      <div ref={communityLoaderRef} className="flex justify-center items-center py-8 mt-4">
                        <Button
                          onClick={loadMoreCommunity}
                          disabled={isLoadingMore}
                          variant="outline"
                          className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                        >
                          {isLoadingMore ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            "Load More Agents"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}

              {/* No Results Message */}
              {filteredLifebotAgents.length === 0 && filteredCommunityAgents.length === 0 && hasActiveFilters && (
                <div className="text-center py-12">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md mx-auto">
                    <Search className="h-12 w-12 text-white/60 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
                    <p className="text-white/70 mb-4">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      variant="outline"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
