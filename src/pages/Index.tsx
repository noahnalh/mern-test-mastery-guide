
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Code, Database, Globe, Bug, Shield, Zap, FileText } from 'lucide-react';
import TestDashboard from '@/components/TestDashboard';
import CodeExamples from '@/components/CodeExamples';
import DebugToolkit from '@/components/DebugToolkit';

const Index = () => {
  const testingStrategies = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Unit Testing",
      description: "Individual component and function testing",
      coverage: "85%",
      status: "active",
      tests: ["React Components", "Utility Functions", "Redux Actions", "Custom Hooks", "Middleware"]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Integration Testing",
      description: "API endpoints and database operations",
      coverage: "78%",
      status: "active",
      tests: ["API Endpoints", "Database Operations", "Auth Flows", "Form Validation"]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "End-to-End Testing",
      description: "Complete user journey testing",
      coverage: "92%",
      status: "active",
      tests: ["User Registration", "Login Flow", "CRUD Operations", "Navigation"]
    },
    {
      icon: <Bug className="w-6 h-6" />,
      title: "Debugging Tools",
      description: "Error tracking and performance monitoring",
      coverage: "100%",
      status: "monitoring",
      tests: ["Error Boundaries", "Logging", "Performance", "Global Handlers"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">MERN Stack Testing Framework</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
            Comprehensive Testing & Debugging
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master testing strategies for MERN applications with unit testing, integration testing, 
            end-to-end testing, and advanced debugging techniques for production-ready applications.
          </p>
        </div>

        {/* Testing Strategy Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testingStrategies.map((strategy, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300"></div>
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                    {strategy.icon}
                  </div>
                  <Badge variant={strategy.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {strategy.coverage}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{strategy.title}</CardTitle>
                <CardDescription className="text-sm">{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-2">
                  {strategy.tests.map((test, testIndex) => (
                    <div key={testIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{test}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Test Dashboard
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Code Examples
            </TabsTrigger>
            <TabsTrigger value="debugging" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              Debug Toolkit
            </TabsTrigger>
            <TabsTrigger value="coverage" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Coverage Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <TestDashboard />
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <CodeExamples />
          </TabsContent>

          <TabsContent value="debugging" className="space-y-6">
            <DebugToolkit />
          </TabsContent>

          <TabsContent value="coverage" className="space-y-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Test Coverage Report
                </CardTitle>
                <CardDescription>
                  Comprehensive coverage analysis across all testing layers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                    <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                    <div className="text-sm text-green-700 font-medium">Unit Tests</div>
                    <div className="text-xs text-green-600 mt-1">React Components, Utils, Hooks</div>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
                    <div className="text-sm text-blue-700 font-medium">Integration Tests</div>
                    <div className="text-xs text-blue-600 mt-1">API Endpoints, Database</div>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                    <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
                    <div className="text-sm text-purple-700 font-medium">E2E Tests</div>
                    <div className="text-xs text-purple-600 mt-1">User Flows, Critical Paths</div>
                  </div>
                </div>
                <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Coverage Goals Achieved ✅</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Critical Business Logic</span>
                        <Badge variant="secondary">100%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Authentication Flows</span>
                        <Badge variant="secondary">95%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Validation</span>
                        <Badge variant="secondary">88%</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Error Handling</span>
                        <Badge variant="secondary">92%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>API Endpoints</span>
                        <Badge variant="secondary">85%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>UI Components</span>
                        <Badge variant="secondary">78%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
