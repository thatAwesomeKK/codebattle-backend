let matchAck = [];

export default async function (username, roomId, io, cb) {
  const matchFound = matchAck.includes(roomId);
  console.log(matchFound);

  if (!matchFound) {
    matchAck.push(roomId);
  } else {
    await io.to(roomId).emit("starting", {
      start: true,
    });
    matchAck = matchAck.filter((matchRoomId) => matchRoomId !== roomId);
  }
}
