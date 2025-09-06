"use client"

import { useState } from "react"
import { Constants } from "@videosdk.live/react-sdk"

function JoinView({ initializeStream, setMode }) {
  const [streamId, setStreamId] = useState("")

  const handleAction = async (mode) => {
    setMode(mode)
    await initializeStream(streamId)
  }

  return (
    <div className="space-y-6">
      <div>
        <input
          type="text"
          placeholder="Enter Stream ID (optional)"
          value={streamId}
          onChange={(e) => setStreamId(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      <div className="space-y-3">
        <button
          onClick={() => handleAction(Constants.modes.SEND_AND_RECV)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg shadow-red-600/30"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <span>Create Live Stream as Host</span>
          </div>
        </button>

        <div className="flex space-x-3">
          <button
            onClick={() => handleAction(Constants.modes.SEND_AND_RECV)}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg shadow-orange-600/30"
          >
            Join as Host
          </button>
          <button
            onClick={() => handleAction(Constants.modes.RECV_ONLY)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg shadow-purple-600/30"
          >
            Join as Audience
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinView
