"use client"

import { useEffect, useRef } from "react"
import { useParticipant, VideoPlayer } from "@videosdk.live/react-sdk"

function ParticipantView({ participantId }) {
  const micRef = useRef(null)
  const { micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId)

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream([micStream.track])
        micRef.current.srcObject = mediaStream

        micRef.current.play().catch((err) => console.error("micRef.current.play() failed", err))
      } else {
        micRef.current.srcObject = null
      }
    }
  }, [micStream, micOn])

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      {/* Video Container */}
      <div className="relative aspect-video bg-slate-900">
        {webcamOn ? (
          <VideoPlayer
            participantId={participantId}
            type="video"
            containerStyle={{ height: "100%", width: "100%" }}
            className="w-full h-full object-cover"
            classNameVideo="w-full h-full object-cover rounded-t-xl"
          />
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
            <div className="bg-blue-600 px-2 py-1 rounded-full">
              <span className="text-xs text-white font-medium">You</span>
            </div>
          )}
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

      <audio ref={micRef} autoPlay muted={isLocal} />
    </div>
  )
}

export default ParticipantView
