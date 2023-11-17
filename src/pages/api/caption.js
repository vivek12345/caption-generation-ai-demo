import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const handler = async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Write a catchy instagram caption for this image`,
            },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 300,
    });
    res.status(200).json(response.choices[0].message.content);
  } catch (error) {
    res.status(500).json({
      error: {
        message: "An error occurred during the request.",
      },
    });
  }
};

export default handler;
