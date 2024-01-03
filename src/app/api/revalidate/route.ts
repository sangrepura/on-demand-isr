import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const path = `/${body?.record?.id || body?.old_record?.id}`

    if (path) {
        //revalidatePath('/', 'layout')
        revalidatePath(path)
        return Response.json({ revalidated: true, time: Date.now(), body: body, path: path })
    }

    return Response.json({
        revalidated: false,
        time: Date.now(),
        message: 'Missing path to revalidate',
    })
}
