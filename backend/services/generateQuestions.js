import axios from "axios";

export const generateQuestions = async ({
    role,
    experience,
    interviewType,
    difficulty,
    resumeText,
    jdText
}) => {
    console.log("GENERATE QUESTIONS FUNCTION CALLED");
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

        let mode = "generic";

        if (resumeText && jdText)
            mode = "personalized";

        else if (resumeText)
            mode = "resume";

        else if (jdText)
            mode = "jd";

        const prompt = `
You are a Senior Technical Interviewer at a top technology company.

Your job is to generate highly realistic interview questions.

Interview Context

Role: ${role}
Experience Level: ${experience}
Interview Type: ${interviewType}
Difficulty: ${difficulty}
Interview Mode: ${mode}

Resume:
${resumeText || "Not Provided"}

Job Description:
${jdText || "Not Provided"}

====================================
INTERVIEW GENERATION RULES
==========================

Determine the interview strategy based on Interview Mode.

1. GENERIC MODE
   (Resume not provided, JD not provided)

Generate questions based on:

* Role
* Experience level
* Interview type
* Difficulty

Questions should resemble a real company interview.

====================================

2. RESUME MODE
   (Resume provided, JD not provided)

The resume is the PRIMARY source.

Question Distribution:

* 2 questions from projects
* 1 question from work experience
* 1 question from technologies used
* 1 question from achievements or impact

Requirements:

* Explicitly reference project names when possible
* Explicitly reference technologies when possible
* Explicitly reference accomplishments when possible
* Avoid generic textbook questions

Bad Example:
"Explain REST APIs."

Good Example:
"In your RupeeBee project, how did you achieve low-latency responses while handling thousands of requests?"

====================================

3. JD MODE
   (JD provided, Resume not provided)

The Job Description is the PRIMARY source.

Question Distribution:

* 3 questions from required skills
* 1 scenario-based question
* 1 behavioral or practical question

Requirements:

* Focus on skills listed in the JD
* Simulate a recruiter screening for this role

====================================

4. PERSONALIZED MODE
   (Resume and JD both provided)

Perform a resume-to-job matching analysis.

Question Distribution:

* 2 questions from resume projects
* 2 questions from JD requirements
* 1 skill-gap question

Requirements:

* Compare candidate experience against JD requirements
* Identify missing or weak areas
* Ask realistic recruiter-style questions
* Mention project names whenever possible
* Mention required skills whenever possible

Example Skill Gap Question:

"Your resume shows extensive Node.js experience, but the JD emphasizes distributed systems. How would you prepare for that responsibility?"

====================================

# GLOBAL RULES

* Generate EXACTLY 5 questions
* Every question must be unique
* Prefer practical scenarios over theory
* Avoid cliché interview questions
* Avoid generic questions unless absolutely necessary
* Questions should sound like they come from an experienced interviewer
* Difficulty should match the selected difficulty level
* Experience level should influence depth and complexity
* Return ONLY a valid JSON array

Output Example:

[
"Question 1",
"Question 2",
"Question 3",
"Question 4",
"Question 5"
]
`;

        console.log("================================");
        console.log("MODE:", mode);
        console.log("ROLE:", role);
        console.log("RESUME LENGTH:", resumeText?.length || 0);
        console.log("JD LENGTH:", jdText?.length || 0);

        if (resumeText) {
            console.log(
                "RESUME START:",
                resumeText.substring(0, 1000)
            );
        }

        console.log("================================");
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