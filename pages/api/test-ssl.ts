import type { NextApiRequest, NextApiResponse } from 'next';
import { request, gql } from 'graphql-request';

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if ( req.method !== 'POST') {
    return res.status(401).json({
      message: 'Request must be POST',
    });
  }

  if (req.headers.authorization !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({
      message: 'Wrong API KEY',
    });
  }

  let count = 0;
  const interval = setInterval(async () => {
    try {
      const response = await request(
        `${process.env.API_ENDPOINT}`,
        gql`
            query {
                pages {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        `,
      );

      console.log("Success");
      console.log(response);
    } catch (error) {
      console.log("Error");
      console.log(error);
    }

    count++;

    if (count === 10) {
      clearInterval(interval);
    }
  }, 1000);

  res.status(200).json({
    message: 'See console for insights on the test.',
  });
}
