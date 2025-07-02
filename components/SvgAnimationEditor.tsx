'use client'

import { useState, useEffect, useCallback } from 'react'

// Extend Window interface for animation ID
declare global {
  interface Window {
    svgAnimationId?: number
  }
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Copy,
  Check,
  Plus,
  Trash2,
  PlayCircle,
  Clock
} from 'lucide-react'

interface AnimationKeyframe {
  id: string
  time: number // percentage (0-100)
  properties: {
    transform?: string
    opacity?: number
    fill?: string
    stroke?: string
    scale?: number
    rotate?: number
    translateX?: number
    translateY?: number
  }
}

interface SvgAnimationEditorProps {
  svgContent: string
  onAnimationChange?: (css: string, js: string) => void
}

export default function SvgAnimationEditor({ svgContent, onAnimationChange }: SvgAnimationEditorProps) {
  const [duration, setDuration] = useState(3)
  const [keyframes, setKeyframes] = useState<AnimationKeyframe[]>([
    {
      id: '1',
      time: 0,
      properties: { opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 }
    },
    {
      id: '2',
      time: 25,
      properties: { opacity: 0.7, scale: 1.3, rotate: 90, translateX: 15, translateY: -15 }
    },
    {
      id: '3',
      time: 50,
      properties: { opacity: 0.5, scale: 0.8, rotate: 180, translateX: 0, translateY: 20 }
    },
    {
      id: '4',
      time: 75,
      properties: { opacity: 0.8, scale: 1.1, rotate: 270, translateX: -15, translateY: 0 }
    },
    {
      id: '5',
      time: 100,
      properties: { opacity: 1, scale: 1, rotate: 360, translateX: 0, translateY: 0 }
    }
  ])
  const [selectedKeyframe, setSelectedKeyframe] = useState<string | null>(null)
  const [animationType, setAnimationType] = useState<'css' | 'js'>('css')
  const [copied, setCopied] = useState(false)
  const [codeUpdateTrigger, setCodeUpdateTrigger] = useState(0)

  // Generate CSS animation
  const generateCssAnimation = useCallback(() => {
    if (keyframes.length < 2) return ''

    const keyframeRules = keyframes
      .sort((a, b) => a.time - b.time)
      .map(keyframe => {
        const properties = []
        
        if (keyframe.properties.opacity !== undefined) {
          properties.push(`opacity: ${keyframe.properties.opacity}`)
        }

        // Combine all transforms into one property
        const transforms = []
        if (keyframe.properties.scale !== undefined) {
          transforms.push(`scale(${keyframe.properties.scale})`)
        }
        if (keyframe.properties.rotate !== undefined) {
          transforms.push(`rotate(${keyframe.properties.rotate}deg)`)
        }
        if (keyframe.properties.translateX !== undefined || keyframe.properties.translateY !== undefined) {
          const translateX = keyframe.properties.translateX || 0
          const translateY = keyframe.properties.translateY || 0
          transforms.push(`translate(${translateX}px, ${translateY}px)`)
        }
        
        if (transforms.length > 0) {
          properties.push(`transform: ${transforms.join(' ')}`)
        }

        if (keyframe.properties.fill) {
          properties.push(`fill: ${keyframe.properties.fill}`)
        }
        if (keyframe.properties.stroke) {
          properties.push(`stroke: ${keyframe.properties.stroke}`)
        }

        return `${keyframe.time}% { ${properties.join('; ')} }`
      })
      .join('\n  ')

    return `
@keyframes svg-animation {
  ${keyframeRules}
}

.animated-svg {
  animation: svg-animation ${duration}s ease-in-out infinite;
}

.animated-svg:hover {
  animation-play-state: paused;
}
`.trim()
  }, [keyframes, duration])

  // Generate JavaScript animation
  const generateJsAnimation = useCallback(() => {
    if (keyframes.length < 2) return ''

    const keyframeData = keyframes
      .sort((a, b) => a.time - b.time)
      .map(k => `{ time: ${k.time / 100}, ...${JSON.stringify(k.properties)} }`)
      .join(',\n  ')

    return `
// SVG Animation with JavaScript
(function() {
  const svg = document.querySelector('.animated-svg');
  if (!svg) return;
  
  const keyframes = [
    ${keyframeData}
  ];
  
  let currentTime = 0;
  const duration = ${duration * 1000}; // milliseconds
  let animationId = null;
  
  const applyTransform = (properties) => {
    const transforms = [];
    
    if (properties.scale !== undefined) {
      transforms.push(\`scale(\${properties.scale})\`);
    }
    if (properties.rotate !== undefined) {
      transforms.push(\`rotate(\${properties.rotate}deg)\`);
    }
    if (properties.translateX !== undefined || properties.translateY !== undefined) {
      const x = properties.translateX || 0;
      const y = properties.translateY || 0;
      transforms.push(\`translate(\${x}px, \${y}px)\`);
    }
    
    if (transforms.length > 0) {
      svg.style.transform = transforms.join(' ');
    }
    
    if (properties.opacity !== undefined) {
      svg.style.opacity = properties.opacity;
    }
    if (properties.fill) {
      svg.style.fill = properties.fill;
    }
    if (properties.stroke) {
      svg.style.stroke = properties.stroke;
    }
  };
  
  const interpolate = (start, end, progress) => {
    return start + (end - start) * progress;
  };
  
  const animate = () => {
    const progress = (currentTime % duration) / duration;
    
    // Find current and next keyframe
    let currentKeyframe = null;
    let nextKeyframe = null;
    
    for (let i = 0; i < keyframes.length; i++) {
      if (progress >= keyframes[i].time) {
        currentKeyframe = keyframes[i];
        nextKeyframe = keyframes[i + 1] || keyframes[0];
      }
    }
    
    if (currentKeyframe && nextKeyframe) {
      const localProgress = (progress - currentKeyframe.time) / (nextKeyframe.time - currentKeyframe.time);
      
      // Interpolate between keyframes
      const interpolated = {};
      const allProps = new Set([...Object.keys(currentKeyframe), ...Object.keys(nextKeyframe)]);
      
      allProps.forEach(prop => {
        if (prop === 'time') return;
        if (currentKeyframe[prop] !== undefined && nextKeyframe[prop] !== undefined) {
          interpolated[prop] = interpolate(currentKeyframe[prop], nextKeyframe[prop], localProgress);
        } else if (currentKeyframe[prop] !== undefined) {
          interpolated[prop] = currentKeyframe[prop];
        }
      });
      
      applyTransform(interpolated);
    }
    
    currentTime += 16; // 60fps
    animationId = requestAnimationFrame(animate);
  };
  
  // Start animation
  animate();
  
  // Store reference for cleanup
  window.svgAnimationId = animationId;
})();
`.trim()
  }, [keyframes, duration])

  // Update animation output
  useEffect(() => {
    const css = generateCssAnimation()
    const js = generateJsAnimation()
    onAnimationChange?.(css, js)
  }, [generateCssAnimation, generateJsAnimation, onAnimationChange, codeUpdateTrigger])

  // Apply CSS animation to preview
  useEffect(() => {
    const css = generateCssAnimation()
    if (!css) return

    // Remove existing style tag
    const existingStyle = document.getElementById('svg-animation-style')
    if (existingStyle) {
      existingStyle.remove()
    }

    // Add new style tag
    const style = document.createElement('style')
    style.id = 'svg-animation-style'
    style.textContent = css
    document.head.appendChild(style)

    return () => {
      const style = document.getElementById('svg-animation-style')
      if (style) {
        style.remove()
      }
    }
  }, [generateCssAnimation])







  const addKeyframe = () => {
    const newKeyframe: AnimationKeyframe = {
      id: Date.now().toString(),
      time: 50, // Default to middle of animation
      properties: { opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 }
    }
    setKeyframes(prev => [...prev, newKeyframe])
    setSelectedKeyframe(newKeyframe.id)
    setCodeUpdateTrigger(prev => prev + 1) // Force code update
  }

  const removeKeyframe = (id: string) => {
    setKeyframes(prev => prev.filter(k => k.id !== id))
    if (selectedKeyframe === id) {
      setSelectedKeyframe(null)
    }
    setCodeUpdateTrigger(prev => prev + 1) // Force code update
  }

  const updateKeyframe = (id: string, updates: Partial<AnimationKeyframe>) => {
    setKeyframes(prev => prev.map(k => k.id === id ? { ...k, ...updates } : k))
    setCodeUpdateTrigger(prev => prev + 1) // Force code update
  }

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const getAnimatedSvg = () => {
    if (!svgContent) return ''
    
    return svgContent.replace(
      /<svg([^>]*)>/g,
      `<svg$1 class="animated-svg" style="max-width: 100%; height: auto;">`
    )
  }

  if (!svgContent) {
    return (
      <Card className="border-dashed border-2 border-muted-foreground/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            SVG Animation Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <PlayCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Upload an SVG to create animations</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlayCircle className="h-5 w-5" />
          SVG Animation Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-4">
            <div className="space-y-4">
              {/* Duration Control */}
              <div className="flex items-center gap-2">
                <Label htmlFor="duration" className="text-sm">Duration:</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-20"
                  min="0.5"
                  max="10"
                  step="0.5"
                />
                <span className="text-sm text-muted-foreground">s</span>
              </div>

              {/* Animation Preview */}
              <div className="border rounded-lg p-4 bg-muted/20 overflow-hidden">
                <div 
                  className="mx-auto w-32 h-32 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ 
                    __html: getAnimatedSvg()
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <div className="space-y-4">
              {/* Timeline */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Keyframes</Label>
                  <Button
                    onClick={addKeyframe}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Keyframe
                  </Button>
                </div>

                <div className="space-y-3">
                  {keyframes
                    .sort((a, b) => a.time - b.time)
                    .map((keyframe) => (
                      <div 
                        key={keyframe.id}
                        className={`border rounded p-3 cursor-pointer transition-colors ${
                          selectedKeyframe === keyframe.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                            : 'border-muted'
                        }`}
                        onClick={() => setSelectedKeyframe(keyframe.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{keyframe.time}%</span>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeKeyframe(keyframe.id)
                            }}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>

                        {selectedKeyframe === keyframe.id && (
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <Label className="text-xs">Opacity</Label>
                              <Input
                                type="number"
                                value={keyframe.properties.opacity || 1}
                                onChange={(e) => updateKeyframe(keyframe.id, {
                                  properties: { ...keyframe.properties, opacity: Number(e.target.value) }
                                })}
                                min="0"
                                max="1"
                                step="0.1"
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Scale</Label>
                              <Input
                                type="number"
                                value={keyframe.properties.scale || 1}
                                onChange={(e) => updateKeyframe(keyframe.id, {
                                  properties: { ...keyframe.properties, scale: Number(e.target.value) }
                                })}
                                min="0"
                                max="3"
                                step="0.1"
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Rotate (deg)</Label>
                              <Input
                                type="number"
                                value={keyframe.properties.rotate || 0}
                                onChange={(e) => updateKeyframe(keyframe.id, {
                                  properties: { ...keyframe.properties, rotate: Number(e.target.value) }
                                })}
                                min="0"
                                max="360"
                                step="1"
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Translate X</Label>
                              <Input
                                type="number"
                                value={keyframe.properties.translateX || 0}
                                onChange={(e) => updateKeyframe(keyframe.id, {
                                  properties: { ...keyframe.properties, translateX: Number(e.target.value) }
                                })}
                                min="-100"
                                max="100"
                                step="1"
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Translate Y</Label>
                              <Input
                                type="number"
                                value={keyframe.properties.translateY || 0}
                                onChange={(e) => updateKeyframe(keyframe.id, {
                                  properties: { ...keyframe.properties, translateY: Number(e.target.value) }
                                })}
                                min="-100"
                                max="100"
                                step="1"
                                className="h-8"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="space-y-4">
            <div className="space-y-4">
                             <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <Label>Animation Code</Label>
                   <select 
                     value={animationType} 
                     onChange={(e) => setAnimationType(e.target.value as 'css' | 'js')}
                     className="w-32 px-3 py-2 border rounded-md bg-background text-sm"
                   >
                     <option value="css">CSS</option>
                     <option value="js">JavaScript</option>
                   </select>
                 </div>
                
                <Button
                  onClick={() => copyToClipboard(animationType === 'css' ? generateCssAnimation() : generateJsAnimation())}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  <code>
                    {animationType === 'css' ? generateCssAnimation() : generateJsAnimation()}
                  </code>
                </pre>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Usage:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs">
                  {animationType === 'css' 
                    ? 'Add the CSS to your stylesheet and use class="animated-svg"'
                    : 'Include the JavaScript in your project and call animateSvg()'
                  }
                </code>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 