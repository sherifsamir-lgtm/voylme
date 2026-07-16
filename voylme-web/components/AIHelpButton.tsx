"use client";

import {
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import {
  FormEvent,
  useState,
} from "react";

type AssistantMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

function getAssistantReply(question: string) {
  const text = question.toLowerCase();

  if (
    text.includes("price") ||
    text.includes("cheap") ||
    text.includes("سعر") ||
    text.includes("رخيص")
  ) {
    return "Enter your origin, destination and travel dates, then tap Search Flights to compare prices.";
  }

  if (
    text.includes("passport") ||
    text.includes("جواز")
  ) {
    return "Passenger and passport details must exactly match the travel document. Passport validity should normally be at least six months.";
  }

  if (
    text.includes("payment") ||
    text.includes("دفع")
  ) {
    return "Voylme shows the total price and supported payment methods before you continue.";
  }

  if (
    text.includes("cancel") ||
    text.includes("refund") ||
    text.includes("إلغاء") ||
    text.includes("استرجاع")
  ) {
    return "Cancellation and refund rules depend on the selected airline or travel partner. Review the fare conditions before booking.";
  }

  return "I can help with flight search, prices, passenger details, payment and booking questions.";
}

export default function AIHelpButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] =
    useState<AssistantMessage[]>([
      {
        id: 1,
        role: "assistant",
        text: "Hello. I am the Voylme Assistant. How can I help with your journey?",
      },
    ]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = input.trim();

    if (!question) return;

    const now = Date.now();

    setMessages((current) => [
      ...current,
      {
        id: now,
        role: "user",
        text: question,
      },
      {
        id: now + 1,
        role: "assistant",
        text: getAssistantReply(question),
      },
    ]);

    setInput("");
  }

  return (
    <>
      {open && (
        <section className="voylme-ai-panel">
          <div className="voylme-ai-title">
            <span>
              <Sparkles size={17} />
              Voylme Assistant
            </span>

            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="voylme-ai-messages">
            {messages.map((message) => (
              <p
                key={message.id}
                className={message.role}
              >
                {message.text}
              </p>
            ))}
          </div>

          <form onSubmit={submit}>
            <input
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask Voylme..."
              aria-label="Ask Voylme Assistant"
            />

            <button
              type="submit"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="voylme-ai-button"
        aria-label="Open Voylme Assistant"
        onClick={() =>
          setOpen((current) => !current)
        }
      >
        <MessageCircle size={20} />
      </button>
    </>
  );
}
