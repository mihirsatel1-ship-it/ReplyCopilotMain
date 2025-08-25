import { Metadata } from 'next'
import Generator from '@/components/Generator'

export const metadata: Metadata = {
  title: 'Review Reply Generator - ReplyPilot',
  description: 'Generate professional, on-brand replies to customer reviews in seconds. Choose from 100+ industry-specific templates and multiple AI models.',
}

export default function GeneratorPage() {
  return <Generator />
}