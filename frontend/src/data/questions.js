const surveyData = [
    {
      module: "Smoking & Alcohol Habits",
      questions: [
        {
          question: "How often do you smoke?",
          options: ["Never", "Rarely", "Sometimes", "Regularly"],
        },
        {
          question: "How often do you consume alcohol in excessive amounts?",
          options: ["Never", "Rarely", "Sometimes", "Regularly"],
        },
        {
          question: "How often do you drink alcohol in moderation?",
          options: ["Never", "Rarely", "Sometimes", "Frequently"],
        },
        {
          question: "How often do you drink a small amount of wine?",
          options: ["Never", "Rarely", "Sometimes", "Regularly"],
        },
      ],
    },
    {
      module: "Diet & Exercise",
      questions: [
        {
          question: "How balanced and healthy is your diet?",
          options: [
            "Not at all",
            "Slightly balanced",
            "Moderately balanced",
            "Very balanced and healthy",
          ],
        },
        {
          question: "How often do you eat red meat?",
          options: ["Never", "Occasionally", "Frequently", "Regularly"],
        },
        {
          question:
            "How often do you intentionally eat smaller portions of food to maintain or reduce weight?",
          options: ["Never", "Occasionally", "Frequently", "Always"],
        },
        {
          question: "How often do you exercise?",
          options: ["Never", "Occasionally", "Frequently", "Regularly"],
        },
        {
          question: "How often do you engage in light physical activity?",
          options: ["Never", "Occasionally", "Frequently", "Regularly"],
        },
      ],
    },
    {
      module: "Sleep & Stress",
      questions: [
        {
          question: "How often do you sleep for more than 9 hours a night?",
          options: ["Never", "Occasionally", "Frequently", "Always"],
        },
        {
          question:
            "How much professional responsibility or stress do you experience at work?",
          options: ["None", "Low", "Moderate", "High"],
        },
        {
          question: "How often do you feel stressed at work?",
          options: ["Never", "Rarely", "Sometimes", "Often"],
        },
      ],
    },
    {
      module: "Health & Longevity",
      questions: [
        {
          question:
            "How often do you get regular health check-ups or screenings?",
          options: ["Never", "Rarely", "Sometimes", "Regularly"],
        },
        {
          question: "How actively do you take steps to prevent heart disease?",
          options: ["Not at all", "Slightly", "Moderately", "Very actively"],
        },
        {
          question:
            "How much effort do you put into reducing your risk of cancer?",
          options: ["None", "A little", "Some", "A lot"],
        },
        {
          question:
            "How strong is your family history of good health or longevity?",
          options: ["Not at all", "Slightly", "Moderately", "Very strong"],
        },
      ],
    },
    {
      module: "Mental Health & Well-being",
      questions: [
        {
          question: "Have you been diagnosed with a mental illness?",
          options: [
            "No",
            "Mild diagnosis",
            "Moderate diagnosis",
            "Severe diagnosis",
          ],
        },
        {
          question:
            "To what extent do you consider yourself overweight or obese?",
          options: ["Not at all", "Slightly", "Moderately", "Extremely"],
        },
        {
          question:
            "To what extent would you describe yourself as an optimistic person?",
          options: ["Not at all", "Slightly", "Moderately", "Very optimistic"],
        },
        {
          question:
            "How conscientious and emotionally stable would you describe yourself?",
          options: ["Not at all", "Slightly", "Moderately", "Very much so"],
        },
      ],
    },
    {
      module: "Social & Relationships",
      questions: [
        {
          question: "How often do you spend time with pets or animals?",
          options: ["Never", "Rarely", "Sometimes", "Regularly"],
        },
        {
          question:
            "How often do you spend significant time in the company of women?",
          options: ["Never", "Occasionally", "Frequently", "Regularly"],
        },
        {
          question: "How happy or healthy would you describe your marriage?",
          options: [
            "Not happy/healthy",
            "Slightly happy/healthy",
            "Moderately happy/healthy",
            "Very happy/healthy",
          ],
        },
        {
          question:
            "How close is your group of friends, and how often do you spend time with them?",
          options: [
            "Not close/never",
            "Slightly close/rarely",
            "Moderately close/sometimes",
            "Very close/regularly",
          ],
        },
      ],
    },
    {
      module: "Work-Life Balance & Financial Security",
      questions: [
        {
          question: "How financially secure do you feel?",
          options: [
            "Not at all",
            "Slightly secure",
            "Moderately secure",
            "Very secure",
          ],
        },
        {
          question: "How often do you meditate?",
          options: ["Never", "Occasionally", "Frequently", "Regularly"],
        },
      ],
    },
    {
      module: "Living Environment",
      questions: [
        {
          question: "Do you live in a city or urban environment?",
          options: [
            "No",
            "Slightly urban",
            "Moderately urban",
            "Completely urban",
          ],
        },
        {
          question: "Do you live in a rural or country environment?",
          options: ["No", "Yes"],
        },
        {
          question: "How much time do you spend at high altitudes?",
          options: ["None", "A little", "Moderate amount", "A lot"],
        },
      ],
    },
    {
      module: "Other",
      questions: [
        {
          question: "Are you a woman?",
          options: ["No", "Yes"],
        },
        {
          question: "Do you practice or believe in polygamy?",
          options: ["No", "Yes"],
        },
      ],
    },
  ];

  export {surveyData}