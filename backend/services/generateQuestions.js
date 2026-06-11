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

Your task is to generate highly realistic interview questions that closely resemble actual interviews conducted by companies.

Interview Context:

Role: ${role}
Experience Level: ${experience}
Interview Type: ${interviewType}
Difficulty: ${difficulty}
Interview Mode: ${mode}

Resume:
${resumeText || "Not Provided"}

Job Description:
${jdText || "Not Provided"}

====================================================
INTERVIEW STRATEGY
==================

Determine the interview strategy based on Interview Mode.

---

1. GENERIC MODE
   (Resume NOT provided, JD NOT provided)

---

Generate questions using:

* Role
* Experience Level
* Interview Type
* Difficulty

Question Distribution:

* 3 Technical Questions
* 1 Scenario-Based Question
* 1 Behavioral Question

---

2. RESUME MODE
   (Resume provided, JD NOT provided)

---

The Resume is the PRIMARY source.

MANDATORY QUESTION DISTRIBUTION:

* 2 Questions from Projects
* 1 Question from Internship / Work Experience
* 1 Question from Technologies Used
* 1 Question from Achievements / Impact

STRICT RULES:

* Mention actual project names.
* Mention actual company names.
* Mention actual technologies.
* Mention actual achievements.
* Mention actual metrics if available.

Examples:

GOOD:
"Your RupeeBee project handled 6K+ requests with under 200ms latency. What architectural decisions helped achieve that performance?"

GOOD:
"During your internship at Karta AI, you built MCP servers and agent pipelines. What was the most technically challenging problem you solved?"

BAD:
"Explain REST APIs."

BAD:
"What is Node.js?"

At least 4 out of 5 questions MUST explicitly reference information found in the resume.

---

3. JD MODE
   (JD provided, Resume NOT provided)

---

The Job Description is the PRIMARY source.

Question Distribution:

* 3 Questions from Required Skills
* 1 Scenario-Based Question
* 1 Behavioral Question

Requirements:

* Evaluate readiness for the role.
* Focus on responsibilities listed in the JD.
* Focus on tools and technologies listed in the JD.
* Simulate a real recruiter or hiring manager interview.

---

4. PERSONALIZED MODE
   (Resume provided AND JD provided)

---

Perform Resume-to-JD matching analysis.

MANDATORY QUESTION DISTRIBUTION:

* 2 Resume-Based Questions
* 2 JD-Based Questions
* 1 Skill-Gap Question

Requirements:

* Compare resume against JD.
* Identify strengths.
* Identify missing skills.
* Identify weak areas.
* Ask realistic recruiter-style questions.

Example:

"Your resume highlights extensive Node.js and FastAPI experience, while the JD emphasizes distributed systems and Kubernetes. How would you prepare to handle those responsibilities?"

---

## QUESTION QUALITY RULES

Questions must:

* Sound like a real interviewer.
* Be practical.
* Be scenario-based whenever possible.
* Assess real-world decision making.
* Test depth of understanding.
* Avoid textbook definitions.
* Avoid trivia.
* Avoid repetitive topics.

Prefer questions about:

* Architecture decisions
* Debugging
* Scalability
* Performance optimization
* Production incidents
* Trade-offs
* Collaboration
* System design
* Business impact

---

## CRITICAL VALIDATION RULES

If Resume is provided:

At least FOUR questions MUST contain one or more of:

* Project Names
* Company Names
* Technology Names
* Achievements
* Metrics

from the resume.

If JD is provided:

At least TWO questions MUST directly reference requirements from the JD.

If Resume and JD are both provided:

Questions MUST contain information from BOTH sources.

DO NOT generate generic role-based questions when Resume or JD content is available.

====================================================
OUTPUT FORMAT
=============

Generate EXACTLY 5 questions.

Return ONLY a valid JSON array.

Example:

[
"Question 1",
"Question 2",
"Question 3",
"Question 4",
"Question 5"
]
`
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

        const match = content.match(/\[[\s\S]*\]/);

        if (!match) {
            throw new Error("No JSON array found");
        }

        const parsedQuestions = JSON.parse(match[0]);
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