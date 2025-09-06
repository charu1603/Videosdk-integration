"use client"

import { useState } from "react"
import { useMeeting } from "@videosdk.live/react-sdk"
import Controls from "./Controls"
import ParticipantView from "./ParticipantView"

function MeetingView({ meetingId, onMeetingLeave }) {
  const [joined, setJoined] = useState(null)
  const { join, participants } = useMeeting({
    onMeetingJoined: () => setJoined("JOINED"),
    onMeetingLeft: onMeetingLeave,
  })

  const joinMeeting = () => {
    setJoined("JOINING")
    join()
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Meeting Room</h2>
              <p className="text-slate-400 text-sm">ID: {meetingId}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                {joined === "JOINED" ? "Connected" : "Connecting..."}
              </span>
            </div>
          </div>
        </div>

        {joined === "JOINED" ? (
          <div className="space-y-6">
            {/* Controls */}
            <Controls />

            {/* Participants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...participants.keys()].map((participantId) => (
                <ParticipantView key={participantId} participantId={participantId} />
              ))}
            </div>
          </div>
        ) : joined === "JOINING" ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">Joining the meeting...</p>
              <p className="text-slate-400">Please wait while we connect you</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Join?</h3>
              <p className="text-slate-400 mb-6">Click the button below to enter the meeting room</p>
              <button
                onClick={joinMeeting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-600/30"
              >
                Join Meeting
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MeetingView
