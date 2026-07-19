"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Pill } from "./ui";

interface CryptoNetwork {
  id: string;
  label: string;
  chainTag: string;
  address: string;
}

// Addresses provided directly by Dave — transcribed by hand, not through a
// model, since a single wrong character here means lost funds. Verify
// against the source before ever changing these.
const NETWORKS: CryptoNetwork[] = [
  { id: "bep20", label: "USDT", chainTag: "BEP-20 (BNB Smart Chain)", address: "0x185DeDdA0Ec7b2b5f30E483D63b5e88E17114dbC" },
  { id: "trc20", label: "USDT", chainTag: "TRC-20 (Tron)", address: "TAAMxLfuvzv195KWxpZLP2LXbrJv628i1y" },
  { id: "sol", label: "USDT", chainTag: "Solana", address: "AYBxNHuYoyrvvoaWTGy95r7tsLZwLDa75rVxZHxvqzVs" },
];

export default function CryptoPaymentInfo() {
  const [selected, setSelected] = useState(NETWORKS[0].id);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const active = NETWORKS.find((n) => n.id === selected)!;

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(active.address, { margin: 1, width: 220 })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [active.address]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(active.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can be unavailable (permissions, insecure context) —
      // the address is still shown as selectable text either way.
    }
  };

  return (
    <div className="mt-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Or pay with crypto</p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {NETWORKS.map((n) => (
          <Pill key={n.id} active={n.id === selected} onClick={() => setSelected(n.id)}>
            {n.chainTag}
          </Pill>
        ))}
      </div>

      <div className="mt-3 flex flex-col items-center gap-2 rounded-xl border border-line bg-surface2/40 p-3">
        {qrDataUrl ? (
          // Plain <img> for a locally-generated data: URL — next/image's
          // optimizer doesn't apply to data URLs and isn't needed here.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrDataUrl} alt={`${active.label} ${active.chainTag} address QR code`} className="h-40 w-40 rounded-lg" />
        ) : (
          <div className="h-40 w-40 animate-pulse rounded-lg bg-surface2/60" />
        )}

        <button
          onClick={copyAddress}
          className="w-full break-all rounded-lg border border-line bg-surface2/60 px-2 py-1.5 text-center font-mono text-[10px] text-text hover:border-accent/60"
        >
          {active.address}
        </button>
        <p className="text-[10px] text-muted">{copied ? "Copied!" : "Tap the address to copy"}</p>
        <p className="text-center text-[10px] text-bear">
          Send {active.label} on {active.chainTag} only — funds sent on the wrong network can&apos;t be recovered.
        </p>
        <p className="mt-1 text-[10px] text-muted">
          Message Dave your transaction hash on WhatsApp after sending — he&apos;ll confirm and unlock it manually.
        </p>
      </div>
    </div>
  );
}
