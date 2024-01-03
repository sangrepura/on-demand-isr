import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const path = `/${body?.record?.id || body?.old_record?.id}`

    if (path) {
        console.log('Revalidating path:', path)
        revalidatePath(path)
        //revalidatePath('/', 'layout')
        return Response.json({ revalidated: true, time: Date.now(), body: request.body, path: `${path}` })
    }

    return Response.json({
        revalidated: false,
        time: Date.now(),
        message: 'Missing path to revalidate',
    })
}