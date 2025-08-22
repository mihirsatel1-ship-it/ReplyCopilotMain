import { NextRequest, NextResponse } from 'next/server'
import { getAnalytics } from '@/lib/analytics'

export async function GET(req: NextRequest) {
  try {
    const analytics = await getAnalytics()
    return NextResponse.json(analytics)
  } catch (error) {
    console.error('❌ Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
