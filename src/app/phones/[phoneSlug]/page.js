// PhoneDetail.jsx
// Stack: React + Tailwind CSS + DaisyUI
// Setup in tailwind.config.js → plugins: [require("daisyui")]
// Add to index.css / globals.css:
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
//   .container-div { @apply max-w-[1440px] mx-auto sm:w-[90%] md:w-[85%]; }

import Link from "next/link";
import { api } from "@/lib/api";

// 🔥 Shared fetch function
const getPhone = async (slug) => {
  const res = await fetch(`${api}/api/phones/${slug}`, {
    next: { revalidate: 3600 }, // 1 hour cache
  });
  return res.json();
};

// ✅ Dynamic metadata
export async function generateMetadata({ params }) {
  const {phoneSlug} = await params;
  const data = await getPhone(phoneSlug);
  const p = data.data;

  return {
    title: `${p.model} Price in Bangladesh (${p.release_year})`,
    description: `${p.model} full specs, price ৳${p.price_bdt}, review and features.`,
    
    openGraph: {
      title: p.model,
      description: p.full_name,
      images: [p.image_url],
    },

    icons: {
      icon: "/favicon.ico",
    },
  };
}

// ── Reusable subcomponents ────────────────────────────────────────────────────

function SpecRow({ label, value }) {
  return (
    <tr className="border-b border-base-300 last:border-0">
      <td className="py-2.5 pr-4 text-xs font-medium text-base-content/40 uppercase tracking-widest whitespace-nowrap font-mono w-[40%]">
        {label}
      </td>
      <td className="py-2.5 text-sm font-medium text-base-content/90 leading-snug">
        {value}
      </td>
    </tr>
  );
}

function SectionCard({ icon, title, children }) {
  return (
    <div className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
      <div className="card-body p-5">
        <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-base-300">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-base">
            {icon}
          </div>
          <h3 className="text-xs font-bold tracking-[0.15em] text-primary uppercase font-mono">
            {title}
          </h3>
        </div>
        <table className="w-full">
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function QuickStat({ icon, label, value }) {
  return (
    <div className="stat bg-base-200 border border-base-300 rounded-2xl p-4 hover:border-primary/40 hover:bg-base-300/50 transition-all duration-200 cursor-default">
      <div className="stat-figure text-primary text-xl">{icon}</div>
      <div className="stat-title text-[10px] uppercase tracking-widest font-mono text-base-content/40">
        {label}
      </div>
      <div className="stat-value text-sm font-bold text-base-content leading-tight mt-0.5">
        {value}
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="rating rating-sm gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <input
          key={s}
          type="radio"
          name="rating-display"
          className={`mask mask-star-2 ${
            s <= Math.round(rating) ? "bg-warning" : "bg-base-300"
          }`}
          disabled
          readOnly
        />
      ))}
    </div>
  );
}

// ── Color chip map ────────────────────────────────────────────────────────────
const COLOR_MAP = {
  "Ice Blue": "#b8d4e8",
  "Graphite Black": "#2a2a2a",
};

// ── Main Component ────────────────────────────────────────────────────────────
export default async function SinglePhonePage({params}) {

  const slugdata = await params;
  
  const phoneSlug = slugdata.phoneSlug;
  const res = await fetch(`${api}/api/phones/${phoneSlug}`);

  const data = await res.json();
  console.log(data,"fetched data")
    console.log(data);
  

  const p = data.data;

   

   
   

  return (
    // data-theme="night" → DaisyUI dark theme; swap to "light" / "corporate" etc.
    <>
    
    <div data-theme="night" className="min-h-screen px-5 bg-base-100 font-[Syne,sans-serif]">
      {/* ── Breadcrumb nav ───────────────────────────────────────────────── */}
      <div className="bg-base-200 border-b border-base-300 py-2">
        <div className="container-div">
          <div className="breadcrumbs text-xs text-base-content/40 font-mono py-0">
            <ul>
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><a className="hover:text-primary">Phones</a></li>
              <li><a className="hover:text-primary">{p.brand}</a></li>
              <li className="text-base-content/70">{p.model}</li>
            </ul>
            
          </div>
        </div>
      </div>

      {/* ── Page body ────────────────────────────────────────────────────── */}
      <div className="container-div py-10 space-y-10">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* Left — image card */}
          <div className="flex flex-col gap-4">
            <div className="card bg-base-200 border border-base-300 shadow-lg group">
              <figure className="p-6 pb-4">
                <img
                  src={p.image_url}
                  alt={p.full_name}
                  className="w-48 mx-auto object-contain drop-shadow-2xl group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-500"
                  
                />
              </figure>
              <div className="card-body mt-7 items-center pt-0 pb-5 gap-2">
                <StarRating rating={p.rating} />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-warning font-mono">
                    {p.rating}
                  </span>
                 
                </div>
                {/* color swatches */}
                
                
              </div>
            </div>

            {/* Stock badge */}
           
          </div>

          {/* Right — title + meta + quick stats */}
          <div className="space-y-6">
            {/* Title block */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className="badge badge-primary badge-outline font-mono text-[10px] tracking-widest uppercase">
                  {p.brand}
                </div>
                <div className="badge badge-secondary badge-outline font-mono text-[10px] tracking-widest uppercase">
                  {p.tier}
                </div>
                <div className="badge badge-ghost font-mono text-[10px] tracking-widest">
                  {p.release_year}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none text-base-content">
                {p.model}
              </h1>
              <p className="text-base-content/40 font-mono text-xs mt-1 tracking-widest">
                {p.full_name} 
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-extrabold text-primary font-mono">
                  ৳{p.price_bdt.toLocaleString()}
                </span>
                <div className="badge badge-error badge-lg font-mono font-bold">
                  Best Price
                </div>
                
              </div>
            </div>

            {/* Divider */}
            <div className="divider" />

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <QuickStat icon="🖥" label="Display"  value='6.5" 90Hz' />
              <QuickStat icon="⚡" label="Chipset"  value="Helio G96" />
              <QuickStat icon="💾" label="Memory"   value="4GB / 64GB" />
              <QuickStat icon="📷" label="Camera"   value="48MP Rear" />
              <QuickStat icon="🔋" label="Battery"  value="4000mAh 15W" />
              <QuickStat icon="📡" label="Network"  value="5G Ready" />
            </div>

            {/* Highlight tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "USB Type-C", "3.5mm Jack", "Gorilla Glass 3",
                "microSDXC 1TB", "Night Mode", "One UI 6.1",
              ].map((tag) => (
                <div key={tag} className="badge badge-outline badge-sm font-mono tracking-wide py-2.5">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SPEC SECTIONS GRID ───────────────────────────────────────── */}
        <div>
          <h2 className="text-xs font-mono font-bold tracking-[0.25em] text-base-content/30 uppercase mb-5">
            Full Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

            <SectionCard icon="🖥" title="Display">
              <SpecRow label="Size"       value={p.display.size} />
              <SpecRow label="Type"       value={p.display.type} />
              <SpecRow label="Resolution" value={p.display.resolution} />
              <SpecRow label="Refresh"    value={p.display.refresh_rate} />
              <SpecRow label="Protection" value={p.display.protection} />
            </SectionCard>

            <SectionCard icon="⚡" title="Processor">
              <SpecRow label="Chipset" value={p.processor.chipset} />
              <SpecRow label="CPU"     value={p.processor.cpu} />
              <SpecRow label="GPU"     value={p.processor.gpu} />
            </SectionCard>

            <SectionCard icon="💾" title="Memory">
              <SpecRow label="RAM"        value={p.memory.ram} />
              <SpecRow label="Storage"    value={p.memory.rom} />
              <SpecRow label="Expandable" value={p.memory.expandable} />
            </SectionCard>

            <SectionCard icon="📷" title="Camera">
              <SpecRow label="Rear"     value={p.camera.rear} />
              <SpecRow label="Front"    value={p.camera.front} />
              <SpecRow label="Video"    value={p.camera.video} />
              <SpecRow label="Features" value={p.camera.features} />
            </SectionCard>

            <SectionCard icon="🔋" title="Battery">
              <SpecRow label="Capacity"         value={p.battery.capacity} />
              <SpecRow label="Charging"         value={p.battery.charging} />
              <SpecRow label="Wireless"         value={p.battery.wireless} />
              <SpecRow label="Reverse Wireless" value={p.battery.reverse_wireless} />
            </SectionCard>

            <SectionCard icon="📡" title="Connectivity">
              <SpecRow label="Network"   value={p.connectivity.network} />
              <SpecRow label="Wi-Fi"     value={p.connectivity.wifi} />
              <SpecRow label="Bluetooth" value={p.connectivity.bluetooth} />
              <SpecRow label="NFC"       value={p.connectivity.nfc} />
              <SpecRow label="USB"       value={p.connectivity.usb} />
              <SpecRow label="Jack"      value={p.connectivity.jack} />
            </SectionCard>

            {/* Design — spans 2 cols on sm+ */}
            <div className="sm:col-span-2 xl:col-span-2">
              <SectionCard icon="🎨" title="Design">
                <SpecRow label="Dimensions" value={p.design.dimensions} />
                <SpecRow label="Weight"     value={p.design.weight} />
                <SpecRow label="Build"      value={p.design.build} />
                <SpecRow
                  label="Colors"
                  value={
                    <div className="flex gap-3 flex-wrap">
                      {p.design.colors.map((c) => (
                        <span key={c} className="flex items-center gap-1.5 text-sm">
                          <span
                            className="inline-block w-3 h-3 rounded-full border border-base-content/20"
                            style={{ backgroundColor: COLOR_MAP[c] ?? "#888" }}
                          />
                          {c}
                        </span>
                      ))}
                    </div>
                  }
                />
              </SectionCard>
            </div>

            {/* Software */}
            <div className="xl:col-span-1">
              <SectionCard icon="🤖" title="Software">
                <SpecRow label="OS"       value={p.software.os} />
                <SpecRow label="UI Layer" value={p.software.ui} />
                
              </SectionCard>
            </div>

          </div>
        </div>

        {/* ── FOOTER STRIP ─────────────────────────────────────────────── */}
        <div className="divider" />
        
          

      </div>
    </div>
    </>
  );
}