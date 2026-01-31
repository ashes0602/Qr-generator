"use client"

import { useState, useRef } from "react"
import QRCode from "qrcode"

export default function QRGenerator() {
  const [input, setInput] = useState("")
  const [qrCode, setQrCode] = useState("")
  const canvasRef = useRef(null)

  const generateQrCode = async () => {
    if (!input) return
    try {
      // High-resolution QR (1000px wide)
      await QRCode.toCanvas(canvasRef.current, input, {
        width: 1000,
        margin: 1,
        color: {
          dark: "#000000",   // QR dots
          light: "#00000000" // transparent background
        },
      })

      // Export as PNG with transparency
      const dataUrl = canvasRef.current.toDataURL("image/png")
      setQrCode(dataUrl)
    } catch (err) {
      console.error("QR generation failed:", err)
    }
  }

  const downloadQr = () => {
    if (!qrCode) return
    const link = document.createElement("a")
    link.href = qrCode
    link.download = "qrcode.png"
    link.click()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 gap-4">
      <h1 className="text-2xl font-bold text-blue-600">High-Res Transparent QR</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or URL"
        className="px-4 py-2 border rounded-lg text-green-500 w-80 shadow-sm"
      />

      <button
        onClick={generateQrCode}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Generate QR
      </button>

      {/* Hidden canvas (used for PNG export) */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* Preview + Download */}
      {qrCode && (
        <div className="flex flex-col items-center gap-3 mt-4">
          <img src={qrCode} alt="QR Code" className="w-64 border p-2 rounded-lg shadow" />
          <button
            onClick={downloadQr}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  )
}
