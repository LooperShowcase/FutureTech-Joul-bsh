

let Ai_Response;
let chat = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "hi ,how can I help you today?" },
];

async function ChatAddUser(feeling, question) {
  chat.push({
    role: "user",
    content: "i am happy from 0-10: " + feeling + ".my input is: " + question,
  });
}

async function ChatAddAI(res) {
  chat.push({ role: "assistant", content: "sure here" + res });
}

async function openaitest() {
  let url = "https://api.openai.com/v1/chat/completions";
  
  let k1 = "sk";
  let k2 = "-LLDtZIQbt300rIyi";
  let k3 = "Bm5LT3BlbkFJwntYQJzMl3xlkgLt63pM";
 
  let API_Key = k1 + k2 + k3;
  
  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  }

  try {
    const response = await fetch(url ,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization : `Bearer ${API_Key}`
      },
      body: JSON.stringify(data)
    })   
    if (response.ok) {
      const ResponseData = await response.json()
      const message =ResponseData.choices[0].message.content

      ChatAddAI(message)

      const speech = new SpeechSynthesisUtterance(message)
      speechSynthesis.speak(speech)
      return(message)
    }
  } catch (error) {
    console.log("something's wrong : "+error);
  }

}

