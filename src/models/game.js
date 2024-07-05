import mongoose from "mongoose";
const { Schema } = mongoose;

export const gameSchema = new Schema(
  {
    player1: {
      username: {
        type: String,
        required: true,
      },
      socketId: {
        type: String,
        required: true,
      },
    },
    player2: {
      username: {
        type: String,
        required: true,
      },
      socketId: {
        type: String,
        required: true,
      },
    },
    questionId: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    finished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.game || mongoose.model("game", gameSchema);
