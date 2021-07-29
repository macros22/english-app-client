import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

(async function getWords(){
  const words = await fetch('http://localhost:3000/words.txt');
  console.log(words);
})();

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { limit, page } = req.query;
   console.log(limit, page)
  res.status(200).json({ name: "John Doe" });
};
