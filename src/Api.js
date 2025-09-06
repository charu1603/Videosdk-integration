
export const authToken = import.meta.env.VITE_AUTH_TOKEN;

// VideoSDK API configuration
// Replace with your actual token

export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })

  const { roomId } = await res.json()
  return roomId
}

export const createStream = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })

  const { roomId } = await res.json()
  return roomId
}
