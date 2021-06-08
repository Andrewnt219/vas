import { Result } from "@common";
import { createResult, createResultError } from "@utils/create-utils";
import { defaults } from "autoprefixer";
import { NextApiHandler, NextApiRequest } from "next";
import { apiHanler, getLocaleCookie } from "@src/server/utils/api-utils";

export type HashtagsUidGet = Result<string>;
const get: NextApiHandler<HashtagsUidGet> = async (req, res) => {
  const { uid } = req.query;

  if (typeof uid !== "string") {
    return res.status(400).json(createResultError(""));
  }

  return res.status(200).json(createResult(uid));
};

export default apiHanler({ get });
