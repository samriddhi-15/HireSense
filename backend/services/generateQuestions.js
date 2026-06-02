
import axios from "axios";

export const generateQuestions = async ({
    role,
    experience,
    interviewType,
    difficulty,
}) => {

    try {
        const randomSeed =
            Math.floor(Math.random() * 100000);

        const interviewStyles = [
            "real-world",
            "debugging",
            "architecture",
            "behavioral",
            "system-design",
            "optimization"
        ];

        const randomStyle =
            interviewStyles[
            Math.floor(
                Math.random() *
                interviewStyles.length
            )
            ];

        const prompt = `
You are an expert AI interviewer.

Generate 5 UNIQUE interview questions.

Role: ${role}
Experience Level: ${experience}
Interview Type: ${interviewType}
Difficulty: ${difficulty}
Interview Seed: ${randomSeed}
Interview Focus: ${randomStyle}

Requirements:

- Every interview must be different.
- Avoid common interview questions.
- Do NOT repeat React performance, state management, accessibility, CSS Grid vs Flexbox, or responsive design unless absolutely necessary.
- Mix technical, scenario-based, architecture, debugging, behavioral and real-world questions.
- Questions should feel like they are coming from a real interviewer.
- Make each generated set different from previous interviews.
- Prefer practical situations over theory.

Return ONLY a valid JSON array.

Example:

[
  "Describe a production bug you would expect in a React application with thousands of users and how you would investigate it.",
  "How would you design a reusable component library for multiple frontend teams?"
]
`;
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",

            {
                model: "deepseek/deepseek-chat-v3-0324",

                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],

                temperature: 1.1,

                max_tokens: 500,
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        let content =
            response.data.choices[0].message.content;

        console.log("RAW AI RESPONSE:", content);

        // Remove markdown formatting
        content = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedQuestions = JSON.parse(content);

        if (
            !Array.isArray(parsedQuestions) ||
            parsedQuestions.length === 0
        ) {
            throw new Error("Invalid question format");
        }

        return parsedQuestions;

    } catch (error) {

        console.log(
            "QUESTION AI ERROR:",
            error.response?.data ||
            error.message
        );

        return [

            "Tell me about yourself",

            "Explain React hooks",

            "What is closure in JavaScript?",

            "How do APIs work?",

            "Explain event bubbling"

        ];

    }

};