// PaceCar logo pieces rebuilt from the Figma file (mark node 2:3759, lockup node 30:122).
// LogoMark is drawn at 70px and scaled, so every size keeps the exact Figma proportions.
export default function LogoMark({ size = 70, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute left-0 top-0 size-[70px] origin-top-left"
        style={{ transform: `scale(${size / 70})` }}
      >
        <div className="absolute left-[-2.45px] top-0 flex h-[70px] w-[74.895px] items-center justify-center">
          <div style={{ transform: "skewX(-4deg)" }}>
            {/* blue tile: big radius on the top-right corner only */}
            <div className="relative h-[70.171px] w-[70px] overflow-clip rounded-[4.123px_20.613px_4.123px_4.123px] bg-pace-blue">
              {/* diagonal speed stripe */}
              <div className="absolute left-[25.36px] top-[28.22px] flex h-[44.691px] w-[56.333px] items-center justify-center">
                <div style={{ transform: "rotate(-37.07deg) skewX(-0.13deg)" }}>
                  <div className="relative h-[6.186px] w-[65.941px] rounded-full bg-pace-sky">
                    <div className="absolute left-[22.67px] top-0 h-[6.186px] w-[14.425px] bg-white" />
                  </div>
                </div>
              </div>
              {/* the letter P */}
              <div className="absolute left-[24.01px] top-[10.32px] flex h-[49.532px] w-[19.926px] items-center justify-center">
                <div style={{ transform: "skewX(3.99deg)" }}>
                  <p className="m-0 h-[49.653px] w-[16.471px] whitespace-nowrap font-display text-[49.532px] font-black italic leading-[49.532px] tracking-[-5.9439px] text-white">
                    P
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mark + "PACECAR" wordmark + "DRIVE WITH TRUST" tagline (header and footer).
export function PaceLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={34} />
      <div className="flex w-[78.275px] flex-col gap-[7px]">
        <div className="relative h-[20.7px] w-full">
          <div className="absolute left-0 top-[-4px] flex items-center">
            <span className="whitespace-nowrap font-display text-[23px] font-black uppercase leading-[20.7px] tracking-[-0.92px] text-white">
              Pace
            </span>
            <span className="relative block h-[28px] w-[28.638px]">
              <span className="absolute left-0 top-[3px] whitespace-nowrap font-display text-[23px] font-black italic uppercase leading-[20.7px] tracking-[-0.92px] text-pace-car">
                Car
              </span>
              <span className="absolute left-[2.82px] top-[25px] flex h-[2px] w-[27.843px] items-center justify-center">
                <span style={{ transform: "skewX(-22deg) scaleY(0.93)" }}>
                  <span className="block h-[2.157px] w-[27.034px] rounded-full bg-pace-blue" />
                </span>
              </span>
            </span>
          </div>
        </div>
        <span className="block whitespace-nowrap font-ui text-[6px] font-extrabold leading-[6px] tracking-[1.44px] text-pace-tag">
          DRIVE WITH TRUST
        </span>
      </div>
    </div>
  );
}
