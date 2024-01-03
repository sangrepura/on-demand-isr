import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const path = `/${body?.record?.id || body?.old_record?.id}`

    if (path) {
        console.log('Revalidating path:', path)
        revalidatePath(path)
        return Response.json({ revalidated: true, now: Date.now() })
    }

    return Response.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing path to revalidate',
    })
}