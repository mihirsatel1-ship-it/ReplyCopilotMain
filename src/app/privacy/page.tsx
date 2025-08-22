export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              How we handle your data and protect your privacy
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-emerald-900 mb-3">
                🔒 Our Privacy Promise
              </h2>
              <p className="text-emerald-800">
                We don't store your customer reviews. All processing is transient and completely anonymous. 
                Your data privacy is our top priority.
              </p>
            </div>

            <h2>Data Collection and Processing</h2>
            <p>
              ReplyPilot is designed with privacy-first principles. Here's how we handle your data:
            </p>

            <h3>What We Collect</h3>
            <ul>
              <li><strong>Customer Reviews:</strong> The review text you paste for processing</li>
              <li><strong>Generation Parameters:</strong> Your selected tone, brand voice, length preferences, and star ratings</li>

            </ul>

            <h3>What We DON'T Store</h3>
            <ul>
              <li>Raw customer review text after processing</li>
              <li>Generated response content</li>
              <li>Personal information or contact details</li>
              <li>IP addresses for tracking purposes</li>
            </ul>

            <h3>How Processing Works</h3>
            <p>
              When you submit a review for processing:
            </p>
            <ol>
              <li>Your review is sent to Google's Gemini AI service for processing</li>
              <li>We generate response options based on your parameters</li>
              <li>The review text is immediately discarded from our systems</li>

            </ol>

            <h2>Data Retention</h2>
            <p>
              <strong>Customer Reviews:</strong> Not stored - processed transiently and immediately discarded<br/>
              <strong>Generated Responses:</strong> Not stored - only displayed to you in real-time<br/>

            </p>

            <h2>Third-Party Services</h2>
            <p>
              We use the following third-party services:
            </p>
            <ul>
              <li><strong>Google Gemini AI:</strong> For generating review responses (subject to Google's privacy policy)</li>
              <li><strong>Vercel:</strong> For hosting and deployment (subject to Vercel's privacy policy)</li>
            </ul>

            <h2>Rate Limiting</h2>
            <p>
              To prevent abuse and ensure fair usage:
            </p>
            <ul>
              <li>30 generations per day per IP address</li>
              <li>3 generations per minute per IP address</li>
              <li>Rate limit data is stored temporarily and automatically cleared</li>
            </ul>

            <h2>Your Rights</h2>
            <p>
              Since we don't store personal data, there's no personal information to access, modify, or delete. 
              However, you can:
            </p>
            <ul>
              <li>Use the service without providing any personal information</li>
              <li>Stop using the service at any time</li>
              <li>Contact us with privacy concerns</li>
            </ul>

            <h2>Security</h2>
            <p>
              We implement industry-standard security measures:
            </p>
            <ul>
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure API endpoints with proper validation</li>
              <li>No persistent storage of sensitive data</li>
              <li>Regular security updates and monitoring</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              ReplyPilot is not intended for use by children under 13. We do not knowingly collect 
              personal information from children under 13.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify users of any material 
              changes by posting the new policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please contact us 
              through our website.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Last Updated
              </h3>
              <p className="text-gray-600">
                This privacy policy was last updated on December 2024.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
