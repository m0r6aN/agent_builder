import os

os.environ["OPENAI_API_KEY"] = "sk-proj-XpsMgTpshWkxnunqn3ceT3BlbkFJhUbwD1rTw0V2tLRKQJdb"
os.environ["GROQ_API_KEY"] = "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"
# Replace with your model provider, we use Anyscale's Mixtral here.
os.environ["ANYSCALE_API_KEY"] = "!24124"

from routellm.controller import Controller

client = Controller(
    routers=["mf"],
    strong_model="gpt-4o",
    weak_model="groq/llama3-8b-8192"
)

response = client.chat.completions.create(
    # This tells RouteLLM to use the MF router with a cost threshold of 0.11593
    model="router-mf-0.11593",
    messages=[
        {"role": "user", "content": "Write the snake game in Python"}
    ]
)

message_content = response['choices'][0]['message']['content']
model_name = response['model']

print (f"Message content: {message_content}")
print (f"Model used: {model_name}")