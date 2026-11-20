/* Course 1 · Module 1 · Lecture 1.2: Who Communicates Science?
   Content source: "Course I Ungraded Assessments" doc. Titles come from assets/js/catalog.js. */
window.LECTURE = {
  id: "c1/m1/l1-2",

  activities: [
    {
      type: "sort",
      title: "Activity 1: Science communication takes many forms",
      meta: "Optional · Drag-and-drop sorting",
      instructions: "People communicate science in many roles. Sort each example into the category that best describes <strong>the activity shown</strong>.",
      categories: [
        { id: "central", label: "Public communication as a central part of the job" },
        { id: "within",  label: "Public communication within another professional role" },
        { id: "peers",   label: "Communication among researchers" }
      ],
      cards: [
        { category: "central",
          text: "A science journalist writes an article explaining a new discovery to newspaper readers.",
          feedback: "Explaining science to general audiences is a central part of a science journalist’s job." },
        { category: "central",
          text: "A museum docent explains a dinosaur exhibit to visitors.",
          feedback: "Guiding visitors through scientific ideas is a central part of this role." },
        { category: "within",
          text: "A nurse explains a treatment plan to a patient.",
          feedback: "Science communication is part of providing care, even though the nurse’s job title is not “science communicator.”" },
        { category: "within",
          text: "An entrepreneur explains how a new technology works to potential investors without technical backgrounds.",
          feedback: "The entrepreneur needs to make technical information understandable and compelling to people with different expertise." },
        { category: "peers",
          text: "A researcher presents findings to specialists at an academic conference.",
          feedback: "This shares research with scientific peers. It does not necessarily reach people outside the field." },
        { category: "peers",
          text: "A researcher writes a technical journal article for other scientists in the same field.",
          feedback: "This is an important form of scientific communication, but technical language and subscription barriers can limit its public reach." }
      ],
      // Shown when a card is placed in the wrong category, keyed by the card's CORRECT category.
      wrongFeedback: {
        central: "Think about the person’s main job here. Is explaining science to general audiences a central responsibility?",
        within:  "This person is communicating science while doing another job. Which category describes that?",
        peers:   "Look at the intended audience. This example is aimed at other researchers."
      },
      completion: "Science communication happens across many professions. Scientists also communicate with their peers, but reaching the public often requires additional effort. These categories describe activities—one person can do more than one."
    },

    {
      type: "label",
      title: "Activity 2: Sharing—and listening",
      meta: "Optional · Label each example",
      instructions: "A civic scientist engages in dialogue with the public. Label each example <strong>One-way communication</strong> or <strong>Two-way dialogue</strong>.",
      labels: ["One-way communication", "Two-way dialogue"],
      shuffle: false,
      items: [
        { text: "A scientist posts a video explaining a discovery, with no opportunity for viewers to respond.",
          answer: "One-way communication",
          feedback: "The scientist shares information, but this example does not include listening or an exchange with the audience." },
        { text: "A scientist meets with residents, explains a study, and listens to their questions and concerns.",
          answer: "Two-way dialogue",
          feedback: "Both the scientist and residents contribute. Civic science includes understanding the public as well as helping the public understand science." }
      ],
      retryFeedback: "Look for an exchange: does the scientist only share information, or also listen to what people have to say?"
    }
  ]
};
