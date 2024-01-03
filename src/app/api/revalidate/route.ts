import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    console.log('Revalidate request:', request)
    const path = `/${(request.body?.record?.id || request.body?.old_record?.id}`

    if (path) {
        console.log('Revalidating path:', path)
        revalidatePath(path)
        return Response.json({ revalidated: true, now: Date.now() })
    }

    console.log({
        revalidated: false,
        now: Date.now(),
        message: 'Missing path to revalidate',
    })
}