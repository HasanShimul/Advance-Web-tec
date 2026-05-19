'use client'
import Pusher from "pusher-js";

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

if (!PUSHER_KEY) {
    throw new Error("Missing NEXT_PUBLIC_PUSHER_KEY in .env.local");
}

if (!PUSHER_CLUSTER) {
    throw new Error("Missing NEXT_PUBLIC_PUSHER_CLUSTER in .env.local");
}

const pusher = new Pusher(PUSHER_KEY, {
    cluster: PUSHER_CLUSTER,
});

export default pusher;