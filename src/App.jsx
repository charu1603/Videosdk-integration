"use client"

import "./App.css"
import { useState } from "react"
import { MeetingProvider, MeetingConsumer, Constants } from "@videosdk.live/react-sdk"
import { authToken, createMeeting, createStream } from "./Api"

import JoinScreen from "./components/meeting/JoinScreen"
import MeetingView from "./components/meeting/MeetingView"

import JoinView from "./components/livestream/JoinView"
import LSContainer from "./components/livestream/LSContainer"

function App() {
  const [type, setType] = useState(null) // meeting | livestream
  const [sessionId, setSessionId] = useState(null)
  const [mode, setMode] = useState(Constants.modes.SEND_AND_RECV)

  const getMeeting = async (id) => {
    const newMeetingId = id || (await createMeeting({ token: authToken }))
    setSessionId(newMeetingId)
    setType("meeting")
  }

  const getStream = async (id, mode) => {
    const newStreamId = id || (await createStream({ token: authToken }))
    setSessionId(newStreamId)
    setMode(mode)
    setType("livestream")
  }

  const onLeave = () => {
    setSessionId(null)
    setType(null)
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">VideoConnect</h1>
            <p className="text-blue-200">Choose your connection mode</p>
          </div>

          <div className="space-y-4 mb-6">
            <button
              onClick={() => setType("meeting")}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                type === "meeting"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span>Meeting</span>
              </div>
            </button>

            <button
              onClick={() => setType("livestream")}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                type === "livestream"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z"
                  />
                </svg>
                <span>Live Stream</span>
              </div>
            </button>
          </div>

          {type === "meeting" && <JoinScreen getMeetingAndToken={getMeeting} />}
          {type === "livestream" && <JoinView initializeStream={(id) => getStream(id, mode)} setMode={setMode} />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <MeetingProvider
        config={{
          meetingId: sessionId,
          micEnabled: true,
          webcamEnabled: true,
          name: "John Doe",
          ...(type === "livestream" && { mode }),
        }}
        token={authToken}
      >
        <MeetingConsumer>
          {() =>
            type === "meeting" ? (
              <MeetingView meetingId={sessionId} onMeetingLeave={onLeave} />
            ) : (
              <LSContainer streamId={sessionId} onLeave={onLeave} />
            )
          }
        </MeetingConsumer>
      </MeetingProvider>
    </div>
  )
}

export default App
