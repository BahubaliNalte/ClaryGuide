import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}
	const { message } = req.body;
	if (!message) {
		return res.status(400).json({ error: 'No message provided' });
	}
	try {
		const geminiApiKey = process.env.GEMINI_API_KEY;
		const systemPrompt = "You are ClaryBot, an expert career guidance assistant for students in India. Answer questions about degrees, exams, colleges, and career options in a helpful, concise way.";

		// Latest Gemini API endpoint and request format (as of Sep 2025)
	const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${geminiApiKey}`;
		const payload = {
			contents: [
				{
					role: "user",
					parts: [
						{ text: `${systemPrompt}\n${message}` }
					]
				}
			]
		};
		try {
			const response = await axios.post(endpoint, payload, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer.";
			res.status(200).json({ reply });
		} catch (error: any) {
			// Show full error from Google for easier debugging
			console.error('Gemini API error:', error?.response?.data || error);
			res.status(500).json({ error: error?.response?.data?.error?.message || error.message || 'Failed to connect to Gemini AI.' });
		}
	} catch (error: any) {
        console.error('Gemini API error:', error);
        res.status(500).json({ error: error.message || 'Failed to connect to AI.' });
	}
}
