"use client"

import { useState } from "react"
import { useMeeting } from "@videosdk.live/react-sdk"
import StreamView from "./StreamView"

function LSContainer({ streamId, onLeave }) {
  const [joined, setJoined] = useState(false)

  const { join } = useMeeting({
    onMeetingJoined: () => setJoined(true),
    onMeetingLeft: onLeave,
    onError: (error) => alert(error.message),
  })

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Live Stream</h2>
              <p className="text-slate-400 text-sm">Stream ID: {streamId}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm font-medium">{joined ? "LIVE" : "Connecting..."}</span>
            </div>
          </div>
        </div>

        {joined ? (
          <StreamView />
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Stream?</h3>
              <p className="text-slate-400 mb-6">Join the live stream to start broadcasting or watching</p>
              <button
                onClick={join}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 shadow-lg shadow-red-600/30"
              >
                Join Stream
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LSContainer
