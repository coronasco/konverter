'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Copy, RefreshCw, Eye, EyeOff, Shield, Zap, Lock, Clock, BarChart3, AlertTriangle } from 'lucide-react'

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
  excludeAmbiguous: boolean
}

interface PasswordAnalysis {
  entropy: number
  crackTime: string
  crackTimeSeconds: number
  patterns: string[]
  suggestions: string[]
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  })

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKL MNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const similar = 'il1Lo0O'
    const ambiguous = '{}[]()/\\\'"`~,;:.<>'

    let charset = ''
    if (options.includeUppercase) charset += uppercase
    if (options.includeLowercase) charset += lowercase
    if (options.includeNumbers) charset += numbers
    if (options.includeSymbols) charset += symbols

    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !similar.includes(char)).join('')
    }
    if (options.excludeAmbiguous) {
      charset = charset.split('').filter(char => !ambiguous.includes(char)).join('')
    }

    if (charset.length === 0) {
      setPassword('')
      return
    }

    let generatedPassword = ''
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      generatedPassword += charset[randomIndex]
    }

    setPassword(generatedPassword)
  }, [options])

  const analyzePassword = useCallback((pass: string): PasswordAnalysis => {
    if (!pass) {
      return {
        entropy: 0,
        crackTime: 'Instant',
        crackTimeSeconds: 0,
        patterns: [],
        suggestions: []
      }
    }

    // Calculăm entropia
    let charsetSize = 0
    if (/[a-z]/.test(pass)) charsetSize += 26
    if (/[A-Z]/.test(pass)) charsetSize += 26
    if (/[0-9]/.test(pass)) charsetSize += 10
    if (/[^A-Za-z0-9]/.test(pass)) charsetSize += 32

    const entropy = Math.log2(Math.pow(charsetSize, pass.length))

    // Estimăm timpul pentru crack (presupunând 1 miliard de încercări pe secundă)
    const combinations = Math.pow(charsetSize, pass.length)
    const crackTimeSeconds = combinations / (1e9 * 2) // Împărțim la 2 pentru că în medie găsim parola la jumătatea încercărilor

    // Formatăm timpul pentru crack
    let crackTime = 'Instant'
    if (crackTimeSeconds < 1) {
      crackTime = 'Less than a second'
    } else if (crackTimeSeconds < 60) {
      crackTime = `${Math.round(crackTimeSeconds)} seconds`
    } else if (crackTimeSeconds < 3600) {
      crackTime = `${Math.round(crackTimeSeconds / 60)} minutes`
    } else if (crackTimeSeconds < 86400) {
      crackTime = `${Math.round(crackTimeSeconds / 3600)} hours`
    } else if (crackTimeSeconds < 31536000) {
      crackTime = `${Math.round(crackTimeSeconds / 86400)} days`
    } else if (crackTimeSeconds < 31536000000) {
      crackTime = `${Math.round(crackTimeSeconds / 31536000)} years`
    } else {
      // Formatăm numerele mari în format prietenos
      const years = crackTimeSeconds / 31536000
      if (years >= 1e12) {
        crackTime = `${(years / 1e12).toFixed(1)} trillion years`
      } else if (years >= 1e9) {
        crackTime = `${(years / 1e9).toFixed(1)} billion years`
      } else if (years >= 1e6) {
        crackTime = `${(years / 1e6).toFixed(1)} million years`
      } else if (years >= 1e3) {
        crackTime = `${(years / 1e3).toFixed(1)} thousand years`
      } else {
        crackTime = `${Math.round(years)} years`
      }
    }

    // Detectăm pattern-uri
    const patterns: string[] = []
    const suggestions: string[] = []

    // Verificăm pentru caractere repetate
    if (/(.)\1{2,}/.test(pass)) {
      patterns.push('Repeated characters detected')
      suggestions.push('Avoid repeating the same character multiple times')
    }

    // Verificăm pentru secvențe
    if (/123|234|345|456|567|678|789|012/.test(pass) || /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(pass)) {
      patterns.push('Sequential characters detected')
      suggestions.push('Avoid sequential characters like "123" or "abc"')
    }

    // Verificăm pentru cuvinte comune
    const commonWords = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome', 'monkey', 'dragon']
    const lowerPass = pass.toLowerCase()
    if (commonWords.some(word => lowerPass.includes(word))) {
      patterns.push('Common words detected')
      suggestions.push('Avoid common words and phrases')
    }

    // Verificăm pentru pattern-uri de tastatură
    const keyboardPatterns = ['qwerty', 'asdfgh', 'zxcvbn', '123456', '654321']
    if (keyboardPatterns.some(pattern => lowerPass.includes(pattern))) {
      patterns.push('Keyboard patterns detected')
      suggestions.push('Avoid keyboard patterns like "qwerty"')
    }

    // Verificăm pentru prea puține tipuri de caractere
    const charTypes = [
      /[a-z]/.test(pass),
      /[A-Z]/.test(pass),
      /[0-9]/.test(pass),
      /[^A-Za-z0-9]/.test(pass)
    ].filter(Boolean).length

    if (charTypes < 3) {
      patterns.push('Limited character variety')
      suggestions.push('Use a mix of uppercase, lowercase, numbers, and symbols')
    }

    // Verificăm pentru prea scurtă
    if (pass.length < 12) {
      patterns.push('Password is relatively short')
      suggestions.push('Consider using at least 12 characters')
    }

    return {
      entropy: Math.round(entropy * 100) / 100,
      crackTime,
      crackTimeSeconds,
      patterns,
      suggestions
    }
  }, [])

  const copyToClipboard = async () => {
    if (!password) return
    
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy password: ', err)
    }
  }

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'text-gray-400' }
    
    let score = 0
    if (pass.length >= 8) score++
    if (pass.length >= 12) score++
    if (/[a-z]/.test(pass)) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    
    if (score <= 2) return { score, label: 'Weak', color: 'text-red-500' }
    if (score <= 3) return { score, label: 'Fair', color: 'text-orange-500' }
    if (score <= 4) return { score, label: 'Good', color: 'text-yellow-500' }
    if (score <= 5) return { score, label: 'Strong', color: 'text-green-500' }
    return { score, label: 'Very Strong', color: 'text-emerald-500' }
  }

  const strength = getPasswordStrength(password)
  const analysis = analyzePassword(password)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Password Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Generate secure, random passwords with customizable options. Create strong passwords for your accounts with our free online tool.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Generated Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                readOnly
                placeholder="Your password will appear here..."
                className="pr-20 text-lg font-mono"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 w-8 p-0"
                >
                  {copied ? '✓' : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Password Strength:</span>
                  <span className={`text-sm font-semibold ${strength.color}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      strength.score <= 2 ? 'bg-red-500' :
                      strength.score <= 3 ? 'bg-orange-500' :
                      strength.score <= 4 ? 'bg-yellow-500' :
                      strength.score <= 5 ? 'bg-green-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(strength.score / 6) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Length: {password.length} characters
                </p>
              </div>
            )}

            <Button
              onClick={generatePassword}
              className="w-full"
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate New Password
            </Button>
          </CardContent>
        </Card>

        {/* Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Password Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="length">Password Length: {options.length}</Label>
              <input
                id="length"
                type="range"
                min="4"
                max="64"
                value={options.length}
                onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="uppercase" className="text-sm">
                  Include Uppercase Letters (A-Z)
                </Label>
                <Switch
                  id="uppercase"
                  checked={options.includeUppercase}
                  onCheckedChange={(checked) => setOptions({ ...options, includeUppercase: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="lowercase" className="text-sm">
                  Include Lowercase Letters (a-z)
                </Label>
                <Switch
                  id="lowercase"
                  checked={options.includeLowercase}
                  onCheckedChange={(checked) => setOptions({ ...options, includeLowercase: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="numbers" className="text-sm">
                  Include Numbers (0-9)
                </Label>
                <Switch
                  id="numbers"
                  checked={options.includeNumbers}
                  onCheckedChange={(checked) => setOptions({ ...options, includeNumbers: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="symbols" className="text-sm">
                  Include Symbols (!@#$%^&*)
                </Label>
                <Switch
                  id="symbols"
                  checked={options.includeSymbols}
                  onCheckedChange={(checked) => setOptions({ ...options, includeSymbols: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="excludeSimilar" className="text-sm">
                  Exclude Similar Characters (i, l, 1, L, o, 0, O)
                </Label>
                <Switch
                  id="excludeSimilar"
                  checked={options.excludeSimilar}
                  onCheckedChange={(checked) => setOptions({ ...options, excludeSimilar: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="excludeAmbiguous" className="text-sm">
                  Exclude Ambiguous Characters ({ } [ ] ( ) / \ &apos; &quot; ` ~ , ; : . &lt; &gt;)
                </Label>
                <Switch
                  id="excludeAmbiguous"
                  checked={options.excludeAmbiguous}
                  onCheckedChange={(checked) => setOptions({ ...options, excludeAmbiguous: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analysis */}
      {password && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Advanced Password Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Entropia */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">Entropy</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{analysis.entropy}</p>
                <p className="text-xs text-muted-foreground">
                  Higher entropy = more random and secure
                </p>
              </div>

              {/* Timpul pentru crack */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold">Crack Time</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{analysis.crackTime}</p>
                <p className="text-xs text-muted-foreground">
                  Estimated time to crack at 1 billion attempts/second
                </p>
              </div>

              {/* Pattern-uri detectate */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="font-semibold">Patterns Detected</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{analysis.patterns.length}</p>
                <p className="text-xs text-muted-foreground">
                  Security issues found in password
                </p>
              </div>
            </div>

            {/* Pattern-uri și sugestii */}
            {(analysis.patterns.length > 0 || analysis.suggestions.length > 0) && (
              <div className="mt-6 space-y-4">
                {analysis.patterns.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Detected Issues:</h4>
                    <ul className="space-y-1">
                      {analysis.patterns.map((pattern, index) => (
                        <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3" />
                          {pattern}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Suggestions:</h4>
                    <ul className="space-y-1">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-green-600 flex items-center gap-2">
                          <Shield className="h-3 w-3" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Password Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Password Security Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Do&apos;s:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use at least 12 characters</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Add numbers and special characters</li>
                <li>• Use unique passwords for each account</li>
                <li>• Consider using a password manager</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">Don&apos;ts:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Don&apos;t use personal information</li>
                <li>• Avoid common words or phrases</li>
                <li>• Don&apos;t reuse passwords</li>
                <li>• Avoid sequential characters</li>
                <li>• Don&apos;t share passwords</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold">Secure Generation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate cryptographically secure passwords using browser&apos;s built-in random number generator.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold">Advanced Analysis</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Get detailed analysis including entropy, crack time estimation, and pattern detection for better security.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Copy className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold">Instant Copy</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Copy generated passwords to clipboard with one click. No data is stored or transmitted.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 