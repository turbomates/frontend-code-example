declare interface NamespaceEmitter {
    on: (eventName: string, cb: (data?: any) => void) => void
    emit: (eventName: string, data?: any) => void
    once: (eventName: string, cb: (data?: any) => void) => void
    off: (eventName: string) => void
}

declare module 'namespace-emitter' {
    const createEmitter: () => NamespaceEmitter
    export = createEmitter
}
