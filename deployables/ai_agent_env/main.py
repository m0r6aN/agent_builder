from agents.chatbot import ChatBot
from actions.basic_actions import known_actions
from prompts.react_prompt import REACT_PROMPT

def main():
    agent = ChatBot(known_actions, REACT_PROMPT)
    question = "What is the current state of quantum computing?"
    result = agent.query(question)
    print(f"Final Answer: {result}")

if __name__ == "__main__":
    main()