export const authToken = import.meta.env.VITE_AUTH_TOKEN;

const createRoom = async (token) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};

export const createMeeting = async ({ token }) => {
  return await createRoom(token);
};

export const createStream = async ({ token }) => {
  return await createRoom(token);
};
