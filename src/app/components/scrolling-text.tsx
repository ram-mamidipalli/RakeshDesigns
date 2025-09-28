export function ScrollingText() {
  return (
    <div className="relative flex overflow-x-hidden bg-primary text-primary-foreground py-3 my-8 md:my-12">
      <div className="py-2 animate-marquee whitespace-nowrap">
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
      </div>

      <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap">
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
        <span className="mx-4 text-lg font-semibold tracking-wider">Only paid works available</span>
      </div>
    </div>
  );
}
