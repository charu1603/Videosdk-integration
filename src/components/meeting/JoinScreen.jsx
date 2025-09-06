"use client"

import { useState } from "react"

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState("")

  const handleJoinOrCreate = async () => {
    await getMeetingAndToken(meetingId)
  }

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Enter Meeting ID (optional)"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleJoinOrCreate}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-600/30"
        >
          Join Meeting
        </button>
        <button
          onClick={() => handleJoinOrCreate()}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg shadow-green-600/30"
        >
          Create Meeting
        </button>
      </div>
    </div>
  )
}

export default JoinScreen
