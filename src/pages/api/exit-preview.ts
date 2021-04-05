import { NextApiRequest, NextApiResponse } from "next";

const exitPreview = (_: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();

  res.writeHead(307, { Location: "/" });
  res.end();
};

export default exitPreview;
