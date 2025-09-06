"use client"

import { useEffect, useRef } from "react"
import { useParticipant } from "@videosdk.live/react-sdk"

function Participant({ participantId }) {
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId)

  const audioRef = useRef(null)
  const videoRef = useRef(null)

  const setupStream = (stream, ref, condition) => {
    if (ref.current && stream) {
      ref.current.srcObject = condition ? new MediaStream([stream.track]) : null
      if (condition) {
        ref.current.play().catch(console.error)
      }
    }
  }

  useEffect(() => setupStream(micStream, audioRef, micOn), [micStream, micOn])
  useEffect(() => setupStream(webcamStream, videoRef, webcamOn), [webcamStream, webcamOn])

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      {/* Video Container */}
      <div className="relative aspect-video bg-slate-900">
        {webcamOn ? (
          <video ref={videoRef} autoPlay muted={isLocal} className="w-full h-full object-cover rounded-t-xl" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="absolute top-2 right-2 flex space-x-1">
          {!micOn && (
            <div className="bg-red-600 p-1 rounded-full">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M13.22 3.22a.75.75 0 011.06 0L16 4.94l1.72-1.72a.75.75 0 111.06 1.06L17.06 6l1.72 1.72a.75.75 0 01-1.06 1.06L16 7.06l-1.72 1.72a.75.75 0 01-1.06-1.06L14.94 6l-1.72-1.72a.75.75 0 010-1.06z"
                />
              </svg>
            </div>
          )}
          {isLocal && (
            <div className="bg-red-600 px-2 py-1 rounded-full">
              <span className="text-xs text-white font-medium">Host</span>
            </div>
          )}
          <div className="bg-red-600/90 px-2 py-1 rounded-full">
            <span className="text-xs text-white font-medium">LIVE</span>
          </div>
        </div>
      </div>

      {/* Participant Info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-medium truncate">{displayName || "Anonymous"}</h4>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${webcamOn ? "bg-green-500" : "bg-gray-500"}`}></div>
            <div className={`w-2 h-2 rounded-full ${micOn ? "bg-green-500" : "bg-red-500"}`}></div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} autoPlay muted={isLocal} />
    </div>
  )
}

export default Participant
