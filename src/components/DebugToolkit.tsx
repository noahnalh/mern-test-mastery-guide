
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bug,
  AlertTriangle,
  Activity,
  Terminal,
  Eye,
  Zap,
  Clock,
  TrendingUp,
  RefreshCw,
  Settings
} from 'lucide-react';

const DebugToolkit = () => {
  const [errorLogs, setErrorLogs] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 10:30:15',
      level: 'error',
      message: 'Failed to fetch user data',
      component: 'UserProfile',
      stack: 'Error: Network request failed\n    at fetchUserData (UserProfile.js:23:5)',
      resolved: false
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:25:32',
      level: 'warning',
      message: 'Deprecated prop usage in Button component',
      component: 'Button',
      stack: 'Warning: Prop `variant` will be removed in v2.0',
      resolved: true
    },
    {
      id: 3,
      timestamp: '2024-01-15 10:20:18',
      level: 'info',
      message: 'User authentication successful',
      component: 'AuthContext',
      stack: null,
      resolved: true
    }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    pageLoad: 2.3,
    apiResponse: 450,
    memoryUsage: 42,
    renderTime: 16.7
  });

  const [isMonitoring, setIsMonitoring] = useState(true);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const clearLogs = () => {
    setErrorLogs([]);
  };

  const markResolved = (id) => {
    setErrorLogs(logs => 
      logs.map(log => 
        log.id === id ? { ...log, resolved: true } : log
      )
    );
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Debug Control Panel */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bug className="w-5 h-5 text-red-600" />
                Debug Control Panel
              </CardTitle>
              <CardDescription>
                Monitor, debug, and optimize your application performance
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isMonitoring ? 'default' : 'secondary'}>
                {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
              </Badge>
              <Button 
                size="sm" 
                variant={isMonitoring ? 'destructive' : 'default'}
                onClick={toggleMonitoring}
              >
                {isMonitoring ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-50 to-pink-50 border border-red-100">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">
                {errorLogs.filter(log => log.level === 'error' && !log.resolved).length}
              </div>
              <div className="text-sm text-red-700">Active Errors</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
              <Eye className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600">
                {errorLogs.filter(log => log.level === 'warning' && !log.resolved).length}
              </div>
              <div className="text-sm text-amber-700">Warnings</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{performanceMetrics.pageLoad}s</div>
              <div className="text-sm text-green-700">Page Load</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{performanceMetrics.memoryUsage}%</div>
              <div className="text-sm text-blue-700">Memory Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="errors" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="errors" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Error Logs
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Network
          </TabsTrigger>
          <TabsTrigger value="console" className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Console
          </TabsTrigger>
        </TabsList>

        <TabsContent value="errors" className="space-y-4">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Error Tracking
                </CardTitle>
                <Button size="sm" variant="outline" onClick={clearLogs}>
                  Clear Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {errorLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No errors logged. Great job! 🎉
                  </div>
                ) : (
                  errorLogs.map((log) => (
                    <div key={log.id} className={`p-4 rounded-lg border ${getLevelColor(log.level)} ${log.resolved ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {log.level.toUpperCase()}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {log.component}
                            </Badge>
                            <span className="text-xs text-gray-500">{log.timestamp}</span>
                          </div>
                          <div className="font-medium mb-2">{log.message}</div>
                          {log.stack && (
                            <details className="text-xs">
                              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                                Stack Trace
                              </summary>
                              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                                {log.stack}
                              </pre>
                            </details>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {log.resolved ? (
                            <Badge variant="default" className="text-xs">Resolved</Badge>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => markResolved(log.id)}>
                              Mark Resolved
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Page Load Time</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(performanceMetrics.pageLoad / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{performanceMetrics.pageLoad}s</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Response</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(performanceMetrics.apiResponse / 1000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{performanceMetrics.apiResponse}ms</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Render Time</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${(performanceMetrics.renderTime / 60) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{performanceMetrics.renderTime}ms</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {performanceMetrics.memoryUsage}%
                  </div>
                  <div className="text-sm text-gray-600">Current Usage</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${performanceMetrics.memoryUsage}%` }}
                  ></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Heap Used</span>
                    <span className="font-medium">24.5 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heap Total</span>
                    <span className="font-medium">58.2 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>External</span>
                    <span className="font-medium">1.8 MB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Network Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { method: 'GET', url: '/api/users', status: 200, time: '245ms', size: '1.2KB' },
                  { method: 'POST', url: '/api/auth/login', status: 200, time: '892ms', size: '0.8KB' },
                  { method: 'GET', url: '/api/posts', status: 200, time: '156ms', size: '5.4KB' },
                  { method: 'PUT', url: '/api/users/123', status: 404, time: '1.2s', size: '0.3KB' },
                ].map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={request.method === 'GET' ? 'secondary' : request.method === 'POST' ? 'default' : 'outline'}
                        className="text-xs min-w-[50px] justify-center"
                      >
                        {request.method}
                      </Badge>
                      <span className="font-mono text-sm">{request.url}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge 
                        variant={request.status === 200 ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {request.status}
                      </Badge>
                      <span className="text-gray-600">{request.time}</span>
                      <span className="text-gray-600">{request.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="console" className="space-y-4">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-gray-600" />
                Debug Console
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                <div className="space-y-1">
                  <div className="text-blue-400">[INFO] Application started successfully</div>
                  <div className="text-yellow-400">[WARN] Deprecated API usage detected in UserService</div>
                  <div className="text-green-400">[DEBUG] Redux action dispatched: USER_LOGIN_SUCCESS</div>
                  <div className="text-red-400">[ERROR] Failed to load user avatar: Network timeout</div>
                  <div className="text-blue-400">[INFO] WebSocket connection established</div>
                  <div className="text-green-400">[DEBUG] Component mounted: UserProfile</div>
                  <div className="text-purple-400">[PERF] Page render time: 16.7ms</div>
                  <div className="text-gray-400">$ _</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Alert className="border-blue-200 bg-blue-50">
        <Settings className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          <strong>Pro Tip:</strong> Enable source maps in production for better error tracking, 
          but remember to restrict access to authorized personnel only for security.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DebugToolkit;
