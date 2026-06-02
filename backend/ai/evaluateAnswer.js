import axios from "axios";

export const evaluateAnswer = async (
    question,
    answer
) => {
    if (!answer || answer.trim().length < 5) {
        return {
            score: 0,
            feedback: "Answer too short.",
            confidence: 0,
            communication: 0,
            technicalAccuracy: 0,
            fluency: 0,
            problemSolving: 0
        };
    }

    try {

        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {

                model:
                    "openai/gpt-3.5-turbo",

                messages: [

                    {
                        role: "system",

                        content:
                            "You are an AI interview evaluator. Return ONLY valid JSON."
                    },

                    {
                        role: "user",

                        content: `

You are an AI interview evaluator.

Address the user directly.

Use phrases like:

"Your answer demonstrates..."
"You explained..."
"You showed..."

Never say:
"The candidate..."

Evaluate the answer strictly.
Scoring guide:

0-20 = irrelevant, nonsense, empty
21-40 = weak answer
41-60 = partially correct
61-80 = good answer
81-100 = excellent answer

Return ONLY valid JSON.


Question:
${question}

Candidate Answer:
${answer}

Evaluation Rules:

- If the answer is nonsense, random characters, irrelevant text, or does not answer the question, score below 20.
- If the answer is very short and lacks substance, score below 40.
- Give high scores only when the answer is technically correct, relevant, and well explained.
- Be strict.
- Do NOT be encouraging if the answer is poor.

Return ONLY valid JSON in this exact format:

{
  "score": number,
  "feedback": "specific feedback",
  "confidence": number,
  "communication": number,
  "technicalAccuracy": number,
  "fluency": number,
  "problemSolving": number
}
`
                    }

                ]

            },

            {

                headers: {

                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type":
                        "application/json"

                }

            }

        );

        const text =
            response.data
                .choices[0]
                .message.content;

        console.log(
            "AI RESPONSE:",
            text
        );

        const cleaned =
            text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

        return JSON.parse(cleaned);

    } catch (error) {

        console.log(
            "OPENROUTER ERROR:"
        );

        console.log(
            error.response?.data || error
        );

        return {

            score: 50,

            feedback:
                "AI evaluation failed.",

            confidence: 50,

            communication: 50,

            technicalAccuracy: 50,

            fluency: 50,

            problemSolving: 50

        };

    }

};