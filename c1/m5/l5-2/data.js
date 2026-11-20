/* Course 1 · Module 5 · Lecture 5.2: Being a Science Communicator
   Content source: Scott's script "Being a science communicator" (scripts folder).
   DRAFT: written by Claude, needs Lan's and Scott's review. Not yet in the Course I Ungraded Assessments doc.
   Titles come from assets/js/catalog.js. */
window.LECTURE = {
  id: "c1/m5/l5-2",

  activities: [
    {
      type: "label",
      title: "Activity 1: Engage or not?",
      meta: "Optional · Label each example",
      instructions: "Your science videos are starting to get responses. For each one, decide whether to <strong>engage if you choose</strong> or <strong>not engage and protect yourself</strong>.",
      labels: ["Engage if you choose", "Don’t engage: protect yourself"],
      items: [
        { text: "A viewer shares a personal story related to your video and asks a follow-up question.",
          answer: "Engage if you choose",
          feedback: "Responses like this show you’re reaching people. You don’t have to reply, but it’s nice to if you have time and feel comfortable doing so." },
        { text: "A commenter politely points out that a number in your latest post is wrong. They’re right.",
          answer: "Engage if you choose",
          feedback: "This is good-faith feedback. Acknowledging and correcting the error is a chance to show the accuracy, honesty, and transparency people expect from a science communicator." },
        { text: "An account keeps posting insulting comments about your appearance under every video.",
          answer: "Don’t engage: protect yourself",
          feedback: "Rude or inappropriate comments don’t deserve your attention. You can mute or block the account and report it to the platform’s moderators." },
        { text: "Someone sends you a message threatening to show up at your workplace.",
          answer: "Don’t engage: protect yourself",
          feedback: "Don’t tolerate threats. Report them to your supervisor and your institution, and to local law enforcement if you feel unsafe." }
      ],
      retryFeedback: "Ask yourself: is this person engaging in good faith, or is the message abusive or threatening?",
      completion: "You don’t have to respond to everyone. When you do, remember that you represent your professional community as well as yourself: be respectful, accurate, honest, and transparent. Abuse and threats don’t deserve your attention, so use moderation tools and report them."
    },

    {
      type: "label",
      title: "Activity 2: Good move or rethink?",
      meta: "Optional · Label each example",
      instructions: "These fictional science communicators are building their careers. Label each choice <strong>Good move</strong> or <strong>Rethink this</strong>.",
      labels: ["Good move", "Rethink this"],
      items: [
        { text: "Before accepting an invitation to speak in another city, Maya asks the organizers whether they cover travel expenses and offer a speaker’s fee.",
          answer: "Good move",
          feedback: "Asking in advance is the right time to raise it. Many events can cover travel or offer a fee, and it’s reasonable to negotiate for what you think is fair." },
        { text: "A popular magazine accepts Jordan’s article. Jordan doesn’t ask about payment because it might seem rude.",
          answer: "Rethink this",
          feedback: "Many publications pay their authors and illustrators. Once you’re publishing in prominent places, it’s reasonable to ask, and don’t be shy about negotiating." },
        { text: "A company offers to sponsor Sam’s podcast. The payment is generous, so Sam accepts right away.",
          answer: "Rethink this",
          feedback: "A sponsor uses your name and reputation. Research the company first and make sure what it does aligns with your values." },
        { text: "Priya wants advice on pitching to editors, but she doesn’t contact other science writers because she doesn’t want to bother them.",
          answer: "Rethink this",
          feedback: "Building a professional network helps you find opportunities and advice. Reaching out through social media, email, or LinkedIn, or joining a professional society, is a normal part of the work." },
        { text: "Leo applies for a foundation grant to fund a community outreach project.",
          answer: "Good move",
          feedback: "Government agencies and private foundations offer grants that support science communication and outreach projects." },
        { text: "After several years of success, Ana mentors a student who is starting a science blog.",
          answer: "Good move",
          feedback: "Supporting the next generation matters. Encouraging others and sharing what you’ve learned helps more people share science with the world." }
      ],
      retryFeedback: "Think about what helps a science communicator succeed: being paid fairly, protecting their reputation, and staying connected to others.",
      completion: "Your work has value. Ask about payment in advance, choose partners whose values match yours, connect with other communicators, and help others get started."
    }
  ]
};
