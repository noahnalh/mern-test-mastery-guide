
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  Terminal,
  Database,
  Globe,
  Code
} from 'lucide-react';

const TestDashboard = () => {
  const [testResults, setTestResults] = useState({
    unit: { passed: 42, failed: 3, total: 45, running: false },
    integration: { passed: 28, failed: 2, total: 30, running: false },
    e2e: { passed: 15, failed: 1, total: 16, running: false }
  });
  
  const [isRunningAll, setIsRunningAll] = useState(false);

  const runTests = async (testType) => {
    setTestResults(prev => ({
      ...prev,
      [testType]: { ...prev[testType], running: true }
    }));

    // Simulate test execution
    setTimeout(() => {
      setTestResults(prev => ({
        ...prev,
        [testType]: { ...prev[testType], running: false }
      }));
    }, 3000);
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    await Promise.all([
      runTests('unit'),
      runTests('integration'),
      runTests('e2e')
    ]);
    setTimeout(() => setIsRunningAll(false), 3000);
  };

  const getSuccessRate = (results) => {
    return Math.round((results.passed / results.total) * 100);
  };

  const testSuites = [
    {
      type: 'unit',
      title: 'Unit Tests',
      icon: <Code className="w-5 h-5" />,
      description: 'React components, hooks, and utility functions',
      color: 'blue',
      examples: [
        'UserCard.test.js - Component rendering',
        'useAuth.test.js - Custom hook logic',
        'utils.test.js - Helper functions',
        'Button.test.js - Event handling'
      ]
    },
    {
      type: 'integration',
      title: 'Integration Tests',
      icon: <Database className="w-5 h-5" />,
      description: 'API endpoints and database operations',
      color: 'green',
      examples: [
        'auth.test.js - Authentication flow',
        'users.test.js - User CRUD operations',
        'posts.test.js - Content management',
        'middleware.test.js - Request validation'
      ]
    },
    {
      type: 'e2e',
      title: 'End-to-End Tests',
      icon: <Globe className="w-5 h-5" />,
      description: 'Complete user journeys and workflows',
      color: 'purple',
      examples: [
        'registration.cy.js - User signup flow',
        'login.cy.js - Authentication journey',
        'dashboard.cy.js - Main app navigation',
        'forms.cy.js - Data submission'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Test Control Panel */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-600" />
                Test Control Panel
              </CardTitle>
              <CardDescription>
                Run and monitor your test suites in real-time
              </CardDescription>
            </div>
            <Button 
              onClick={runAllTests} 
              disabled={isRunningAll}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isRunningAll ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {testSuites.map((suite) => {
              const results = testResults[suite.type];
              const successRate = getSuccessRate(results);
              
              return (
                <Card key={suite.type} className="relative overflow-hidden border border-gray-200">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    suite.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                    suite.color === 'green' ? 'from-green-500 to-emerald-500' :
                    'from-purple-500 to-indigo-500'
                  }`}></div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${
                          suite.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                          suite.color === 'green' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {suite.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{suite.title}</h3>
                          <p className="text-xs text-gray-500">{suite.description}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => runTests(suite.type)}
                        disabled={results.running}
                      >
                        {results.running ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Success Rate</span>
                      <Badge variant={successRate >= 90 ? 'default' : successRate >= 70 ? 'secondary' : 'destructive'}>
                        {successRate}%
                      </Badge>
                    </div>
                    
                    <Progress value={successRate} className="h-2" />
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 rounded bg-green-50 text-green-700">
                        <div className="font-semibold">{results.passed}</div>
                        <div>Passed</div>
                      </div>
                      <div className="text-center p-2 rounded bg-red-50 text-red-700">
                        <div className="font-semibold">{results.failed}</div>
                        <div>Failed</div>
                      </div>
                      <div className="text-center p-2 rounded bg-gray-50 text-gray-700">
                        <div className="font-semibold">{results.total}</div>
                        <div>Total</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-600 mb-2">Recent Tests:</div>
                      {suite.examples.slice(0, 3).map((example, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-gray-600">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Test Results */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            Recent Test Results
          </CardTitle>
          <CardDescription>
            Latest test execution results and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { test: 'UserAuthentication.test.js', status: 'passed', time: '1.2s', type: 'unit' },
              { test: 'API Integration Suite', status: 'passed', time: '4.8s', type: 'integration' },
              { test: 'Login Flow E2E', status: 'failed', time: '12.3s', type: 'e2e' },
              { test: 'Form Validation Tests', status: 'passed', time: '0.8s', type: 'unit' },
              { test: 'Database Operations', status: 'passed', time: '3.2s', type: 'integration' },
            ].map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {result.status === 'passed' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <div className="font-medium text-sm">{result.test}</div>
                    <div className="text-xs text-gray-500">
                      {result.type} test • {result.time}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={result.status === 'passed' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {result.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Alerts */}
      <div className="space-y-3">
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-700">
            <strong>Performance Alert:</strong> E2E test "Login Flow" is taking longer than expected (12.3s). 
            Consider optimizing page load times or breaking into smaller test cases.
          </AlertDescription>
        </Alert>
        
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            <strong>Coverage Improved:</strong> Unit test coverage increased to 85% (+3% from last run). 
            Great work on testing the authentication utilities!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default TestDashboard;
