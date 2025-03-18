import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function generateQuiz(text: string, type: string) {
  try {
    let quiztype: string;

    if (type === "MULTICHOICE") {
      quiztype = "multiple-choice";
    } else if (type === "YESANDNO") {
      quiztype = "yes or no";
    } else {
      quiztype = "multi choice";
    }

    const response = await openai.chat.completions.create({
      model: "gemini-1.5-pro",
      messages: [
        {
          role: "system",
          content: `You are an expert quiz generator. Your task is to output a quiz in valid JSON format only—do not include any extra text or commentary and either multiple choice(4 choices) or yes no questions depending on which you are asked to generate. The JSON should follow this structure:
        [
          {
            "id": "q1",
            "text": "What is the capital of France?",
            "type": "multiple-choice",
            "choices": [
              { "id": "a", "text": "Paris", "isCorrect": true },
              { "id": "b", "text": "Berlin", "isCorrect": false },
              { "id": "c", "text": "Madrid", "isCorrect": false },
              { "id": "d", "text": "Rome", "isCorrect": false }
            ]
          },
          {
            "id": "q2",
            "text": "Is the sky blue?",
            "type": "yes-no",
            "choices": [
              { "id": "a", "text": "Yes", "isCorrect": true },
              { "id": "b", "text": "No", "isCorrect": false }
            ]
          }
        ]
        don't use markdown code block dont add the line brakes, dont add the json backticks, just plain json nothing else. i repeat no markdown code block, nor markdown
        `,
        },
        {
          role: "user",
          content: `Based on the following text:\n\n${text}, generate a quiz with 10 ${quiztype} questions. be sure to generate from the given text`,
        },
      ],
    });
    let rawContent = response.choices[0].message.content || "";

    // Step 1: Remove any markdown code block indicators
    rawContent = rawContent.replace(/```json|```/g, "");

    // Step 2: Clean up common JSON-breaking characters
    rawContent = rawContent.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // Control characters

    // Step 3: Handle escape sequences properly
    rawContent = rawContent.replace(/\\(?!["\\/bfnrt])/g, "\\\\");

    // Step 4: Remove any text before the first '[' and after the last ']'
    const jsonStartIndex = rawContent.indexOf("[");
    const jsonEndIndex = rawContent.lastIndexOf("]");

    if (
      jsonStartIndex !== -1 &&
      jsonEndIndex !== -1 &&
      jsonEndIndex > jsonStartIndex
    ) {
      rawContent = rawContent.substring(jsonStartIndex, jsonEndIndex + 1);
    }

    // Step 5: Attempt to fix common JSON syntax errors
    // Fix missing commas between objects in an array
    rawContent = rawContent.replace(/}\s*{/g, "},{");
    // Fix trailing commas in arrays/objects
    rawContent = rawContent.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

    // Step 6: Protect against unclosed quotes
    const fixQuotes = (str: string) => {
      let inString = false;
      let escaped = false;
      let result = "";

      for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (escaped) {
          escaped = false;
          result += char;
          continue;
        }

        if (char === "\\") {
          escaped = true;
          result += char;
          continue;
        }

        if (char === '"') {
          inString = !inString;
        }

        result += char;
      }

      // If there's still an unclosed string at the end, add a closing quote
      if (inString) {
        result += '"';
      }
      console.log("result");
      console.log(Array.isArray(result));
      return result;
    };

    rawContent = fixQuotes(rawContent);

    // Final attempt: Try to parse, and if it fails, use a more lenient approach
    try {
      const parsedData = JSON.parse(rawContent);
      console.log("parsed data");
      console.log(Array.isArray(parsedData));
      return parsedData;
    } catch (parseError) {
      console.log("Initial parsing failed, trying fallback method");

      // Fallback method: Use a lenient JSON parser like
      // TODO use json-repair
      // temporary, a simple structure validation
      try {
        if (
          rawContent.trim().startsWith("[") &&
          rawContent.trim().endsWith("]")
        ) {
          // Extract each question object and validate individually
          const questionStrings = rawContent
            .trim()
            .slice(1, -1)
            .split(/},\s*{/)
            .map((str, i) => (i === 0 ? str : "{" + str))
            .map((str, i, arr) => (i === arr.length - 1 ? str : str + "}"));

          const validQuestions = [];

          for (let qStr of questionStrings) {
            try {
              // Try to fix and parse each question object
              qStr = qStr.trim();
              if (!qStr.startsWith("{")) qStr = "{" + qStr;
              if (!qStr.endsWith("}")) qStr += "}";

              const question = JSON.parse(qStr);
              if (
                question.id &&
                question.text &&
                question.type &&
                Array.isArray(question.choices)
              ) {
                validQuestions.push(question);
              }
            } catch (e) {
              console.log("Skipping invalid question", e);
            }
          }

          if (validQuestions.length > 0) {
            console.log("validated questions");
            console.log(Array.isArray(validQuestions));
            return validQuestions;
          }
        }

        throw new Error("Could not recover valid JSON structure");
      } catch (fallbackError) {
        console.log("Fallback parsing failed", fallbackError);
        console.log(
          JSON.stringify({
            message: "Failed to parse AI response into valid JSON",
            rawContent: rawContent.substring(0, 500) + "...",
          })
        );
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
