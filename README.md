# ReplyPilot

A modern, AI-powered tool that generates professional, on-brand responses to customer reviews in seconds. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Lightning Fast**: Generate 3 professional response options in under 10 seconds
- 🎯 **Brand Consistent**: Customize tone and brand voice for every response
- 🔒 **Privacy First**: No review storage - all processing is transient and anonymous
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 🚀 **No Signup Required**: Start generating immediately

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 1.5 Flash
- **Deployment**: Vercel
- **Notifications**: React Hot Toast

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd review-reply
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Generating Review Responses

1. Navigate to the Generator page
2. Paste the customer review (minimum 5 characters)
3. Select the star rating (optional)
4. Choose the response tone (professional, friendly, casual, formal)
5. Add your brand voice description (optional)
6. Select response length (short, medium, long)
7. Click "Generate Responses"
8. Copy any of the three generated options

### Rate Limits

- 30 generations per day per IP address
- 3 generations per minute per IP address

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API key
4. Deploy

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## API Reference

### POST /api/generate

Generate review responses.

**Request Body:**
```json
{
  "review": "string (min 5 chars)",
  "stars": "number (1-5, optional)",
  "tone": "professional | friendly | casual | formal",
  "brandVoice": "string (optional)",
  "length": "short | medium | long"
}
```

**Response:**
```json
{
  "options": {
    "A": "Generated response A",
    "B": "Generated response B", 
    "C": "Generated response C"
  }
}
```

**Error Responses:**
- `400`: Invalid input data
- `429`: Rate limit exceeded
- `500`: Server error

## Privacy & Security

- **No Data Storage**: Customer reviews are never stored
- **Transient Processing**: All data is processed in memory and immediately discarded
- **Anonymous Analytics**: Only aggregated usage statistics are collected
- **Rate Limiting**: Prevents abuse and ensures fair usage
- **HTTPS**: All communications are encrypted

## Performance Metrics

- **P95 Latency**: < 10 seconds
- **Error Rate**: < 2%
- **Success Metrics**: 
  - ≥200 unique visitors/week
  - ≥50 generations/week  
  - ≥40% copy rate

## Development

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint
│   ├── generator/
│   │   └── page.tsx              # Generator page
│   ├── privacy/
│   │   └── page.tsx              # Privacy policy
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
└── components/
    ├── Header.tsx                # Navigation header
    └── Footer.tsx                # Site footer
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact us through the website.

---

Built with ❤️ using Next.js and Gemini AI
