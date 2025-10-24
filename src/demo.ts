// Demo script to test AI response functionality
// You can call this function to simulate AI responses during development

export const demoResponses = [
  "Hello! I'm GoZeroing AI, your advanced voice assistant. How can I help you today?",
  "I understand you're looking for information. Let me help you with that. What specifically would you like to know?",
  "That's an interesting question! Based on my analysis, here's what I found...",
  "I'm processing your request. Please give me a moment to provide you with the most accurate response.",
  "Thank you for your patience. Here's my response to your query...",
  "I can help you with a wide range of topics. Feel free to ask me anything!",
  "Let me break this down for you step by step...",
  "Based on the latest information available, here's what I recommend...",
  "I understand your concern. Let me provide you with some helpful insights...",
  "That's a great question! Here's my detailed response..."
]

export const simulateAIResponse = (_text: string) => {
  // This would be replaced with actual AI API integration
  const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)]

  // Simulate API delay
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(randomResponse)
    }, 1000 + Math.random() * 2000) // 1-3 second delay
  })
}

// Example usage:
// simulateAIResponse("What is the weather like?").then(response => {
//   console.log("AI Response:", response)
// })

// Integration example for your backend:
// const handleVoiceInput = async (audioData: Blob) => {
//   try {
//     const formData = new FormData()
//     formData.append('audio', audioData)
//
//     const response = await fetch('/api/transcribe', {
//       method: 'POST',
//       body: formData
//     })
//
//     const { text } = await response.json()
//
//     // Send to AI API
//     const aiResponse = await fetch('/api/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message: text })
//     })
//
//     const { response: aiText } = await aiResponse.json()
//
//     // Use the simulateAIResponse function with the actual AI text
//     return aiText
//   } catch (error) {
//     console.error('Error processing voice input:', error)
//     throw error
//   }
// }
