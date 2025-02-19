
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(bodyParser.json());

const API_KEY = "twwjclqzJAs8FDWHu5WjB0asS82fdv8s"; // Replace with your valid Mistral API key

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "mistral-tiny", // Use "mistral-small" or "mistral-medium" if needed
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0].message.content) {
    res.json({ content: data.choices[0].message.content });
} else {
    console.error("Invalid API response:", data);
    res.status(500).json({ content: "No valid response from AI" });
}

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ content: "Server error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
