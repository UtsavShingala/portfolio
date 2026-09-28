/**
 * Fixed grid behind the whole site, masked so it fades out down the page
 * instead of tiling forever.
 *
 * The coloured glow is deliberately not here — it lives inside Hero and
 * Section so it can pick up that section's hue, which a layout-level element
 * sitting outside them could never see.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="backdrop-grid absolute inset-0" />
    </div>
  );
}
