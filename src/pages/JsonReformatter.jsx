import { useState } from "react"

function formatJson(inputJson) {
  try {
    const data = JSON.parse(inputJson)
    if (!Array.isArray(data)) {
      throw new Error("Input JSON must be an array")
    }

    return JSON.stringify(
      data.map((item) => {
        const correctAnswers = item.options
          .map((option, index) => {
            if (option.isCorrect)
              return option.isCorrect ? index + 1 : null
          })
          .filter((index) => index !== null)

        return {
          type: "multiple choice",
          topics: [item.domain, "Scenario"],
          question: item.question,
          options: item.options.map((option) => option.text),
          answers: correctAnswers,
          explanation: `${item.correctAnswerExplanation} (${item.reference.guide}, ${item.reference.year}, pp. ${item.reference.pages.join(", ")}, Principle: ${item.reference.principle})`
        }
      }),
      null,
      2
    )
  } catch (error) {
    return "Invalid JSON format: " + error.message
  }
}

function JsonReformatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  function handleConvert() {
    setOutput(formatJson(input))
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">JSON Reformatter</h2>
      <textarea
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-40 p-2 border rounded mb-4"
      />
      <button onClick={handleConvert} className="btn btn-primary mb-4">Convert</button>
      {output && (
        <div className="card bg-base-100 shadow-xl p-4">
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
        </div>
      )}
    </div>
  )
}

export default JsonReformatter