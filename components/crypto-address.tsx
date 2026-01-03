"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CryptoAddressProps {
  address: string
  currency: "BTC" | "ETH"
  imageUrl: string
}

export function CryptoAddress({ address, currency, imageUrl }: CryptoAddressProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      // Fallback method for environments where clipboard API isn't available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(address)
      } else {
        // Old-school fallback
        const textArea = document.createElement("textarea")
        textArea.value = address
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <img src={imageUrl} alt={currency} className="h-32 w-auto" />
      <button
        onClick={copyToClipboard}
        className="group flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-muted hover:bg-muted/80 rounded-md transition-colors"
        title={`Click to copy ${currency} address`}
      >
        <span className="max-w-[200px] truncate">{address}</span>
        {copied ? (
          <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
        ) : (
          <Copy className="h-3 w-3 text-muted-foreground group-hover:text-foreground flex-shrink-0" />
        )}
      </button>
    </div>
  )
}
