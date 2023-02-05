// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { redisClient } from "@/utils/redisClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  const key = generateKey(6);

  // Todo: while loop to avoid collisions
  try {
    await redisClient.hmset(key, { ...body.location, views: 0, following: 0 });
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ key });
}

function generateKey(length: number = 5) {
  let key = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i <= length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}

export const config = {
  api: {
    bodyParser: true,
  },
};
