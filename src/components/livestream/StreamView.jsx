import { useMeeting, Constants } from "@videosdk.live/react-sdk"
import LSControls from "./LSControls"
import Participant from "./Participant"

function StreamView() {
  const { participants } = useMeeting()

  return (
    <div className="space-y-6">
      {/* Controls */}
      <LSControls />

      {/* Participants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...participants.values()]
          .filter((p) => p.mode === Constants.modes.SEND_AND_RECV)
          .map((p) => (
            <Participant participantId={p.id} key={p.id} />
          ))}
      </div>

      {/* Audience Count */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-white font-medium">
            {[...participants.values()].filter((p) => p.mode === Constants.modes.RECV_ONLY).length} viewers watching
          </span>
        </div>
      </div>
    </div>
  )
}

export default StreamView
