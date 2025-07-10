declare module 'svgo-browser' {
  const optimize: (svgString: string, options?: { plugins?: string[] }) => string;
  export default optimize;
} 