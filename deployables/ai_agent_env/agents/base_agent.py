class BaseAgent:
    paused = False
    streaming_agent = None

    def __init__(self, known_actions, default_prompt, system_message="", max_turns=5):
        self.known_actions = known_actions
        self.default_prompt = default_prompt
        self.system_message = system_message
        self.max_turns = max_turns
        self.messages = []
        if self.system_message:
            self.messages.append({"role": "system", "content": self.system_message})

    def add_message(self, role, content):
        self.messages.append({"role": role, "content": content})

    def execute(self):
        raise NotImplementedError("Subclasses must implement execute method")

    def query(self, question):
        raise NotImplementedError("Subclasses must implement query method")

    def run_action(self, action, action_input):
        if action not in self.known_actions:
            raise ValueError(f"Unknown action: {action}")
        return self.known_actions[action](action_input)

    def reset(self):
        self.messages = []
        if self.system_message:
            self.messages.append({"role": "system", "content": self.system_message})
