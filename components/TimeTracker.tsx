'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Trash2, Play, Square, Clock, DollarSign, FolderOpen } from 'lucide-react'
import { showToast } from '@/components/Toast'

interface TimeSession {
  id: string
  projectName: string
  category: string
  hourlyRate: number
  currency: string
  startTime: number
  endTime?: number
  duration: number
  earnings: number
  isActive: boolean
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
]

const CATEGORIES = [
  'Development',
  'Design',
  'Writing',
  'Consulting',
  'Marketing',
  'Sales',
  'Support',
  'Other'
]

export default function TimeTracker() {
  const [sessions, setSessions] = useState<TimeSession[]>([])
  const [currentSession, setCurrentSession] = useState<TimeSession | null>(null)
  const [projectName, setProjectName] = useState('')
  const [category, setCategory] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('timeTrackerSessions')
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions)
        setSessions(parsedSessions)
      } catch (error) {
        console.error('Error loading sessions:', error)
      }
    }
  }, [])

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem('timeTrackerSessions', JSON.stringify(sessions))
  }, [sessions])

  // Update elapsed time every second when tracking
  useEffect(() => {
    if (isTracking && currentSession) {
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - currentSession.startTime) / 1000)
        setElapsedTime(elapsed)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTracking, currentSession])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatCurrency = (amount: number, currencyCode: string): string => {
    const currency = CURRENCIES.find(c => c.code === currencyCode)
    if (!currency) return `$${amount.toFixed(2)}`
    
    return `${currency.symbol}${amount.toFixed(2)}`
  }

  const startTracking = () => {
    if (!projectName.trim()) {
      showToast.error('Please enter the project name')
      return
    }

    const newSession: TimeSession = {
      id: Date.now().toString(),
      projectName: projectName.trim(),
      category: category || 'Other',
      hourlyRate: parseFloat(hourlyRate) || 0,
      currency,
      startTime: Date.now(),
      duration: 0,
      earnings: 0,
      isActive: true
    }

    setCurrentSession(newSession)
    setIsTracking(true)
    setElapsedTime(0)
    showToast.success('Tracking started!')
  }

  const stopTracking = () => {
    if (!currentSession) return

    const endTime = Date.now()
    const duration = Math.floor((endTime - currentSession.startTime) / 1000)
    const earnings = currentSession.hourlyRate > 0 ? (duration / 3600) * currentSession.hourlyRate : 0

    const completedSession: TimeSession = {
      ...currentSession,
      endTime,
      duration,
      earnings,
      isActive: false
    }

    setSessions(prev => [completedSession, ...prev])
    setCurrentSession(null)
    setIsTracking(false)
    setElapsedTime(0)
    
    // Reset form
    setProjectName('')
    setCategory('')
    setHourlyRate('')
    
    showToast.success(`Session completed! Duration: ${formatTime(duration)}`)
  }

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId))
    showToast.success('Session deleted')
  }

  const clearAllSessions = () => {
    setSessions([])
    showToast.success('All sessions cleared')
  }

  const getTotalEarnings = (): number => {
    return sessions.reduce((total, session) => total + session.earnings, 0)
  }

  const getTotalTime = (): number => {
    return sessions.reduce((total, session) => total + session.duration, 0)
  }

  const getCurrentEarnings = (): number => {
    if (!currentSession || !isTracking) return 0
    return (elapsedTime / 3600) * currentSession.hourlyRate
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">TimeTracker Pro</h1>
            <p className="text-muted-foreground text-lg">Free time tracking for freelancers and professionals</p>
          </div>

          {/* Main Timer Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="text-6xl md:text-7xl font-mono font-bold text-primary mb-4">
                  {formatTime(elapsedTime)}
                </div>
                {isTracking && currentSession && (
                  <div className="text-xl text-muted-foreground">
                    <span className="font-semibold">{currentSession.projectName}</span>
                    {currentSession.category && (
                      <Badge variant="secondary" className="ml-2">
                        {currentSession.category}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Project Form */}
              {!isTracking && (
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="e.g., Website Development"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="e.g., 50"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((curr) => (
                          <SelectItem key={curr.code} value={curr.code}>
                            {curr.symbol} {curr.name} ({curr.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center">
                {!isTracking ? (
                  <Button
                    onClick={startTracking}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Tracking
                  </Button>
                ) : (
                  <Button
                    onClick={stopTracking}
                    size="lg"
                    variant="destructive"
                    className="px-8 py-3 text-lg"
                  >
                    <Square className="w-5 h-5 mr-2" />
                    Stop Tracking
                  </Button>
                )}
              </div>

              {/* Current Earnings Display */}
              {isTracking && currentSession && currentSession.hourlyRate > 0 && (
                <div className="text-center mt-6">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(getCurrentEarnings(), currentSession.currency)}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Earnings</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {formatTime(getTotalTime())}
                </div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {sessions.length > 0 ? formatCurrency(getTotalEarnings(), sessions[0]?.currency || 'USD') : '$0.00'}
                </div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <FolderOpen className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {sessions.length}
                </div>
                <div className="text-sm text-muted-foreground">Sessions</div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions History */}
          {sessions.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Session History</CardTitle>
                <Button
                  onClick={clearAllSessions}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground">{session.projectName}</h3>
                          {session.category && (
                            <Badge variant="secondary" className="text-xs">
                              {session.category}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTime(session.duration)}
                          </span>
                          {session.earnings > 0 && (
                            <span className="flex items-center text-green-600">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {formatCurrency(session.earnings, session.currency)}
                            </span>
                          )}
                          <span>
                            {new Date(session.startTime).toLocaleDateString('en-US')} {new Date(session.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => deleteSession(session.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}