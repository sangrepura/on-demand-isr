import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const path = `/${(request.body as { record?: { id: string }, old_record?: { id: string } })?.record?.id || (request.body as { record?: { id: string }, old_record?: { id: string } })?.old_record?.id}`

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