"use client"
import { useMeeting, Constants } from "@videosdk.live/react-sdk"

function LSControls() {
  const { leave, toggleMic, toggleWebcam, changeMode, meeting } = useMeeting()
  const currentMode = meeting.localParticipant.mode

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
      <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
        {currentMode === Constants.modes.SEND_AND_RECV && (
          <>
            <button
              onClick={toggleMic}
              className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl transition-colors duration-200"
              title="Toggle Microphone"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                />
              </svg>
            </button>

            <button
              onClick={toggleWebcam}
              className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl transition-colors duration-200"
              title="Toggle Camera"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </button>
          </>
        )}

        <button
          onClick={() =>
            changeMode(
              currentMode === Constants.modes.SEND_AND_RECV ? Constants.modes.RECV_ONLY : Constants.modes.SEND_AND_RECV,
            )
          }
          className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
            currentMode === Constants.modes.SEND_AND_RECV
              ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30"
              : "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/30"
          }`}
        >
          {currentMode === Constants.modes.SEND_AND_RECV ? "Switch to Audience" : "Switch to Host"}
        </button>

        <button
          onClick={leave}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-red-600/30"
        >
          Leave Stream
        </button>
      </div>
    </div>
  )
}

export default LSControls
