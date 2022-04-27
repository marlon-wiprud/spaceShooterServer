
export type ErrRender = {
    message: string;
}


export const buildErrorResponse = (err: unknown): ErrRender => {
    if (err instanceof Error) return { message: err.message }
    return { message: String(err) }
}

